import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/navigation/sidebar";
import Navbar from "./components/navigation/navbar";
import ReduxProvider from "./Redux/Provider"
import  strore from "./Redux/store"
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Next Demo",
  description : "Generated by create next app",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <body className={inter.className}>
    <Navbar/>
    {/* <Sidebar /> */}
    <ReduxProvider>
    {children}
    </ReduxProvider>
    </body>
  </html>
  );
}