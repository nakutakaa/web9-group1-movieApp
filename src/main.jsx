import { StrictMode } from 'react'
import { createRoot,ReactDOM } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, createBrowserRouter,RouterProvider } from 'react-router-dom';
import Home from './pages/Home.jsx'
import Favorites from './components/Favorites.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  // {
  //   Path: '/movies',
  //   element:<Movies/>
  // },
  {
    path: '/favourites',
    element:<Favorites/>
  }
]);

// const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<RouterProvider router={router} />);


createRoot(document.getElementById('root')).render(<RouterProvider router={router} />
  // <StrictMode>
  //   <App />
  // </StrictMode>,
)
