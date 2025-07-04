# Smart ToDo List

A minimal yet functional ToDo app built with **React 19**, designed to help users manage tasks with deadlines and real-time status tracking.

---

###  Built With

- **React 19** – Core UI framework  
- **TypeScript** – Type-safe development  
- **Vite** – Lightning-fast build and dev environment  
- **UUID** – For generating unique task IDs  
- **React DatePicker** – For selecting task deadlines  
- **ESLint** – Code linting and formatting  

---

###  Getting Started

To run this project locally:

1. **Clone the repo**
   ```bash
   git clone https://github.com/akshayb03/todo.git
   cd todo
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

---

###  Project Notes

- The app uses a **dummy task list** defined directly inside the component to simulate tasks in the UI.
- You can **create new tasks** using the "Create Task" button.
- Tasks are dynamically categorized into:
  -  **Ongoing** – Active tasks with time remaining
  -  **Success** – Tasks manually marked as completed
  -  **Failure** – Tasks that missed their deadline
- Remaining time is shown in a clean format (e.g., `5 mins remaining`, `2 hrs remaining`) and updates every second.
- The UI is **responsive**, adapting automatically to mobile and desktop screen sizes.

---

###  Future Enhancements

- [ ] Store tasks in localStorage or connect to a backend
- [ ] Add filtering and search
- [ ] Support user authentication and profiles

---

###  Live Demo

> **Vercel:** [https://todo-eight-fawn-90.vercel.app/](https://todo-eight-fawn-90.vercel.app/)  
