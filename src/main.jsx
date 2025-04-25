import { StrictMode } from 'react'
import { createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {  createBrowserRouter,RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx'
import ErrorPage from './components/ErrorPage'; //  error page component
// import Favorites from './components/Favorites.jsx';

//REACT ROUTER CONFIGURATION:
//client-side routing
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />, //  error handling for all routes
  },
  {
  path: "/non-favorites",  // More descriptive than "/movies"
  element: <App showOnlyFavorites={false} showOnlyNonFavorites={true} />,
   },

  
  {
    path: "/favourites",
    element: <App showOnlyFavorites={true} />, // Shows only favorites
    errorElement: <ErrorPage />,
  },
  {
    path: "*", // Catch-all route for 404 errors
    element: <ErrorPage />,
  },
]);


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
