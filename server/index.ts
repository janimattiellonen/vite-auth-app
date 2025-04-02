import express from 'express';
import cors from 'cors';
import https from 'https';
import { fileURLToPath } from 'url';
import path from 'path';
import selfsigned from 'selfsigned';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { ManagementClient } from 'auth0';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const prisma = new PrismaClient();
const port = 3001;

// Initialize Auth0 Management API client
const auth0Management = new ManagementClient({
  domain: process.env.AUTH0_MGMT_DOMAIN!,
  clientId: process.env.AUTH0_MGMT_CLIENT_ID!,
  clientSecret: process.env.AUTH0_MGMT_CLIENT_SECRET!,
  audience: process.env.AUTH0_MGMT_AUDIENCE,
});

app.use(cors());
app.use(express.json());

// Basic test route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Registration validation schema
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  username: z.string().min(3),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

// Registration endpoint
app.post('/api/auth/register', async (req, res) => {
  try {
    const data = registerSchema.parse(req.body);
    
    // Check if user already exists in local database
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email: data.email },
          { username: data.username }
        ]
      },
      select: {
        id: true,
        email: true,
        username: true
      }
    });

    if (existingUser) {
      return res.status(400).json({
        message: 'User with this email or username already exists'
      });
    }

    // Create user in Auth0
    const auth0User = await auth0Management.users.create({
      connection: 'Username-Password-Authentication',
      email: data.email,
      password: data.password,
      username: data.username,
      given_name: data.firstName,
      family_name: data.lastName,
      name: `${data.firstName || ''} ${data.lastName || ''}`.trim() || data.username,
      verify_email: true
    });

    // Create user in local database
    const user = await prisma.user.create({
      data: {
        email: data.email,
        username: data.username,
        auth0Id: auth0User.user_id,
        profile: {
          create: {
            firstName: data.firstName,
            lastName: data.lastName
          }
        }
      }
    });

    res.status(201).json({
      message: 'User registered successfully',
      userId: user.id
    });
  } catch (error) {
    console.error('Registration error:', error);
    
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: 'Validation error',
        errors: error.errors
      });
    }

    // Handle Auth0 API errors
    if (error.statusCode === 409) {
      return res.status(409).json({
        message: 'User already exists in Auth0'
      });
    }
    
    res.status(500).json({
      message: 'Registration failed'
    });
  }
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