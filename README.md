```markdown
# Stream-Zone

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Stream-Zone is a dynamic streaming platform built with Node.js and Express, designed to provide a seamless viewing experience. It features a comprehensive backend API for managing channels, electronic program guides (EPG), and secure stream delivery via signed URLs. The frontend, crafted with HTML, CSS, and JavaScript, offers an intuitive interface for browsing channels, viewing program schedules, and playing streams directly in the browser.

## Table of Contents

*   [Description](#description)
*   [Features](#features)
*   [Technologies Used](#technologies-used)
*   [Setup](#setup)
*   [API Endpoints](#api-endpoints)
*   [Security](#security)
*   [Contributing](#contributing)
*   [License](#license)
*   [Credits](#credits)

## Description

Stream-Zone offers a foundation for building a robust streaming service. This project includes a complete backend and frontend implementation, enabling users to browse channels, view EPG data, and securely stream content.

## Features

*   **Channel Management:** Browse a curated list of global channels with details on country, language, and genre.
*   **EPG Integration:** Stay updated with detailed program schedules, ensuring you never miss your favorite shows.
*   **Secure Streaming:** Enjoy protected stream access through signed URLs, guaranteeing content security.
*   **Admin Control:** Manage channels via a secure API using API key authentication.
*   **Dynamic Frontend:** Experience a responsive and user-friendly interface for effortless navigation and playback.

## Technologies Used

*   **Backend:**
    *   Node.js
    *   Express
    *   jsonwebtoken
    *   node-fetch
    *   uuid
    *   xmlbuilder2
    *   dotenv
*   **Frontend:**
    *   HTML
    *   CSS
    *   JavaScript
*   **Other:**
    *   HLS.js (optional, for HLS stream support)

## Setup

To run Stream-Zone locally, follow these steps:

1.  **Clone the repository:**

```bash
git clone https://github.com/sanchotech/Stream-Zone.git
cd Stream-Zone
```

2.  **Backend Setup:**

    *   Navigate to the backend directory (if applicable).
    *   Install dependencies:

    ```bash
    npm install
    ```

    *   Create a `.env` file based on `.env.example` and fill in the required environment variables:

    ```
    PORT=3000
    ADMIN_API_KEY=your_admin_api_key
    JWT_SECRET=your_jwt_secret_key
    STREAM_SIGNING_SECRET=your_stream_signing_secret
    STREAM_SIGN_EXP_SEC=300
    ```

    *   Start the backend server:

    ```bash
    npm start
    ```

3.  **Frontend Setup:**

    *   Open the `index.html` file in your browser.
    *   Make sure the `API_BASE_URL` in `script.js` points to the correct backend URL (default: `http://localhost:3000/api/v1`).

## API Endpoints

### Authentication
*   `POST /api/v1/auth/token`: Generates a JWT token for authorized users (requires `x-api-key` header).

### Channel Management
*   `GET /api/v1/channels`: Retrieves a list of all channels. Supports filtering by `country`, `language`, `genre`, and `tags`.
*   `GET /api/v1/channels/:id`: Retrieves a specific channel by ID.
*   `POST /api/v1/channels`: Creates a new channel (Admin only, requires API key).
*   `PUT /api/v1/channels/:id`: Updates a channel (Admin only, requires API key).
*   `DELETE /api/v1/channels/:id`: Deletes a channel (Admin only, requires API key).

### Streaming
*   `GET /api/v1/stream/:id`: Retrieves a signed stream URL for a specific channel.

### EPG (Electronic Program Guide)
*   `GET /api/v1/epg`: Retrieves EPG data for all or a specific channel. Supports filtering by `channelId`, `from`, `to`, and `date`.
*   `GET /api/v1/epg/:channelId`: Retrieves EPG data for a specific channel.
*   `GET /api/v1/epg/:channelId/xmltv`: Generates an XMLTV file for a specific channel.

### Meta Data
*   `GET /api/v1/meta/genres`: Returns a list of supported genres.
*   `GET /api/v1/meta/countries`: Returns a list of supported countries.

## Security

*   The backend uses an API key for administrative tasks and JWT for user authentication.
*   Stream URLs are signed to prevent unauthorized access.
*   Ensure that the `.env` file is kept secure and not committed to version control.

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with descriptive messages.
4.  Submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Credits
Copyright ©️ 2025 Sancho Tech 
*   This project was brought to you by Sancho Tech [https://github.com/sanchotech]
*   Inspired by various open-source streaming platforms.
```