import React from "react";

export default [
  {
    component: React.lazy(() => import("./Home")),
    exact: true,
    path: "/"
  },
  {
    component: React.lazy(() => import("./Create")),
    exact: true,
    path: "/create"
  },
  {
    component: React.lazy(() => import("./FAQ")),
    exact: true,
    path: "/faq"
  }
];
