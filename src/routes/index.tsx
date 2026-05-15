import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoute, PublicRoute } from "../components/auth/RouteGuards";

// Layouts
const DashboardLayout = lazy(() => import("../layouts/DashboardLayout"));
const AuthLayout = lazy(() => import("../layouts/AuthLayout"));

// Public Pages
const LandingPage = lazy(() => import("../pages/LandingPage"));
const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const SignupPage = lazy(() => import("../pages/auth/SignupPage"));
const ForgotPasswordPage = lazy(() => import("../pages/auth/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("../pages/auth/ResetPasswordPage"));
const NotFoundPage = lazy(() => import("../pages/NotFoundPage"));

// Protected Pages
const DashboardPage = lazy(() => import("../pages/dashboard/DashboardPage"));
const ProjectsPage = lazy(() => import("../pages/projects/ProjectsPage"));
const SingleProjectPage = lazy(() => import("../pages/projects/SingleProjectPage"));
const TasksPage = lazy(() => import("../pages/tasks/TasksPage"));
const KanbanPage = lazy(() => import("../pages/kanban/KanbanPage"));
const AnalyticsPage = lazy(() => import("../pages/analytics/AnalyticsPage"));
const NotificationsPage = lazy(() => import("../pages/notifications/NotificationsPage"));
const TeamPage = lazy(() => import("../pages/team/TeamPage"));
const ProfilePage = lazy(() => import("../pages/profile/ProfilePage"));
const SettingsPage = lazy(() => import("../pages/settings/SettingsPage"));
const AdminPage = lazy(() => import("../pages/admin/AdminPage"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/auth",
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          { path: "login", element: <LoginPage /> },
          { path: "signup", element: <SignupPage /> },
          { path: "forgot-password", element: <ForgotPasswordPage /> },
          { path: "reset-password", element: <ResetPasswordPage /> },
        ],
      }
    ],
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: "projects", element: <ProjectsPage /> },
          { path: "projects/:id", element: <SingleProjectPage /> },
          { path: "tasks", element: <TasksPage /> },
          { path: "kanban", element: <KanbanPage /> },
          { path: "analytics", element: <ProtectedRoute allowedRoles={['ADMIN']} />, children: [{ index: true, element: <AnalyticsPage /> }] },
          { path: "notifications", element: <NotificationsPage /> },
          { path: "team", element: <TeamPage /> },
          { path: "profile", element: <ProfilePage /> },
          { path: "settings", element: <SettingsPage /> },
          { path: "admin", element: <ProtectedRoute allowedRoles={['ADMIN']} />, children: [{ index: true, element: <AdminPage /> }] },
        ],
      }
    ],
  },
  {
    path: "/404",
    element: <NotFoundPage />,
  },
  {
    path: "*",
    element: <Navigate to="/404" replace />,
  },
]);
