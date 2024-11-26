# Todo Application

A simple, yet powerful Todo application built with React, Redux, and Tailwind CSS.

## 🚀 Features

- **Authentication**: Sign up, log in, and log out functionality
- **Todos Management**: Add, delete, update, and view todos
- **State Management**: Efficient global state handling with Redux
- **Responsive UI**: Mobile-friendly design using Tailwind CSS
- **Component-Based Architecture**: Scalable and maintainable structure

## 🧩 Components

### TodoCard
- Displays individual todo items
- Shows todo content and status (e.g., In Progress, Completed)
- Edit and delete options
- Smooth UI transitions with framer-motion

### TodoDialog
- Modal for editing or viewing todo details
- Modify existing todos
- Mark todos as complete
- Delete todos

### CreateTodo
- Form for adding new todo items
- Input fields for title and description

### TodoSidebar
- Navigation menu with user profile
- Logout functionality
- Dashboard navigation
- Mobile-friendly dropdown menu

### LoginPage
- User authentication
- Redirects to dashboard upon successful login

### SignupPage
- New user registration
- Redirects to login page after successful signup

## 🔄 Redux Integration

- **Authentication**: 
  - Manages user login and logout states
  - userSlice for storing user details and managing auth actions

- **Todos**: 
  - Stores and manages todo items
  - todoSlice for real-time UI updates and todo interactions

## 🛠 Setup

1. Clone the repository: