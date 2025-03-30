import { getFirestore, collection, getDocs, doc, getDoc, query, where } from "firebase/firestore";
import { app } from "./firebase-config";  

const db = getFirestore(app);

// Fetch all users
export const fetchUsers = async () => {
    try {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
        });
    } catch (error) {
        console.error("Error fetching users:", error);
    }
};

// Fetch a single user by ID
export const fetchUserById = async (userId) => {
    try {
        const userRef = doc(db, "users", userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
            console.log("User Data:", userSnap.data());
        } else {
            console.log("No such user!");
        }
    } catch (error) {
        console.error("Error fetching user:", error);
    }
};

// Fetch posts by a specific user
export const fetchPostsByUser = async (userId) => {
    try {
        const q = query(collection(db, "posts"), where("user_id", "==", userId));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            console.log("Post:", doc.data());
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
    }
};
