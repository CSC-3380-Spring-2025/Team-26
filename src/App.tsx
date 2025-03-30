import React, { useEffect } from "react";
import { app, analytics } from "./firebase-config";  // Import Firebase app
import { createUser, createPost, createMeal, createRating } from "./firestoreService";   // Import Firestore functions
import { getUsers, getPostsByUser, getMealsByTag } from "./firestor eQueries";
import "tailwindcss"; // tailwind step to look at for later

function App() {
  useEffect(() => {
    console.log("Firebase is initialized!");

    const addSampleData = async () => {
      try {
          console.log("Adding sample data...");
          
          // Create a sample user and get the generated user ID
          const userId = await createUser("JohnDoe", "john@example.com");
          console.log("User added with ID:", userId);
  
          // Create a sample post with the generated userId
          await createPost(userId, "McDonald's", "Big Mac with fries", 4, { latitude: 40.7128, longitude: -74.0060 });
          console.log("Post added!");
  
          // Create a sample meal
          await createMeal("Big Mac", "McDonald's", "Burger", ["fast food", "beef"]);
          console.log("Meal added!");
  
          // Create a sample rating
          await createRating("post123", userId, 4);
          console.log("Rating added!");
  
      } catch (error) {
          console.error("Error adding sample data:", error);
      }
  };

    addSampleData();

  }, []);


  // This outputs when 'npm start' is used in terminal
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
