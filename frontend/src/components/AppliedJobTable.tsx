import React from 'react'
import {Table,TableBody, TableCaption, TableHead, TableHeader, TableRow,TableCell } from './ui/table'
import { Badge } from './ui/badge'
import { useRecoilValue } from 'recoil'
import { allAppliedJobs } from '@/store/atoms/jobs'

const AppliedJobTable = () => {
    const appliedJobs = useRecoilValue(allAppliedJobs);
  return (
    <div>
        <Table>
            <TableCaption>A List of Your Applied Jobs</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Job role</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead className='text-right'>Status</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    appliedJobs?.length <= 0 ? <span>You haven't applied any job yet </span> : appliedJobs?.map((appliedJob)=>(
                        <TableRow key={appliedJob.id}>
                            <TableCell>{appliedJob?.job?.createdAt?.split("T")[0]}</TableCell>
                            <TableCell>{appliedJob?.job?.title}</TableCell>
                            <TableCell>{appliedJob?.job?.company?.companyName}</TableCell>
                            <TableCell className='text-right'><Badge className={`${appliedJob?.status == "rejected" ? 'bg-red-400' : appliedJob.status=="pending" ? 'bg-gray-400' : 'bg-green-400'} `}>{appliedJob?.status.toUpperCase()}</Badge></TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    </div>
  )
}

export default AppliedJobTable