import React, { useEffect } from "react";
import { App, analytics } from "./firebase-config";  // Import Firebase app

function App() {
  useEffect(() => {
    console.log("Firebase is initialized!");
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome to Firebase + React</h1>
        <p>Firebase has been initialized successfully.</p>
      </header>
    </div>
  );
}

export default App;
