# Conference Management Frontend

This is the Angular 19 frontend for the Conference Management System. It provides a modern, responsive user interface for managing conferences, speakers, and reviews.

## 🚀 Features

- **Angular 19**: Built with the latest Angular version.
- **Signals-Based**: Uses Angular Signals for reactive state management (No Zone.js reliance).
- **Authentication**: Integrated with Keycloak via `angular-oauth2-oidc`.
- **Responsive Design**: Custom CSS grid system (Mobile/Tablet/Desktop).
- **Role-Based Access**: Specialized views for Administrators and Users.

## 🛠️ Tech Stack

- **Framework**: Angular 19
- **Language**: TypeScript 5.9
- **Build Tool**: Angular CLI / Vite
- **Package Manager**: pnpm

## 📂 Project Structure

```
src/app/
├── auth/           # Authentication logic (Guard, Interceptor, Service)
├── components/     # Reusable UI components (Button, Card, Badge)
├── models/         # TypeScript Interfaces (Conference, Keynote, User)
├── pages/          # Main route components
│   ├── home/
│   ├── conferences/
│   ├── keynotes/
│   └── profile/
└── app.config.ts   # Application Config (Providers, Routing)
```

## 💻 Development

### Prerequisites
- Node.js (v20+)
- pnpm

### Installation

```bash
pnpm install
```

### Running Locally

```bash
ng serve
```
Navigate to `http://localhost:4200/`.

### Build for Production

```bash
ng build
```
The build artifacts will be stored in the `dist/` directory.

## 🐳 Docker

A Dockerfile is provided to containerize the frontend with Nginx.

```bash
docker build -t conference-frontend .
docker run -p 4200:80 conference-frontend
```
