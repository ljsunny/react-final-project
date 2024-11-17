import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function Master({isLogin}){
    return(
        <div className="d-flex flex-column" style={{backgroundColor:'#f2f2f2'}}>
            <Navbar isLogin={isLogin}/>
            <div className="content-area">
            <Outlet/> 
            </div>
        </div>
)
}