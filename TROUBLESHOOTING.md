# Troubleshooting MongoDB Connection Issues

## Common Error: `querySrv ECONNREFUSED`

If you're seeing this error, it means your MongoDB Atlas cluster is not reachable. Here are the most common causes and solutions:

### 1. **Cluster is Paused (Most Common)**

MongoDB Atlas free tier clusters automatically pause after 1 hour of inactivity.

**Solution:**
1. Go to [MongoDB Atlas Dashboard](https://cloud.mongodb.com/)
2. Navigate to your cluster
3. Click **"Resume"** or **"Resume Cluster"** button
4. Wait 1-2 minutes for the cluster to start
5. Try running your server again

### 2. **IP Address Not Whitelisted**

MongoDB Atlas blocks connections from IPs that aren't whitelisted.

**Solution:**
1. Go to MongoDB Atlas → **Network Access**
2. Click **"Add IP Address"**
3. For development, you can temporarily add `0.0.0.0/0` (allows all IPs - **NOT recommended for production**)
4. Or add your current IP address
5. Wait a few minutes for changes to propagate

### 3. **Incorrect Connection String**

Double-check your connection string format:

**Correct format:**
```
mongodb+srv://username:password@cluster-name.xxxxx.mongodb.net/database-name?options
```

**Common mistakes:**
- Missing database name (should be `/database-name` before `?`)
- Wrong username or password
- Incorrect cluster name

### 4. **Network/Firewall Issues**

Your network or firewall might be blocking MongoDB connections.

**Solution:**
- Try from a different network
- Check if your firewall allows outbound connections on port 27017
- Try using a VPN if your network blocks MongoDB Atlas

### 5. **Verify Connection String**

To get the correct connection string:
1. Go to MongoDB Atlas → **Database** → **Connect**
2. Choose **"Connect your application"**
3. Copy the connection string
4. Replace `<password>` with your actual password
5. Replace `<database>` with your database name (e.g., `property-manager`)

### Quick Test

Test your connection string directly:

```bash
# Test MongoDB connection (requires mongosh or mongo client)
mongosh "your-connection-string-here"
```

Or use a MongoDB GUI tool like:
- MongoDB Compass
- Studio 3T
- Robo 3T

## Still Having Issues?

1. Check MongoDB Atlas status page for outages
2. Verify your MongoDB Atlas account is active
3. Check MongoDB Atlas logs for more details
4. Try creating a new cluster if the current one is corrupted
