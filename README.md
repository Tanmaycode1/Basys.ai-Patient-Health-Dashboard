# Patient Health Dashboard for Prior Authorization

This project is a full-stack application that allows healthcare providers to view and manage patient health data and submit prior authorization requests. The dashboard enables easy navigation through patient records and submission of authorization requests for treatments.

## Live Demo

You can access the live version of the project here:  
**[Patient Health Dashboard](https://basys-ai-patient-health-dashboard.vercel.app/)**

## Features

### Frontend (React):
- **Patient Dashboard**: Displays a list of patients with basic information (name, age, condition). Includes search and filter options.
- **Patient Details**: View detailed patient information including medical history, treatments, and lab results.
- **Prior Authorization Form**: Submit a request for treatment authorization with fields like treatment type, insurance plan, and diagnosis code.
- **Responsive Design**: The UI is fully responsive, using Tailwind CSS for mobile-friendly layouts.

### Backend (Node.js, Express, MongoDB):
- **Patient Data API**: Fetches patient details and displays them on the frontend.
- **Prior Authorization API**: Handles submission of prior authorization requests and stores them in MongoDB.
  
### Bonus Features:
- **Authentication (Optional)**: Basic authentication for providers (not implemented).
- **Performance Optimization**: Pagination implemented for patient lists.
- **Deployment**: Deployed using Vercel for live access.

## Project Structure

```bash
├── client                # React frontend code
│   ├── public            # Static assets
│   └── src               # React components and pages
│       ├── components    # Reusable UI components
│       ├── pages         # Main page files
│       ├── services      # API service calls
│       ├── App.js        # Main entry point
│       └── index.js      # React entry point
├── server                # Backend API code
│   ├── controllers       # Logic for handling routes
│   ├── models            # MongoDB schemas for Patients and Authorizations
│   ├── routes            # API routes for patients and authorizations
│   ├── server.js         # Express server setup
└── README.md             # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/patient-health-dashboard.git
   ```

2. Navigate to the project directory:
   ```bash
   cd patient-health-dashboard
   ```

3. Install dependencies for both frontend and backend:
   ```bash
   cd client && npm install
   cd ../server && npm install
   ```

4. Create a `.env` file in the `server` folder for environment variables:
   ```
   MONGO_URI=your-mongodb-uri
   PORT=5000
   ```

5. Run the backend:
   ```bash
   cd server
   npm start
   ```

6. Run the frontend:
   ```bash
   cd client
   npm start
   ```

7. Visit `http://localhost:3000` to use the app locally.

## API Endpoints

### GET /api/patients
Fetch the list of patients.

### GET /api/patients/:id
Fetch detailed information about a specific patient.

### POST /api/authorizations
Submit a prior authorization request.

## Video Demonstration

A video walkthrough of the functionality is available here:  
**[Video Demonstration](https://link-to-video.com)**

