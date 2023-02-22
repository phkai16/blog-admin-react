import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutGeneral from "./components/LayoutGeneral";
import UserList from "./pages/UserList";
import CategoryList from "./pages/CategoryList";
import ArticleList from "./pages/ArticleList";
import CategoryAdd from "./pages/CategoryAdd";
import UserAdd from "./pages/UserAdd";
import ArticleAdd from "./pages/ArticleAdd";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import ErrorPage from "./pages/ErrorPage";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutGeneral />,
    children: [
      {
        path: "/users",
        element: <UserList />,
      },
      {
        path: "/users/add",
        element: <UserAdd />,
      },
      {
        path: "/categories",
        element: <CategoryList />,
      },
      {
        path: "/categories/add",
        element: <CategoryAdd />,
      },
      {
        path: "/articles",
        element: <ArticleList />,
      },
      {
        path: "/articles/add",
        element: <ArticleAdd />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </React.StrictMode>
);
