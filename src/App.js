import ReactDOM from "react-dom/client";
import { use, useEffect, useState } from "react";
import Header from "./components/Header";
import Body from "./components/Body";
import Error from "./components/Error";
import About from "./components/About";
// import RestaurantMenu from "./components/RestaurantMenu";
import Contact from "./components/Contact";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { lazy, Suspense } from "react";
// import TimerContext from "./utils/TimerContext";
const RestaurantMenu = lazy(() => import("./components/RestaurantMenu"));
import { TimerContextProvider } from "./utils/TimerContext";
import { Provider } from "react-redux";
import store from "./utils/store";
import Cart from "./components/Cart";
import { useState } from "react";
import { AuthProvider } from "./components/AuthContext";
// const heading = React.createElement("h1", { id: "heading" }, "hello react");
// const heading1 = <h1>hello vinay</h1>;
// const HeadingComponent2 = () => (
//   <>
//     <h1>hello component2</h1>
//     <h2>fkhieurieuiu</h2>
//   </>
// );

// const HeadingComponent = () => (
//   <>
//     {heading1}
//     {heading} {/* PUTTING REACT ELEMENT IN JSX */}
//     <HeadingComponent2></HeadingComponent2>
//     <h1>hello component</h1>
//     <h2>fkhieurieuiu</h2>
//   </>
// );

// // root.render(heading);
// // root.render(heading1);
// root.render(<HeadingComponent></HeadingComponent>);

const Layout = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <div>
          {/* <TimerContextProvider> */}
          <Header></Header>
          <Outlet />
          {/* </TimerContextProvider> */}
        </div>
      </AuthProvider>
    </Provider>
  );
};

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact-us",
        element: <Contact />,
      },
      {
        path: "/restaurant/:resId",
        element: (
          <Suspense fallback="Loading...">
            <RestaurantMenu />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
    errorElement: <Error />,
  },
]);
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
