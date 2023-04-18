import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () =>{
    let logged = localStorage.getItem("isLoggedIn");
    if(logged == null) logged = false;
    return(
        logged ? <Outlet/> :<Navigate to='/login'/>
    )
}
export default PrivateRoutes;