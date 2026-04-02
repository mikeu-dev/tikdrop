# TikDrop (`tikdrop.my.id`)

**TikDrop** is a high-performance, production-ready Progressive Web Application (PWA) built with Next.js 16. It empowers users to download public TikTok videos in HD (MP4), audio (MP3), or image slides (ZIP) without watermarks. Integrated with native monetization capabilities, profound accessibility tools, and multi-language support.

## ✨ Core Features

- **Progressive Web App (PWA)**: Installable natively on iOS, Android, and desktop devices for maximized user retention.
- **Watermark-Free Downloads**: Retrieve precise TikTok video streams without external watermarks, supporting MP4 and MP3 extractions.
- **Image Slides Extraction**: Unique capability to parse TikTok photo slides and download them in a consolidated `.zip` format.
- **Monetization Ready**: Strategically positioned Google AdSense hooks. Users watch short ads while downloads are being prepared.
- **Internationalization (i18n)**: Fully localized in both English (`en`) and Indonesian (`id`) out of the box.
- **WCAG Accessibility Widget**: Built-in floating widget for High Contrast mode, Large Text, and Link Highlighting.
- **User Activity History**: Synchronized with Google Auth & Firebase, allowing returning users to track and redownload their recent queries.
- **Google Analytics 4**: Pre-configured data streams to monitor audience behavior and bounce rates dynamically.

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router + Turbopack)
- **Language**: TypeScript
- **Styling UI/UX**: Tailwind CSS v4, Framer Motion, Shadcn UI
- **Database & Auth**: Firebase / Firestore
- **Deployment**: Vercel-ready & Firebase App Hosting compatible

## 🚀 Getting Started

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Run Development Server**

   ```bash
   npm run dev
   ```

3. **Build for Production Environment**
   ```bash
   npm run build
   ```

Open `http://localhost:9002` to start exploring the application locally.

## 📄 Legal & License

Distributed under the **[MIT License](LICENSE)**. Authored by `mikeu-dev`.

**Disclaimer**: This project is an independent tool and is **NOT AFFILIATED** with TikTok, ByteDance, or any of their corporate entities. The downloaded content remains the copyright of its original creators.
