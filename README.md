

# BlogSphere Documentation


## Project Overview

**BlogSphere** is a modern, full-stack blogging platform built with Next.js 15, featuring user authentication, blog creation/editing, comments, likes, and category-based filtering. It provides a seamless experience for both content creators and readers.

### Key Features
- 🔐 Google OAuth authentication (NextAuth.js v5)
- ✍️ Rich markdown blog editor
- 💬 Real-time comments system
- ❤️ Like/unlike functionality
- 🏷️ Category-based filtering
- 🔍 Full-text search
- 📱 Responsive design
- 🎨 Dark mode support
- 👤 User profiles and dashboards

---





### Design Patterns
- **Server-First**: Utilizes Next.js Server Components for optimal performance
- **API Route Handlers**: RESTful API structure using Next.js 15 App Router
- **Type Safety**: Full TypeScript implementation with Zod validation
- **State Management**: Zustand for client-side state + React Context
- **Authentication**: NextAuth.js v5 with session-based auth

---

## Tech Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **React 19**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS 4**: Utility-first styling
- **Lucide React**: Icon library
- **MDEditor**: Markdown editor for blog content

### Backend
- **Next.js API Routes**: Serverless functions
- **Drizzle ORM**: Type-safe database toolkit
- **PostgreSQL**: Primary database (hosted on Neon)
- **NextAuth.js v5**: Authentication

### Developer Tools
- **Drizzle Kit**: Database migrations
- **ESLint**: Code linting
- **Zod**: Schema validation

---

## Database Schema

### Tables Overview

