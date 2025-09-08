# ai-utility-hub

ai-utility-hub - Part of the EmmanuelOS ecosystem

## Features

- Feature 1
- Feature 2
- Feature 3

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Vercel (Deployment)

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+ or yarn 1.22+
- Vercel CLI (for deployment)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/e-ogugua/ai-utility-hub.git
   cd ai-utility-hub
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env.local
   # Update the environment variables in .env.local
   ```

4. Run the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

This application is deployed on Vercel. Any push to the `main` branch will trigger an automatic deployment.

### Manual Deployment

1. Install Vercel CLI (if not already installed)
   ```bash
   npm install -g vercel
   ```

2. Deploy to Vercel
   ```bash
   vercel
   # or
   vercel --prod
   ```

## Environment Variables

To run this project, you will need to add the following environment variables to your .env.local file:

```
NEXT_PUBLIC_APP_NAME="ai-utility-hub"
NEXT_PUBLIC_APP_URL="https://ai-utility-hub.vercel.app"
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Last Updated

2025-09-08
