export default function Add() {
    return (
        <>
            <div className="pl-56 space-y-5">
                <div className='text-3xl font-semibold text-teal-500'>
                    Create New Project
                </div>
                <form>
                    <div className="flex flex-col">
                        <div>
                            Project Name
                        </div>
                        <input type='text'
                            placeholder="Enter project name" />
                    </div>
                    <div>
                        <div>
                            Your Role
                        </div>
                        <div className="flex">
                            <input
                                type={'text'}
                                disabled={true}
                                value={'thaobone163@gmail.com'}
                            />
                            <div className="flex">
                                <div>
                                    <input type={'radio'} name="colored-radio" />
                                    <label>Member</label>
                                </div>
                                <div>
                                    <input type={'radio'} name="colored-radio" />
                                    <label>Reviewer</label>
                                </div>
                                <div>
                                    <input type={'radio'} name="colored-radio" />
                                    <label>Leader</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}