# Setup Local MongoDB for Development

## Option 1: Install MongoDB Community Server (Windows)

### Step 1: Download MongoDB
1. Go to: https://www.mongodb.com/try/download/community
2. Select:
   - Version: Latest (7.0 or 8.0)
   - Platform: Windows
   - Package: MSI
3. Click **Download**

### Step 2: Install MongoDB
1. Run the downloaded `.msi` file
2. Choose **"Complete"** installation
3. Check **"Install MongoDB as a Service"**
4. Choose **"Run service as Network Service user"**
5. Check **"Install MongoDB Compass"** (GUI tool - optional but helpful)
6. Click **Install**

### Step 3: Verify Installation
Open PowerShell (as Administrator) and check if MongoDB service is running:

```powershell
Get-Service MongoDB
```

If it shows "Running", you're good! If not, start it:

```powershell
Start-Service MongoDB
```

### Step 4: Test MongoDB Connection
Open a new terminal and test:

```powershell
mongosh
```

If it connects, you'll see: `test>`

Type `exit` to quit.

---

## Option 2: Use Docker (Easier - Recommended)

### Prerequisites
- Install Docker Desktop: https://www.docker.com/products/docker-desktop/

### Step 1: Run MongoDB Container
Open PowerShell and run:

```powershell
docker run -d -p 27017:27017 --name mongodb -e MONGO_INITDB_DATABASE=property-manager mongo:latest
```

This will:
- Download MongoDB image (first time only)
- Start MongoDB container
- Expose port 27017
- Create database named `property-manager`

### Step 2: Verify Container is Running
```powershell
docker ps
```

You should see `mongodb` container running.

### Step 3: Stop/Start MongoDB (when needed)
```powershell
# Stop MongoDB
docker stop mongodb

# Start MongoDB
docker start mongodb

# Remove container (if you want to start fresh)
docker rm -f mongodb
```

---

## Update Your .env File

After MongoDB is running, update `backend/.env`:

```env
MONGODB_URI=mongodb://localhost:27017/property-manager
```

---

## Test Connection

Run the connection test:

```bash
cd backend
npm run test:connection
```

You should see:
```
✅ SUCCESS! MongoDB connection works!
   Host: localhost
   Database: property-manager
```

---

## Start Your Server

Once connection test passes:

```bash
npm run dev
```

---

## Troubleshooting

### MongoDB Service Not Starting (Windows)
```powershell
# Check MongoDB logs
Get-Content "C:\Program Files\MongoDB\Server\7.0\log\mongod.log" -Tail 50

# Restart MongoDB service
Restart-Service MongoDB
```

### Port 27017 Already in Use
```powershell
# Find what's using port 27017
netstat -ano | findstr :27017

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

### Docker Container Issues
```powershell
# Check container logs
docker logs mongodb

# Restart container
docker restart mongodb
```

### Connection Refused Error
- Make sure MongoDB is running (check service or container)
- Verify port 27017 is not blocked by firewall
- Try: `mongosh mongodb://localhost:27017` to test direct connection
