# 🔐 IMPORTANT: Generate Your NEXTAUTH_SECRET

## Option 1: Using Terminal (Linux/Mac/WSL)
```bash
openssl rand -base64 32
```

## Option 2: Using Node.js (Any OS)
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Option 3: Online Generator
Visit: https://generate-secret.vercel.app/32

---

## Your Generated Secret (Example):
```
# Run this command to generate your own:
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

---

## ⚠️ Security Warning

- NEVER commit your actual secret to GitHub
- Add `.env.production` to `.gitignore`
- Each deployment should have its own unique secret
- The secret must be at least 32 characters

---

## Copy Your Secret Here

After generating, update these files:
1. `.env.production` (for local testing)
2. Render Dashboard → Environment Variables (for deployment)

Example:
```
NEXTAUTH_SECRET=AbCdEfGhIjKlMnOpQrStUvWxYz1234567890+/=
```
