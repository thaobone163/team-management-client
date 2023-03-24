import { BsSearch } from 'react-icons/bs'

export default function List() {
    return (
        <>
            <div className="w-2/3 -mt-4 overflow-x-auto space-y-5 flex flex-col items-end">
                <button className='flex items-center text-gray-600 border py-1.5 px-3 rounded-md w-1/3 shadow-md shadow-gray-100'>
                    <BsSearch className='mr-3'/>
                    Find project
                </button>
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-md font-medium text-gray-600 uppercase bg-gray-100">
                        <tr>
                            <th scope="col" className="px-6 py-3">Project</th>
                            <th scope="col" className="px-6 py-3">Role</th>
                            <th scope="col" className="px-6 py-3">Status</th>
                            <th scope="col" className="px-6 py-3">Progress</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b">
                            <th scope="row" className="px-6 py-4 font-semibold text-gray-500 whitespace-nowrap">Project 1</th>
                            <td className="px-5 ">
                                <div className="p-1.5 w-fit bg-emerald-300 text-white font-semibold rounded-lg">
                                    Member
                                </div>
                            </td>
                            <td className="px-6 py-4">Processing</td>
                            <td className="px-6 py-4 flex items-center font-medium">
                                <div class="w-full bg-yellow-100 rounded-full h-2 mr-3">
                                    <div class="bg-yellow-300 h-2 rounded-full w-[60%]"></div>
                                </div>
                                60%
                            </td>
                        </tr>
                        <tr className="bg-gray-50 border-b">
                            <th scope="row" className="px-6 py-4 font-semibold text-gray-500 whitespace-nowrap">Project 2</th>
                            <td className="px-5 ">
                                <div className="p-1.5 w-fit bg-emerald-300 text-white font-semibold rounded-lg">
                                    Member
                                </div>
                            </td>
                            <td className="px-6 py-4">Processing</td>
                            <td className="px-6 py-4 flex items-center font-medium">
                                <div class="w-full bg-red-100 rounded-full h-2 mr-3">
                                    <div class="bg-red-400 h-2 rounded-full w-[20%]"></div>
                                </div>
                                20%
                            </td>
                        </tr>
                        <tr className="bg-white border-b">
                            <th scope="row" className="px-6 py-4 font-semibold text-gray-500 whitespace-nowrap">Project 3</th>
                            <td className="px-5 ">
                                <div className="p-1.5 w-fit bg-amber-200 text-amber-600 font-semibold rounded-lg">
                                    Leader
                                </div>
                            </td>
                            <td className="px-6 py-4">Processing</td>
                            <td className="px-6 py-4 flex items-center font-medium">
                                <div class="w-full bg-green-100 rounded-full h-2 mr-3">
                                    <div class="bg-green-300 h-2 rounded-full w-[90%]"></div>
                                </div>
                                90%
                            </td>
                        </tr>
                        <tr className="bg-gray-50 border-b">
                            <th scope="row" className="px-6 py-4 font-semibold text-gray-500 whitespace-nowrap">Project 4</th>
                            <td className="px-5 ">
                                <div className="p-1.5 w-fit bg-lime-300 text-lime-600 font-semibold rounded-lg">
                                    Reviewer
                                </div>
                            </td>
                            <td className="px-6 py-4">Processing</td>
                            <td className="px-6 py-4 flex items-center font-medium">
                                <div class="w-full bg-red-100 rounded-full h-2 mr-3">
                                    <div class="bg-red-400 h-2 rounded-full w-[25%]"></div>
                                </div>
                                25%
                            </td>
                        </tr>
                        <tr className="bg-white border-b">
                            <th scope="row" className="px-6 py-4 font-semibold text-gray-500 whitespace-nowrap">Project 5</th>
                            <td className="px-5 ">
                                <div className="p-1.5 w-fit bg-emerald-300 text-white font-semibold rounded-lg">
                                    Member
                                </div>
                            </td>
                            <td className="px-6 py-4">Processing</td>
                            <td className="px-6 py-4 flex items-center font-medium">
                                <div class="w-full bg-yellow-100 rounded-full h-2 mr-3">
                                    <div class="bg-yellow-300 h-2 rounded-full w-[60%]"></div>
                                </div>
                                60%
                            </td>
                        </tr>
                        <tr className="bg-gray-50 border-b">
                            <th scope="row" className="px-6 py-4 font-semibold text-gray-500 whitespace-nowrap">Project 6</th>
                            <td className="px-5 ">
                                <div className="p-1.5 w-fit bg-amber-200 text-amber-600 font-semibold rounded-lg">
                                    Leader
                                </div>
                            </td>
                            <td className="px-6 py-4">Processing</td>
                            <td className="px-6 py-4 flex items-center font-medium">
                                <div class="w-full bg-green-100 rounded-full h-2 mr-3">
                                    <div class="bg-green-300 h-2 rounded-full w-[80%]"></div>
                                </div>
                                80%
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className='text-sm text-gray-600 italic pt-20'>Count: 5 projects</div>
            </div>
        </>
    )
}