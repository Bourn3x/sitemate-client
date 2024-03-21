import { issuesQueryKey } from "@/constants/queryKeys";
import { SERVER_URL } from "@/constants/server";
import { IssueInterface } from "@/types/issue";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
interface Props {
  issue: IssueInterface;
}

const updateIssue = async ({
  id,
  title,
  description,
}: {
  id: number;
  title: string;
  description: string;
}) => {
  const response = await fetch(`${SERVER_URL}/issues/${id}`, {
    method: "PUT",
    body: JSON.stringify({ title, description }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const Issue = ({ issue }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateIssue,
    onSuccess: () => {
      queryClient.invalidateQueries(issuesQueryKey);
      setIsEditing(false);
    },
    onError: () => {
      toast.error("Error updating issue");
    },
  });

  const handleSave = () => {
    const title = titleRef.current?.value;
    const description = descriptionRef.current?.value;
    if (!title) {
      toast.error("Title is required");
      return;
    }
    if (!description) {
      toast.error("Title is required");
      return;
    }
    mutation.mutate({ id: issue.id, title, description }); // Assuming the updateIssue function takes the issue object as an argument
  };

  return (
    <div key={issue.id} className="bg-slate-200 px-4 py-8 rounded-md mb-4">
      {isEditing ? (
        <input
          ref={titleRef}
          className="text-xl rounded-lg border-gray-300 border px-2 py-1 mb-2"
        />
      ) : (
        <h2 className="text-xl font-bold">{issue.title}</h2>
      )}

      {isEditing ? (
        <input
          ref={descriptionRef}
          className="block rounded-lg border-gray-300 border px-2 py-1"
        />
      ) : (
        <p>{issue.description}</p>
      )}

      {!isEditing && (
        <button
          className="block mt-4 bg-blue-300 py-2 px-4 rounded-xl text-xs font-bold mr-4"
          onClick={() => setIsEditing(true)}
        >
          Edit
        </button>
      )}

      {isEditing && (
        <button
          className="block mt-4 bg-green-300 py-2 px-4 rounded-xl text-xs font-bold mr-4"
          onClick={handleSave}
        >
          Save
        </button>
      )}
    </div>
  );
};
