import { Inter } from "next/font/google";
import { CreateIssue } from "@/components/CreateIssue";
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 bg-stone-100 ${inter.className}`}
    >
      <ToastContainer position="top-center"/>
      <CreateIssue/>
    </main>
  );
}
