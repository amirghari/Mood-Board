# Moodboard

Moonboard is a mobile application built on the PERN (PostgreSQL, Express, React Native, Node.js) stack that allows users to capture, track, and share their daily moods and journal entries. The app combines creative expression with robust backend storage, offering features such as authentication, journal creation, mood tracking, and social interactions.

## App Idea

Moonboard helps users:

- **Record Daily Moods & Journal Entries:** Select your mood, write about your day, and revisit past entries.
- **Create Personalized Moodboards:** Organize journal entries by theme and visual inspiration.
- **Share & Interact:** View your journals and others' in a blog-style feed and engage with likes and comments.
- **Express Yourself:** Use tags and filters to easily locate and reflect on specific moods or events.

## Functionality

- **Journal Creation & Viewing:**  
  Create new journal entries with a chosen mood, text, and optional images. View entries in a timeline or calendar view.
- **User Authentication:**  
  Authenticate using JSON Web Tokens (JWT) to secure user sessions. Users can register and log in.

- **Social Interactions:**  
  Users can interact with journal entries via likes and comments.

- **Personalized Moodboards:**  
  Create, name, and customize moodboards to group your entries and visual inspirations.

## Authentication

Moonboard uses JSON Web Tokens (JWT) for authentication. When a user registers or logs in, the server returns a JWT that includes the user's ID. This token is stored on the client and is included in all requests to secure endpoints. Passwords are hashed with bcrypt before being stored in the database.

## Tech Stack

- **PostgreSQL:** Database for storing user data, journals, moodboards, likes, and comments.
- **Express:** Node.js web framework for building the REST API.
- **React Native:** Framework for building native mobile apps.
- **Node.js:** Javascript runtime for the backend.
- **TypeScript:** Provides type safety on both the front and back end.
- **Yup:** Form validation library.
- **bcrypt:** Password hashing.
- **JWT:** JSON Web Tokens for secure authentication.
- **Expo:** Development toolchain for React Native apps.

## Screenshots

Below are screenshots from the Moonboard UI, arranged in two columns:

| <img src="/moonboard/app/assets/1.png" width="250" alt="Screenshot 1"/> | <img src="/moonboard/app/assets/2.png" width="250" alt="Screenshot 2"/> |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| <img src="/moonboard/app/assets/3.png" width="250" alt="Screenshot 3"/> | <img src="/moonboard/app/assets/4.png" width="250" alt="Screenshot 4"/> |
| <img src="/moonboard/app/assets/5.png" width="250" alt="Screenshot 5"/> |                                                                         |

## Setup and Installation

### Backend

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/moonboard.git
   cd moonboard/moonboard-backend
   ```
2. **Set up your environment:**

## Installation

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- Expo CLI
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:

```bash
cd moodboard-backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the backend directory with the following variables:

```env
PORT=5001
DATABASE_URL=postgres://username:password@localhost:5432/moodboard
JWT_SECRET=your_jwt_secret
```

4. Initialize the database:

```bash
npm run init-db
```

5. Start the backend server:

```bash
npm start
```

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd moonboard
```

2. Install dependencies:

```bash
npm install
```

3. Start the Expo development server:

```bash
npm start
```

4. Use the Expo Go app on your mobile device to scan the QR code, or run on an emulator.

## Project Structure

```
moodboard/
├── moonboard/                 # Frontend (React Native)
│   ├── app/
│   │   ├── components/       # Reusable UI components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── screens/         # App screens
│   │   ├── config/          # Configuration files
│   │   └── assets/          # Images and other assets
│   └── package.json
│
└── moodboard-backend/        # Backend (Node.js/Express)
    ├── src/
    │   ├── routes/          # API routes
    │   ├── middleware/      # Express middleware
    │   ├── db/             # Database configuration
    │   └── utils/          # Utility functions
    └── package.json
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Journals

- `GET /api/journal` - Get all public journals
- `GET /api/journal/user` - Get user's journals
- `POST /api/journal` - Create a new journal
- `PUT /api/journal/:id` - Update a journal
- `DELETE /api/journal/:id` - Delete a journal

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [PostgreSQL](https://www.postgresql.org/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
