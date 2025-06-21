import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from '@/src/components/ui/label'
import { searchedQuery } from '@/store/atoms/jobs'
import { useRecoilState } from 'recoil'
const filterData = [
  {
    filterType: "Location",
    array: ["San Francisco","Bangalore","California","Hyderabad","Mumbai"]
  },
  {
    filterType : "Industry",
    array: ["Frontend developer","Backend developer","FullStack Developer"]
  },
  {
     filterType: "Salary",
     array: ["0-40k","40-1lakh","1-5lakh"]
  }
]
const FilterCard = () => {
  const [searchQuery,setSearchQuery] = useRecoilState(searchedQuery);
  const[selectedValue,setSelectedValue] = useState('');
  const changeHandler = (value)=>{
      setSelectedValue(value);
  }
  useEffect(()=>{
     setSearchQuery(selectedValue)
  },[selectedValue])
  return (
    <div>
      <div className='font-bold text-lg'>Filter Card</div>
      <div>
        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
         {
          filterData.map((data,index)=>(
            <div key={index}>
              <h1 className='font-bold text-lg'>{data.filterType}</h1>
              {
                data.array.map((item,idx)=>{
                  const itemId = `idx${index}-${idx}`
                  return (
                    <div key={itemId} className='flex items-center space-x-2 my-2'>
                      <RadioGroupItem value={item} id={itemId}/>
                      <Label htmlFor={itemId}>{item}</Label>
                    </div>
                  )
                })
              }
            </div>
          ))
         }
        </RadioGroup>
      </div>
    </div>
  )
}

export default FilterCard