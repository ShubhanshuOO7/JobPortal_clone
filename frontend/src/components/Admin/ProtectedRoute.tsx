import { userState } from '@/store/atoms/users'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil'

const ProtectedRoute = ({children}) => {
    const user = useRecoilValue(userState);
    const navigate = useNavigate();
    useEffect(()=>{
        if(user== null || user.role != 'recruiter'){
            navigate("/")
        }
    })
  return (
    <>
    {children};
    </>
  )
}

export default ProtectedRoute