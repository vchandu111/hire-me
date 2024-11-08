import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "../Components/Common/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <ClerkProvider>
      <Navbar /> 
      <Component {...pageProps} />
    </ClerkProvider>
  );
}
