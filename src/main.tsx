import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Editor } from "./pages/editor";
import { Main } from "./pages/main";

const router = createBrowserRouter([
  {
    path: "/editor",
    element: <Editor />,
  },
  {
    path: "/",
    element: <Main />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
