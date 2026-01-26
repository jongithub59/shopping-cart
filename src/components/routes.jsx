import App from "../App";
import Home from "./Home";
import Shop from "./Shop";
import Cart from "./Cart";
import ErrorPage from "./ErrorPage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "Shop", element: <Shop /> },
      { path: "Cart", element: <Cart /> },
    ],
  },
];

export default routes;
