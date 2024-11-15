import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Master({isLogin}){
    return(
        <div className="d-flex flex-column flex-lg-row" style={{backgroundColor:'#F2F2F2'}}>
            <Navbar isLogin={isLogin}/>
            <Outlet/> 
        </div>
    )
}