import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import Loading from '../Components/Shared/Loading';
import auth from '../Firebase/Firbase.init';
 
 
const RequireAuth = ({children}) => {
    const [user,loading] = useAuthState(auth);
    let location = useLocation();
   if (loading ) {
      return <Loading/>
    }
 
 
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace  />;
      }
 
    return children;
};
 
export default RequireAuth;
