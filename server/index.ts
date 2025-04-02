import express from 'express';
import cors from 'cors';
import https from 'https';
import { fileURLToPath } from 'url';
import path from 'path';
import selfsigned from 'selfsigned';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Basic test route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Generate self-signed certificate
const attrs = [{ name: 'commonName', value: 'localhost' }];
const pems = selfsigned.generate(attrs, {
  algorithm: 'sha256',
  days: 30,
  keySize: 2048,
  extensions: [{ name: 'subjectAltName', altNames: [{ type: 2, value: 'localhost' }] }]
});

const options = {
  key: pems.private,
  cert: pems.cert
};

https.createServer(options, app).listen(port, () => {
  console.log(`Server running on https://localhost:${port}`);
});