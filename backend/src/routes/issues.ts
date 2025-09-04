
import express from 'express';
import multer from 'multer';
import sharp from 'sharp';
import { body, validationResult } from 'express-validator';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs/promises';
import path from 'path';

const router = express.Router();

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// Mock database (replace with actual database)
let issues: any[] = [
  {
    id: '1',
    description: 'Large pothole on MG Road causing traffic issues',
    severity: 'urgent',
    location