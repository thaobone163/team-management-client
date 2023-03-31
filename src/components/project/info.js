export default function Info() {
    return (
        <>
            <form className="flex flex-col space-y-8">
                <div className="flex flex-col space-y-2">
                    <div className="font-medium text-teal-600">
                        Project Name
                    </div>
                    <input type='text'
                        placeholder="Enter your project name"
                        className="border border-sky-500 text-gray-900 text-sm rounded-md w-full py-3 px-7 focus:ring-0 focus:border-sky-500 shadow"
                    />
                </div>
                <div className="flex flex-col space-y-2">
                    <div className="font-medium text-teal-600">
                        Your Role
                    </div>
                    <div className="flex space-x-8">
                        <input
                            type={'text'}
                            disabled={true}
                            value={'thaobone163@gmail.com'}
                            className="border border-sky-500 text-gray-900 text-sm rounded-md w-full py-3 px-7 focus:ring-0 focus:border-sky-500 shadow"
                        />
                        <div className="flex items-center space-x-5">
                            <div className="flex items-center space-x-2">
                                <input id="member"
                                    type={'radio'}
                                    name="your_role"
                                    className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-0"
                                />
                                <label htmlFor="member">Member</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input id="reviewer"
                                    type={'radio'}
                                    name="your_role"
                                    className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-0"
                                />
                                <label htmlFor="reviewer">Reviewer</label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <input checked
                                    id="leader"
                                    type={'radio'}
                                    name="your_role"
                                    className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-0"
                                />
                                <label htmlFor="leader">Leader</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col space-y-2">
                    <div className="font-medium text-teal-600">
                        Invite people to your project
                    </div>
                    <div className="flex">
                        <input
                            type={'text'}
                            placeholder='Enter your teammates email address'
                        />
                        <div className="flex">
                            <div>
                                <input id="teammate1_member" type={'radio'} name="teammate1_role" />
                                <label htmlFor="teammate1_member">Member</label>
                            </div>
                            <div>
                                <input id="teammate1_reviewer" type={'radio'} name="teammate1_role" />
                                <label htmlFor="teammate1_reviewer">Reviewer</label>
                            </div>
                            <div>
                                <input checked id="teammate1_leader" type={'radio'} name="teammate1_role" />
                                <label htmlFor="teammate1_leader">Leader</label>
                            </div>
                        </div>
                        <button>
                            Remove
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}