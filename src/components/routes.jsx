import App from "../App";
import Shop from "./Shop";
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
];

export default routes;
