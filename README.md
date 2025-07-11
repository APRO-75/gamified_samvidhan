# Gamified Samvidhan

## Description

Gamified Samvidhan is a gamified learning platform designed to educate users about the Indian Constitution. It provides an engaging and interactive experience through learning modules, quizzes, trivia, and a system of rewards and recognition.

## Technologies Used

*   React
*   Node.js
*   Express
*   Firebase
*   React Router
*   Tailwind CSS
*   i18next

## Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/APRO-75/gamified_samvidhan.git
    ```
2.  Install dependencies:

    ```bash
    npm install
    cd client
    npm install
    cd ../server
    npm install
    ```

    Alternatively, you can use the `install-all` script:

    ```bash
    npm run install-all
    ```
3.  Configure Firebase:

    *   Create a Firebase project in the Firebase console.
    *   Enable authentication and Firestore.
    *   Copy the Firebase configuration object to `client/src/firebase.js`.
4.  Set environment variables:

    *   Create a `.env` file in the `server` directory.
    *   Add the following environment variables:

        ```
        MONGODB_URI=<your_mongodb_uri>
        JWT_SECRET=<your_jwt_secret>
        ```

## Usage

1.  Run the development server:

    ```bash
    npm run dev
    ```
2.  Open your browser and navigate to `http://localhost:3000`.

## Features

*   User authentication (login, register, profile)
*   Learning modules
*   Quizzes
*   Trivia
*   Leaderboard
*   Badges
*   Community forum

## Contributing

Contributions are welcome! Please follow these guidelines:

*   Fork the repository.
*   Create a new branch for your feature or bug fix.
*   Write tests for your code.
*   Submit a pull request.

## License

[MIT](LICENSE)
