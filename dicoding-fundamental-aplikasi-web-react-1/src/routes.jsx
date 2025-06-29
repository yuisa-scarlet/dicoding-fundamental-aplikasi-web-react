import { createBrowserRouter } from "react-router";
import { AuthProvider } from "./hooks/useAuth";
import { ThemeProvider } from "./hooks/useTheme";
import { LanguageProvider } from "./hooks/useLanguage";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRoute from "./components/AuthRoute";
import NoteIndex from "./pages/NoteIndex";
import NoteDetail from "./pages/NoteDetail";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";

// eslint-disable-next-line react-refresh/only-export-components
function RootLayout({ children }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>{children}</AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <RootLayout>
        <ProtectedRoute>
          <NoteIndex />
        </ProtectedRoute>
      </RootLayout>
    ),
  },
  {
    path: "/notes/:id",
    element: (
      <RootLayout>
        <ProtectedRoute>
          <NoteDetail />
        </ProtectedRoute>
      </RootLayout>
    ),
  },
  {
    path: "/login",
    element: (
      <RootLayout>
        <AuthRoute>
          <Login />
        </AuthRoute>
      </RootLayout>
    ),
  },
  {
    path: "/register",
    element: (
      <RootLayout>
        <AuthRoute>
          <Register />
        </AuthRoute>
      </RootLayout>
    ),
  },
  {
    path: "*",
    element: (
      <RootLayout>
        <NotFound />
      </RootLayout>
    ),
  },
]);
