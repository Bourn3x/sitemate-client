import { SERVER_URL } from "@/constants/server";
import { useRef } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CreateIssue = () => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!titleRef.current?.value) {
      toast.error("Title is required");
      return;
    }
    if (!descriptionRef.current?.value) {
      toast.error("Title is required");
      return;
    }
    const body = {
      title: titleRef.current?.value,
      description: descriptionRef.current?.value,
    };

    try {
      await fetch(`${SERVER_URL}/issues`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      toast.success("Issue created successfully");
      titleRef.current!.value = "";
      descriptionRef.current!.value = "";
    } catch (error) {
      toast.error("Error creating issue");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-slate-200 px-4 py-8 rounded-md">
      <h1 className="text-2xl font-bold mb-8">Create Issue</h1>
      <p>Title</p>
      <input
        className="block p-2 rounded-md border-gray-300 border mb-8"
        ref={titleRef}
      />
      <p>Description</p>
      <input
        className="block p-2 rounded-md border-gray-300 border"
        ref={descriptionRef}
      />

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-md mt-8"
      >
        Submit
      </button>
    </form>
  );
};
