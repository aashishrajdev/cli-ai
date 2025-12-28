# Vanilla Todo App

## Overview

This is a clean, modern, and production-ready Todo application built entirely with vanilla JavaScript, HTML, and CSS. It offers essential todo functionalities including adding new tasks, marking them as complete, deleting them, and filtering tasks based on their status (all, active, completed). All your tasks are persistently stored in your browser's `localStorage`, so they remain even after you close and reopen the browser.

## Features

*   **Add Todos**: Easily add new tasks using the input field.
*   **Toggle Completion**: Mark tasks as completed or uncompleted with a single click.
*   **Delete Todos**: Remove tasks you no longer need.
*   **Filter Tasks**: View all tasks, only active tasks, or only completed tasks.
*   **Clear Completed**: Remove all completed tasks at once.
*   **Persistent Storage**: All tasks are saved locally using `localStorage`.
*   **Responsive Design**: Works well on various screen sizes.
*   **Modern UI**: Clean and intuitive user interface with modern styling.
*   **Input Validation & Error Handling**: Basic checks for empty input and `localStorage` errors.

## Setup and Run

This application is a static web page and does not require any backend server or build tools. You can run it directly in your web browser.

1.  **Navigate to the project folder**: Open your file explorer or terminal and go into the `vanilla-todo-app` directory.
2.  **Open `index.html`**: Double-click on `index.html` or open it using your preferred web browser. 

    *   **Windows**: `start index.html` (from Command Prompt in the folder)
    *   **macOS**: `open index.html` (from Terminal in the folder)
    *   **Linux**: `xdg-open index.html` (from Terminal in the folder)

    The application will load in your browser, and you can start managing your todos immediately.

## Usage

1.  **Add a New Todo**: Type your task into the input box at the top and click the `+` button or press `Enter`.
2.  **Mark as Complete/Incomplete**: Click the `check (✓)` icon next to a task to toggle its completion status. Completed tasks will be visually distinguished (e.g., strikethrough).
3.  **Delete a Todo**: Click the `trash can (🗑️)` icon next to a task to delete it.
4.  **Filter Tasks**: Use the 