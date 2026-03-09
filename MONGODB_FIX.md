# 🔧 MongoDB Connection Fix

## Problem:
Your MongoDB password contains an `@` symbol: `advanced_todo@54321`

In MongoDB connection strings, the `@` symbol is special and needs to be **URL encoded**.

---

## Solution:

### Update MONGODB_URI in Render Dashboard:

**OLD (incorrect):**
```
mongodb+srv://bks03011997_db_user:advanced_todo@54321@cluster0.ot7kqxd.mongodb.net/myapp?retryWrites=true&w=majority
```

**NEW (correct - with encoded @):**
```
mongodb+srv://bks03011997_db_user:advanced_todo%4054321@cluster0.ot7kqxd.mongodb.net/myapp?retryWrites=true&w=majority
```

Notice: `@` → `%40`

---

## Steps to Fix:

### 1. Go to Render Dashboard
https://dashboard.render.com → Your Service (todo-next-js)

### 2. Edit Environment Variable
1. Click **"Environment"** tab
2. Find `MONGODB_URI`
3. Click **"Edit"**
4. Replace the value with the **NEW** one above (with `%40`)
5. Click **"Save Changes"**

### 3. Wait for Redeploy
- Render will automatically redeploy (2-3 minutes)
- Check **Logs** tab for progress

---

## Test:

After redeployment:
1. Open: https://todo-next-js.onrender.com
2. Should load without "Internal Server Error"
3. Go to `/register` to create an account

---

## Why This Happens:

MongoDB connection string format:
```
mongodb+srv://USERNAME:PASSWORD@CLUSTER/DATABASE
```

The `@` separates the password from the cluster address. If your password contains `@`, MongoDB can't tell where the password ends and the cluster begins!

**Encoding fixes this:**
- `@` becomes `%40`
- MongoDB knows the entire encoded string is the password

---

## Other Special Characters That Need Encoding:

| Character | Encoded |
|-----------|---------|
| @ | %40 |
| # | %23 |
| $ | %24 |
| % | %25 |
| & | %26 |
| = | %3D |
| + | %2B |
| / | %2F |
| ? | %3F |

---

## Verify Connection (Optional):

Test your connection string at:
https://mongoplayground.net/connection

Or use MongoDB Compass:
1. Download: https://www.mongodb.com/products/compass
2. Paste your connection string
3. Try to connect

---

**After updating the MONGODB_URI with encoded password, your app should work!** ✅
