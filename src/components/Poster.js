import { Inter } from '@next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Poster() {
    return (
        <>
            <div className="flex flex-col items-center w-2/3">
                <img className="md:w-64 lg:w-[680px] m-0 p-0" src={'/login_bg.png'} />
                <div className="bg-sky-500 px-14 py-2 w-fit rounded-full text-white font-semibold">Together we&apos;re stronger !!</div>
            </div>
        </>
    )
}
