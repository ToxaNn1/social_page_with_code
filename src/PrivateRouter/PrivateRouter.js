import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRouter = ({user,children}) => {

    if(user === null){
        return <Navigate to='/'></Navigate>
    }

    return children
};

export default PrivateRouter;