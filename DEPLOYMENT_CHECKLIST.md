# ✅ Deployment Checklist

## Pre-Deployment

- [x] MongoDB connection string configured
- [x] NEXTAUTH_SECRET generated
- [x] `.env.production` created
- [x] `render.yaml` configured
- [x] `.gitignore` updated

---

## Deploy to Render (FREE)

### Quick Steps:

1. **Go to Render**: https://render.com
2. **Sign up** with GitHub
3. **Click "New +"** → **"Web Service"**
4. **Connect your repository**
5. **Configure:**
   - Name: `my-todo-app`
   - Build: `npm install && npm run build`
   - Start: `node server.js`
   - Instance: **Free**
6. **Add Environment Variables:**
   ```
   MONGODB_URI=mongodb+srv://bks03011997_db_user:advanced_todo@54321@cluster0.ot7kqxd.mongodb.net/myapp?retryWrites=true&w=majority
   NEXTAUTH_SECRET=K1ndCX5bf1U0aTpsHAGkMjI8Y1CiXD8qPiTJFdO/Jyk=
   NODE_ENV=production
   PORT=3000
   ```
7. **Click "Create Web Service"**

---

## Post-Deployment

### Update URLs (IMPORTANT!)

After deployment completes:

1. Copy your Render URL (e.g., `https://my-todo-app.onrender.com`)
2. Go to Render Dashboard → Your Service → Environment
3. Add/Update:
   ```
   NEXTAUTH_URL=https://YOUR-URL.onrender.com
   NEXT_PUBLIC_APP_URL=https://YOUR-URL.onrender.com
   ```
4. Save changes (auto-redeploy)

### MongoDB Atlas Configuration

1. Go to https://cloud.mongodb.com
2. **Network Access** → **Add IP Address**
3. **Allow Access from Anywhere** (0.0.0.0/0)
4. Confirm

---

## Test Your App

- [ ] Open your Render URL
- [ ] Register a new account
- [ ] Create a todo
- [ ] Mark todo as complete
- [ ] Delete a todo
- [ ] Click chat icon (💬)
- [ ] Create a conversation
- [ ] Send a message
- [ ] Test real-time (open 2 browsers)

---

## Your Configuration

### MongoDB URI:
```
mongodb+srv://bks03011997_db_user:advanced_todo@54321@cluster0.ot7kqxd.mongodb.net/myapp?retryWrites=true&w=majority
```

### NEXTAUTH_SECRET:
```
K1ndCX5bf1U0aTpsHAGkMjI8Y1CiXD8qPiTJFdO/Jyk=
```

---

## Files Ready for Deployment

| File | Status |
|------|--------|
| `render.yaml` | ✅ Configured |
| `.env.production` | ✅ Created |
| `Dockerfile` | ✅ Ready |
| `docker-compose.yml` | ✅ Ready |
| `next.config.mjs` | ✅ Updated |
| `package.json` | ✅ Ready |
| `server.js` | ✅ Ready |

---

## Free Tier Info

**Render Free Tier:**
- ✅ 512 MB RAM
- ✅ Shared CPU
- ✅ 100 GB bandwidth/month
- ⚠️ Service sleeps after 15 min inactivity
- ⚠️ First request after sleep takes ~30 seconds

---

## Troubleshooting

### Build Failed
- Check Node version (should be 20+)
- Check logs in Render dashboard

### App Won't Start
- Check environment variables
- Verify MongoDB connection string
- Check logs for errors

### Socket.io Not Connecting
- Render supports WebSockets ✅
- Check browser console (F12)
- Verify NEXTAUTH_URL is correct

### MongoDB Connection Error
- Check Network Access in MongoDB Atlas
- Verify username/password in connection string

---

## Need Help?

1. **Check Logs:** Render Dashboard → Logs tab
2. **Browser Console:** Press F12 → Console tab
3. **Documentation:** See `DEPLOY_TO_RENDER.md`

---

## Next Steps After Deployment

1. **Get a Custom Domain** (optional)
   - Buy domain from Namecheap/GoDaddy
   - Configure in Render dashboard

2. **Upgrade to Paid Plan** (optional)
   - $7/month - No sleep, more RAM
   - Better for production use

3. **Set up Monitoring**
   - Use Render's built-in metrics
   - Consider UptimeRobot for monitoring

---

**Ready to deploy? Follow `DEPLOY_TO_RENDER.md` for detailed steps!** 🚀
