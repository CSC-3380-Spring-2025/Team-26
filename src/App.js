// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home-page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      {/* Add more routes here like Profile, About, etc. */}
    </Routes>
  );
}

export default App;
