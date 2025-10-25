import { Outlet } from "react-router-dom"
import { Header } from "../app/layout/Header"
import { Sidebar } from "../app/layout/Sidebar"

export const Layout =() =>{
    return (
        <div className={"container"}>
            <Header/>
            <Sidebar/>
            <Outlet/>

        </div>
    )
}