#### 1. **users**
Stores user account information.

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  image VARCHAR(500),
  created_at TIMESTAMP DEFAULT now() NOT NULL
);
```

**Relationships:**
- One-to-Many with `blogs` (author)
- One-to-Many with `comments`
- One-to-Many with `likes`

#### 2. **blogs**
Stores blog posts.

```sql
CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  author_id UUID REFERENCES users(id) ON DELETE CASCADE,
  category VARCHAR(100),
  title VARCHAR(500) NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  url TEXT,
  url_to_image TEXT,
  source JSONB,
  created_at TIMESTAMP DEFAULT now() NOT NULL
);
```

**Fields:**
- `author_id`: Foreign key to users
- `category`: Blog category 
- `source`: JSON object with `{id, name}` for attribution
- `url_to_image`: Featured image URL

#### 3. **comments**
Stores user comments on blogs.

```sql
CREATE TABLE comments (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  blog_id INTEGER REFERENCES blogs(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT now() NOT NULL
);
```

#### 4. **likes**
Tracks blog likes by users.

```sql
CREATE TABLE likes (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  blog_id INTEGER REFERENCES blogs(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT now() NOT NULL
);
```



## Project Structure

### Directory Layout

```
blog-website/
├── app/                      # Next.js App Router
│   ├── api/                  # API routes
│   │   ├── auth/            # Authentication
│   │   ├── blogs/           # Blog listing
│   │   ├── blog/[id]/       # Single blog
│   │   ├── comments/        # Comments CRUD
│   │   ├── create-blog/     # Blog creation
│   │   ├── edit-blog/[id]/  # Blog editing
│   │   ├── likes/           # Like functionality
│   │   ├── login/           # Custom login
│   │   ├── profile/         # User profile
│   │   ├── query-blog/      # Search
│   │   └── user-blogs/      # User's blogs
│   │
│   ├── about/               # About page
│   ├── blog/[id]/           # Blog detail page
│   ├── contact/             # Contact page
│   ├── create-blog/         # Blog creation UI
│   ├── dashboard/           # User dashboard
│   ├── edit-blog/[id]/      # Blog editing UI
│   ├── get-started/         # OAuth signup
│   ├── login/               # Login page
│   ├── privacy-policy/      # Privacy policy
│   ├── profile/             # Profile page
│   ├── query-blog/          # Search results
│   ├── terms/               # Terms of service
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Homepage
│   └── globals.css          # Global styles
│
├── components/              # Reusable components
│   ├── blogcard.tsx         # Blog card
│   ├── comments.tsx         # Comments section
│   ├── footer.tsx           # Footer
│   ├── header.tsx           # Navigation header
│   ├── hero-section.tsx     # Hero banner
│   ├── pagination.tsx       # Pagination
│   ├── signout-button.tsx   # Sign out
│   └── UserProvider.tsx     # User context
│
├── db/                      # Database layer
│   ├── client.ts            # Database connection
│   └── schema/              # Table schemas
│       ├── blog.ts
│       ├── comments.ts
│       ├── likes.ts
│       ├── users.ts
│       └── index.ts
│
├── drizzle/                 # Migrations
│   ├── meta/                # Migration metadata
│   └── *.sql                # SQL migration files
│
├── lib/                     # Utilities
│   └── validation/          # Zod schemas
│       ├── blog.ts
│       └── user.ts
│
├── services/                # Business logic
│   ├── constants.ts         # App constants
│   ├── get-current-user.tsx # Get logged-in user
│   └── jwt.ts               # JWT utilities
│
├── store/                   # State management
│   └── useUserStore.ts      # User Zustand store
│
├── auth.ts                  # NextAuth config
├── drizzle.config.ts        # Drizzle config
├── middleware.ts            # Auth middleware
├── next.config.ts           # Next.js config
└── package.json             # Dependencies
```

---

## Authentication System

### Authentication Flow

```
User clicks "Sign in with Google"
           ↓
NextAuth redirects to Google OAuth
           ↓
User authorizes application
           ↓
Google redirects back with token
           ↓
NextAuth creates session
           ↓
User data saved to database
           ↓
Session stored in cookie
```

### Implementation Details

#### 1. **NextAuth Configuration** (`auth.ts`)
```typescript
import NextAuth from "next-auth"
import Google from "next-auth/providers/google"


#### 2. **API Route Handler** (`app/api/auth/[...nextauth]/route.ts`)
```typescript
import { handlers } from "@/auth" 
export const { GET, POST } = handlers
```

#### 3. **Middleware Protection** (`middleware.ts`)
```typescript
export { auth as middleware } from "@/auth"
```

### User Session Management

**Server-side (Server Components):**
```typescript
import { auth } from "@/auth"

const session = await auth()
const user = session?.user
```

**Client-side (Client Components):**
```typescript
import { useSession } from "next-auth/react"

const { data: session } = useSession()
const user = session?.user
```

### Custom JWT Authentication

For custom login (email-based):

```typescript
// Generate token
import { generateToken } from "@/services/jwt"
const token = generateToken(user.email)

// Verify token
import { verifyToken } from "@/services/jwt"
const decoded = verifyToken(token)
```

---

## API Routes

### Authentication

#### `POST /api/login`
Email-based login with JWT.

**Request:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "User Name",
    "email": "user@example.com"
  }
}
```

#### `POST /api/create-user`
Create new user account.

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "image": "https://example.com/avatar.jpg"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User created"
}
```

### Blogs

