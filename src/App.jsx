import "./App.css";
import { Button } from "./components/ui/button";
import AppLayout from "@/layout/app-layout"; // absolute import
import { createBrowserRouter } from "react-router-dom";
import LandingPage from "./pages/landing";
import { RouterProvider } from "react-router-dom";
import OnBoarding from "@/pages/onboarding";
import JobListing from "./pages/job-listing";
import PostJob from "@/pages/post-job";
import MyJobs from "@/pages/my-jobs";
import SavedJobs from "@/pages/saved-job";
import JobPage from "@/pages/job.jsx"
import { ThemeProvider } from "@/components/theme-provider";
import ProtectedRoute from "./components/protected-route";
function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        {
          index: true, // default page

          element: <LandingPage />,
        },
        {
          path: "/onboarding",
          element: (
            <ProtectedRoute>
              <OnBoarding />
            </ProtectedRoute>
          ),
        },
        {
          path: "/jobs",
          element: (
            <ProtectedRoute>
              <JobListing />
            </ProtectedRoute>
          ),
        },
        {
          path:"/job/:id",
          element:<ProtectedRoute><JobPage/></ProtectedRoute>
        },
        {
          path: "/post-job",
          element: (
            <ProtectedRoute>
              <PostJob />
            </ProtectedRoute>
          ),
        },
        {
          path: "/saved-jobs",
          element: <ProtectedRoute><SavedJobs></SavedJobs></ProtectedRoute>,
        },
        {
          path: "/my-jobs",
          element: <ProtectedRoute><MyJobs /></ProtectedRoute>,
        },
      ],
    },
  ]);

  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
