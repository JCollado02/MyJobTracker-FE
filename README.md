#  MyJobTracker Frontend

A **React** frontend built with **Vite** and **TailwindCSS** for tracking job applications. This app interacts with a **Spring Boot backend** to manage job applications.

---

## Live Demo & Test Credentials  
 **Live Demo:** [Try it here!](https://jc-jobtracker.netlify.app)  

 **Test Login Credentials:**  
- **Email:** `test@example.com`  
- **Password:** `password`

Feel free to **log in and test the app!** Try to break it even, this entire project is really meant to serve as a learning experience!

---

## Screenshots  
### **Login Screen**  
![Login Screen](/screenshots/login.PNG?raw=true "Login Screen")

### **Dashboard**  
![Dashboard](/screenshots/dashboard.PNG?raw=true "Login Screen")  

---

## Features
- View, add, edit, and delete job applications.
- Fetches job applications from a **Spring Boot backend**.
- Responsive **TailwindCSS** UI.
- Deployed on **Netlify (Frontend) + Render (Backend)**.

---

## Running locally
```bash
npm install
npm run dev
```

You'll need a `.env` file with:
```
VITE_API_URL=your-backend-url
VITE_API_KEY=your-api-key
```

## Notes

Backend is in a private repo. This is just the frontend code.

---

## 📝 API Documentation
The app interacts with the following API endpoints:

| Method  | Endpoint                        | Description                 | Auth Required |
|---------|--------------------------------|-----------------------------|--------------|
| `POST`  | `/api/v1/login`                | Login (sets JWT cookie)     | ❌ |
| `POST`  | `/api/v1/logout`               | Logout (clears JWT cookie)  | ✅ |
| `GET`   | `/api/v1/auth-check`           | Check if user is logged in  | ✅ |
| `GET`   | `/api/v1/job-applications`      | Fetch all job applications  | ✅ (`X-API-KEY`) |
| `POST`  | `/api/v1/job-applications`      | Add a new job application   | ✅ (`X-API-KEY`) |
| `PUT`   | `/api/v1/job-applications/{id}` | Update a job application    | ✅ (`X-API-KEY`) |
| `DELETE`| `/api/v1/job-applications/{id}` | Delete a job application    | ✅ (`X-API-KEY`) |

> **Note:** API requests require an `X-API-KEY` for security.  
> If you're hosting your own version, generate a secure API key and set it in both the **backend** and **frontend** `.env` files.

---

## Contributing
This is an open-source project. Feel free to fork, modify, and improve it.
If you host your own version, customize it however you like! And even try to
break the test site! This is a simple project meant for introducing me to
full-stack development so if you know how to do something better, tell me! I'd
love to learn!

📧 **Contact**: [jimcollado25@gmail.com](mailto:jimcollado25@gmail.com)  
🔗 **GitHub**: [JCollado02](https://github.com/JCollado02)