#### `GET /api/blogs?category={category}`
Fetch all blogs with optional category filter.

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Blog Title",
      "description": "Short description",
      "content": "Full content...",
      "category": "Technology",
      "urlToImage": "https://...",
      "source": { "id": null, "name": "Author" },
      "createdAt": "2025-01-01T00:00:00Z"
    }
  ]
}
```

#### `GET /api/blog/{id}`
Fetch single blog by ID.

#### `POST /api/create-blog`
Create new blog (authenticated).

**Request:**
```json
{
  "title": "My Blog Post",
  "description": "Brief overview",
  "content": "Full markdown content",
  "category": "Technology",
  "urlToImage": "https://...",
  "source": {
    "id": null,
    "name": "BlogSphere"
  }
}
```

#### `PUT /api/edit-blog/{id}`
Update existing blog.

#### `DELETE /api/blog/{id}`
Delete blog by ID.

#### `GET /api/user-blogs`
Get current user's blogs.

#### `GET /api/query-blog?query={search_term}`
Search blogs by title/content.

### Comments

#### `POST /api/comments`
Add comment to blog.

**Request:**
```json
{
  "blogId": 123,
  "userId": "uuid",
  "content": "Great article!"
}
```

#### `GET /api/comments?blogId={id}`
Get all comments for a blog.

### Likes

#### `POST /api/likes`
Toggle like on blog.

**Request:**
```json
{
  "blogId": 123,
  "userId": "uuid"
}
```

**Response:**
```json
{
  "success": true,
  "liked": true
}
```

### Profile

#### `GET /api/profile`
Get current user's profile and stats.

**Response:**
```json
{
  "success": true,
  "user": {
    "id": "uuid",
    "name": "User Name",
    "email": "user@example.com",
    "image": "https://...",
    "createdAt": "2025-01-01T00:00:00Z"
  },
  "totalBlogs": 5
}
```

---

## Features

### 1. Blog Management

#### Creating a Blog
1. Navigate to `/create-blog`
2. Fill in:
   - Title (required)
   - Description (optional)
   - Category (required from dropdown)
   - Featured Image URL (optional)
   - Content (Markdown editor with preview)
   - Source Name (optional)
3. Click "Create Post"

#### Editing a Blog
1. Go to Dashboard → Click "Edit" on blog card
2. Modify fields
3. Click "Save Changes"

#### Deleting a Blog
1. Dashboard → Click "Delete"
2. Confirm deletion

### 2. Comments System

**Features:**
- Real-time comments display
- User authentication required
- Linked to user profile
- Ordered by newest first

**Implementation:**
```typescript
// Fetch comments
const res = await fetch(`/api/comments?blogId=${blogId}`)

// Post comment
await fetch('/api/comments', {
  method: 'POST',
  body: JSON.stringify({
    blogId,
    userId,
    content
  })
})
```



### 3. User Dashboard

Displays:
- Total blogs created
- All user's blogs in grid layout
- Quick actions: View, Edit, Delete
- Profile completion status

---

## Environment Setup

### Prerequisites
- Node.js 18+ 
- PostgreSQL database (Neon recommended)
- Google OAuth credentials

### 1. Clone Repository
```bash
git clone https://github.com/yourusername/blogsphere.git
cd blogsphere
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables

Create `.env.local`:

```env
# Database
DATABASE_URL=postgresql://user:password@host/database?sslmode=require

# Authentication
AUTH_SECRET=your-secret-key-here  # Generate: openssl rand -base64 32
AUTH_GOOGLE_ID=your-google-client-id
AUTH_GOOGLE_SECRET=your-google-client-secret

# JWT
JWT_SECRET=your-jwt-secret  # Generate: openssl rand -base64 32

# App URL
NEXT_PUBLIC_BASE_URL=https://blogsphere-w9nq.vercel.app/
```

### 4. Database Setup

**Push schema to database:**
```bash
npm run db:push
```

**Generate migrations:**
```bash
npm run db:generate
```

### 5. Run Development Server
```bash
npm run dev
```

Visit `http://localhost:3000`

---

## Deployment Guide

### Vercel Deployment

#### 1. **Prepare Repository**
- Push code to GitHub
- Ensure `.env.local` is in `.gitignore`

#### 2. **Deploy to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure environment variables:
   - `DATABASE_URL`
   - `AUTH_SECRET`
   - `AUTH_GOOGLE_ID`
   - `AUTH_GOOGLE_SECRET`
   - `JWT_SECRET`
   - `NEXT_PUBLIC_BASE_URL` (your Vercel URL)

#### 3. **Update OAuth Callback**
In Google Cloud Console:
- Authorized redirect URIs: `https://your-app.vercel.app/api/auth/callback/google`

#### 4. **Deploy**
Click "Deploy" - Vercel handles the build automatically

---

## Troubleshooting

### Common Issues

#### 1. **"MissingSecret" Error**
**Cause:** `AUTH_SECRET` not set in Vercel

**Solution:**
```bash
# Generate secret
openssl rand -base64 32

# Add to Vercel:
Settings → Environment Variables → AUTH_SECRET
```

#### 2. **Database Connection Failed**
**Cause:** Wrong `DATABASE_URL` or firewall

