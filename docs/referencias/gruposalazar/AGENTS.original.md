# AGENTS.md

- `/` is the executive home (`src/pages/Inicio.tsx`) with its own sidebar and scoped `.theme-ejecutivo` tokens, rendered outside `MainLayout`; the estimations system starts at `/dashboard` and its sibling routes inside `MainLayout`. Why: the home is a separate hub and the estimations module is entered from its sidebar.
