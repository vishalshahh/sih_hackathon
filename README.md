# 🏥 AI-Powered Healthcare Assistant

A comprehensive healthcare chatbot application built for the SIH (Smart India Hackathon) that provides real-time health information, drug data, vaccination schedules, and emergency assistance in multiple languages.

## �� Features

### Core Healthcare Features
- **🤖 Intelligent Chatbot**: AI-powered healthcare assistant with natural language processing
- **💊 Drug Information**: Comprehensive drug database with interactions, side effects, and recalls
- **�� Symptom Assessment**: AI-powered symptom analysis with urgency detection
- **💉 Vaccination Schedules**: Personalized vaccination recommendations and schedules
- **🏥 Healthcare Provider Locator**: Find nearby hospitals, clinics, and pharmacies
- **�� Emergency Services**: Instant emergency contact information and alerts
- **📊 Health Analytics**: Real-time health data and outbreak monitoring

### Multi-Language Support
- **🌍 3+ Languages**: English, Hindi, Spanish, Arabic support
- **🔄 RTL Support**: Right-to-left language support for Arabic
- **📱 Localized UI**: Complete interface translation

### Communication Channels
- **💬 Web Chat**: Interactive web-based chatbot interface
- **📱 WhatsApp Integration**: WhatsApp Business API integration
- **�� SMS Support**: SMS messaging capabilities
- **🔔 Emergency Alerts**: Broadcast emergency notifications

### Admin Dashboard
- **📈 Analytics Dashboard**: Usage statistics and performance metrics
- **💬 Conversation Monitor**: Real-time chat monitoring and management
- **🎯 Intent Management**: AI intent configuration and training
- **🔧 API Monitor**: Health API status and performance tracking
- **🚨 Emergency Alerts**: Emergency broadcast system
- **�� Content Management**: Multi-language content management
- **📱 Messaging Integration**: WhatsApp/SMS configuration

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd sih_hackathon
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
# WhatsApp Business API
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_ACCESS_TOKEN=your_access_token
WHATSAPP_WEBHOOK_VERIFY_TOKEN=your_verify_token
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id

# SMS Configuration (Twilio)
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_phone_number

# Health APIs
OPENFDA_API_KEY=your_openfda_key
WHO_API_KEY=your_who_key
CDC_API_KEY=your_cdc_key

# Database (if using)
DATABASE_URL=your_database_url
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure
```bash
sih_hackathon/
├── app/ # Next.js App Router
│ ├── layout.tsx # Root layout with fonts and metadata
│ ├── page.tsx # Main homepage with chatbot interface
│ ├── globals.css # Healthcare-themed design tokens
│ ├── admin/ # Admin dashboard pages
│ │ └── page.tsx # Admin dashboard main page
│ └── api/ # API routes
│ ├── health/ # Health data API endpoints
│ │ ├── drugs/route.ts # Drug information API
│ │ ├── drug-interactions/route.ts # Drug interactions API
│ │ ├── drug-recalls/route.ts # Drug recalls API
│ │ ├── symptoms/route.ts # Symptom assessment API
│ │ ├── vaccination/route.ts # Vaccination schedule API
│ │ ├── providers/route.ts # Healthcare provider locator API
│ │ └── outbreaks/route.ts # Disease outbreak alerts API
│ └── messaging/ # Messaging integration APIs
│ ├── whatsapp/route.ts # WhatsApp webhook handler
│ ├── sms/route.ts # SMS webhook handler
│ └── test/ # Testing endpoints
├── components/ # React components
│ ├── healthcare-chatbot.tsx # Main chatbot interface
│ ├── header.tsx # Navigation header
│ ├── language-selector.tsx # Multi-language support
│ ├── quick-actions.tsx # Medical quick actions
│ ├── drug-data-display.tsx # Drug information display
│ ├── health-data-display.tsx # Health information display
│ ├── admin/ # Admin dashboard components
│ │ ├── admin-dashboard.tsx # Main admin interface
│ │ ├── analytics-dashboard.tsx # Usage analytics
│ │ ├── conversation-monitor.tsx # Chat monitoring
│ │ ├── intent-management.tsx # AI intent configuration
│ │ ├── health-api-monitor.tsx # API status monitoring
│ │ ├── emergency-alerts.tsx # Emergency broadcast system
│ │ ├── content-management.tsx # Multi-language content
│ │ └── messaging-integration.tsx # WhatsApp/SMS setup
│ └── ui/ # Shadcn/ui components
│ ├── button.tsx
│ ├── card.tsx
│ ├── input.tsx
│ └── ... (other UI components)
├── lib/ # Utility libraries
│ ├── healthcare-intents.ts # AI intent processing engine
│ ├── translations.ts # Multi-language translations
│ ├── health-apis.ts # Health data service layer
│ ├── whatsapp-integration.ts # WhatsApp Business API
│ └── utils.ts # Utility functions
├── next.config.mjs # Next.js configuration
├── package.json # Dependencies and scripts
├── tailwind.config.ts # Tailwind CSS configuration
├── tsconfig.json # TypeScript configuration
└── README.md # This file
```

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/ui** - Modern UI component library
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons

