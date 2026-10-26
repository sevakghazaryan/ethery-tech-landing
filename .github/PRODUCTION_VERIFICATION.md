# Production verification — 27 October 2026

The changed source and static export pass local verification and three independent
reviews covering hosting, deployment, and application behavior. No remaining
actionable regression was found in the reviewed changes. The live site has not
been deployed or modified during this work.

## Verified changes

- `public/robots.txt` permits the Next.js JavaScript, CSS, and font resources.
- The Google verification metadata contains the token without an extra prefix.
- Missing URLs return HTTP 404 and display the exported, non-indexable error page.
- HTTP and `www` requests redirect to the canonical HTTPS hostname with HTTP 308.
- The cPanel PHP inheritance section supplied by the owner is preserved verbatim.
- Deployment explicitly includes hidden hosting configuration files.
- Deployment reads the existing root configuration before any upload. Only an
  absent configuration, the proposed configuration, or the owner's reviewed
  previous configuration is accepted. Unexpected rules or unreadable/incomplete
  directory listings stop deployment before uploads.

The previous production configuration is recorded in
`hosting/production-before.htaccess`. Independent Apache tests reproduced its
HTTP 200 response for three missing URLs, then verified HTTP 404 with the fixed
configuration. The supplied PHP section contains comments declaring inheritance;
no active PHP handler directive is removed.

## Test results

| Check | Result |
| --- | --- |
| Fresh `npm run build` with Next.js 15.5.7 and Node.js 22.22.2 | Pass; compilation, type validation, prerendering, static export |
| `npm run test:hosting` | 8 black-box regression tests pass |
| Exact deployment steps against a local OpenSSH SFTP server | 15 final migration/failure scenarios pass |
| Apache HTTPS responses for sitemap pages | All 24 return HTTP 200 with correct canonical URLs, indexing metadata, descriptions, and verification tokens |
| JavaScript, CSS, and font requests | 26 resources return HTTP 200 and are crawlable |
| Independent exported link/resource audit | 89 distinct local targets plus CSS references; none missing |
| Missing-page, asset, and API paths | 6 HTTP 404 cases pass; custom error page retains `noindex` |
| Canonical redirects | 13 cases pass, including POST method preservation and query strings |
| Independent encoded-path redirect probes | 36 probes pass or return the expected Apache encoded-path rejection |
| Template and `.htaccess` access protection | HTTP 403 as expected |
| Browser loads at 1280 × 900 and 390 × 844 | All 24 pages at both sizes; no horizontal overflow or application error observed |
| Browser interaction smoke tests | Product, solution, and leadership navigation; direct refresh; mobile menu and submenu; form switching; 404-to-home recovery pass |
| Browser form integration against a local response fixture | Demo validation, success, and server-failure states; careers validation, dummy CV multipart upload, success, and form reset pass |
| PHP syntax | All 4 PHP source files pass |
| Exact PHP endpoint source through an isolated CLI harness | 21 validation, success, honeypot, upload-restriction, and mail-refusal scenarios pass |
| Captured mail content | Recipient, escaping, headers, MIME structure, reply-to, and PDF attachment checks pass; no real email sent |
| Workflow YAML, embedded Bash, export file checks, and `git diff --check` | Pass |

The SFTP tests cover approved baseline migration, CRLF/trailing-whitespace
formatting, leaving the current configuration untouched, unknown rules, added PHP
handlers, empty or unreadable files, directories and dangling links in place of
the config, unreadable or missing document roots, invalid paths, paths with
spaces, and unwritable upload destinations. An SFTP readdir error that returns
exit code zero is explicitly detected.

## Public live-site check

Read-only checks of `https://ethery.tech/` on 27 October 2026 confirmed:

- The homepage returns HTTP 200 over HTTP/2, with a successfully verified TLS
  certificate. Responses identify the web server as LiteSpeed.
- Public DNS uses `ns301.name.am` and `ns302.name.am`. The domain resolves to
  `51.38.26.56`, and `www.ethery.tech` is a CNAME to `ethery.tech`.
- No common CDN/proxy response headers were present. Together with DNS, this is
  consistent with direct name.am/LiteSpeed hosting; it does not expose the
  internal server HTTPS variable or prove that no internal proxy exists.
