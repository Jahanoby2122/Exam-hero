import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Components/Home";
import About from "../Pages/About";
import Register from "../Pages/Register";
import { path } from "framer-motion/client";
import Login from "../Pages/Login";
import Contact from "../Pages/Contact";
import AddTeacher from "../Pages/AddTeacher";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path:"/about",
        element:<About></About>
      },
      {
        path: "/register",
        element: <Register></Register>
      },
      {
        path:"/login",
        element: <Login></Login>
      },
      {
        path:'/contact',
        element:<Contact></Contact>
      },
      {
        path:"/addteacher",
        element: <AddTeacher></AddTeacher>
      }
      
    ],
  },
]);
