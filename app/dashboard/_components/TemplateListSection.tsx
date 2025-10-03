import Templates from '@/app/(data)/Templates'
import React, { useEffect, useState } from 'react'
import SpotlightCard from "@/components/SpotlightCard"

export interface TEMPLATE{
    name:string,
    desc:string,
    icon:string,
    category:string,
    slug:string,
    aiPrompt:string,
    form?:FORM[]
}

export interface FORM{
    label:string,
    field:string,
    name:string,
    required?:boolean
}

function TemplateListSection({userSearchInput}:any) {

  const [templateList,setTemplateList]=useState(Templates)
  useEffect(()=>{
    
    if(userSearchInput)
      {
        const filterData=Templates.filter(item=>
          item.name.toLowerCase().includes(userSearchInput.toLowerCase())
        );
        setTemplateList(filterData);
      }
      else{
        setTemplateList(Templates)
      }
  },[userSearchInput])

  // const gradients = [
  //   'linear-gradient(145deg, #8B5CF6, #4C1D95)',
  //   'linear-gradient(210deg, #A855F7, #581C87)',
  //   'linear-gradient(165deg, #C084FC, #6B21A8)',
  //   'linear-gradient(195deg, #DDD6FE, #5B21B6)',
  //   'linear-gradient(225deg, #EDE9FE, #4C1D95)',
  //   'linear-gradient(135deg, #F3E8FF, #7C3AED)'
  // ];

  return (
    <div className='w-full py-10 px-8'>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-7xl mx-auto ">
        {templateList.map((template, index) => {
          // const gradient = gradients[index % gradients.length];
          
          return (
            <div
              key={template.slug}
              onClick={() => window.location.href = `/dashboard/content/${template.slug}/${Date.now()}`}
               className="cursor-pointer rounded-2xl shadow-lg hover:scale-[1.02] transition-all duration-300 border border-purple-600"
            >
              <SpotlightCard
                className="h-64"
                spotlightColor="rgba(166, 14, 216, 0.59)"
              >
              <div 
                className="w-full h-full flex flex-col items-center justify-center text-center relative overflow-hidden"
                // style={{ background: gradient }}
              >
                {/* Icon */}
                <div className="flex items-center justify-center w-16 h-16 mb-4 bg-white/20 rounded-xl backdrop-blur-sm">
                  <span className="text-3xl">{template.icon}</span>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {template.name}
                  </h3>
                  <p className="text-sm text-white/80 mb-4 line-clamp-2">
                    {template.desc}
                  </p>
                  <div className="flex items-center justify-center">
                    <span className="px-3 py-1 bg-white/20 rounded-full text-xs text-white/90 border border-white/30">
                      {template.category}
                    </span>
                  </div>
                </div>

                {/* Overlay for better text readability */}
                <div className="absolute inset-0 "></div>
              </div>
              </SpotlightCard>
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default TemplateListSection
