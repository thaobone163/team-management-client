import Review from "../review/Review";
import Graph from "./graph/Graph";

export default function Statistic() {
  return (
    <>
      <div className="flex flex-col space-y-5">
        <Review />
        <Graph />
      </div>
    </>
  )
}
