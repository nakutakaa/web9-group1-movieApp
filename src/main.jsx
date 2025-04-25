import { StrictMode } from 'react'
import { createRoot} from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx'
import Favorites from './components/Favorites.jsx';
import ErrorPage from './components/ErrorPage.jsx';
import Movies from './pages/Movies.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    Path: '/movies',
    element:<Movies/>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/favourites",
    element: <App showOnlyFavorites={true} />,
    errorElement: <ErrorPage />,
  },
  {
    path: "*", // Catch-all route for unmatched URLs
    element: <ErrorPage />,
  },
]);

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<RouterProvider router={router} />);


createRoot(document.getElementById('root')).render(<RouterProvider router={router} />
  // <StrictMode>
  //   <App />
  // </StrictMode>,
)
