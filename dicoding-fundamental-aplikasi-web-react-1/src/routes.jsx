import { createBrowserRouter } from "react-router";
import NoteIndex from "./pages/NoteIndex";
import NoteDetail from "./pages/NoteDetail";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: <NoteIndex />,
      },
      {
        path: ":id",
        element: <NoteDetail />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
