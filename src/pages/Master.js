import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Master({isLogin}){
    return(
        <div className="d-flex flex-column flex-lg-row" style={{backgroundColor:'#f2f2f2'}}>
            <Navbar isLogin={isLogin}/>
            <Outlet/> 
        </div>
    )
}