### Backend & APIs
- **Next.js API Routes** - Serverless API endpoints
- **OpenFDA API** - Drug information and safety data
- **WHO/CDC APIs** - Global health data and outbreak information
- **WhatsApp Business API** - WhatsApp messaging integration
- **Twilio** - SMS messaging service

### AI & Processing
- **Custom Intent Engine** - Healthcare-specific NLP
- **Entity Extraction** - Medical entity recognition
- **Multi-language Support** - RTL and LTR language support
- **Urgency Detection** - Emergency situation identification

## �� Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# WhatsApp Business API Configuration
WHATSAPP_PHONE_NUMBER_ID=your_phone_number_id
WHATSAPP_ACCESS_TOKEN=your_access_token
WHATSAPP_WEBHOOK_VERIFY_TOKEN=your_verify_token
WHATSAPP_BUSINESS_ACCOUNT_ID=your_business_account_id

# SMS Configuration (Twilio)
TWILIO_ACCOUNT_SID=your_account_sid
TWILIO_AUTH_TOKEN=your_auth_token
TWILIO_PHONE_NUMBER=your_phone_number

# Health API Keys
OPENFDA_API_KEY=your_openfda_key
WHO_API_KEY=your_who_key
CDC_API_KEY=your_cdc_key

# Database (Optional)
DATABASE_URL=your_database_url

# Application Settings
NODE_ENV=development
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### WhatsApp Business API Setup

1. Create a Facebook Developer account
2. Create a new app and add WhatsApp Business API
3. Get your phone number ID and access token
4. Set up webhook URL: `https://yourdomain.com/api/messaging/whatsapp`
5. Configure webhook verify token

### SMS Setup (Twilio)

1. Create a Twilio account
2. Get your Account SID and Auth Token
3. Purchase a phone number
4. Configure webhook URL: `https://yourdomain.com/api/messaging/sms`

## 📱 Usage

### For Users

1. **Access the Chatbot**: Visit the main page to start chatting
2. **Select Language**: Use the language selector for your preferred language
3. **Ask Questions**: Ask about symptoms, medications, vaccinations, etc.
4. **Quick Actions**: Use the quick action buttons for common queries
5. **Emergency Help**: Use emergency features for urgent situations

### For Administrators

1. **Access Admin Dashboard**: Navigate to `/admin`
2. **Monitor Conversations**: View real-time chat activity
3. **Manage Intents**: Configure AI responses and training
4. **API Monitoring**: Check health API status and performance
5. **Emergency Alerts**: Send emergency notifications
6. **Content Management**: Update translations and content

## �� API Endpoints

### Health APIs

- `GET /api/health/drugs?name={drugName}` - Get drug information
- `GET /api/health/drug-interactions?drug={drugName}` - Check drug interactions
- `GET /api/health/drug-recalls?drug={drugName}` - Get drug recalls
- `POST /api/health/symptoms` - Assess symptoms
- `GET /api/health/vaccination?vaccine={vaccineName}` - Get vaccination info
- `GET /api/health/providers?location={location}` - Find healthcare providers
- `GET /api/health/outbreaks?location={location}` - Get outbreak alerts

### Messaging APIs

- `POST /api/messaging/whatsapp` - WhatsApp webhook
- `POST /api/messaging/sms` - SMS webhook
- `POST /api/messaging/send-test` - Send test messages

## 🌐 Multi-Language Support

The application supports multiple languages with RTL support:

- **English** (en) - Default language
- **Hindi** (hi) - Complete translation with RTL support
- **Spanish** (es) - Full interface translation
- **Arabic** (ar) - RTL language support

### Adding New Languages

1. Add language code to `lib/translations.ts`
2. Create translation object with all required keys
3. Update language selector component
4. Test RTL support if applicable

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify
- Google Cloud Run

## 🧪 Testing

### Run Tests
```bash
npm run test
# or
yarn test
```

### Test Messaging
```bash
# Test WhatsApp integration
curl -X POST http://localhost:3000/api/messaging/test/whatsapp \
  -H "Content-Type: application/json" \
  -d '{"to": "phone_number", "message": "Test message"}'

# Test SMS integration
curl -X POST http://localhost:3000/api/messaging/test/sms \
  -H "Content-Type: application/json" \
  -d '{"to": "phone_number", "message": "Test message"}'
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the GitHub repository
- Contact the development team
- Check the documentation

## �� Acknowledgments

- **OpenFDA** - Drug information and safety data
- **WHO/CDC** - Global health data and guidelines
- **WhatsApp Business API** - Messaging platform
- **Twilio** - SMS services
- **Shadcn/ui** - UI component library
- **Next.js Team** - React framework

## 📊 Project Status

- ✅ Core chatbot functionality
- ✅ Multi-language support
- ✅ Drug information integration
- ✅ WhatsApp/SMS integration
- ✅ Admin dashboard
- ✅ Emergency services
- 🔄 Advanced AI features (in development)
- 🔄 Mobile app (planned)

---

**Built with ❤️ by Vishy [https://vishy.dev/]]**

*This application is designed to provide general health information and should not replace professional medical advice. Always consult healthcare professionals for medical concerns.*
