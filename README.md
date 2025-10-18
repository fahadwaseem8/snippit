# 📎 Snippit

> Your lightweight home for code snippets. Save, search, and copy with ease.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.6-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-Auth%20%26%20DB-green?style=flat-square&logo=supabase)](https://supabase.com/)

A modern, developer-focused code snippet manager built with Next.js 15, featuring beautiful syntax highlighting, fuzzy search, and one-click copying.

![Snippit Screenshot](https://cdn-icons-png.flaticon.com/512/10700/10700708.png)

## ✨ Features

### 🚀 Core Features
- **Save Unlimited Snippets** - Store all your favorite code snippets in one place
- **Lightning-Fast Search** - Find snippets instantly with search and language filtering
- **Beautiful Syntax Highlighting** - CodeMirror 6 integration with 13+ language support
- **One-Click Copy** - Copy snippets to clipboard with a single click
- **Favorites System** - Mark important snippets for quick access
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile

### 🎨 User Experience
- **Dark Terminal Aesthetic** - Beautiful dark theme with glassmorphism effects
- **CodeMirror Editor** - Professional code editing experience with syntax highlighting
- **Mobile-Optimized** - Dropdown menus and responsive layouts for mobile devices
- **Password Visibility Toggle** - Eye icons to show/hide passwords
- **Real-time Validation** - Instant feedback on forms

### 🔐 Authentication & Security
- **Supabase Authentication** - Secure user authentication with email/password
- **Password Reset Flow** - Email-based password recovery
- **Protected Routes** - Middleware-based route protection
- **Row-Level Security** - Database-level security policies
- **API Logging** - Request/response logging for debugging and monitoring

### 📧 Email Templates
- **Beautiful Branded Emails** - Custom HTML email templates with terminal aesthetic
- **6 Complete Templates**:
  - Signup Confirmation
  - Password Reset
  - User Invitation
  - Magic Link Login
  - Email Change Confirmation
  - Reauthentication Code

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 15.5.6](https://nextjs.org/) with App Router & Turbopack
- **UI Library**: [React 19.1.0](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Code Editor**: [@uiw/react-codemirror](https://uiwjs.github.io/react-codemirror/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)

### Backend & Database
- **Authentication**: [Supabase Auth](https://supabase.com/docs/guides/auth)
- **Database**: [PostgreSQL](https://www.postgresql.org/) via Supabase
- **API**: Next.js API Routes with middleware logging
- **Session Management**: [@supabase/ssr](https://supabase.com/docs/guides/auth/server-side/nextjs)

### CodeMirror Extensions
- JavaScript/TypeScript
- Python
- Java
- C++
- PHP
- Rust
- SQL
- HTML/CSS
- JSON
- Markdown
- XML

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ installed
- A Supabase account and project
- npm, yarn, pnpm, or bun package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/fahadwaseem8/snippit.git
cd snippit
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

4. **Run database migrations**

Execute the SQL migrations in your Supabase dashboard:
- `supabase/migrations/20250117000000_create_request_logs.sql`
- `supabase/migrations/20250117000001_create_snippets.sql`

5. **Configure email templates (optional)**

Upload the email templates from `supabase/email-templates/` to your Supabase project:
- Go to Authentication → Email Templates
- Copy and paste each template
- Update subjects and styling as needed

6. **Start the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## 📁 Project Structure

```
snippit/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/route.ts          # Login API
│   │   │   ├── register/route.ts       # Registration API
│   │   │   ├── logout/route.ts         # Logout API
│   │   │   └── reset-password/route.ts # Password reset API
│   │   └── snippets/
│   │       ├── route.ts                # List & create snippets
│   │       └── [id]/route.ts           # Update & delete snippets
│   ├── components/
│   │   ├── Header.tsx                  # Main navigation header
│   │   ├── Footer.tsx                  # Footer component
│   │   ├── SnippetCard.tsx             # Snippet display card
│   │   ├── SnippetModal.tsx            # Create/edit modal
│   │   └── CopySnippet.tsx             # Demo snippet component
│   ├── dashboard/page.tsx              # Main dashboard
│   ├── login/page.tsx                  # Login page
│   ├── register/page.tsx               # Registration page
│   ├── reset-password/page.tsx         # Password reset page
│   ├── layout.tsx                      # Root layout
│   └── page.tsx                        # Landing page
├── lib/
│   ├── constants.ts                    # Global constants (logo, app name)
│   ├── api-logger.ts                   # API logging middleware
│   ├── codemirror-theme.ts             # Custom CodeMirror theme
│   └── supabase/
│       ├── client.ts                   # Browser Supabase client
│       └── server.ts                   # Server Supabase client
├── supabase/
│   ├── migrations/                     # Database migrations
│   └── email-templates/                # Email templates
├── middleware.ts                       # Auth & logging middleware
└── next.config.ts                      # Next.js configuration
```

## 🗄️ Database Schema

### `snippets` Table
```sql
- id: UUID (Primary Key)
- title: TEXT
- language: ENUM (43+ languages)
- code: TEXT
- is_favorite: BOOLEAN
- owner_id: UUID (Foreign Key to auth.users)
- created_at: TIMESTAMP
- updated_at: TIMESTAMP (auto-updating)
```

### `request_logs` Table
```sql
- id: UUID (Primary Key)
- ip_address: TEXT
- user_agent: TEXT
- method: TEXT
- url: TEXT
- headers: JSONB
- query_params: JSONB
- body: JSONB
- response_body: JSONB
- response_status: INTEGER
- response_time: INTEGER
- created_at: TIMESTAMP
```

## 🎨 Customization

### Changing the Logo

Edit `lib/constants.ts`:
```typescript
export const LOGO_URL = "your-logo-url-here";
export const APP_NAME = "Your App Name";
```

Also update the logo in email templates (`supabase/email-templates/*.html`).

### Customizing the Theme

Edit `lib/codemirror-theme.ts` to customize the code editor appearance.

Modify `app/globals.css` for global styling.

## 🚢 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/fahadwaseem8/snippit)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy!

### Other Platforms

Snippit can be deployed to any platform that supports Next.js:
- [Netlify](https://www.netlify.com/)
- [Railway](https://railway.app/)
- [Render](https://render.com/)
- Self-hosted with Docker

## 📝 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `POST /api/auth/reset-password` - Password reset email

### Snippets
- `GET /api/snippets` - List snippets (with pagination, search, filters)
- `POST /api/snippets` - Create new snippet
- `PATCH /api/snippets/[id]` - Update snippet
- `DELETE /api/snippets/[id]` - Delete snippet

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Fahad Waseem**
- GitHub: [@fahadwaseem8](https://github.com/fahadwaseem8)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Supabase](https://supabase.com/) - Open source Firebase alternative
- [CodeMirror](https://codemirror.net/) - Versatile text editor
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Flaticon](https://www.flaticon.com/) - Logo icons

---

<p align="center">Built with ❤️ for developers, by developers</p>
<p align="center">⭐ Star this repo if you find it useful!</p>
