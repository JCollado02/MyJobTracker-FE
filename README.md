# 📌 MyJobTracker Frontend

A React frontend built with **Vite** and **TailwindCSS** for tracking job applications. This app interacts with a **Spring Boot backend** to manage job applications.



## About This Project

This is one of my first attempts at building a full-stack application. As I am currently searching for entry-level positions, I wanted to create a better way to track my job applications from different sites. This project also serves as an opportunity to add a new project to my resume while gaining hands-on experience with various frameworks and practicing Java backend concepts.

It may be rough around the edges, but this is my first project of many like this outside of university. I’m constantly learning, improving, and refining my development skills. Feedback is always welcome!

---

## Features
- View, add, edit, and delete job applications.
- Fetches job applications from a **Spring Boot backend**.
- Responsive UI with **TailwindCSS**.
- Environment-based API configuration using `.env`.

---

## 🛠 Setup & Installation

### **1️⃣ Clone the Repo**
```sh
git clone https://github.com/JCollado02/MyJobTracker-FE.git
cd JobTracker-FE
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Create an `.env` File**
Create a `.env` file in the project root and define your backend API URL:

```sh
VITE_API_URL=http://localhost:8080
```

### **4️⃣ Start the Development Server**
```sh
npm run dev
```
The app will be available at **`http://localhost:5173`**.

---

## ⚡ Backend Setup
This frontend requires a **Spring Boot backend**. Set up the backend by cloning and running:

```sh
git clone https://github.com/JCollado02/MyJobTracker-BE.git
cd JobTracker-BE
./mvnw spring-boot:run
```
Ensure your backend runs at `http://localhost:8080` or update `.env` accordingly.

---

## 📡 API Usage
The app interacts with the following API endpoints:

| Method  | Endpoint                        | Description                 |
|---------|--------------------------------|-----------------------------|
| `GET`   | `/api/v1/job-applications`      | Fetch all job applications  |
| `POST`  | `/api/v1/job-applications`      | Add a new job application   |
| `PUT`   | `/api/v1/job-applications/{id}` | Update a job application    |
| `DELETE`| `/api/v1/job-applications/{id}` | Delete a job application    |

---

## 🛠 Technologies Used
- **Frontend:** React, Vite, TailwindCSS
- **Backend:** Spring Boot, PostgreSQL

---

## 📝 License
This project is **open-source** and was my introduction to developing full-stack applications and hosting them here on Github. Feel free to fork and contribute!

---

## Author
Created by **Jim Collado** with some help from some guides by Amigoscode on YT – feel free to reach out and give tips, I am currently looking to learn and improve so anything helps!

📧 Email: jimcollado25@gmail.com  
🔗 GitHub: [JCollado02](https://github.com/JCollado02)

