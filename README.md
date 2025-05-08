# MyFO - Personal Finance Management

A modern personal finance management application built with Next.js, featuring authentication, protected routes, and a beautiful UI using shadcn/ui.

## Features

- GitHub Authentication
- Protected Routes
- Modern UI with shadcn/ui
- Jest Testing Setup
- CI/CD with GitHub Actions

## Tech Stack

- **Framework:** Next.js 15
- **Authentication:** NextAuth.js
- **UI Components:** shadcn/ui
- **Styling:** Tailwind CSS
- **Testing:** Jest + React Testing Library
- **Type Safety:** TypeScript

## Getting Started

### Prerequisites

- Node.js 20 or later
- npm
- GitHub account (for authentication)

### Environment Setup

1. Clone the repository:
```bash
git clone https://github.com/atlamors/myfo-test-frontend
cd myfo-test-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Copy env.example
```bash
cp env.example .env
```

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Testing

Run the test suite:

```bash
npm test
```

Run tests in watch mode:

```bash
npm run test:watch
```

### Building for Production

```bash
npm run build
```

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── accounts/          # Protected accounts page
│   ├── api/               # API routes
│   │   └── auth/         # Authentication endpoints
│   ├── sign-in/          # Authentication page
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── SignInButton.tsx  # Authentication button
├── .github/              # GitHub configuration
│   └── workflows/        # CI/CD workflows
└── public/               # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
