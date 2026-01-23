import App from "../App";
import Shop from "./Shop";
import Cart from "./Cart";
import ErrorPage from "./ErrorPage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "Shop",
    element: <Shop />,
  },
  {
    path: "Cart",
    element: <Cart />,
  },
];

export default routes;
