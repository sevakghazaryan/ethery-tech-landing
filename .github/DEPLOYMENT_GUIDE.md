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
4. Deploy via SFTP to your production server

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

