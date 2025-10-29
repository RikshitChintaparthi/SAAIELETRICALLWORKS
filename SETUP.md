# Admin Dashboard Backend Setup Guide

## Overview
This is a complete backend and admin dashboard system for managing website content dynamically. It includes:
- REST API endpoints for Services, Projects, Companies, and Contact Details
- JWT authentication for admin access
- MongoDB Atlas database integration
- Image upload functionality
- Drag-and-drop reordering
- Full CRUD operations

## Prerequisites
- Node.js 18+
- MongoDB Atlas account (free tier available)
- Vercel account (for deployment)

## Installation

### 1. Clone and Install Dependencies
\`\`\`bash
npm install
# or
yarn install
\`\`\`

### 2. Set Up MongoDB Atlas
1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster
4. Get your connection string 

### 3. Environment Variables
Create a `.env.local` file in the root directory:

\`\`\`env
# MongoDB Connection
MONGODB_URI

# JWT Secret (change this to a secure random string)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Admin Password (change this to a secure password)
ADMIN_PASSWORD=admin123
\`\`\`

### 4. Start the Development Server
```bash
npm run dev
```

The server will start at http://localhost:3000

### 5. Populate Initial Data
1. Navigate to http://localhost:3000/admin
2. Login with the default password: `admin123`
3. Click on the "Populate Initial Data" button in the Dashboard
4. This will populate the database with initial services, projects, companies, and contact details from your website

### 6. Deploy to Vercel
1. Push your code to GitHub
2. Go to https://vercel.com
3. Import your repository
4. Add the environment variables in the Vercel dashboard
5. Deploy

## API Endpoints

### Authentication
- **POST** `/api/auth/login` - Login with password
  - Body: `{ "password": "admin123" }`
  - Returns: `{ "token": "jwt-token" }`

### Services
- **GET** `/api/services` - Get all published services
- **POST** `/api/services` - Create new service (requires auth)
- **GET** `/api/services/[id]` - Get specific service
- **PUT** `/api/services/[id]` - Update service (requires auth)
- **DELETE** `/api/services/[id]` - Delete service (requires auth)

### Projects
- **GET** `/api/projects` - Get all published projects
- **POST** `/api/projects` - Create new project (requires auth)
- **GET** `/api/projects/[id]` - Get specific project
- **PUT** `/api/projects/[id]` - Update project (requires auth)
- **DELETE** `/api/projects/[id]` - Delete project (requires auth)

### Companies
- **GET** `/api/companies` - Get all companies
- **POST** `/api/companies` - Create new company (requires auth)
- **GET** `/api/companies/[id]` - Get specific company
- **PUT** `/api/companies/[id]` - Update company (requires auth)
- **DELETE** `/api/companies/[id]` - Delete company (requires auth)

### Contact
- **GET** `/api/contact` - Get contact details
- **PUT** `/api/contact` - Update contact details (requires auth)

### Reordering
- **POST** `/api/reorder/[collection]` - Reorder items in a collection (requires auth)

### Content
- **GET** `/api/all-content` - Get all published content (public endpoint)

## Admin Dashboard

Access the admin dashboard at `/admin`

### Features
1. **Services Tab**
   - Add, edit, delete services
   - Manage pricing, descriptions, icons, and images
   - Publish/unpublish services
   - Drag-and-drop reordering

2. **Projects Tab**
   - Add, edit, delete projects
   - Manage project status (planned, in-progress, completed)
   - Add process steps
   - Link to companies
   - Publish/unpublish projects
   - Drag-and-drop reordering

3. **Companies Tab**
   - Add, edit, delete companies
   - Manage company information and logos
   - Link projects to companies
   - Drag-and-drop reordering

4. **Contact Tab**
   - Update company contact information
   - Manage social media links
   - Add map embed URL

## Image Upload

Images are currently stored as base64 data URLs in the database. For production, you should:

1. Set up Google Drive API integration
2. Or use a cloud storage service like AWS S3, Cloudinary, or Vercel Blob
3. Update the `/api/upload` endpoint to use your chosen service

## Security Considerations

1. **Change the default admin password** in environment variables
2. **Use a strong JWT secret** - generate a random string
3. **Enable HTTPS** - Vercel does this automatically
4. **Implement rate limiting** on the login endpoint
5. **Use environment variables** for all sensitive data
6. **Never commit `.env.local`** to version control

## Frontend Integration

To fetch content from the API in your frontend:

\`\`\`typescript
// Get all published content
const response = await fetch('/api/all-content');
const { services, projects, companies, contact } = await response.json();

// Get specific content with authentication
const token = localStorage.getItem('adminToken');
const response = await fetch('/api/services', {
  headers: { Authorization: `Bearer ${token}` }
});
\`\`\`

## Troubleshooting

### MongoDB Connection Error
- Check your connection string in `.env.local`
- Ensure your IP is whitelisted in MongoDB Atlas
- Verify the database name matches

### Login Not Working
- Check that `ADMIN_PASSWORD` is set in environment variables
- Verify the password is correct
- Check browser console for error messages

### Images Not Uploading
- Check file size limits
- Verify the file is a valid image format
- Check browser console for error messages

## Support
For issues or questions, check the API endpoints documentation or review the code comments.
