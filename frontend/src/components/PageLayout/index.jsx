import React from "react";
import Navigation from "./Navigation";

export const PageLayout = ({ children }) => {
  return (
    <main>
      <Navigation />
      {children}
    </main>
  );
};
