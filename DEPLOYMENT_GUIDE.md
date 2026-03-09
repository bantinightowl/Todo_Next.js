# Deployment Guide

This guide covers deploying the Next.js Todo + Chat app to various platforms.

## Quick Links

- [Option 1: Railway (Easiest)](#option-1-railway---easiest)
- [Option 2: Render](#option-2-render)
- [Option 3: VPS (DigitalOcean/AWS)](#option-3-vps-digitallow-aws-ec2)
- [Option 4: Docker](#option-4-docker)
- [MongoDB Atlas Setup](#mongodb-atlas-setup)

---

## Prerequisites

1. **MongoDB Atlas Account** (free tier available)
   - Create at: https://www.mongodb.com/cloud/atlas/register
   - See [MongoDB Atlas Setup](#mongodb-atlas-setup) below

2. **Generate NEXTAUTH_SECRET**
   ```bash
   # Run this command to generate a secure secret
   openssl rand -base64 32
   ```

---

## Option 1: Railway - Easiest

### Steps:

1. **Create Railway Account**
   - Visit: https://railway.app
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your repository

3. **Configure Environment Variables**
   In Railway dashboard, add these variables:
   ```
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/myapp
   NEXTAUTH_SECRET=your-generated-secret-here
   NEXTAUTH_URL=https://your-project.railway.app
   NEXT_PUBLIC_APP_URL=https://your-project.railway.app
   NODE_ENV=production
   PORT=3000
   ```

4. **Deploy**
   - Railway will auto-detect and deploy
   - Your app will be live at `https://your-project.railway.app`

### Estimated Time: 10 minutes
### Cost: $5/month (includes $5 credit)

---

## Option 2: Render

### Steps:

1. **Create Render Account**
   - Visit: https://render.com
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your repository

3. **Configure Service**
   - **Name:** myapp
   - **Environment:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `node server.js`

4. **Add Environment Variables**
   ```
   MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/myapp
   NEXTAUTH_SECRET=your-generated-secret-here
   NODE_ENV=production
   PORT=3000
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Render will build and deploy automatically

### Estimated Time: 15 minutes
### Cost: Free tier available (with limitations), $7/month for full features

---

## Option 3: VPS (DigitalOcean/AWS EC2)

### Prerequisites:
- Ubuntu 20.04+ server
- Domain name (optional but recommended)
- SSH access

### Steps:

#### 1. Connect to Server
```bash
ssh root@your-server-ip
```

#### 2. Install Dependencies
```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Install Git
apt install -y git

# Install PM2 for process management
npm install -g pm2
```

#### 3. Clone Repository
```bash
cd /var/www
git clone https://github.com/your-username/my-app.git
cd my-app
```

#### 4. Install Dependencies
```bash
npm install --production
```

#### 5. Create Environment File
```bash
nano .env.production
```

Add:
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/myapp
NEXTAUTH_SECRET=your-generated-secret-here
NEXTAUTH_URL=https://your-domain.com
NEXT_PUBLIC_APP_URL=https://your-domain.com
NODE_ENV=production
PORT=3000
```

#### 6. Build Application
```bash
npm run build
```

#### 7. Setup PM2
```bash
pm2 start server.js --name myapp
pm2 save
pm2 startup
```

#### 8. Setup Nginx (Optional but Recommended)
```bash
apt install -y nginx

nano /etc/nginx/sites-available/myapp
```

Add:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Enable site:
```bash
ln -s /etc/nginx/sites-available/myapp /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

#### 9. Setup SSL with Let's Encrypt (Recommended)
```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d your-domain.com
```

### Estimated Time: 45 minutes
### Cost: $5-10/month (DigitalOcean Droplet)

---

## Option 4: Docker

### Local Testing

1. **Build and Run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

2. **Access Application**
   - Open: http://localhost:3000

3. **View Logs**
   ```bash
   docker-compose logs -f app
   ```

4. **Stop Services**
   ```bash
   docker-compose down
   ```

### Production Deployment

1. **Build Docker Image**
   ```bash
   docker build -t myapp .
   ```

2. **Run Container**
   ```bash
   docker run -d \
     -p 3000:3000 \
     -e MONGODB_URI=your-mongodb-uri \
     -e NEXTAUTH_SECRET=your-secret \
     -e NEXTAUTH_URL=https://your-domain.com \
     --name myapp \
     myapp
   ```

3. **Deploy to Container Registry**
   ```bash
   docker tag myapp your-registry/myapp:latest
   docker push your-registry/myapp:latest
   ```

### Estimated Time: 20 minutes
### Cost: Varies by hosting provider

---

## MongoDB Atlas Setup

### 1. Create Cluster

1. Go to https://cloud.mongodb.com
2. Sign up/Log in
3. Click "Build a Database"
4. Choose **FREE** tier (M0)
5. Select region closest to you
6. Click "Create Cluster"

### 2. Create Database User

1. Go to "Database Access" in left sidebar
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Set username and password
5. Set role to "Read and write to any database"
6. Click "Add User"

### 3. Configure Network Access

1. Go to "Network Access" in left sidebar
2. Click "Add IP Address"
3. For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
4. For production: Add your server IP
5. Click "Confirm"

### 4. Get Connection String

1. Go to "Database" → Click "Connect" on your cluster
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your user's password
5. Replace `<dbname>` with `myapp`

Example:
```
mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/myapp?retryWrites=true&w=majority
```

---

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://...` |
| `NEXTAUTH_SECRET` | Secret for session signing | 32+ char random string |
| `NEXTAUTH_URL` | Your app's URL | `https://your-domain.com` |
| `NEXT_PUBLIC_APP_URL` | Same as NEXTAUTH_URL | `https://your-domain.com` |
| `NODE_ENV` | Environment | `production` |
| `PORT` | Server port | `3000` |
| `NEXTAUTH_SESSION_MAX_AGE` | Session duration (seconds) | `2592000` |

---

## Post-Deployment Checklist

- [ ] MongoDB connection is working
- [ ] User registration works
- [ ] User login works
- [ ] Todo CRUD operations work
- [ ] Chat page loads
- [ ] Socket.io connects (check console for "Socket connected")
- [ ] Real-time messaging works (test with 2 browsers)
- [ ] HTTPS is enabled (for production)
- [ ] Environment variables are set correctly

---

## Troubleshooting

### Socket.io Not Connecting

**Check:**
1. WebSocket support is enabled on your hosting
2. Firewall allows WebSocket connections
3. Nginx is configured with `proxy_set_header Upgrade $http_upgrade`

### MongoDB Connection Failed

**Check:**
1. Connection string is correct
2. IP address is whitelisted in MongoDB Atlas
3. Username/password are correct

### NEXTAUTH_SECRET Error

**Generate new secret:**
```bash
openssl rand -base64 32
```

### Build Fails

**Try:**
```bash
# Clear cache
rm -rf node_modules .next
npm install
npm run build
```

---

## Monitoring

### PM2 Commands (VPS)
```bash
pm2 status          # Check app status
pm2 logs myapp      # View logs
pm2 restart myapp   # Restart app
pm2 stop myapp      # Stop app
```

### Railway/Render
- View logs in dashboard
- Automatic restarts on failure

---

## Performance Tips

1. **Enable Gzip Compression** (Nginx)
2. **Use CDN for Static Assets** (Cloudflare)
3. **MongoDB Indexes** (already configured)
4. **Enable HTTP/2** (Nginx)
5. **Set up Caching Headers**

---

## Security Recommendations

1. **Use HTTPS** (Let's Encrypt)
2. **Set strong NEXTAUTH_SECRET** (32+ characters)
3. **Restrict MongoDB IP whitelist**
4. **Enable firewall** (UFW on Ubuntu)
5. **Regular dependency updates**
6. **Monitor logs for suspicious activity**

---

## Support

For issues:
1. Check browser console logs
2. Check server logs
3. Review this guide's troubleshooting section
4. Check MongoDB Atlas logs

---

**Good luck with your deployment!** 🚀
