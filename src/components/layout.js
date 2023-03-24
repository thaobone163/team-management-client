import { useState } from 'react';
import NavBar from './navbar';
import SideBar from './sidebar';

export default function Layout(props) {
    const [toggle, setToggle] = useState(true)

    function handleChange() {
        setToggle(!toggle)
    }
    return (
        <div>
            <NavBar />
            <SideBar toggle={toggle} onChange={handleChange} />
            <div className={toggle ? 'pl-56 pt-28' : 'pl-32 pt-28'}>
                {props.children}
            </div>
        </div>
    )
}
