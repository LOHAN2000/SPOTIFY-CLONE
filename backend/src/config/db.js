import { createPool } from 'mysql2/promise'
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv'
import { fileURLToPath } from 'url';

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);


export const conn = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,

  ssl: {
    // Ruta relativa dentro de tu contenedor/app en Render
    ca: fs.readFileSync(
      path.resolve(__dirname, '../../certs/isrgrootx1.pem'),
      'utf8'
    )
  }
})