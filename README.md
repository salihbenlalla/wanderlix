# 🌍 Wanderlix - Travel Blog Platform  
### Built with Qwik • Cloudflare Pages • D1 Database

Wanderlix is a modern, blazing-fast travel blog platform designed to deliver rich travel guides with exceptional performance.  
It is powered by **Qwik**’s resumability, **Qwik City**, and a **Cloudflare D1 database** for dynamic content.

This project focuses on clean UI, instant loading, SEO-ready pages, and scalable architecture suitable for large travel content platforms.

---

## ✨ Features

- ⚡ **Ultra-fast performance** using Qwik’s resumable architecture  
- 🎨 **Responsive UI** using vanilla CSS  
- 🗂 **Dynamic destinations, categories & tags**  
- 🧭 **Server-side rendering (SSR)** via Qwik City  
- 🗄 **Cloudflare D1 database** (local + remote)  
- 🚀 **Automatic database initialization** on build  
- 🔐 **CSP generation** included  
- 🌐 **Optimized for SEO & accessibility**

---

## 🛠 Tech Stack

| Area | Technology |
|------|------------|
| Framework | Qwik (1.4.0) |
| Routing | Qwik City |
| Styling | vanilla CSS |
| Deployment | Cloudflare Pages |
| Database | Cloudflare D1 |
| Bundler / Dev | Vite |
| Language | TypeScript |

---

## 📦 Installation

Make sure you have a compatible Node version:
```
Node ^18.17.0 or ^20.3.0 or >=21.0.0
```

### 1. Clone the repository

```bash
git clone https://github.com/salihbenlalla/wanderlix.git
cd wanderlix
```

2. Install dependencies (pnpm recommended)
```bash
pnpm install
```


🚀 Development

Start the development server with SSR enabled:
```bash
pnpm dev
```

Then open:
```bash
http://localhost:5173
```

🗄 Database Commands (Cloudflare D1)

Initialize local database
```bash
pnpm dbinit
```
Run migrations manually:
```bash
pnpm migrate
```
Export remote database:
```bash
pnpm export.db
```
Download + import production DB, then fill with seed data:
```bash
pnpm init.db
```

🏗 Production Build

Full production build (with DB initialization + CSP generation)
```bash
pnpm build
```
Build only the local version
```bash
pnpm build.local
```
Build client bundle only
```bash
pnpm build.client
```
Build server bundle only (Cloudflare config)
```bash
pnpm build.server
```
Preview the production build locally
```bash
pnpm preview
```

🌐 Deployment (Cloudflare Pages)

Deploy the latest build:
```bash
pnpm deploy
```
Serve Cloudflare Pages locally (with D1):
```bash
pnpm serve
```

🧹 Code Quality

Format code:
```bash
pnpm fmt
```
Check formatting:
```bash
pnpm fmt.check
```
Lint TypeScript:
```bash
pnpm lint
```
Type check:
```bash
pnpm build.types
```
