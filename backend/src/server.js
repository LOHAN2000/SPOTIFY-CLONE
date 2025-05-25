import path from 'path'
import express from 'express';
import { clerkMiddleware } from '@clerk/express'
import { createServer } from 'http';
import cors from 'cors'
import fileUpload from 'express-fileupload'
import cron from 'node-cron'
import fs from 'fs'
import dotenv from 'dotenv'

import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import adminRoutes from './routes/admin.routes.js'
import songsRoutes from './routes/song.routes.js'
import albumRoutes from './routes/album.routes.js'
import statsRoutes from './routes/stats.routes.js'
import playlistRoutes from './routes/playlist.routes.js'
import { initializeSocket } from './lib/socket.js';

dotenv.config() 


const app = express();
const PORT = process.env.PORT_SERVER;
const __dirname = path.resolve();

const httpServer = createServer(app);
initializeSocket(httpServer);

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: "30mb" }));  
app.use(express.urlencoded({ extended: true, limit: "30mb" }));

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: path.join(__dirname, 'tmp'),
  createParentPath: true,
  limits: {
    fileSize: 30 * 1024 * 1024 // 30MB
  },
  abortOnLimit: true // Devuelve error si se excede el límite
}));

const tempDir = path.join(process.cwd(), 'tmp')

cron.schedule('0 * * * *', () => {
  if (fs.existsSync(tempDir)) {
    fs.readdir(tempDir, (err, files) => {
      if (err) {
        console.log('error', err);
        return;
      }
      for (const file of files) {
        fs.unlink(path.join(tempDir, file), (err) = {})
      }
    })
  }
})



app.use(clerkMiddleware()); 

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/songs', songsRoutes);
app.use('/api/album', albumRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/playlist', playlistRoutes)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/dist')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../../frontend/dist/index.html'))
  })
}

app.use((err, req, res, next) => {
  res.status(500).json({ message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message})
})


app.use((req, res, next) => {
  res.status(404).json({message: 'Endpoint not found'})
})

app.get('/', (req, res) => {
  res.send('Server is already')
})

httpServer.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})