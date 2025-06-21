import { atom } from "recoil";

export const singleCompany = atom({
    key: "singleCompany",
    default : null
})

export const allCompanies = atom({
    key: "allCompanies",
    default: []
})

export const searchCompanyByText = atom({
    key: "searchCompanyByText",
    default: ""
})