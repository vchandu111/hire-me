import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "../Components/Common/Navbar";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import Toast styles

export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider>
      <Navbar />
      <ToastContainer position="top-right" autoClose={3000} />

      <Component {...pageProps} />
    </ClerkProvider>
  );
}
