import express from 'express';
import dotenv from 'dotenv'

import userRoutes from './routes/user.routes.js'
import authRoutes from './routes/auth.routes.js'
import adminRoutes from './routes/admin.routes.js'
import songsRoutes from './routes/song.routes.js'
import albumRoutes from './routes/album.routes.js'
import statsRoutes from './routes/stats.routes.js'

dotenv.config() 


const app = express();
const PORT = process.env.PORT_SERVER;

app.use(express.json({ limit: "15mb" }));  
app.use(express.urlencoded({ extended: true, limit: "15mb" }));

app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/songs', songsRoutes)
app.use('/api/album', albumRoutes)
app.use('/api/stats', statsRoutes)


app.use((req, res, next) => {
  res.status(404).json({message: 'Endpoint not found'})
})

app.get('/', (req, res) => {
  res.send('Server is already')
})

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})