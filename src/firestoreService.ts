import { getFirestore, collection, doc, setDoc } from "firebase/firestore";
import { app } from "./firebase-config"; // Import Firebase app

// Initialize Firestore
const db = getFirestore(app);

// Function to create a user (with auto-generated ID)
export const createUser = async (username, email) => {
    try {
        const userRef = await addDoc(collection(db, "users"), {
            username: username,
            email: email,
            profile_picture_url: "",
            location: null,
            created_at: new Date(),
            is_verified: false,
            upvotes_given: [],
            posts_count: 0,
            favorites: [],
            bot_check_passed: false
        });

        console.log("User added with ID:", userRef.id);
        return userRef.id;  // Return the generated user ID
    } catch (error) {
        console.error("Error adding user:", error);
    }
};

// Function to create a post
export const createPost = async (userId, placeName, mealDescription, rating, location) => {
    try {
        const postRef = doc(collection(db, "posts")); // Auto-generated ID
        await setDoc(postRef, {
            user_id: userId,
            place_name: placeName,
            meal_description: mealDescription,
            meal_image_url: "",
            rating: rating,
            upvotes_count: 0,
            location: location, // { latitude: x, longitude: y }
            tags: [],
            created_at: new Date(),
            updated_at: new Date()
        });
        console.log("Post added successfully!");
    } catch (error) {
        console.error("Error adding post:", error);
    }
};

// Function to create a meal
export const createMeal = async (mealName, placeName, mealType, tags) => {
    try {
        const mealRef = doc(collection(db, "meals"));
        await setDoc(mealRef, {
            meal_name: mealName,
            place_name: placeName,
            meal_image_url: "",
            average_rating: 0,
            meal_type: mealType,
            tags: tags
        });
        console.log("Meal added successfully!");
    } catch (error) {
        console.error("Error adding meal:", error);
    }
};

// Function to create a rating
export const createRating = async (postId, userId, ratingValue) => {
    try {
        const ratingRef = doc(collection(db, "ratings"));
        await setDoc(ratingRef, {
            post_id: postId,
            user_id: userId,
            rating_value: ratingValue,
            created_at: new Date()
        });
        console.log("Rating added successfully!");
    } catch (error) {
        console.error("Error adding rating:", error);
    }
};