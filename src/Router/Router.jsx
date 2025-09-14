import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout";
import Home from "../Components/Home";
import About from "../Pages/About";
import Register from "../Pages/Register";
import { path } from "framer-motion/client";
import Login from "../Pages/Login";
import Contact from "../Pages/Contact";
import ApplyTeacher from "../Pages/ApplyTeacher";
import DashBoardLayout from "../Pages/DashBoard/DashBoardLayout";
import AdminTeacherApplication from "../Pages/DashBoard/AdminTeacherApplication";
import ContactMessageAdmin from "../Pages/DashBoard/ContactMessageAdmin";
import UserRoleUpdate from "../Pages/DashBoard/UserRoleUpdate";
import ChangesBanners from "../Pages/DashBoard/ChangesBanners";
import Profile from "../Pages/DashBoard/Profile";
import SscScience from "../Components/Programe/SscScience";
import TeacherDetails from "../Pages/TeacherDetails";
import AllTeachersPage from "../Components/AllTeachersPage";





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
        path:'/allteachers',
        element:<AllTeachersPage></AllTeachersPage>
      },
      {
        path:'/contact',
        element:<Contact></Contact>
      },
      {
        path:"/applyteacher",
        element:<ApplyTeacher></ApplyTeacher>

      },
      {
        path:'teachers/:id',
        element:<TeacherDetails></TeacherDetails>

      },
      {
        path:'/sscscience',
        element: <SscScience></SscScience>
      }
      
      
    ],
  },
  {
    path:'/dashboard',
    element: <DashBoardLayout></DashBoardLayout>,
    children:[
      {
        path:"teacherapplications",
        element:<AdminTeacherApplication></AdminTeacherApplication>
      },
      {
        path:'contactmessages',
        element: <ContactMessageAdmin></ContactMessageAdmin>
      },
      {
        path:'userroleupdate',
        element:<UserRoleUpdate></UserRoleUpdate>
      },
      {
        path:'changesbanners',
        element:<ChangesBanners></ChangesBanners>
      },
      {
        path:'profile',
        element:<Profile></Profile>
      }
      
    ]
   
  }
]);
