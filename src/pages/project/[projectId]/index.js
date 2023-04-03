import { useRouter } from "next/router"

export default function ProjectDetail() {
  const router = useRouter()
  const { projectId } = router.query

  return (
    <>
      Profile {projectId}
    </>
  )
}
