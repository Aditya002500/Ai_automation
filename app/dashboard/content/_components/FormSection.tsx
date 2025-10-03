"use client"
import React, { useState } from 'react'
import { TEMPLATE } from '../../_components/TemplateListSection'
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { AIInput } from '@/components/ui/ai-input';
import { Loader2Icon } from 'lucide-react';

interface Props {
    selectedTemplate?: TEMPLATE;
    userFormInput: (data: any) => void;
    loading: boolean;
}

function FormSection({ selectedTemplate, userFormInput, loading }: Props) {

    const [formData,setFormData]=useState<any>();

    const handleInputChange=(event:any)=>{
        const {name,value}=event.target;
        setFormData({...formData,[name]:value})
    }

    const onSubmit=(e:any)=>{
        e.preventDefault();
        userFormInput(formData)
    }

    const handleAIInputSubmit = (value: string, fieldName: string) => {
        setFormData({...formData, [fieldName]: value});
    };

    return (
        <div className='p-5 shadow-md border border-purple-500/20 rounded-lg bg-gradient-to-br from-purple-900/40 via-black/80 to-purple-800/30 backdrop-blur-sm'>
            <div className='w-16 h-16 flex items-center justify-center text-4xl mb-2'>
                {selectedTemplate?.icon}
            </div>
            <h2 className='font-bold text-2xl mb-2 mt-4 text-white'>{selectedTemplate?.name}</h2>
            <p className='text-gray-300 text-sm'>{selectedTemplate?.desc}</p>

            <form className='mt-6' onSubmit={onSubmit}>
                {selectedTemplate?.form?.map((item, index) => (
                    <div key={index} className='my-2 flex flex-col gap-2 mb-7'>
                        <label className='font-bold text-white'>{item.label}</label>
                        {item.field == 'input' || item.field == 'textarea' ?
                            <div className="relative">
                                <AIInput
                                    placeholder={`Enter your ${item.label.toLowerCase()}...`}
                                    onSubmit={(value) => handleAIInputSubmit(value, item.name)}
                                    className="w-full"
                                />
                                <input 
                                    type="hidden" 
                                    name={item.name} 
                                    value={formData?.[item.name] || ''} 
                                    onChange={handleInputChange}
                                />
                                {item.field == 'textarea' && (
                                    <label className='text-xs text-purple-300 mt-1 block'>Note: Max 2000 Words</label>
                                )}
                            </div>
                            : null
                        }
                    </div>
                ))}
                <Button type="submit" 
                className='w-full py-6 bg-purple-600/50 hover:bg-purple-600/70 text-white border border-purple-400/30'
                disabled={loading}
                >
                    {loading&&<Loader2Icon className='animate-spin mr-2'/>}
                    Generate Content</Button>
            </form>
        </div>
    )
}

export default FormSection
