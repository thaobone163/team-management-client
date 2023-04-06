import Detail from "@/components/project/detail/detail";
import Overview from "@/components/project/overview";
import Head from "next/head";
import { useRouter } from "next/router"
import { BiSquareRounded } from 'react-icons/bi'

export default function ProjectDetail() {
  const router = useRouter()
  const { projectId } = router.query

  return (
    <>
      <Head>
        <title>Project {projectId}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className={`flex space-x-14 h-screen`}>
          <Overview />
          <div className="pl-44 -mt-5 space-y-7 w-full">
            <div>
              <div className='flex items-center text-2xl font-semibold uppercase text-gray-600'>
                <BiSquareRounded className="mr-2 text-sky-600 w-4 h-4" />
                Project {projectId}
              </div>
              <div className='w-fit rounded-bl-lg border-l-2 border-b-2 border-gray-300 -mt-1.5 ml-1.5 pl-5 '>
                <div className="pt-3 pl-1 -mb-3 bg-white flex items-center text-md text-gray-600">
                  <BiSquareRounded className="mr-2 w-3 h-3 text-gray-400" />
                  Topic
                </div>
              </div>
            </div>
            <Detail/>
          </div>
        </div>
      </main>
    </>
  )
}
