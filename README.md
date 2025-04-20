
---

# **Backend Practical Task - NestJS Project**

## **Project Overview**
This is a backend application built using **NestJS** and **TypeScript**, designed to handle user authentication, product management (CRUD operations), and image handling. The application uses a PostgreSQL database to store data, along with **PM2** for process management and **JWT** for secure authentication. It also includes the use of **nestjs/schedule** for scheduling tasks like cron jobs.

This project is structured to demonstrate various backend concepts including user registration, login, product management, and integration of external libraries for handling images and files.

## **Features**

- **User Authentication:**
  - Register new users
  - Login with JWT token-based authentication
  - Secure API endpoints using JWT

- **Product Management:**
  - Create, Read, Update, and Soft-delete products
  - Support for product image uploads (with multiple image support)
  - Filter products by category, name, and other criteria

- **File Uploads:**
  - Upload product images and serve them dynamically using a URL
  - Support for multiple file types (e.g., `.png`, `.jpg`)

- **PM2 Process Management:**
  - App runs in production with process management via PM2 for uptime stability and log management

- **Scheduled Tasks:**
  - Cron jobs for scheduling periodic tasks, demonstrated using **nestjs/schedule**

## **Tech Stack**

- **NestJS** - The framework used for the project, built with **TypeScript** and utilizing decorators and modular architecture for maintainable code.
- **TypeORM** - ORM for interacting with the PostgreSQL database.
- **PostgreSQL** - Database used for storing application data.
- **JWT** - For secure user authentication.
- **PM2** - Process manager for keeping the application running in the background with automatic restarts.
- **Cloud Storage/Local Storage** - Handles image uploads, either using cloud storage or local file handling.
- **nestjs/schedule** - Task scheduling library used for cron jobs.
- **Node.js** - The runtime environment for building the application.

## **Setup Instructions**

### **1. Clone the Repository**
Clone the repository to your local machine or server.
```bash
git clone https://github.com/<your-github-username>/backend-practical.git
cd backend-practical
```

### **2. Install Dependencies**
Install the required dependencies using `npm` or `yarn`.
```bash
npm install
# or
yarn install
```

### **3. Configure Database**
Ensure you have PostgreSQL installed and configured. Create a new database for the project and update the **`ormconfig.json`** or the `TypeORM` configuration file with your PostgreSQL connection details.

Example:
```json
{
  "type": "postgres",
  "host": "localhost",
  "port": 5432,
  "username": "postgres",
  "password": "yourpassword",
  "database": "backend_practical",
  "entities": ["dist/**/*.entity{.ts,.js}"],
  "synchronize": true
}
```

### **4. Set up Environment Variables**
Create a `.env` file in the root directory with the following variables:
```env
DATABASE_URL=postgres://user:password@localhost:5432/database
JWT_SECRET=your-jwt-secret-key
PORT=3000
```

### **5. Run the Application**
Run the application using **NestJS CLI**:
```bash
npm run start:dev
```
This will start the development server on port `3000`.

For production, you can use **PM2**:
```bash
pm2 start dist/main.js --name backend-practical
```

### **6. Testing the API Endpoints**
Use any API testing tool like **Postman** or **curl** to test the API endpoints.

**Register a new user:**
```bash
POST /auth/register
```

**Login to get JWT token:**
```bash
POST /auth/login
```

**Upload product images:**
```bash
POST /product/upload
```

**Create a new product:**
```bash
POST /product
```

**Update a product:**
```bash
PUT /product/:id
```

**Delete a product (soft delete):**
```bash
DELETE /product/:id
```

### **7. Cron Jobs/Scheduled Tasks**
The app uses **nestjs/schedule** to run scheduled tasks. You can add cron jobs to perform specific tasks periodically.

Example:
```typescript
import { Cron } from '@nestjs/schedule';

@Injectable()
export class TaskService {
  @Cron('0 0 * * *')
  handleCron() {
    console.log('This task will run every day at midnight!');
  }
}
```

## **Project Structure**
```
├── src
│   ├── auth
│   │   └── auth.controller.ts
│   │   └── auth.service.ts
│   ├── product
│   │   └── product.controller.ts
│   │   └── product.service.ts
│   ├── shared
│   │   └── helpers/
│   ├── schedule
│   │   └── task.service.ts
│   ├── app.module.ts
├── .env
├── tsconfig.json
├── package.json
├── ormconfig.json
└── pm2.config.js
```

## **Running in Production**
For production environments, **PM2** is used to keep the application running as a background process:
1. Install PM2 globally:
   ```bash
   npm install -g pm2
   ```
2. Start the application with PM2:
   ```bash
   pm2 start dist/main.js --name backend-practical
   ```
3. Check logs:
   ```bash
   pm2 logs
   ```

## **Contributing**
Feel free to fork this project, create a branch, and submit pull requests. Contributions are always welcome!

---