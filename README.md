
```
📦 blog-website
├── 📁 app                              # Next.js App Router directory
│   ├── globals.css                     # Global CSS styles
│   ├── layout.tsx                      # Root layout component
│   ├── loading.tsx                     # Loading UI component
│   ├── not-found.tsx                   # 404 page
│   ├── page.tsx                        # Homepage
│   │
│   ├── 📁 about                        # About page
│   │   └── page.tsx
│   │
│   ├── 📁 api                          # API Routes
│   │   ├── 📁 auth
│   │   │   └── [...nextauth]          # NextAuth.js configuration
│   │   │       └── route.ts
│   │   ├── 📁 blog
│   │   │   └── [id]                   # Dynamic blog route
│   │   │       └── route.ts
│   │   ├── 📁 blogs                    # Blogs listing API
│   │   │   └── route.ts
│   │   ├── 📁 comments                 # Comments API
│   │   │   └── route.ts
│   │   ├── 📁 create-blog              # Blog creation API
│   │   │   └── route.ts
│   │   ├── 📁 create-user              # User creation API
│   │   │   └── route.ts
│   │   ├── 📁 edit-blog               # Blog editing API
│   │   │   └── [id]
│   │   │       └── route.ts
│   │   ├── 📁 likes                    # Blog likes API
│   │   │   └── route.ts
│   │   ├── 📁 login                    # Login API
│   │   │   └── route.ts
│   │   ├── 📁 profile                  # Profile API
│   │   │   └── route.ts
│   │   ├── 📁 query-blog              # Blog querying API
│   │   │   └── route.ts
│   │   └── 📁 user-blogs              # User's blogs API
│   │       └── route.ts
│   │
│   ├── 📁 blog                         # Blog pages
│   │   └── [id]                       # Dynamic blog route
│   │       └── page.tsx
│   │
│   ├── 📁 contact                      # Contact page
│   │   └── page.tsx
│   │
│   ├── 📁 create-blog                  # Blog creation page
│   │   └── page.tsx
│   │
│   ├── 📁 dashboard                    # User dashboard
│   │   └── page.tsx
│   │
│   ├── 📁 edit-blog                    # Blog editing page
│   │   └── [id]
│   │       └── page.tsx
│   │
│   ├── 📁 get-started                  # Get started page
│   │   └── page.tsx
│   │
│   ├── 📁 login                        # Login page
│   │   └── page.tsx
│   │
│   ├── 📁 privacy-policy              # Privacy policy page
│   │   └── page.tsx
│   │
│   ├── 📁 profile                      # User profile page
│   │   └── page.tsx
│   │
│   ├── 📁 query-blog                   # Blog search page
│   │   └── page.tsx
│   │
│   └── 📁 terms                        # Terms of service page
│       └── page.tsx
│
├── 📁 components                       # Reusable React components
│   ├── blogcard.tsx                    # Blog card component
│   ├── comments.tsx                    # Comments component
│   ├── footer.tsx                      # Footer component
│   ├── header.tsx                      # Header component
│   ├── hero-section.tsx               # Hero section component
│   ├── pagination.tsx                  # Pagination component
│   ├── signout-button.tsx             # Sign out button component
│   └── UserProvider.tsx               # User context provider
│
├── 📁 db                               # Database configuration
│   ├── client.ts                       # Database client setup
│   └── 📁 schema                       # Database schema definitions
│       ├── blog.ts                     # Blog schema
│       ├── comments.ts                 # Comments schema
│       ├── index.ts                    # Schema exports
│       ├── likes.ts                    # Likes schema
│       └── users.ts                    # Users schema
│
├── 📁 drizzle                          # Drizzle ORM migrations
│   ├── 📁 meta                         # Migration metadata
│   │   ├── _journal.json
│   │   └── [migration snapshots].json
│   └── [migration files].sql           # SQL migration files
│
├── 📁 lib                              # Library code
│   └── 📁 validation                   # Input validation
│       ├── blog.ts                     # Blog validation
│       └── user.ts                     # User validation
│
├── 📁 public                           # Static files
│
├── 📁 services                         # Service layer
│   ├── constants.ts                    # Constants and configurations
│   ├── get-current-user.tsx           # Current user resolution
│   └── jwt.ts                         # JWT utilities
│
├── 📁 store                            # State management
│   └── useUserStore.ts                # User state store
│
├── auth.ts                             # Authentication configuration
├── drizzle.config.ts                  # Drizzle ORM configuration
├── eslint.config.mjs                  # ESLint configuration
├── middleware.ts                       # Next.js middleware
├── next-env.d.ts                      # Next.js type definitions
├── next.config.ts                     # Next.js configuration
├── package.json                       # Project dependencies
├── postcss.config.mjs                 # PostCSS configuration
├── README.md                          # Project documentation
└── tsconfig.json                      # TypeScript configuration
```

## Directory Structure Explanation

### Core Directories

- `app/`: Next.js App Router directory containing all pages and API routes
- `components/`: Reusable React components
- `db/`: Database configuration and schema definitions using Drizzle ORM
- `lib/`: Utility functions and validation logic
- `services/`: Business logic and service layer
- `store/`: State management (using custom stores)

### Key Features

1. **Authentication**
   - NextAuth.js integration (`auth.ts`, `app/api/auth/[...nextauth]`)
   - JWT handling (`services/jwt.ts`)
   - User management (`db/schema/users.ts`)

2. **Blog Features**
   - Create, edit, and view blogs
   - Comments system
   - Like functionality
   - Blog querying and filtering

3. **User Features**
   - User profiles
   - Dashboard
   - Personal blog management

4. **Database**
   - Drizzle ORM for type-safe database operations
   - Structured migrations
   - Clear schema definitions

5. **API Structure**
   - RESTful endpoints under `app/api/`
   - Clear separation of concerns
   - Route handlers for each feature

### Configuration Files

- `next.config.ts`: Next.js configuration
- `drizzle.config.ts`: Database ORM configuration
- `tsconfig.json`: TypeScript configuration
- `eslint.config.mjs`: Linting rules
- `postcss.config.mjs`: CSS processing

### Static Assets

- `public/`: Static files served by Next.js

This structure follows Next.js 15  App Router conventions with a clear separation of concerns between UI components, API routes, database operations, and business logic.