**Solution:**
- Verify connection string in Neon dashboard
- Whitelist IP: `0.0.0.0/0` (allow all)
- Check SSL mode: `?sslmode=require`

#### 3. **"Table does not exist"**
**Cause:** Migrations not applied

**Solution:**
```bash
npm run db:push
```

#### 4. **401 Unauthorized on API Routes**
**Cause:** Not logged in or session expired

**Solution:**
- Log in via `/get-started`
- Check `auth()` middleware

#### 5. **Images Not Loading**
**Cause:** Domain not whitelisted

**Solution:**
Add to `next.config.ts`:
```typescript
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "**",
    },
  ],
}
```

---

## Development Guidelines

### Code Style
- Use TypeScript for all files
- Follow ESLint rules
- Use server components by default
- Add `"use client"` only when needed

### Database Queries
```typescript
// ✅ Good: Use Drizzle query builder
const blogs = await db.query.blogs.findMany({
  where: eq(blogs.category, 'Technology')
})

// ❌ Avoid: Raw SQL unless necessary
```

### Error Handling
```typescript
try {
  const data = await fetchData()
  return NextResponse.json({ success: true, data })
} catch (error) {
  console.error("Error:", error)
  return NextResponse.json(
    { success: false, message: "Server error" },
    { status: 500 }
  )
}
```

### Type Safety
Always use Zod for validation:
```typescript
import { z } from "zod"

const schema = z.object({
  email: z.string().email(),
  name: z.string().min(1)
})

const result = schema.safeParse(body)
if (!result.success) {
  return NextResponse.json({ errors: result.error })
}
```

---

## Performance Optimization

### Implemented Optimizations

1. **Server-Side Rendering (SSR)**: Blog pages pre-rendered
2. **Image Optimization**: Next.js `<Image>` component
3. **Database Indexing**: Primary keys and foreign keys indexed
4. **Connection Pooling**: PostgreSQL pool in `db/client.ts`
5. **Lazy Loading**: Pagination (15 blogs per page)

### Recommended Improvements

- Implement Redis caching for popular blogs
- Add CDN for images
- Enable incremental static regeneration (ISR)
- Implement optimistic UI updates
- Add database query result caching

---

## Security Considerations

### Implemented Security

1. **SQL Injection Prevention**: Drizzle ORM with parameterized queries
2. **XSS Protection**: React auto-escaping
3. **CSRF Protection**: NextAuth.js built-in
4. **Authentication**: OAuth 2.0 + JWT
5. **Input Validation**: Zod schemas
6. **Secure Cookies**: HTTPOnly, Secure flags

### Security Checklist

- ✅ Environment variables secured
- ✅ Authentication on protected routes
- ✅ Input sanitization (Zod)
- ✅ SQL injection protected (Drizzle)
- ✅ Proper CORS configuration
- ⚠️ Rate limiting (TODO)
- ⚠️ Content Security Policy (TODO)

---

## API Testing

### Example cURL Commands

**Get all blogs:**
```bash
curl https://your-app.vercel.app/api/blogs
```

**Create blog (requires auth):**
```bash
curl -X POST https://your-app.vercel.app/api/create-blog \
  -H "Content-Type: application/json" \
  -H "Cookie: authjs.session-token=YOUR_TOKEN" \
  -d '{
    "title": "Test Blog",
    "content": "Content here",
    "category": "Technology"
  }'
```

**Search blogs:**
```bash
curl "https://your-app.vercel.app/api/query-blog?query=nextjs"
```

---

## Future Enhancements

### Planned Features

1. **Rich Text Editor**: Replace Markdown with WYSIWYG
2. **Image Upload**: Direct file uploads (not just URLs)
3. **Bookmarks**: Save favorite blogs
4. **Notifications**: Email/push for comments
5. **Social Sharing**: Share to Twitter, Facebook
6. **Analytics Dashboard**: View statistics, engagement
7. **Draft Mode**: Save unpublished drafts
8. **Tags System**: Multi-tag support for blogs
9. **User Roles**: Admin, Editor, Reader
10. **Comment Replies**: Nested comment threads

---