- Both PHP form endpoints return HTTP 405, `Allow: POST`, and the expected clean
  JSON error for a GET request. The live runtime reports PHP 8.1.34. No actual
  form submission or email delivery was triggered.
- The email template returns HTTP 403, as expected.
- The live site still has the old `/_next/` robots block and malformed Google
  verification metadata. HTTP and `www` addresses return 200 without a canonical
  redirect. A missing URL displays the error page with HTTP 200. These results
  confirm that the prepared fixes have not yet been deployed.

No additional application source files or credentials are needed for these
checks. If a CDN or TLS-terminating proxy is configured, its HTTPS recognition
settings must also be confirmed before rollout.

## Search Console examples confirmed

Screenshots supplied by the owner on 27 October 2026 identify two separate cases:

- **Blocked by robots.txt:**
  `https://ethery.tech/_next/static/media/13971731025ec697-s.p.woff2`.
  This is a font resource, last crawled on 22 October 2026, rather than a public
  HTML page. Its live response is HTTP 200 with `font/woff2` and a valid WOFF2
  signature, but the old `/_next/` rule prevents compliant crawlers from fetching
  it. The prepared robots change directly resolves that restriction. The goal is
  to allow rendering resources to be crawled, rather than list the font itself
  in search results.
- **Crawled — currently not indexed:**
  `https://ethery.tech/leadership/narek-ghazaryan/`.
  The screenshot reports a last crawl on 9 July 2026. A fresh public check returns
  HTTP 200, `index, follow` for robots and Googlebot, a canonical pointing to the
  same profile URL, no `X-Robots-Tag` exclusion, and the expected H1. The profile
  is present in the live sitemap and linked from the leadership page. No current
  technical indexing block was found. This status does not establish that the
  font restriction caused Google's indexing decision, and no additional profile
  source change is justified by the available evidence.

After deployment, validate the robots fix. Use URL Inspection and **Test live
URL** on the profile; a one-time indexing request after the site changes is
optional. Google still decides whether and when to index the profile.

## Production verification limits

1. The HTTPS redirect assumes the web server recognizes the request's HTTPS
   state. If a CDN or proxy terminates TLS, the host must configure trusted HTTPS
   recognition. This must be confirmed for the actual hosting setup; arbitrary
   client-supplied forwarded headers are deliberately not trusted.
2. PHP HTTP/CGI startup was killed by the local environment. Backend tests ran
   the exact endpoint source through PHP CLI with mail redirected to local
   capture. The careers-success test used a narrowly scoped dummy upload shim;
   the real HTTP upload registry and production mail delivery were not tested.
   Browser submissions used a local JSON-response fixture rather than the live
   mail endpoints.
3. Apache behavior was verified locally. Actual LiteSpeed permissions, PHP
   execution, TLS recognition, and form delivery require a deployment smoke test.
   The existing SFTP release process publishes files in place rather than
   switching an entire release atomically.
4. The supplied Search Console examples are now verified: a blocked font and a
   crawled but unindexed leadership profile. The prepared fix removes the font's
   crawl restriction. Google's decision to index the profile cannot be
   guaranteed by deployment, an indexing request, or a local test.

## Delivery and deployment

The final `build/` contains the exported website, `.htaccess`, `404.html`, the
corrected `robots.txt`, and PHP configuration and template protections. A full
release archive was generated outside the repository, checked for archive
integrity, and compared byte-for-byte against required build files.

Use the deployment procedure in `DEPLOYMENT_GUIDE.md`. If an unexpected hosting
configuration is detected, review it before changing the approved baseline.
After deployment, check the homepage and all sitemap URLs, an unknown URL, HTTP
and `www` redirects, and the real demo/careers endpoints. Use a deliberately
authorized test message for actual email-delivery confirmation. Then inspect an
affected URL in Search Console and validate the robots fix when appropriate.

For an unexpected hosting failure, restore the prior root configuration from
the owner-supplied baseline or a current hosting backup while investigating.
Restoring that prior file also restores its original HTTP 200 missing-page
behavior; it is a rollback action rather than the final indexing fix.
