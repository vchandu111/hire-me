import { createContext, useContext, useState, useEffect } from "react";
import { useUser as useClerkUser } from "@clerk/nextjs";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user, isLoaded } = useClerkUser(); // Use Clerk's `useUser` hook
  const [userId, setUserId] = useState(null); // State to store user.id

  useEffect(() => {
    if (isLoaded && user) {
      setUserId(user.id); // Set user.id when available
    }
  }, [isLoaded, user]); // Update whenever `isLoaded` or `user` changes

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext); // Custom hook for accessing the context
