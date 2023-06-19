import { Outlet } from "react-router-dom"
import Navbar from "../../components/navbar/Navbar"
import Footer from "../../components/footer/Footer"

export default function Layout({ user }) {
    return (
        <>
            <Navbar user={user} />
            <Outlet />
            <Footer />
        </>
    )
}
