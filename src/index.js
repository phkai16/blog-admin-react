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
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { userApi } from "./service/user.service";
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
    //   errorElement: <Error />,
    // },
    // {
    //   path: "/login",
    //   element: <Login />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);
