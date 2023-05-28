import Review from "../review/Review";
import Graph from "./graph/Graph";

export default function Statistic({projectId, plan, project}) {
  return (
    <>
      <div className="flex flex-col space-y-5 w-full">
        <Review project={project} />
        <Graph projectId={projectId} plan={plan}/>
      </div>
    </>
  )
}
