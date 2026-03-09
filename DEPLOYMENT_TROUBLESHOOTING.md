# 🚨 Deployment Troubleshooting

## Issue: Internal Server Error on https://todo-next-js.onrender.com

### Step 1: Check Render Logs (IMPORTANT!)

1. Go to: **https://dashboard.render.com**
2. Click on your service: **todo-next-js**
3. Click **"Logs"** tab
4. Look for **ERROR** messages

Common errors and solutions:

---

### Error: "MONGODB_URI is not defined" or "MongoDB connection failed"

**Solution:**
1. Go to Render Dashboard → Your Service → **Environment** tab
2. Make sure these variables are set:
   ```
   MONGODB_URI=mongodb+srv://bks03011997_db_user:advanced_todo@54321@cluster0.ot7kqxd.mongodb.net/myapp?retryWrites=true&w=majority
   NEXTAUTH_SECRET=K1ndCX5bf1U0aTpsHAGkMjI8Y1CiXD8qPiTJFdO/Jyk=
   NODE_ENV=production
   PORT=3000
   NEXTAUTH_URL=https://todo-next-js.onrender.com
   NEXT_PUBLIC_APP_URL=https://todo-next-js.onrender.com
   ```
3. Click **"Save Changes"**
4. Service will auto-redeploy

---

### Error: "NEXTAUTH_SECRET must be at least 32 characters"

**Solution:**
Your secret is already 44 characters, so this should be fine:
```
K1ndCX5bf1U0aTpsHAGkMjI8Y1CiXD8qPiTJFdO/Jyk=
```

---

### Error: "MongoNetworkError: failed to connect"

**Solution:** MongoDB Atlas Network Access
1. Go to https://cloud.mongodb.com
2. Click **"Network Access"** (left sidebar)
3. Click **"Add IP Address"**
4. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
5. Click **"Confirm"**
6. Wait 2-3 minutes for changes to apply

---

### Error: "User not found" or authentication fails

**Solution:**
This is normal if no users exist yet. Go to:
```
https://todo-next-js.onrender.com/register
```
And create a new account.

---

### Error: "Cannot find module" or build errors

**Solution:**
Check if all files were committed:
```bash
git status
git push origin main
```

---

## Step 2: Test Specific Routes

Try these URLs:

1. **Registration:** https://todo-next-js.onrender.com/register
2. **Login:** https://todo-next-js.onrender.com/login
3. **API Health:** https://todo-next-js.onrender.com/api/auth/session

If registration/login pages work but home page doesn't:
- You need to log in first
- Or go directly to /register

---

## Step 3: Check Browser Console

1. Open your site: https://todo-next-js.onrender.com
2. Press **F12** (open Developer Tools)
3. Click **Console** tab
4. Look for errors
5. Share the error message here

---

## Step 4: Common Solutions

### Solution 1: Redeploy with Correct Env Vars

In Render Dashboard:

1. Go to **Environment** tab
2. Verify ALL these variables exist:
   ```
   MONGODB_URI=mongodb+srv://bks03011997_db_user:advanced_todo@54321@cluster0.ot7kqxd.mongodb.net/myapp?retryWrites=true&w=majority
   NEXTAUTH_SECRET=K1ndCX5bf1U0aTpsHAGkMjI8Y1CiXD8qPiTJFdO/Jyk=
   NODE_ENV=production
   PORT=3000
   NEXTAUTH_URL=https://todo-next-js.onrender.com
   NEXT_PUBLIC_APP_URL=https://todo-next-js.onrender.com
   ```
3. Click **"Save Changes"**
4. Go to **Logs** tab and watch redeploy

---

### Solution 2: Check MongoDB Connection

Test your MongoDB connection string:

1. Go to https://robomongo.org/download (download MongoDB Compass)
2. Connect using your connection string
3. If it connects, MongoDB is working
4. If not, check:
   - Username/password are correct
   - Network Access allows 0.0.0.0/0
   - Cluster is running

---

### Solution 3: Manual Restart

In Render Dashboard:
1. Go to **Overview** tab
2. Click **"Restart"** button
3. Wait 1-2 minutes
4. Refresh your site

---

## Step 5: Share Render Logs

If still failing, please share the **exact error** from Render logs:

1. Go to Render Dashboard → Your Service → **Logs**
2. Scroll to see **red error messages**
3. Copy the error
4. Share it here

---

## Quick Checklist:

- [ ] Render build completed successfully ✅
- [ ] Environment variables set in Render dashboard
- [ ] MongoDB Atlas Network Access allows 0.0.0.0/0
- [ ] NEXTAUTH_URL matches your Render URL
- [ ] Checked Render logs for errors

---

## Most Likely Issue:

**Missing environment variables in Render dashboard!**

The `.env.production` file is NOT automatically used by Render. You must manually add them:

### Go to Render Dashboard → Environment → Add These:

```
MONGODB_URI=mongodb+srv://bks03011997_db_user:advanced_todo@54321@cluster0.ot7kqxd.mongodb.net/myapp?retryWrites=true&w=majority
NEXTAUTH_SECRET=K1ndCX5bf1U0aTpsHAGkMjI8Y1CiXD8qPiTJFdO/Jyk=
NODE_ENV=production
PORT=3000
NEXTAUTH_URL=https://todo-next-js.onrender.com
NEXT_PUBLIC_APP_URL=https://todo-next-js.onrender.com
```

After adding, the service will auto-redeploy and should work! ✅
