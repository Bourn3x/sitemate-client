import { Inter } from "next/font/google";
import { CreateIssue } from "@/components/CreateIssue";
import { ToastContainer } from 'react-toastify';
import { IssueList } from "@/components/IssueList";
import { QueryClient, QueryClientProvider } from "react-query";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
    <main
      className={`flex min-h-screen flex-col items-center p-24 bg-stone-100 ${inter.className}`}
    >
      <ToastContainer position="top-center"/>
      <IssueList/>
      <CreateIssue/>
    </main></QueryClientProvider>
  );
}
