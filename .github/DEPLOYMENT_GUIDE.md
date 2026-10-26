# Production Deployment Guide

## Production Deployment Setup

### Required GitHub Secrets

Add these secrets in: **Settings → Secrets and variables → Actions**

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `SSH_PRIVATE_KEY` | SSH private key for production | (your SSH key) |
| `SSH_HOST` | Production server hostname | `host23.name.am` |
| `SSH_PORT` | SSH port | `22` |
| `SSH_USER` | cPanel username | `etheryadmin` |
| `REMOTE_PROD_PATH` | Production directory path | `/home2/etheryadmin/public_html` |

---

## How to Deploy

1. Go to **Actions** tab
2. Click **"Deploy to Production Server (SFTP only)"**
3. Click **"Run workflow"**
4. (Optional) Enter deployment reason
5. Click **"Run workflow"** button

---

## Deployment Flow

```
Developer → GitHub Actions → Build → SFTP → Production Server
```

The workflow will:
1. Checkout your code
2. Install dependencies
3. Build the application
4. Check the static export and required hosting files
5. Read and compare any existing production root `.htaccess` before uploading
6. Deploy via SFTP to your production server, including hidden configuration files

The production document-root directory must already exist. A missing or unreadable
directory stops deployment, which prevents uploading into a mistyped location.

## Indexing and Hosting Configuration

`next.config.mjs` exports the site into `build/`. Upload the contents of that
directory to the domain's document root. `public/.htaccess` is copied into the
export and must be deployed alongside `index.html` and `404.html`.

The hosting rules require Apache with `mod_rewrite` (or compatible LiteSpeed)
and permission to use `Options`, `DirectoryIndex`, `ErrorDocument`, and rewrite
directives in `.htaccess`.

The workflow downloads the server file before uploading anything. It accepts
three reviewed situations:

- No root configuration exists: install `public/.htaccess`.
- The root configuration already matches `public/.htaccess`: leave it in place.
- The root configuration matches `.github/hosting/production-before.htaccess`,
  supplied by the owner and reviewed on 27 October 2026: replace it with the fixed
  configuration. The inherited-PHP cPanel section is preserved verbatim.

`scripts/check-hosting-config.mjs` ignores only CRLF line endings, trailing spaces
and tabs, and final-newline differences. Any unexpected directive, changed PHP
handler, unreadable file, or incomplete directory listing stops deployment before
any upload. The downloaded copy stays on the temporary runner; it is neither
printed in logs nor uploaded as an artifact, because server configuration may
contain private settings.

If the live file has changed since the reviewed version, back it up and inspect
it through the hosting control panel. Merge required directives, verify the
result on staging, and update the reviewed configuration before rerunning the
workflow. Do not bypass the preflight by deleting an unreviewed server file.

The configuration:

- Redirects HTTP and `www.ethery.tech` to `https://ethery.tech` with HTTP 308,
  preserving paths, query strings, and request methods.
- Serves directory routes using their exported `index.html`.
- Returns HTTP 404 for missing URLs while displaying the exported error page.
- Leaves existing assets and PHP form endpoints available.

The HTTPS redirect assumes TLS terminates on the web server. If a reverse proxy
terminates TLS, configure the host to recognize the trusted proxy's HTTPS state
before enabling this redirect.

`robots.txt` allows the `/_next/` scripts, stylesheets, and fonts needed for
Google to render the site. Only the `/build/` URL prefix remains disallowed.

After deployment:

1. Check `https://ethery.tech/robots.txt` no longer disallows `/_next/`.
2. Confirm all sitemap pages return HTTP 200 and missing URLs return HTTP 404.
3. Check HTTP and `www` addresses redirect to the HTTPS canonical domain.
4. In Google Search Console, inspect an affected public URL using **Test live URL**.
   If it is now crawlable, request indexing. Use **Validate fix** for the
   robots.txt issue when the affected URLs were unintentionally blocked; URLs
   intentionally excluded under `/build/` do not need to be indexed.

The notification supplied for this release identifies the font
`/_next/static/media/13971731025ec697-s.p.woff2`. Confirm it is no longer blocked
by robots.txt; the font only needs to be crawlable for rendering. Use the homepage
or `/leadership/narek-ghazaryan/` for HTML-page URL Inspection. The latter is the
separate "Crawled — currently not indexed" example and currently has no detected
technical indexing exclusion. Google determines whether to index that profile.

---

## Setup Checklist

- [ ] Generate SSH key pair for production server
- [ ] Add public key to production cPanel (SSH Access)
- [ ] Add all 5 secrets to GitHub repository
- [ ] Test deployment using "Run workflow" button
- [ ] Verify files deployed to production server

---

## Troubleshooting

### Deployment Fails

1. Check the Actions tab for error logs
2. Verify all secrets are set correctly
3. Test SSH connection manually:
   ```bash
   ssh -p <PORT> <USER>@<HOST>
   ```

### Files Not Uploading

- Check `REMOTE_PROD_PATH` is correct
- Verify write permissions on server
- Check SFTP is enabled in cPanel

### Build Fails

- Test build locally: `npm run build`
- Check Node version matches (18)
- Verify all dependencies installed

---

## Secret Reference

```yaml
Required Secrets:
  - SSH_PRIVATE_KEY
  - SSH_HOST
  - SSH_PORT
  - SSH_USER
  - REMOTE_PROD_PATH
```

---

**Simple, manual deployment control for your production environment.**
