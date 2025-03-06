# 🚀 PhungFrontend

PhungFrontend is a modern frontend application built with **Next.js**, inspired by the [Spring Boot Next.js Starter Kit](https://github.com/NerminKarapandzic/spring-boot-nextjs-starter-kit) and [TiDB Prisma Vercel Demo](https://github.com/pingcap/tidb-prisma-vercel-demo). It provides a seamless user experience for browsing and purchasing books, integrating with **PhungBackend** for authentication and data management.

## ✨ Features

- 🎨 Built with **Next.js** and **React**
- 🔄 API integration with **PhungBackend**
- 🔑 User authentication (OAuth2, JWT, NextAuth.js)
- 📚 Dynamic book browsing and searching
- 🛍 Shopping cart and checkout flow
- 🌎 Server-side rendering (SSR) for enhanced performance
- 🚀 Deployed using **Vercel**

## 🛠 Tech Stack

| 🚀 Layer       | 🏗 Technology |
|--------------|--------------|
| Frontend    | Next.js, React, Tailwind CSS |
| API Integration | Next.js API routes, Prisma |
| Authentication | NextAuth.js, OAuth2, JWT |
| Deployment  | Vercel |

## 🔧 Installation & Setup

### 🎨 Frontend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/shegga9x/phungfrontend.git
   cd phungfrontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8080
   NEXTAUTH_SECRET=your_secret_key
   ```
4. Start the frontend server:
   ```bash
   npm run dev
   ```

## 🌍 Deployment
PhungFrontend is optimized for **Vercel** deployment. To deploy, simply push to the main branch and Vercel will handle the rest.

## 🤝 Contribution
Contributions are welcome! Feel free to submit issues or pull requests.

## 📜 License
This project is licensed under the MIT License.
run mer\\\