# MoodTunes

A modern music discovery application that helps users find the perfect songs based on their current mood and favorite artists. Built with React, TypeScript, and powered by YouTube's music catalog with Supabase backend and Stripe subscriptions.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Supabase, Stripe, YouTube Data API

## Features

- **Mood-Based Discovery**: Select your current mood to get personalized music recommendations
- **Artist Selection**: Choose your favorite artists to refine music suggestions
- **YouTube Integration**: Access millions of songs through YouTube's extensive music catalog
- **User Authentication**: Secure sign-up and login with Supabase Auth
- **Premium Subscriptions**: Multiple subscription tiers with enhanced features
  - Premium Plan ($9.99/month): Unlimited music discovery and premium features
  - Pro Plan ($19.99/month): Advanced features and personal music curator
- **Responsive Design**: Beautiful dark theme UI that works on all devices
- **Real-time Music Search**: Instant song recommendations based on mood and artist preferences

## Screenshots

![Screenshot 1](screenshots/screen1.png)  
![Screenshot 2](screenshots/screen2.png)  
![Screenshot 3](screenshots/screen3.png)  
![Screenshot 4](screenshots/screen4.png)  

## Installation & Setup

1. Clone the repository:
   ```bash
   git clone <repo-link>
   cd moodtunes
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   
   Fill in your environment variables:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_YOUTUBE_API_KEY=your_youtube_api_key
   STRIPE_SECRET_KEY=your_stripe_secret_key
   ```

4. Set up Supabase:
   - Create a new Supabase project
   - Run the migrations in the `supabase/migrations/` directory
   - Deploy the edge functions in `supabase/functions/`

5. Configure Stripe:
   - Set up your Stripe account
   - Configure webhook endpoints for subscription management

6. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

1. **Sign Up/Login**: Create an account or sign in to access the app
2. **Select Mood**: Choose how you're feeling from the mood options
3. **Pick Artist**: Select an artist whose style matches your preference
4. **Discover Music**: Get personalized song recommendations from YouTube
5. **Upgrade to Premium**: Access unlimited features with subscription plans

## API Integration

- **YouTube Data API**: For music search and recommendations
- **Supabase**: User authentication, profiles, and subscription management
- **Stripe**: Payment processing and subscription billing

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@moodtunes.com or create an issue in this repository.