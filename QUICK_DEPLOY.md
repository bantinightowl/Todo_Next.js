# 🚀 Quick Deploy Guide

## Fastest Option: Railway (5-10 minutes)

### Step 1: MongoDB Atlas Setup (3 min)

1. Go to https://www.mongodb.com/cloud/atlas/register
2. Sign up (free)
3. Create FREE cluster (M0)
4. Create database user (remember username/password)
5. Network Access: Add `0.0.0.0/0` (allow from anywhere)
6. Get connection string, example:
   ```
   mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/myapp
   ```

### Step 2: Generate Secret (30 sec)

Run in terminal:
```bash
openssl rand -base64 32
```
Save the output!

### Step 3: Deploy to Railway (5 min)

1. Go to https://railway.app
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add these environment variables:
   ```
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/myapp
   NEXTAUTH_SECRET=paste-your-secret-here
   NEXTAUTH_URL=https://your-app.railway.app
   NEXT_PUBLIC_APP_URL=https://your-app.railway.app
   NODE_ENV=production
   ```
6. Deploy! Railway will auto-build

### Step 4: Test (2 min)

1. Open your Railway URL
2. Register a new account
3. Test todos
4. Test chat (click 💬 icon)

---

## Alternative: Docker (Local Testing)

```bash
# Start everything
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop
docker-compose down
```

Access at: http://localhost:3000

---

## Alternative: VPS (DigitalOcean)

1. Create droplet ($6/month)
2. SSH into server
3. Run setup script:
   ```bash
   # Install Node.js, Git, PM2
   curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
   apt install -y nodejs git
   npm install -g pm2
   ```
4. Clone repo and deploy:
   ```bash
   git clone <your-repo>
   cd my-app
   npm install --production
   npm run build
   pm2 start server.js --name myapp
   pm2 save
   pm2 startup
   ```

---

## Environment Variables Template

Copy this to your deployment platform:

```ini
# MongoDB (get from MongoDB Atlas)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/myapp

# Security (generate with: openssl rand -base64 32)
NEXTAUTH_SECRET=your-32-char-secret-here

# Your app URL (update after deployment)
NEXTAUTH_URL=https://your-domain.com
NEXT_PUBLIC_APP_URL=https://your-domain.com

# Production settings
NODE_ENV=production
PORT=3000
NEXTAUTH_SESSION_MAX_AGE=2592000
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Socket not connecting | Check WebSocket support on hosting |
| MongoDB error | Verify connection string & IP whitelist |
| Login fails | Check NEXTAUTH_SECRET is 32+ chars |
| Build fails | Clear cache: `rm -rf node_modules .next` |

---

## Cost Breakdown

| Platform | Cost | Best For |
|----------|------|----------|
| Railway | $5/mo | Easiest deployment |
| Render | Free-$7/mo | Budget option |
| DigitalOcean | $6/mo | Full control |
| Docker (self-hosted) | Free | Testing/Development |

---

**Need help?** Check `DEPLOYMENT_GUIDE.md` for detailed instructions!
