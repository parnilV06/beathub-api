# BeatHub Backend

## Live URL
[Placeholder: Not Deployed Yet]

## Test Credentials
- **Admin**: admin@example.com / admin123
- **User**: user@example.com / user123

## Features Implemented
- **JWT Authentication**: Secure login and token-based protection.
- **RBAC**: Admin vs User separation for endpoints.
- **Pagination**: `page` and `limit` support on list endpoints.
- **Rate Limiting**: Defends against brute-force/DDoS attacks.
- **Docker**: Ready for production deployment using multi-stage builds.
- **MongoDB Atlas**: Fully configured for remote cloud database connections.

## API Endpoints
- `POST /api/auth/register` - Create an account
- `POST /api/auth/login` - Authenticate and receive JWT
- `GET /api/songs` - Get list of songs (Paginated)
- `POST /api/songs` - Create a song (Admin Only)
- `GET /api/analytics/top-artists` - Aggregated charts (Admin Only)
- `GET /api/analytics/user-activity` - Usage stats (Admin Only)

## Setup Instructions (Docker-based)
1. Ensure Docker is installed on your machine.
2. Clone the directory and provide `.env` configuration (matching `.env.example`).
3. Build the Image:
   ```bash
   docker build -t beathub .
   ```
4. Run the Container:
   ```bash
   docker run -p 5000:3000 --env-file .env beathub
   ```

## Environment Variables
- `PORT`: App port (e.g., 5000)
- `MONGO_URI`: Your MongoDB Atlas connection string.
- `JWT_SECRET`: A secure random string for signing tokens.
- `JWT_EXPIRES_IN`: Expiration time for tokens (e.g., `30d`).
