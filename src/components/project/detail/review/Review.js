import { formatDate } from "@/util/common";
import Table from "./Table";
import { useEffect, useState } from "react";
import { getListReview } from "@/util/mics";
import { useRouter } from "next/router";

export default function Review({ project }) {
  const router =  useRouter()
  const members = new Set([project.user].concat(project.teammate).filter(item => item.role !== "Reviewer"))
  const membersList = Array.from(members, (data, index) => ({
    id: index,
    member: {
      name: data.detail.full_name,
      email: data.email,
      role: data.role
    },
    reviewer: {
      name: '',
      email: ''
    },
    review: '',
    score: '',
    date: '',
    isReviewed: false
  }))

  const [listReview, setListReview] = useState({
    project: [{
      id: project.project_id,
      project: project.project_name,
      reviewer: {
        name: '',
        email: ''
      },
      review: '',
      score: '',
      date: '',
      isReviewed: false
    }],
    member: membersList
  })

  async function getList() {
    getListReview(project.project_id).then((data) => {
      if (data.success) {
        const projectConvert = {
          id: data.review.project.length !== 0 ? data.review.project[0]._id : project.project_id,
          project: project.project_name,
          reviewer: {
            name: data.review.project.length !== 0 ? data.review.project[0].reviewer.full_name : '',
            email: data.review.project.length !== 0 ? data.review.project[0].reviewer.email : ''
          },
          review: data.review.project.length !== 0 ? data.review.project[0].review : '',
          score: data.review.project.length !== 0 ? data.review.project[0].score : '',
          date: data.review.project.length !== 0 ? formatDate(data.review.project[0].lastModifiedAt.split(' ')[1]) : '',
          isReviewed: data.review.project.length != 0 ? true : false
        }

        const membersConvert = Array.from(data.review.members, data => ({
          id: data._id,
          member: {
            name: data.member.full_name,
            email: data.member.email,
            role: data.member.role
          },
          reviewer: {
            name: data.reviewer.full_name,
            email: data.reviewer.email
          },
          review: data.review,
          score: data.score,
          date: formatDate(data.lastModifiedAt.split(' ')[1]),
          isReviewed: true
        }))

        const emailList = Array.from(membersConvert, data => data.member.email)
        const otherMembersData = membersList.filter(item => !emailList.includes(item.member.email))
        setListReview({
          project: [projectConvert],
          member: membersConvert.concat(otherMembersData)
        })
      }
    })
  }

  useEffect(() => {
    getList()
  }, [router.asPath])

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

  const projectData = listReview.project

  const memberData = listReview.member

  return (
    <>
      <div className="flex flex-col space-y-3 w-full">
        <div className="capitalize text-xl text-cyan-700 font-semibold">
          review and evaluation
        </div>
        <div className="flex flex-col space-y-3 w-full">
          <div className="flex flex-col space-y-2 max-w-full">
            <div className="capitalize text-lg text-cyan-600 font-medium">
              project
            </div>
            <Table columns={project.user.role !== 'Reviewer' ? projectCol.filter(item => item.Header !== 'Option') : projectCol} data={projectData} projectId={project.project_id} role={project.user.role} fn={getList} />
          </div>
          <div className="flex flex-col space-y-2">
            <div className="capitalize text-lg text-cyan-600 font-medium">
              Members
            </div>
            <Table columns={project.user.role !== 'Reviewer' ? memberCol.filter(item => item.Header !== 'Option') : memberCol} data={memberData} projectId={project.project_id} role={project.user.role} fn={getList} />
          </div>
        </div>
      </div>
    </>
  )
}
