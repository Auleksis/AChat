import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage.tsx";
import SearchPage from "./pages/SearchPage/SearchPage.tsx";
import MyRoomsPage from "./pages/MyRoomsPage/MyRooms.tsx";
import RegisterPage from "./pages/RegisterPage/RegisterPage.tsx";
import ChatPage from "./pages/ChatPage/ChatPage.tsx";

const router = createBrowserRouter(
  [
    {
      element: <App />,
      path: "/",
      children: [
        {
          path: "search_rooms",
          element: <SearchPage />,
        },
        {
          path: "my_rooms",
          element: <MyRoomsPage />,
        },
        {
          element: <ChatPage />,
          path: "/chat/:room_name/:username",
        },
      ],
    },
    {
      element: <LoginPage />,
      path: "/login",
    },
    {
      element: <RegisterPage />,
      path: "/register",
    },
  ],
  {
    future: {
      v7_normalizeFormMethod: true,
      v7_fetcherPersist: true,
      v7_partialHydration: true,
      v7_relativeSplatPath: true,
      v7_skipActionErrorRevalidation: true,
    },
  }
);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
