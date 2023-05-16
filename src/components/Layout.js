import { useState } from 'react';
import NavBar from './Navbar';
import SideBar from './Sidebar';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

export default function Layout(props) {
    const [toggle, setToggle] = useState(true)

    const router = useRouter()
    function handleChange() {
        setToggle(!toggle)
    }

    return (
        <>
            {
                router.asPath.split('/')[1] !== 'auth' && props.children.props.statusCode !== 404 ?
                    <div>
                        <NavBar />
                        <SideBar toggle={toggle} onChange={handleChange} />
                        <div className={toggle ? 'pl-56 pt-24' : 'pl-32 pt-24'}>
                            {props.children}
                        </div>
                    </div> : <div>{props.children}</div>
            }
        </>
    )
}
