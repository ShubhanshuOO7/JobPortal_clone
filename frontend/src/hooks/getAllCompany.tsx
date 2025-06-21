import { useEffect } from "react"
import axios from "axios"
import { USER_ENDPOINT } from "@/config"
import { useRecoilState } from "recoil"
import { alljobs } from "@/store/atoms/jobs"
import { allCompanies } from "@/store/atoms/company"
export const getAllCompany =()=>{
    const[allCompany,setAllCompany] = useRecoilState(allCompanies);
    useEffect(()=>{
        try {
            const fetchAllCompany = async()=>{
                const res = await axios.get(`${USER_ENDPOINT}/api/v1/user/company/get`,{
                    withCredentials : true,
                })
                if(res.data.success){
                    setAllCompany(res.data.companies);
                }
            }
            fetchAllCompany();
        } catch (error) {
            console.log(error)
        }
    },[])
}