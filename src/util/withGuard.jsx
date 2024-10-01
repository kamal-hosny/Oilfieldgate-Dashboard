import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadUserFromCookies } from "../store/login/loginAuthSlice"; 
 
const withGuard = (Component) => {
  return function Wrapper(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const { isAuthenticated, loading } = useSelector((state) => state?.loginAuth);

    useEffect(() => {
      dispatch(loadUserFromCookies()); // Load user data from cookies when the component mounts
    }, [dispatch]);

    useEffect(() => {
      if (!loading && !isAuthenticated) {
        navigate("/login");
      }
    }, [isAuthenticated, loading, navigate]);

    if (loading) {
      return <div>Loading...</div>; 
    }

    return isAuthenticated ? <Component {...props} /> : null;
  };
};

export default withGuard;
