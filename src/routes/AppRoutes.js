import { Route, Routes } from "react-router-dom"
import { Login } from "../app/auth/views/Login"
import Register from "../app/auth/views/Register"
import { Home } from "../app/dashboard/views/Home"
import { ProtectedRoute } from "../app/auth/components/ProtectedRoute"
import { Layout } from "../components/Layout"
import { Transactions } from "../app/transactions/Transactions"
import Payments from "../app/payment/components/views/Payments"
import { Success } from "../app/payment/components/views/Success"

export const AppRoutes = () => {
    return(
        <Routes>
            
             <Route element={<Layout/>}>
                <Route path="/" element={
                    <ProtectedRoute component={<Home/>}/>
             }/>
             <Route path="/transactions" element={
                    <ProtectedRoute component={<Transactions/>}/>
             }/>

             </Route>
              <Route path="/payment" element={
                    <ProtectedRoute component={<Payments/>}/>
             }/>
              <Route path="/success" element={
                    <ProtectedRoute component={<Success/>}/>
             }/>
            <Route path={"/login"} element={<Login/>}/>
            <Route path={"/register"} element={<Register/>}/>
        </Routes>
    )
}