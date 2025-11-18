# Simple Deployment Guide

## Two Deployment Workflows

### 1. Dev Deployment (`deploy.yml`)
- **Purpose:** Deploy to development server
- **Trigger:** Manual only
- **Server:** Dev server (existing setup)

### 2. Production Deployment (`deploy-prod.yml`)
- **Purpose:** Deploy to production server
- **Trigger:** Manual only
- **Server:** Production server (new)

---

## Production Deployment Setup

### Required GitHub Secrets

Add these secrets in: **Settings → Secrets and variables → Actions**

| Secret Name | Description | Example |
|-------------|-------------|---------|
| `SSH_PRIVATE_KEY_PROD` | SSH private key for production | (your SSH key) |
| `SSH_HOST_PROD` | Production server hostname | `host23.name.am` |
| `SSH_PORT_PROD` | SSH port | `22` |
| `SSH_USER_PROD` | cPanel username for production | `username` |
| `REMOTE_PROD_PATH` | Production directory path | `/home2/username/public_html` |

**Note:** These are separate from your dev secrets to keep environments isolated.

---

## How to Deploy

### Deploy to Dev
1. Go to **Actions** tab
2. Click **"Deploy to Dev Server (SFTP only)"**
3. Click **"Run workflow"**
4. (Optional) Enter deployment reason
5. Click **"Run workflow"** button

### Deploy to Production
1. Go to **Actions** tab
2. Click **"Deploy to Production Server (SFTP only)"**
3. Click **"Run workflow"**
4. (Optional) Enter deployment reason
5. Click **"Run workflow"** button

---

## Deployment Flow

```
Developer → GitHub Actions → Build → SFTP → Server
```

**For Dev:**
- Uses `SSH_PRIVATE_KEY`, `SSH_HOST`, `SSH_USER`, etc.
- Deploys to `REMOTE_DEV_PATH`

**For Production:**
- Uses `SSH_PRIVATE_KEY_PROD`, `SSH_HOST_PROD`, `SSH_USER_PROD`, etc.
- Deploys to `REMOTE_PROD_PATH`

---

## Setup Checklist

### For Production Deployment:

- [ ] Generate SSH key pair for production server
- [ ] Add public key to production cPanel (SSH Access)
- [ ] Add all 5 production secrets to GitHub repository
- [ ] Test deployment using "Run workflow" button
- [ ] Verify files deployed to production server

### For Dev Deployment (Already Set Up):

- [x] SSH keys configured
- [x] Secrets added
- [x] Ready to use

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

## Quick Reference

### Dev Deployment
```yaml
Secrets: SSH_PRIVATE_KEY, SSH_HOST, SSH_PORT, 
         SSH_USER, REMOTE_DEV_PATH
```

### Production Deployment
```yaml
Secrets: SSH_PRIVATE_KEY_PROD, SSH_HOST_PROD, 
         SSH_PORT_PROD, SSH_USER_PROD, 
         REMOTE_PROD_PATH
```

---

**That's it! Simple, manual control for both environments.**

