import { readFileSync } from 'node:fs';

// Compare only reviewed configurations. Ignore formatting differences that
// commonly result from copying a file through cPanel's editor.
const normalize = (text) => text
  .replace(/\r\n?/g, '\n')
  .split('\n')
  .map((line) => line.replace(/[\t ]+$/g, ''))
  .join('\n')
  .replace(/\n+$/g, '') + '\n';

const paths = process.argv.slice(2);
if (paths.length !== 3) {
  console.error('Expected the downloaded, proposed, and reviewed previous hosting configuration paths.');
  process.exit(1);
}

try {
  const [remote, proposed, previous] = paths.map((file) => normalize(readFileSync(file, 'utf8')));
  if (remote === proposed) {
    console.log('keep');
  } else if (remote === previous) {
    console.log('replace');
  } else {
    console.error('Production hosting configuration differs from both reviewed versions. No upload is permitted.');
    process.exitCode = 1;
  }
} catch {
  // Do not print server configuration: an unexpected file may contain secrets.
  console.error('Could not read the hosting configurations. No upload is permitted.');
  process.exitCode = 1;
}
