# Xplore - Country Explorer App

A responsive, accessible, and visually appealing Country Explorer application built with Next.js 15. This app allows users to search and explore countries with real-time data from the REST Countries API.

## 🌟 Features

### Home Page
- **Full-screen background** with a world map image and subtle gradient overlay
- **Centered search bar** with clear visual hierarchy and affordances
- **Real-time suggestions** from REST Countries API
- **Debounced search** to optimize API requests
- **Fully responsive** and keyboard accessible

### Search Results Page
- **Reusable search component** in compact form at the top
- **Adaptive grid layout** that responds to different screen sizes
- **Country cards** displaying:
  - Country flag (visually prioritized)
  - Country name, currency, capital city, and region
- **Load more functionality** with 12 at a time
- **Skeleton loaders** for enhanced user experience

### Country Details Page
- **Detailed country information** fetched from REST Countries API
- **Clean layout** with proper visual hierarchy

## 🛠️ Tech Stack

### Frontend Framework
- **Next.js 15** with App Router
- **React 19** with TypeScript
- **Tailwind CSS** for styling

### State Management
- **Zustand** for lightweight state management

### UI Components
- **shadcn/ui** for accessible component library
- **Lucide React** for icons

### Development Tools
- **ESLint** for code quality
- **TypeScript** for type safety
- **Turbopack** for fast development builds

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yogeshbuilds/Xplore.git
   cd xplore
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
   NEXT_PUBLIC_API_BASE_URL=https://restcountries.com/v3.1
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
xplore/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── search/            # Search results page
├── components/            # Reusable components
│   ├── Search.tsx         # Search component
│   ├── Card.tsx           # Country card component
│   └── ui/                # shadcn/ui components
├── lib/                   # Utility functions
│   └── utils.ts           # HTTP helper, debouncer, etc.
├── types/                 # TypeScript type definitions
│   └── country.d.ts       # Country data types
├── zustand/               # State management
│   └── store.ts           # Zustand stores
└── public/                # Static assets
    └── world.jpg          # Background image
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🙏 Acknowledgments

- [REST Countries API](https://restcountries.com/) for providing country data
- [shadcn/ui](https://ui.shadcn.com/) for the component library
- [Tailwind CSS](https://tailwindcss.com/) for the styling framework
