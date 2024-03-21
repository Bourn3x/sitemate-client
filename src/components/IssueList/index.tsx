import { issuesQueryKey } from "@/constants/queryKeys";
import { SERVER_URL } from "@/constants/server";
import { IssueInterface } from "@/types/issue";
import { useQuery } from "react-query";
import { Issue } from "../Issue";

async function fetchIssues() {
  const response = await fetch(`${SERVER_URL}/issues`);
  const data = await response.json();
  return data;
}

export const IssueList = () => {
  const { data: issues, isLoading } = useQuery<IssueInterface[]>(
    issuesQueryKey,
    fetchIssues
  );

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Issues 📒</h1>
      {isLoading && <p>Loading...</p>}
      {issues?.map((issue) => (
        <Issue key={issue.id} issue={issue} />
      ))}
    </div>
  );
};
