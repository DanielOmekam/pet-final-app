# pet-final-app

# Pet Review App - Tier 1 MVP

This application is a **full-stack** pet review site. It has a **Node + Express + Prisma** backend and a **React + Vite + antd** frontend. Users can register, log in, and create, view, and comment on pet reviews.

---

## Features Summary

1. **User Authentication**  
   - Register and log in with email/password.  
   - Basic JWT handling (returned on login).

2. **Pet Management**  
   - View all pets.  
   - Create a new pet (with basic fields: name, species, age).  
   - View details for each pet.

3. **Reviews**  
   - View reviews for each pet.  
   - Create new reviews, including a rating and textual review.

4. **Comments**  
   - View comments under each review.  
   - Create new comments, edit existing ones, and delete them.

5. **UI**  
   - Uses **antd** for layout, tables, forms, and styling.  
   - React Router for page navigation.

---

## Project Structure

```
pet-review-app/
├── backend/
│   ├── .env             // Contains DB connection & JWT_SECRET
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── seed.js
│   ├── routes/
│   ├── controllers/
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── utils/
    │   ├── App.jsx
    │   └── main.jsx
    ├── package.json
    └── vite.config.js
```

### Environment Variables

In `backend/.env`:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/petreviewsdb"
JWT_SECRET="some-super-secret-key"
PORT=8080
```

- `DATABASE_URL`: Postgres connection string (adjust as needed).  
- `JWT_SECRET`: Secret key used for JWT creation.  
- `PORT`: Port number where the backend server listens.

In `frontend/src/utils/api.js`:

```js
export const BASE_URL = 'http://localhost:8080';
```

- Make sure this matches the backend `PORT` if you change it.

---

## Getting Started

### 1. Set Up the Backend

1. **Install Dependencies**  
   ```bash
   cd pet-review-app/backend
   npm install
   ```
2. **Initialize and Seed the Database**  
   ```bash
   npm run seed
   ```
   - This creates the tables (via Prisma) and inserts sample data.
3. **Start the Server**  
   ```bash
   npm run start:dev
   ```
   - The server listens on [http://localhost:8080](http://localhost:8080).

### 2. Set Up the Frontend

1. **Install Dependencies**  
   ```bash
   cd pet-review-app/frontend
   npm install
   ```
2. **Run the Frontend**  
   ```bash
   npm run dev
   ```
   - The default port is [http://localhost:3000](http://localhost:3000).

### 3. Access the App

- Visit [http://localhost:3000](http://localhost:3000) to see the home page listing pets from the backend.  
- Use the **Login** or **Register** links in the header to create or log in to a user account.  
- Click “View” under each pet to see details and reviews.  
- Try adding reviews and comments, or create a new pet from the home page.

---

## Further Development

This Tier 1 MVP can be extended with additional features such as:

- **Advanced Authentication** (tokens in headers, role-based permissions, etc.)  
- **Pagination and Filtering** for pets and reviews.  
- **Image Uploads** for pets or user profiles.  
- **Admin Dashboard** to manage users, pets, reviews, and comments.  
- **Notifications** or more robust user profiles.

Feel free to integrate these enhancements in **Tier 2** or **Tier 3** phases. The current code structure is designed for straightforward expansion while keeping a clean separation between backend and frontend.