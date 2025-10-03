
import Templates from '@/app/(data)/Templates'
import { Button } from '@/components/ui/button'
import { db } from '@/utils/db'
import { AIOutput } from '@/utils/schema'
import { currentUser } from '@clerk/nextjs/server'
import { desc, eq } from 'drizzle-orm'
import React from 'react'
import { TEMPLATE } from '../_components/TemplateListSection'
import CopyButton from './_components/CopyButton'

export interface HISTORY{
    id:Number,
    formData:string,
    aiResponse:string,
    templateSlug:string,
    createdBy:string,
    createdAt:string
}
async function History() {
    
    const user=await currentUser();

    {/* @ts-ignore */}
    const HistoryList:HISTORY[]=await db.select().from(AIOutput).where(eq(AIOutput?.createdBy,user?.primaryEmailAddress?.emailAddress))
    .orderBy(desc(AIOutput.id))
    ;

    const GetTemplateName=(slug:string)=>{

        const template:TEMPLATE|any=Templates?.find((item)=>item.slug==slug)
        return template;
    }

    const stripHtmlTags=(html:string)=>{
        return html.replace(/<[^>]*>/g, '');
    }
  return (
    <div className='m-2 sm:m-5 md:m-10 p-4 sm:p-6 md:p-10 border border-purple-900 rounded-lg bg-black'>
        <h2 className='font-bold text-2xl sm:text-3xl text-gray-200'>History</h2>
        <p className='text-sm sm:text-base text-gray-400'>Search your previously generate AI content</p>
        <div className='hidden md:grid grid-cols-7 font-bold bg-purple-800 mt-5 py-3 px-3 rounded-md text-sm'>
            <h2 className='col-span-2 text-gray-200'>TEMPLATE</h2>
            <h2 className='col-span-2 text-gray-200'>AI RESP</h2>
            <h2 className='text-gray-200'>DATE</h2>
            <h2 className='text-gray-200'>WORDS</h2>
            <h2 className='text-gray-200'>COPY</h2>
        </div>
        {HistoryList.map((item:HISTORY,index:number)=>(
            <React.Fragment key={index}>
            <div className='grid grid-cols-1 md:grid-cols-7 my-5 py-3 px-3 hover:bg-slate-700 rounded-md transition-all gap-2 md:gap-0'>
            <h2 className='md:col-span-2 flex gap-2 items-center text-gray-200 text-sm sm:text-base'>
                <div className='w-6 h-6 flex items-center justify-center text-sm'>
                    {GetTemplateName(item?.templateSlug)?.icon}
                </div>
                {GetTemplateName(item.templateSlug)?.name}
            </h2>
            <h2 className='md:col-span-2 line-clamp-2 md:line-clamp-3 mr-3 text-gray-300 text-sm'>{stripHtmlTags(item?.aiResponse)}</h2>
            <h2 className='text-gray-400 text-xs sm:text-sm'><span className='md:hidden font-semibold'>Date: </span>{item.createdAt}</h2>
            <h2 className='text-gray-400 text-xs sm:text-sm'><span className='md:hidden font-semibold'>Words: </span>{item?.aiResponse.length}</h2>
            <h2>
              <CopyButton aiResponse={item.aiResponse} />
            </h2>
        </div>
        <hr className='border-slate-600'/>
            </React.Fragment>
        ))}
    </div>
  )
}

export default History
