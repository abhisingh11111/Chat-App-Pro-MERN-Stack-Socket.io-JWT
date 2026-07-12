import React from 'react'

function Gender({onCheckboxChange,selectGender}) {
  return (
    <div className='flex w-full'>
        <div className="form-control w-full mt-5">
            <label className={`cursor-pointer mr-5 label ${selectGender==='Male'?'selected':''}`}>
              <span className="label-text text-white">Male</span>
              <input type="checkbox" checked={selectGender==='Male'} onChange={()=>onCheckboxChange('Male')} className="checkbox checkbox-info" />
            </label>
        </div>
        <div className="form-control w-full mt-5">
            <label className={`cursor-pointer label ${selectGender==='Female'?'selected':''}`}>
                <span className="label-text text-white">Female</span>
                <input type="checkbox" checked={selectGender==='Female'} onChange={()=>onCheckboxChange('Female')} className="checkbox checkbox-info " />
            </label>
        </div>
    </div>
  )
}

export default Gender