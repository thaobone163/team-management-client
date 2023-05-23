import { formatDate } from "@/util/common";
import Table from "./Table";

export default function Review() {
  const projectCol = [
    {
      Header: 'Project',
      accessor: 'project'
    },
    {
      Header: 'Reviewer',
      accessor: 'reviewer'
    },
    {
      Header: 'Review',
      accessor: 'review'
    },
    {
      Header: 'Score',
      accessor: 'score'
    },
    {
      Header: 'Date',
      accessor: 'date'
    },
    {
      Header: 'Option',
      accessor: 'option'
    }
  ]

  const memberCol = [
    {
      Header: 'Member',
      accessor: 'member'
    },
    {
      Header: 'Reviewer',
      accessor: 'reviewer'
    },
    {
      Header: 'Review',
      accessor: 'review'
    },
    {
      Header: 'Score',
      accessor: 'score'
    },
    {
      Header: 'Date',
      accessor: 'date'
    },
    {
      Header: 'Option',
      accessor: 'option'
    }
  ]

  const projectData = [
    {
      id: 0,
      project: 'Project Name',
      reviewer: {
        name: 'Reviewer Name',
        email: 'reviewer@gmail.com'
      },
      review: 'Very good! Goodjob!',
      score: 9,
      date: formatDate('24/05/2023')
    }
  ]

  const memberData = [
    {
      id: 1,
      member: {
        name: 'Member 1',
        email: 'member1@gmail.com',
        role: 'Leader'
      },
      reviewer: {
        name: 'Reviewer Name',
        email: 'reviewer@gmail.com'
      },
      review: 'Very good! Goodjob!',
      score: 9,
      date: formatDate('24/05/2023')
    },
    {
      id: 2,
      member: {
        name: 'Member 2',
        email: 'member2@gmail.com',
        role: 'Member'
      },
      reviewer: {
        name: 'Reviewer Name',
        email: 'reviewer@gmail.com'
      },
      review: 'Very good! Goodjob!',
      score: 9,
      date: formatDate('24/05/2023')
    },
    {
      id: 3,
      member: {
        name: 'Member 3',
        email: 'member3@gmail.com',
        role: 'Member'
      },
      reviewer: {
        name: 'Reviewer Name',
        email: 'reviewer@gmail.com'
      },
      review: 'Very good! Goodjob!',
      score: 9,
      date: formatDate('24/05/2023')
    }
  ]

  return (
    <>
      <div className="flex flex-col space-y-3">
        <div className="capitalize text-xl text-cyan-700 font-semibold">
          review and evaluation
        </div>
        <div className="flex flex-col space-y-3">
          <div className="flex flex-col space-y-2">
            <div className="capitalize text-lg text-cyan-600 font-semibold">
              project
            </div>
            <Table columns={projectCol} data={projectData} />
          </div>
          <div className="flex flex-col space-y-2">
            <div className="capitalize text-lg text-cyan-600 font-semibold">
              Members
            </div>
            <Table columns={memberCol} data={memberData} />
          </div>
        </div>
      </div>
    </>
  )
}
