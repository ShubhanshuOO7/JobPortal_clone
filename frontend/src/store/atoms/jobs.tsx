import { atom } from "recoil";

export const alljobs = atom({
    key: "alljobs",
    default: null
})

export const singleJob = atom({
    key: "singleJob",
    default: null
})

export const allAdminJobs = atom({
    key:"allAdminJobs",
    default: []
})

export const searchJobByText = atom({
    key:"searchJobByText",
    default: "",
})

export const allAppliedJobs = atom({
    key :"allAppliedJobs",
    default : null,
})

export const searchedQuery = atom({
    key: "searchedQuery",
    default: null
})