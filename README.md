# Amsterdam Schiphol Airport Flight Display Application

This project is a web app integrated with the Amsterdam Schiphol Airport API, allowing users to search, reserve and view flights.Also enabling users to filter flights and make reservations.

## Features

- Filter flights by **Date**, **Direction** (To or From Amsterdam), **Airline**, and **City** (ICAO code search is available).
- Users must **register** or **log in** to make reservations.
- Users can only view **their own reservations**.
- **JWT Token** is used for user session management.
  - JWT tokens are stored in **localStorage** on the frontend.
  - Authorization-required actions are performed using this token.
- The **Discover** page includes a graph displaying **number of flights** and **flight times** using **Chart.js**.

## Technologies Used

- **Backend**: Node.js, Express, MongoDB
- **Frontend**: React, Tailwind CSS, Redux
- **Charts**: Chart.js
- **API**: Amsterdam Schiphol Airport API
- **JWT**: Authentication and authorization
- **Deployment**: Backend is deployed on Railway, Frontend on Vercel

The live version of the application can be accessed [here](https://planescape-six.vercel.app/).

## Key Components

### 1. **Airline and Flight Data Management**
The system fetches data from the Schiphol API, including both airlines and flights. The airline and flight information is fetched using API calls and stored in a MongoDB database. The system periodically checks if new airlines or flights exist and only saves unique data to the database, ensuring no duplication occurs.

- **Airline Fetching**: Retrieves airline data from the API and stores it if not already present in the database.
- **Flight Fetching**: Retrieves flight data, filters it based on user queries, and caches the data in the database to avoid redundant API calls.

### 2. **User Authentication and Authorization**
User registration, login, and session management are handled securely using **JWT tokens**. When a user logs in, a token is generated and stored in the database, and this token is used to verify their identity when making authenticated requests, such as creating a reservation.

- **Registration**: New users can sign up with an email and password.
- **Login**: Users authenticate with their credentials and receive a JWT token for subsequent requests.
- **Logout**: Tokens are invalidated upon logout, ensuring session security.

### 3. **Flight Reservation System**
Once authenticated, users can search for flights and make reservations. The system ensures that:
- Users can only reserve flights that are still in the future.
- Duplicate reservations for the same flight by the same user are prevented.
- When a reservation is created, the reservation is associated with the user and saved to the database.

### 4. **API Integration and Data Management**
The system fetches data from the Amsterdam Schiphol Airport API and stores it in MongoDB for quick access. Flight data removes itself after 24h if it is not reserved to prevent uncessary data.

### 5. **Error Handling and Validation**
Input validation and error handling are implemented throughout the system to ensure smooth operation and clear feedback in case of issues:
- **Validation**: Ensures that all required fields are provided for user registration, login, and reservations.
- **Error Handling**: Comprehensive error messages are provided for cases such as invalid credentials, missing flight data, or API request failures.

The frontend of the Amsterdam Schiphol Airport flight display and reservation system is built using **React**, with state management handled by **Redux**. The frontend connects to the backend API to display flight information, manage user authentication, and allow users to make flight reservations.

## Key Components Frontend

### 1. **Authentication Management**
The frontend manages user authentication using **JWT tokens**. When a user logs in, the token is saved in the browser's `localStorage`. For any requests requiring authentication, the token is retrieved from `localStorage` and added to the request headers.

- **Token Handling**: JWT tokens are saved in `localStorage` upon successful login. This allows the user to stay logged in across page reloads.
- **Protected Routes**: Some routes (like viewing reservations) are protected, meaning only logged-in users can access them. If a user is not authenticated, they are redirected to the login page.

### 2. **State Management with Redux**
The app uses **Redux Toolkit** to manage the state of flights, airlines, user authentication, and reservations. Global state is stored and updated centrally, ensuring a consistent experience across the application.

- **Flight State**: Handles fetching and storing flight data from the backend.
- **Auth State**: Manages user login, logout, and the current authentication status.
- **Reservation State**: Keeps track of the user’s flight reservations, allowing easy access to reservation data.

### 3. **Flight Search and Filters**
The application allows users to search for flights using various filters such as airline, direction (arriving or departing from Amsterdam), and specific dates. 

- **Search Filters**: Users can customize their search by selecting specific airlines, flight directions, or destinations.
- **Pagination**: The results are paginated, meaning users can navigate through multiple pages of flight listings without overloading the interface with too much data at once.

### 4. **Reservation Management**
Once a user is authenticated, they can create reservations for future flights. The system ensures that users can only reserve a flight if:
- The flight is in the future.
- They have not already reserved that specific flight.

Additionally, users can view all their reservations on a dedicated page, where they can manage and review their bookings.

### 5. **Local Storage Management**
The frontend uses the browser’s **localStorage** to store key information, such as the JWT token used for authentication. This ensures that users stay logged in even if they reload the page or close and reopen the browser.

- **Saving Tokens**: After a user logs in, their authentication token is saved in `localStorage`.
- **Retrieving Tokens**: The token is automatically retrieved for authenticated requests, such as making a reservation or viewing the user’s bookings.

### 6. **API Client**
The app uses **Axios** to make HTTP requests to the backend. For requests requiring authentication, the JWT token is included in the headers. This allows secure communication between the frontend and backend services.

- **Custom Axios Client**: A custom client is configured to automatically add the JWT token to requests that require it, making it easier to handle authenticated requests across the application.

### 7. **Routing**
The app utilizes **React Router** for client-side navigation between different pages such as the home page, flight discovery page, registration, login, and the user’s reservation dashboard. 

- **Protected Routes**: Routes like the reservation dashboard are protected, meaning only authenticated users can access them. If an unauthenticated user attempts to access a protected route, they are redirected to the login page.
- **Public Routes**: Pages like the home page and flight discovery are accessible to all users, regardless of authentication status.

## How It Works

1. **Flight Search**: Users can filter flights by airline, route, direction, and date range.
2. **User Registration/Login**: Users must register or log in to make a reservation. JWT tokens ensure secure access.
3. **Flight Reservation**: Users can reserve flights that are still in the future and view their reservations.
4. **Flight and Airline Data**: The system fetches and caches flight and airline data from the API to provide up-to-date information efficiently.


## Screenshots

### Home Page
![Home Desktop](https://i.ibb.co/ww8w87q/home-desktop.png)
![Home Mobile 1](https://i.ibb.co/02vCS9w/home-1-mobile.png)
![Home Mobile 2](https://i.ibb.co/51kVnWw/home-2-mobile.png)

## Reservations Page
![Reservations Desktop](https://i.ibb.co/bKbjnY3/reservations-desktop.png)
![Reservations Mobile 1](https://i.ibb.co/xF9FMjf/reservations-mobile.png)

### Register Page
![Register](https://i.ibb.co/qm3k8Hb/register-desktop.png)
![Register Mobile](https://i.ibb.co/86Y1XBT/register-mobile.png)

## Login Page
![Login](https://i.ibb.co/GkbYLr8/login-desktop.png)
![Login Mobile](https://i.ibb.co/P4ykxs8/login-mobile.png)

### Discover Page
![Discover](https://i.ibb.co/VD5gMF5/flight-chart-desktop.png)
![Discover](https://i.ibb.co/qrq0rkK/flight-chart-mobile.png)

## Setup

### Installation Steps

1. Clone the repository:
    ```bash
    git clone https://github.com/taylancankose/AppFellas
    cd amsterdam-flights-app
    ```

2. Install dependencies for **backend** and **frontend**:
    ```bash
    # For backend
    cd backend
    npm install
    
    # For frontend
    cd ../frontend
    npm install
    ```

3. Set up the `.env` files. You can access the environment variables from the following link:
  [Reach .env files](https://ivy-freesia-3c4.notion.site/Planescap-env-faca05c8f01242da90057a321356b267)

4. Start the **backend**:
    ```bash
    cd server
    npm install
    npm run dev
    ```

5. Build the **frontend**:
    ```bash
    cd client
    npm install
    npm run dev
    ```

### Test User Credentials

For testing purposes, you can use the following login details:

- **Email**: taylancankose@gmail.com
- **Password**: 123456

## API Usage

You can interact with the flight data using the following backend API endpoints:

- **GET** `/flights/all`: Lists available flights.
  - Parameters: `date`, `direction`, `airline`, `city` (ICAO)
- **POST** `/reservations/reserve`: Creates a new reservation.
  - Body: `flightId`, `price`
  - Requires: `userId` from `req.user.id`
- **GET** `/reservations/my-reservations`: Lists the user's reservations.
  - Requires JWT token for authorization.



