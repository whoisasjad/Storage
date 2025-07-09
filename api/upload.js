// Vercel serverless function for image upload to GitHub
const https = require('https');

async function makeRequest(url, options, data) {
  return new Promise((resolve, reject) => {
    const req = https.request(url, options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          const result = {
            ok: res.statusCode >= 200 && res.statusCode < 300,
            status: res.statusCode,
            json: () => Promise.resolve(JSON.parse(body))
          };
          resolve(result);
        } catch (error) {
          reject(error);
        }
      });
    });
    
    req.on('error', reject);
    
    if (data) {
      req.write(data);
    }
    req.end();
  });
}

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fileData, fileName, fileType } = req.body;

    if (!fileData || !fileName) {
      return res.status(400).json({ error: 'Missing file data or filename' });
    }

    // GitHub configuration
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const GITHUB_REPO = 'whoisasjad/Storage';

    if (!GITHUB_TOKEN) {
      return res.status(500).json({ error: 'GitHub token not configured' });
    }

    // Generate unique filename
    const timestamp = Date.now();
    const extension = fileName.split('.').pop();
    const uniqueFileName = `upload_${timestamp}.${extension}`;
    
    // GitHub API request
    const githubPath = `images/uploads/${uniqueFileName}`;
    const githubUrl = `https://api.github.com/repos/${GITHUB_REPO}/contents/${githubPath}`;
    
    const requestData = JSON.stringify({
      message: `Upload image: ${uniqueFileName}`,
      content: fileData, // Base64 encoded content
      branch: 'main'
    });

    const options = {
      method: 'PUT',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(requestData),
        'User-Agent': 'CloudStorage-App'
      }
    };
    
    // Upload to GitHub
    const response = await makeRequest(githubUrl, options, requestData);
    
    if (response.ok) {
      const publicUrl = `storage-kappa-ashen.vercel.app/${githubPath}`;
      return res.status(200).json({
        success: true,
        url: publicUrl,
        filename: uniqueFileName,
        message: 'Image uploaded successfully'
      });
    } else {
      const errorData = await response.json();
      return res.status(500).json({
        error: 'Failed to upload to GitHub',
        details: errorData
      });
    }
    
  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({ 
      error: 'Upload failed', 
      details: error.message 
    });
  }
}

// For CommonJS compatibility in test server
module.exports = { default: handler };

