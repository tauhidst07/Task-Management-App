import React from 'react'

const Filter = ({setStatus,setSortBy}) => {
  return (
    <div className='md:w-[700px] flex items-center shadow-md gap-x-10 justify-end mt-4 '>
        <div> 
            <p className='font-semibold'>SORT BY:</p>
            <select onChange={(e)=>setSortBy(e.target.value)}>
                <option value="">None</option> 
                <option value="priority">Priority</option> 
                <option value="deadline">Deadline</option>
            </select>
        </div> 
        <div> 
            <p className='font-semibold'>STATUS:</p>
            <select onChange={(e)=>setStatus(e.target.value)}>
                <option value="">All</option> 
                <option value="completed">Completed</option> 
                <option value="pending">Pending</option>
            </select>
        </div>
    </div>
  )
}

export default Filter