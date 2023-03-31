import { useState } from 'react';
import NavBar from './navbar';
import SideBar from './sidebar';
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
                        <div className={toggle ? 'pl-56 pt-28' : 'pl-32 pt-28'}>
                            {props.children}
                        </div>
                    </div> : <div>{props.children}</div>
            }
        </>
    )
}
