# 🚀 Deploy to Render - FREE

## Step-by-Step Instructions (10 minutes)

### Step 1: Create Render Account (2 min)

1. Go to **https://render.com**
2. Click **"Get Started for Free"**
3. Sign up with **GitHub** (recommended) or email

---

### Step 2: Create New Web Service (3 min)

1. Click **"New +"** button
2. Select **"Web Service"**
3. Click **"Connect a repository"**
4. Select your GitHub account
5. Find and select your repository (`my-app`)
6. Click **"Connect"**

---

### Step 3: Configure Service (3 min)

Fill in these settings:

| Field | Value |
|-------|-------|
| **Name** | `my-todo-app` (or any name you like) |
| **Region** | Choose closest to you |
| **Branch** | `main` (or your default branch) |
| **Root Directory** | *(leave blank)* |
| **Runtime** | `Node` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `node server.js` |
| **Instance Type** | `Free` |

---

### Step 4: Add Environment Variables (2 min)

Click **"Advanced"** then **"Add Environment Variable"**. Add these:

```
MONGODB_URI=mongodb+srv://bks03011997_db_user:advanced_todo@54321@cluster0.ot7kqxd.mongodb.net/myapp?retryWrites=true&w=majority
NEXTAUTH_SECRET=K1ndCX5bf1U0aTpsHAGkMjI8Y1CiXD8qPiTJFdO/Jyk=
NODE_ENV=production
PORT=3000
```

**Important:** After deployment, update these with your actual Render URL:
```
NEXTAUTH_URL=https://your-app-name.onrender.com
NEXT_PUBLIC_APP_URL=https://your-app-name.onrender.com
```

---

### Step 5: Deploy! (2-5 min)

1. Click **"Create Web Service"**
2. Render will start building (logs will appear)
3. Wait for "Live" status
4. Click your Render URL to open the app

---

## Post-Deployment Tasks

### 1. Update NEXTAUTH_URL

After deployment completes:

1. Go to Render Dashboard
2. Click your service
3. Go to **"Environment"** tab
4. Add/Update:
   ```
   NEXTAUTH_URL=https://YOUR-ACTUAL-URL.onrender.com
   NEXT_PUBLIC_APP_URL=https://YOUR-ACTUAL-URL.onrender.com
   ```
5. Click **"Save Changes"**
6. Service will automatically redeploy

### 2. Test Your App

1. Open your Render URL
2. Register a new account
3. Create some todos
4. Test the chat feature (💬 icon)

### 3. MongoDB Atlas Setup

Make sure your MongoDB Atlas allows connections from anywhere:

1. Go to https://cloud.mongodb.com
2. Click **"Network Access"**
3. Click **"Add IP Address"**
4. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
5. Click **"Confirm"**

---

## Free Tier Limitations

| Feature | Limit |
|---------|-------|
| **CPU** | Shared |
| **RAM** | 512 MB |
| **Bandwidth** | 100 GB/month |
| **Sleep** | Service sleeps after 15 min inactivity |

**Note:** Free service sleeps after 15 minutes of inactivity. First request after sleep takes ~30 seconds to wake up.

---

## Troubleshooting

### Build Fails

**Error: Node version mismatch**
```
# Check your local Node version
node -v

# Render uses Node 20 by default
# Make sure you're using Node 20 locally
```

**Error: Memory limit**
```
# Free tier has 512MB RAM
# Try reducing build complexity or upgrade to paid tier
```

### App Won't Start

**Check logs:**
1. Render Dashboard → Your Service
2. Click **"Logs"** tab
3. Look for errors

**Common issues:**
- MongoDB connection string incorrect
- NEXTAUTH_SECRET missing or too short
- PORT not set to 3000

### Socket.io Not Connecting

**Check:**
1. Render supports WebSockets on free tier ✅
2. Make sure NEXTAUTH_URL is correct
3. Check browser console for errors

---

## Monitoring

### View Logs
```
Render Dashboard → Your Service → Logs tab
```

### Check Status
```
Render Dashboard → Your Service → Metrics tab
```

### Auto-Deploy
Every push to `main` branch will automatically deploy!

---

## Upgrade Options (Optional)

| Plan | Price | Benefits |
|------|-------|----------|
| **Free** | $0 | Basic features, sleeps |
| **Starter** | $7/mo | No sleep, more RAM |
| **Standard** | $25/mo | Production ready |

---

## Your Render URL

After deployment, your app will be at:
```
https://your-app-name.onrender.com
```

Example: `https://my-todo-app.onrender.com`

---

## Need Help?

1. Check Render logs
2. Review `DEPLOYMENT_GUIDE.md`
3. Check browser console (F12)

**Good luck!** 🎉
