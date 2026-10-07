const multer = require('multer');
const path = require('path');
const fs = require('fs');

/**
 * Enterprise Storage Service
 * Abstraction layer over Cloudflare R2 / AWS S3 for file management.
 */

// For local dev, store in /uploads until R2 is hooked up
const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer config for multipart/form-data
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
    fileFilter: (req, file, cb) => {
        // Accept only documents and images
        if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only PDF and images are allowed.'));
        }
    }
});

class StorageService {
    /**
     * Upload a file buffer to Cloudflare R2 / S3
     * @param {Buffer} fileBuffer 
     * @param {string} fileName 
     * @param {string} mimeType 
     */
    static async uploadToCloud(fileBuffer, fileName, mimeType) {
        console.log(`[StorageService] Uploading ${fileName} to Cloudflare R2...`);
        // Placeholder for AWS S3 / Cloudflare R2 Client PUT command
        // const s3Client = new S3Client({ ... });
        // await s3Client.send(new PutObjectCommand({ Bucket: 'agnex-assets', Key: fileName, Body: fileBuffer, ContentType: mimeType }));
        
        return `https://cdn.agnex.tech/assets/${fileName}`;
    }
}

module.exports = {
    StorageService,
    upload
};
