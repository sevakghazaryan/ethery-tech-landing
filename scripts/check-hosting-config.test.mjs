import assert from 'node:assert/strict';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const proposed = readFileSync(new URL('../public/.htaccess', import.meta.url), 'utf8');
const previous = readFileSync(new URL('../.github/hosting/production-before.htaccess', import.meta.url), 'utf8');
const checker = fileURLToPath(new URL('./check-hosting-config.mjs', import.meta.url));

function check(remote, { missingRemote = false, missingPrevious = false } = {}) {
  const directory = mkdtempSync(join(tmpdir(), 'ethery-config-test-'));
  try {
    const remotePath = join(directory, 'remote.htaccess');
    const proposedPath = join(directory, 'proposed.htaccess');
    const previousPath = join(directory, 'previous.htaccess');
    if (!missingRemote) writeFileSync(remotePath, remote);
    writeFileSync(proposedPath, proposed);
    if (!missingPrevious) writeFileSync(previousPath, previous);
    const result = spawnSync(process.execPath, [checker, remotePath, proposedPath, previousPath], { encoding: 'utf8' });
    if (!missingRemote) assert.equal(readFileSync(remotePath, 'utf8'), remote, 'comparison must not change the downloaded file');
    return result;
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
}

test('keeps the already-installed configuration', () => {
  const result = check(proposed);
  assert.equal(result.status, 0);
  assert.equal(result.stdout.trim(), 'keep');
});

test('permits migration from the server configuration reviewed with the owner', () => {
  const result = check(previous);
  assert.equal(result.status, 0);
  assert.equal(result.stdout.trim(), 'replace');
});

test('accepts CRLF, trailing whitespace, and final-newline differences', () => {
  for (const [input, expected] of [[previous, 'replace'], [proposed, 'keep']]) {
    const reformatted = input.trimEnd().split('\n').map((line) => line + '  \t').join('\r\n');
    const result = check(reformatted);
    assert.equal(result.status, 0);
    assert.equal(result.stdout.trim(), expected);
  }
});

test('rejects an added PHP handler instead of silently removing it', () => {
  const result = check(previous + '\nAddHandler application/x-httpd-ea-php82 .php\n');
  assert.equal(result.status, 1);
  assert.equal(result.stdout, '');
  assert.ok(!result.stderr.includes('application/x-httpd-ea-php82'));
});

test('rejects additional rewrite rules in either reviewed version', () => {
  for (const input of [previous, proposed]) {
    const result = check(input + '\nRewriteRule ^private - [F]\n');
    assert.equal(result.status, 1);
    assert.equal(result.stdout, '');
  }
});

test('rejects changed hosting-package information', () => {
  assert.equal(check(previous.replace('“PHP”', '“PHP 8.2”')).status, 1);
});

test('rejects an empty existing configuration', () => {
  assert.equal(check('').status, 1);
});

test('fails when the downloaded file or reviewed baseline is missing', () => {
  assert.equal(check('', { missingRemote: true }).status, 1);
  assert.equal(check(proposed, { missingPrevious: true }).status, 1);
});
