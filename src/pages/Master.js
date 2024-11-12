import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Master({isLogin}){
    return(
        <div className="d-flex" style={{backgroundColor:'#f2f2f2',height:'100vh'}}>
            <Navbar isLogin={isLogin}/>
            <Outlet/> 
        </div>
    )
}