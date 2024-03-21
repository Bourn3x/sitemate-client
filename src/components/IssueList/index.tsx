import { issuesQueryKey } from "@/constants/queryKeys";
import { SERVER_URL } from "@/constants/server";
import { Issue } from "@/types/issue";
import { useQuery } from "react-query";

async function fetchIssues() {
  const response = await fetch(`${SERVER_URL}/issues`);
  const data = await response.json();
  return data;
}

export const IssueList = () => {
  const { data: issues, isLoading } = useQuery<Issue[]>(issuesQueryKey, fetchIssues);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Issues</h1>
      {issues.map((issue) => (
        <div key={issue.id} className="bg-slate-200 px-4 py-8 rounded-md mb-4">
          <h2 className="text-xl font-bold">{issue.title}</h2>
          <p>{issue.description}</p>
        </div>
      ))}
    </div>
  );
};
