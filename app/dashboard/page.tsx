"use client"
import React, { useContext } from 'react'
import TemplateListSection from './_components/TemplateListSection'
import { SearchContext } from './contexts/SearchContext'

function Dashboard() {
  const { searchInput } = useContext(SearchContext);
  
  return (
    <div className='min-h-screen bg-black'>
        <div className='m-5 p-5 border border-purple-500/50 rounded-2xl bg-black shadow-2xl'>
            {/* Header Section with Title */}
            <div className='p-10 flex flex-col justify-center items-center'>
                <h2 className='text-3xl font-bold text-white'>Browse all Templates</h2>
                <p className='text-gray-300 mt-2'>What would you like to create today?</p>
            </div>

            {/* Template List Section  */}
            <TemplateListSection userSearchInput={searchInput} />
        </div>
    </div>
  )
}

export default Dashboard
