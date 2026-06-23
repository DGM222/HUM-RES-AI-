# Human Resource Management (HRM) Tool

A modern, comprehensive Human Resource Management interface engineered with React, Vite, and Tailwind CSS. The current user interface layout was prototyped in Figma and translated into structured TypeScript components. 

The project is currently operating in a **Frontend-Only / Mock-Data state**. The next immediate phase of development involves leveraging the **agy CLI** to generate, spin up, and bind the microservices/backend architecture.

---

## 📁 Current Architecture & Workspace Structure

```text
src/
├── assets/             # Shared graphic and icon assets
├── components/         # Feature-specific dashboard views (Consolidation Target)
│   ├── Dashboard.tsx
│   ├── EmployeeDirectory.tsx
│   └── HRInbox.tsx
│   └── ui/             # UI Primitives (Buttons, Badges, Tables, Inputs)
├── styles/             # Global CSS and Tailwind directives
├── types/
│   └── view.ts         # Local navigation state types (currentView switching)
├── App.tsx             # Application Bootstrap
└── main.tsx            # DOM Render Entry Point