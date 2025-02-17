# Independent Queens Frontend

![Winner - Capital One's Best Financial Hack](https://img.shields.io/badge/Winner-Capital%20One's%20Best%20Financial%20Hack-blue)
![HackViolet 2025](https://img.shields.io/badge/HackViolet-2025-purple)
![Next.js](https://img.shields.io/badge/Next.js-15.1.6-black)
![React](https://img.shields.io/badge/React-19.0.0-61DAFB)

Frontend application for Independent Queens - an AI-powered women's health and empowerment platform. Live at: [https://iqns.dhruvv.dev/](https://iqns.dhruvv.dev/)
BackendEnd Code: [https://github.com/DHRUVvkdv/independent-queens-backend](https://github.com/DHRUVvkdv/independent-queens-backend)

## 🌟 Features

- Personalized AI-driven scheduling system
- Phase-specific wellness recommendations
- Real-time health analytics dashboard
- Skill marketplace interface
- Canvas LMS integration
- 3D-enhanced user experience with Three.js
- Responsive design with Tailwind CSS

## 🚀 Quick Start

### Prerequisites

- Node.js 16+
- npm or yarn
- Required API keys and configurations

### Local Development

1. Clone the repository:

```bash
git clone https://github.com/DHRUVvkdv/independent-queens-frontend
cd independent-queens-frontend
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
# Edit .env.local with your credentials
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
src/
├── app/                 # Next.js pages and routing
├── components/         # Reusable React components
├── lib/               # Utilities and helpers
├── types/             # TypeScript type definitions
├── styles/            # Global styles
└── provider/          # Context providers
```

## 💻 Technology Stack

- **Framework**:

  - Next.js 15.1.6
  - React 19.0.0
  - TypeScript

- **UI/UX**:

  - Tailwind CSS
  - Shadcn UI
  - Three.js
  - Lucide React icons

- **State Management**:

  - React Context
  - React Hooks

- **Data Visualization**:

  - Recharts
  - Schedule-X Calendar

- **Development Tools**:
  - ESLint
  - TypeScript
  - Prettier

## 🔧 Configuration

### Environment Variables

Required environment variables:

```env
NEXT_PUBLIC_APP_API_BASE_URL=
NEXT_PUBLIC_API_KEY=
```

## 📱 Features in Detail

1. **Scheduling System**

   - Canvas LMS integration
   - ICS calendar parsing
   - AI-optimized scheduling
   - Real-time updates

2. **Health Tracking**

   - Phase tracking
   - Personalized recommendations
   - Wellness analytics

3. **Marketplace**

   - Skill exchange system
   - Points-based economy
   - Real-time availability

4. **User Management**
   - AWS Cognito authentication
   - Profile management
   - Security features

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 🌟 Acknowledgments

- HackViolet 2025 organizers
- Capital One for the "Best Financial Hack" award
- The Association of Women in Computing at Virginia Tech

## 📄 License

MIT License
