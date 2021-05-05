import React, { Suspense } from "react";
import logo from "./logo.svg";
import { MainRouter } from "./router/MainRouter";

function App() {
  return (
    <Suspense fallback="loading">
      <MainRouter />
    </Suspense>
  );
}

export default App;
