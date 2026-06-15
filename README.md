# ActARion Website

A modern, responsive website for ActARion - Revolutionizing SOP Execution with Augmented Reality.

## 🚀 Features

- **Sticky Video Background**: Auto-playing video that hides on scroll for optimal user experience
- **Responsive Design**: Fully responsive across all devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Performance Optimized**: Built with Next.js 15 and optimized for speed
- **SEO Ready**: Proper meta tags and structured content

## 📚 Documentation Hub

- `docs/README.md` – entry point for all internal guides
- `docs/content/blog-posting-instructions.md` – editorial workflow for blogs
- `docs/operations/deployment.md` & `docs/operations/deployment-guide.md` – deployment procedures
- `docs/operations/production-checklist.md` – pre-launch QA
- `AGENTS.md` – how to work with plans and async contributors

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Heroicons
- **Deployment**: Vercel-ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/ActARionwebsite.git
   cd ActARionwebsite
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 Environment Variables

Create a `.env.local` file (Next.js loads it automatically) with the credentials below:

```bash
# Loops.so integration for newsletter and forms
LOOPS_API_KEY=your_loops_api_key
LOOPS_NEWSLETTERS_LIST_ID=your_newsletters_list_id
```

### Getting the Loops configuration

1. **LOOPS_API_KEY**: Get from [Loops Dashboard](https://app.loops.so/) → Settings → API Keys
2. **LOOPS_NEWSLETTERS_LIST_ID**: Get the list ID for "Newsletters" via:
   - **Option A (API)**: Run `curl -sS -X POST "https://app.loops.so/api/v1/mailing-lists/list" -H "Authorization: Bearer $LOOPS_API_KEY"` and find the list with `"name": "Newsletters"`
   - **Option B (UI)**: Open Loops → Mailing Lists → "Newsletters" and copy the list ID

> These variables are used by `/api/loops/subscribe` for newsletter signups and form submissions. The API key is server-only and never exposed to the client.

## 🎬 Video Setup

The website uses `ActARion_intro.mp4` as a background video. Ensure this file is placed in the `public/` directory:

```
public/
  ├── ActARion_intro.mp4
  ├── Actarionlogo.png
  ├── ActARiontextlogo.png
  └── ...
```

## 🚀 Deployment

### Vercel Deployment

1. **Connect to Vercel**
   - Push your code to GitHub
   - Connect your repository to Vercel
   - Vercel will automatically detect Next.js and deploy

2. **Environment Variables** (if needed)
   - Add any environment variables in Vercel dashboard
   - No additional configuration required for basic deployment

3. **Custom Domain** (optional)
   - Add your custom domain in Vercel dashboard
   - Configure DNS settings as instructed

### Manual Deployment

```bash
# Build the project
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
ActARionwebsite/
├── public/                 # Static assets
│   ├── ActARion_intro.mp4  # Background video
│   ├── Actarionlogo.png    # Company logo
│   └── ActARiontextlogo.png
├── src/
│   └── app/
│       ├── layout.tsx      # Root layout
│       ├── page.tsx        # Homepage
│       ├── globals.css     # Global styles
│       └── video-test/     # Video testing page
├── package.json
├── next.config.ts
├── tailwind.config.ts
└── README.md
```

## 🎨 Customization

### Colors
The website uses a cyan accent color scheme. To customize:

1. **Primary Accent**: `text-cyan-400` / `bg-cyan-500`
2. **Background**: `bg-neutral-950` (dark theme)
3. **Text**: `text-white` / `text-gray-300`

### Content
Update content in `src/app/page.tsx`:
- Company information
- Service descriptions
- Contact details
- Industry sections

### Video
Replace `public/ActARion_intro.mp4` with your own video file.

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Key Features Implementation

#### Video Background
- **Auto-play**: Video starts automatically on page load
- **Scroll Detection**: Video hides after 100px scroll
- **Performance**: Video pauses when hidden to save resources
- **Responsive**: Video scales properly on all devices

#### Animations
- **Scroll-triggered**: Content animates as it comes into view
- **Smooth transitions**: Framer Motion provides fluid animations
- **Performance optimized**: Animations are hardware accelerated

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🚀 Performance

- **Lighthouse Score**: Optimized for 90+ performance score
- **Image Optimization**: Next.js Image component for optimal loading
- **Code Splitting**: Automatic code splitting for faster loads
- **Caching**: Optimized caching strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is proprietary to ActARion. All rights reserved.

## 📞 Contact

- **Email**: hello@ActARion.com
- **Website**: www.ActARion.com
- **Region**: Serving Benelux, DACH & Nordics

---

Built with ❤️ by ActARion Team
