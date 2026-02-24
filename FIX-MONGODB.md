# How to Fix MongoDB Atlas Connection

## Current Error
```
querySrv ECONNREFUSED _mongodb._tcp.property-manager-cluster.ujwacqb.mongodb.net
```

This means your MongoDB Atlas cluster cannot be reached. Follow these steps:

## ✅ Step-by-Step Fix

### Option 1: Resume MongoDB Atlas Cluster (Most Common Fix)

1. **Go to MongoDB Atlas**
   - Visit: https://cloud.mongodb.com/
   - Log in with your account

2. **Find Your Cluster**
   - Look for cluster named: `property-manager-cluster`
   - Check if it shows "Paused" status

3. **Resume the Cluster**
   - Click on the cluster
   - Click the **"Resume"** or **"Resume Cluster"** button
   - Wait 1-2 minutes for it to fully start

4. **Test Again**
   ```bash
   npm run test:connection
   ```

### Option 2: Whitelist Your IP Address

1. **Go to Network Access**
   - In MongoDB Atlas dashboard
   - Click **"Network Access"** in the left sidebar

2. **Add IP Address**
   - Click **"Add IP Address"** button
   - Choose one:
     - **For Development**: Click **"Allow Access from Anywhere"** (adds `0.0.0.0/0`)
       - ⚠️ **Warning**: Only for development! Not secure for production.
     - **For Production**: Click **"Add Current IP Address"** or manually enter your IP

3. **Wait for Changes**
   - MongoDB Atlas takes 1-2 minutes to apply network changes
   - You'll see a green checkmark when it's active

4. **Test Again**
   ```bash
   npm run test:connection
   ```

### Option 3: Verify Connection String

1. **Get Fresh Connection String**
   - Go to MongoDB Atlas → **Database** → **Connect**
   - Choose **"Connect your application"**
   - Copy the connection string
   - Format: `mongodb+srv://username:password@cluster.mongodb.net/database-name?options`

2. **Update `.env` File**
   - Open `backend/.env`
   - Replace `MONGODB_URI` with the new connection string
   - Make sure it includes:
     - Username and password (replace `<password>`)
     - Database name (e.g., `/property-manager`)

3. **Test Again**
   ```bash
   npm run test:connection
   ```

## 🔄 Alternative: Use Local MongoDB (For Development)

If MongoDB Atlas keeps causing issues, use local MongoDB:

### Install MongoDB Locally

**Windows:**
1. Download MongoDB Community Server: https://www.mongodb.com/try/download/community
2. Install it (default location: `C:\Program Files\MongoDB\Server\7.0\bin`)
3. Start MongoDB service:
   ```powershell
   # Run as Administrator
   net start MongoDB
   ```

**Or use MongoDB via Docker:**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

### Update `.env` File

Change your `MONGODB_URI` in `backend/.env`:

```env
MONGODB_URI=mongodb://localhost:27017/property-manager
```

### Test Connection

```bash
npm run test:connection
```

## ✅ Success Indicators

When connection works, you'll see:
```
✅ SUCCESS! MongoDB connection works!
   Host: [cluster-name]
   Database: property-manager
```

Then start your server:
```bash
npm run dev
```

## 🆘 Still Not Working?

1. **Check MongoDB Atlas Status**
   - Visit: https://status.mongodb.com/
   - Check if there are any outages

2. **Verify Credentials**
   - Make sure username/password in connection string are correct
   - Check if database user has proper permissions

3. **Check Firewall/VPN**
   - Try disabling VPN temporarily
   - Check if corporate firewall blocks MongoDB ports

4. **Try Different Network**
   - Test from a different network (mobile hotspot, etc.)
   - This helps identify if it's a network-specific issue

5. **Contact Support**
   - MongoDB Atlas has support chat
   - Or check MongoDB Community Forums
