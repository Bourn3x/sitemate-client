import { IssueInterface } from "@/types/issue";

interface Props {
  issue: IssueInterface;
}

export const Issue = ({ issue }: Props) => {
  return (
    <div key={issue.id} className="bg-slate-200 px-4 py-8 rounded-md mb-4">
      <h2 className="text-xl font-bold">{issue.title}</h2>
      <p>{issue.description}</p>
    </div>
  );
};
