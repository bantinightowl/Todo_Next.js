# 🚨 How to Debug Internal Server Error on Render

## Step 1: Check Render Logs (MOST IMPORTANT!)

1. Go to: **https://dashboard.render.com**
2. Click your service: **todo-next-js**
3. Click **"Logs"** tab
4. Look for **RED error messages**

### What to look for:

```
Error: MongoDB connection failed
Error: NEXTAUTH_SECRET is required
Error: Cannot find module
Error: Authentication failed
```

**Copy the exact error message and share it!**

---

## Step 2: Test Health Endpoint

Open these URLs in your browser:

### 1. Health Check API
```
https://todo-next-js.onrender.com/api/health
```

This will show:
- ✓ Environment variables status
- ✓ MongoDB connection status
- ✓ Exact error messages

### 2. Health Check Page
```
https://todo-next-js.onrender.com/health
```

This shows a visual dashboard of your server health.

### 3. Test Registration Page
```
https://todo-next-js.onrender.com/register
```

If this works but home page doesn't, the issue is with authentication.

---

## Step 3: Common Errors & Solutions

### Error: "MongoNetworkError: failed to connect"

**Solution:** Update MONGODB_URI with encoded password:

1. Go to Render → Environment
2. Edit MONGODB_URI:
   ```
   mongodb+srv://bks03011997_db_user:advanced_todo%4054321@cluster0.ot7kqxd.mongodb.net/myapp?retryWrites=true&w=majority
   ```
   (Notice `%40` instead of `@`)
3. Save Changes

---

### Error: "NEXTAUTH_SECRET must be at least 32 characters"

**Solution:**
1. Go to Render → Environment
2. Check NEXTAUTH_SECRET value
3. Should be: `K1ndCX5bf1U0aTpsHAGkMjI8Y1CiXD8qPiTJFdO/Jyk=`
4. If not, copy this value and save

---

### Error: "User not found" or auth errors

**Solution:** This is normal if no users exist. Go to:
```
https://todo-next-js.onrender.com/register
```
And create an account.

---

### Error: "Cannot find module 'xxx'"

**Solution:**
1. Check if all dependencies are in package.json
2. Push latest code to GitHub
3. Render will rebuild

---

## Step 4: Check Environment Variables

Go to Render Dashboard → Your Service → **Environment** tab

Verify ALL these exist:

```
✓ MONGODB_URI=mongodb+srv://bks03011997_db_user:advanced_todo%4054321@cluster0.ot7kqxd.mongodb.net/myapp?retryWrites=true&w=majority
✓ NEXTAUTH_SECRET=K1ndCX5bf1U0aTpsHAGkMjI8Y1CiXD8qPiTJFdO/Jyk=
✓ NODE_ENV=production
✓ PORT=3000
✓ NEXTAUTH_URL=https://todo-next-js.onrender.com
✓ NEXT_PUBLIC_APP_URL=https://todo-next-js.onrender.com
```

**Important:** The `@` in password MUST be `%40`!

---

## Step 5: Restart Service

Sometimes a simple restart helps:

1. Go to Render Dashboard → Your Service
2. Click **"Overview"** tab
3. Click **"Restart"** button
4. Wait 2-3 minutes
5. Refresh your site

---

## Step 6: Share the Error

If still not working, please share:

### 1. Render Logs Screenshot
- Go to Logs tab
- Screenshot the error messages
- Share here

### 2. Health Check Result
- Open: https://todo-next-js.onrender.com/api/health
- Copy the JSON response
- Share here

### 3. What You Tried
- List what you've already tried
- Any changes you made

---

## Quick Checklist:

- [ ] Checked Render Logs for errors
- [ ] Visited /api/health endpoint
- [ ] Visited /health page
- [ ] Verified MONGODB_URI has `%40` not `@`
- [ ] Verified all 6 environment variables are set
- [ ] MongoDB Atlas Network Access allows 0.0.0.0/0
- [ ] Tried restarting the service

---

## Most Likely Issues (in order):

1. **MongoDB password not encoded** (90% of cases)
   - Change `@` to `%40` in MONGODB_URI
   
2. **Missing environment variables**
   - Check all 6 variables are set correctly
   
3. **MongoDB Atlas Network Access**
   - Make sure 0.0.0.0/0 is added

4. **Build didn't complete**
   - Check Logs tab for build success

---

**First: Visit https://todo-next-js.onrender.com/api/health and share the result!**

This will tell us exactly what's wrong.
