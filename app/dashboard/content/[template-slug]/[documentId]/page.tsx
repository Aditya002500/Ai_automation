// File: app/dashboard/content/[template-slug]/[documentId]/page.tsx
"use client"
import React, { useState, useEffect, useMemo } from 'react'
import FormSection from '../../_components/FormSection'
import { TEMPLATE } from '../../../_components/TemplateListSection'
import Templates from '@/app/(data)/Templates'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Loader2Icon } from 'lucide-react'
import Link from 'next/link'
import { db } from '@/utils/db'
import { AIOutput } from '@/utils/schema'
import { RoomProvider, useOthers, useMyPresence } from '@/liveblocks.config'
import { LiveObject } from '@liveblocks/client'
import { CollaborativeEditor } from '@/components/CollaborativeEditor'
import CollaborativeMindMap from '@/components/CollaborativeMindMap'
import moment from 'moment'
import { useUser } from '@clerk/nextjs'
import * as Y from 'yjs';
import Image from 'next/image'

// A component to show the avatars of other users
function ActiveCollaborators() {
    const others = useOthers();
    return (
        <div className="flex -space-x-2">
            {others.map(({ connectionId, info }) => {
                const userName = info?.name ?? 'Anonymous';
                const userAvatar = info?.avatar;
                
                return (
                    <div key={connectionId} className="relative">
                        {userAvatar ? (
                            <Image 
                                src={userAvatar} 
                                alt={userName} 
                                width={32} 
                                height={32} 
                                className="rounded-full border-2 border-white" 
                                title={userName}
                            />
                        ) : (
                            <div 
                                className="w-8 h-8 rounded-full border-2 border-white bg-gray-800 flex items-center justify-center text-white text-xs font-semibold"
                                title={userName}
                            >
                                {userName.charAt(0).toUpperCase()}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

// A component to show who is currently typing
function TypingIndicator() {
    const others = useOthers();
    const typingUsers = others.filter(({ presence }) => presence?.isTyping);
    
    if (typingUsers.length === 0) return null;
    
    return (
        <div className="text-sm text-purple-300 italic">
            {typingUsers.length === 1 ? (
                <span>{typingUsers[0].info?.name ?? 'Someone'} is typing...</span>
            ) : typingUsers.length === 2 ? (
                <span>{typingUsers[0].info?.name ?? 'Someone'} and {typingUsers[1].info?.name ?? 'someone'} are typing...</span>
            ) : (
                <span>{typingUsers.length} people are typing...</span>
            )}
        </div>
    );
}

// Wrapper component that provides RoomProvider context
function CollaborativeWorkspaceProvider({ children, roomId, initialContent }: { 
    children: React.ReactNode, 
    roomId: string, 
    initialContent: string 
}) {
    return (
        <RoomProvider 
            id={roomId} 
            initialPresence={{ cursor: null, isTyping: false }}
            initialStorage={{ 
                content: initialContent || '',
                mindMap: new LiveObject({
                    root: {
                        id: 'root',
                        text: 'Central Topic',
                        children: [
                            {
                                id: 'child1',
                                text: 'Branch 1',
                                children: []
                            },
                            {
                                id: 'child2',
                                text: 'Branch 2',
                                children: []
                            }
                        ]
                    }
                }),
                contentInitialized: new LiveObject({ initialized: false })
            }}
        >
            {children}
        </RoomProvider>
    );
}

interface PROPS{
    params: Promise<{
        'template-slug':string,
        'documentId': string
    }>
}

function CreateNewContent(props:PROPS) {
    const [params, setParams] = useState<{
        'template-slug': string;
        'documentId': string;
    } | null>(null);
    
    const selectedTemplate:TEMPLATE|undefined=Templates?.find((item)=>item.slug==params?.['template-slug']);
    const [loading,setLoading]=useState(false);
    const [aiOutput,setAiOutput]=useState<string>('');
    const [initialContent,setInitialContent]=useState<string>('');
    const [showForm,setShowForm]=useState<boolean>(true);
    const [activeView, setActiveView] = useState<'editor' | 'mindmap'>('editor');
    const {user}=useUser();
    
    const roomId = params?.documentId || 'default-room';
    const yDoc = useMemo(() => new Y.Doc(), []);
    
    // Unwrap params Promise
    useEffect(() => {
        props.params.then(p => setParams(p));
    }, [props.params]);

    const GenerateAIContent=async(formData:any)=>{
        setLoading(true);
        const selectedTemplatePrompt=selectedTemplate?.aiPrompt;
        const userRequest = JSON.stringify(formData)+", "+selectedTemplatePrompt;

        const systemPrompt = `You are "Creator AI," an expert content creation assistant. Your goal is to provide high-quality, engaging content based on the user's request and template requirements. Follow these guidelines:

1. Create content that matches the specific template requirements exactly
2. Use proper HTML formatting when requested (h1, h2, p, ul, li, strong, em, etc.)
3. Ensure content is well-structured, engaging, and valuable to readers
4. Include specific details, examples, and actionable insights
5. Write in a professional yet accessible tone
6. Make content comprehensive and thorough
7. Follow SEO best practices when applicable

Important: Generate content exactly as requested by the template prompt. If HTML formatting is requested, use proper HTML tags. If plain text is requested, provide clean plain text without any formatting.`;
        const FinalAIPrompt = systemPrompt + userRequest;
        
        try {
            const response = await fetch('/api/generate-template-content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: FinalAIPrompt })
            });
            
            const data = await response.json();
            if (data.error) throw new Error(data.error);
            
            setAiOutput(data.text);
            setInitialContent(data.text);
            await SaveInDb(JSON.stringify(formData),selectedTemplate?.slug,data.text)
        } catch (error) {
            console.error('Content generation failed:', error);
            setAiOutput('Failed to generate content. Please try again.');
        }
        setLoading(false);
    }

    const SaveInDb=async(formData:any,slug:any,aiResp:string)=>{
        if (!params) return;
        const result=await db.insert(AIOutput).values({
            formData:formData,
            templateSlug:slug,
            documentId: params.documentId,
            aiResponse:aiResp,
            createdBy:user?.primaryEmailAddress?.emailAddress,
            createdAt:moment().format('DD/MM/yyyy'),
        });
        console.log(result);
    }

    // Load previously saved content
    useEffect(()=>{
        if (!params) return;
        const load = async()=>{
            try {
                const res:any = await db.query.AIOutput.findFirst({
                    where: (row:any, { eq }:any) => eq(row.documentId, params.documentId),
                    orderBy: (row:any, { desc }:any) => desc(row.id)
                });
                if(res?.aiResponse){
                    setAiOutput(res.aiResponse);
                    setInitialContent(res.aiResponse);
                    console.log('Loaded existing content from database');
                }
                // Always show the form
                setShowForm(true);
            } catch (error) {
                console.error('Error loading content from database:', error);
                // Still show the form even if loading fails
                setShowForm(true);
            }
        };
        load();
    },[params])
    
    if (!params) {
        return (
            <div className='min-h-screen bg-black flex items-center justify-center'>
                <Loader2Icon className='animate-spin w-8 h-8 text-purple-500'/>
            </div>
        );
    }

 return (
    <div className='min-h-screen bg-black'>
        {/* Section 1: Template Title - Full Width with Back Button */}
        <section className='pt-8 px-4'>
            <div className='w-full'>
                <div className='p-6 border border-purple-500/50 rounded-2xl bg-black shadow-2xl mx-4'>
                    {/* Back Button inside the box */}
                    <div className='mb-6'>
                        <Link href="/dashboard">
                            <Button variant="outline" className='border-purple-500/50 text-white hover:bg-purple-500/20 hover:border-purple-400'>
                                <ArrowLeft className='w-4 h-4 mr-2'/> Back to Templates
                            </Button>
                        </Link>
                    </div>
                    
                    <div className='flex flex-col items-center text-center'>
                        <div className='w-20 h-20 flex items-center justify-center text-5xl mb-6 bg-purple-600/20 rounded-2xl border border-purple-400/40'>
                            {selectedTemplate?.icon}
                        </div>
                        <h1 className='text-4xl font-bold text-white mb-4'>{selectedTemplate?.name}</h1>
                        <p className='text-gray-300 text-lg leading-relaxed max-w-2xl'>{selectedTemplate?.desc}</p>
                    </div>
                </div>
            </div>
        </section>

        {/* Section 2: User Questions - Full Width */}
        <section className='pt-8 px-4 bg-gradient-to-b from-black via-purple-950/10 to-black'>
            <div className='w-full'>
                <div className='p-6 border border-purple-500/50 rounded-2xl bg-black shadow-2xl mx-4'>
                    <div className='text-center mb-6'>
                        <h2 className='text-3xl font-bold text-white mb-4'>Enter Your Details</h2>
                        <p className='text-gray-400'>Fill in the information below to generate your content</p>
                    </div>
                    
                    {showForm && selectedTemplate && (
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.currentTarget);
                            const data: any = {};
                            formData.forEach((value, key) => {
                                data[key] = value;
                            });
                            GenerateAIContent(data);
                        }}>
                            {/* Vertical alignment for all form fields */}
                            <div className='flex flex-col space-y-6 max-w-2xl mx-auto'>
                                {selectedTemplate?.form?.map((item, index) => (
                                    <div key={index} className='w-full'>
                                        <label className='block font-semibold text-white mb-3 text-base'>{item.label}</label>
                                        {item.field === 'input' ? (
                                            <input 
                                                type="text"
                                                name={item.name}
                                                placeholder={`Enter ${item.label.toLowerCase()}...`}
                                                className='w-full px-6 py-4 rounded-xl bg-gray-900/50 border border-purple-500/30 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/70 focus:border-purple-400/70 transition-all text-lg'
                                                required={item.required}
                                            />
                                        ) : item.field === 'textarea' ? (
                                            <div className='w-full'>
                                                <textarea 
                                                    name={item.name}
                                                    placeholder={`Enter ${item.label.toLowerCase()}...`}
                                                    rows={6}
                                                    className='w-full px-6 py-4 rounded-xl bg-gray-900/50 border border-purple-500/30 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/70 focus:border-purple-400/70 transition-all resize-none text-lg'
                                                    required={item.required}
                                                />
                                                <label className='text-sm text-purple-300 mt-2 block'>Note: Max 2000 Words</label>
                                            </div>
                                        ) : null}
                                    </div>
                                ))}
                            </div>
                            
                            <div className='mt-8 text-center'>
                                <Button 
                                    type="submit" 
                                    className='px-12 py-4 bg-purple-600/80 hover:bg-purple-600 text-white border border-purple-400/50 rounded-xl font-semibold transition-all text-lg min-w-[200px]'
                                    disabled={loading}
                                >
                                    {loading && <Loader2Icon className='animate-spin mr-3 w-5 h-5'/>}
                                    Generate Content
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </section>

        {/* Section 3: Collaborative Workspace - Full Width */}
        <section className='pt-8 px-4 pb-8'>
            <div className='w-full'>
                <CollaborativeWorkspaceProvider roomId={roomId} initialContent={initialContent}>
                    <div className='border border-purple-500/50 rounded-2xl bg-black shadow-2xl mx-4 overflow-hidden'>
                        <div className='p-5 flex justify-between items-center border-b border-purple-500/20'>
                            <div className='flex flex-col'>
                                <div className='flex items-center gap-4'>
                                    <h3 className='font-medium text-lg text-white'>Collaborative Workspace</h3>
                                    <div className='flex bg-purple-900/30 border border-purple-500/20 rounded-lg p-1'>
                                        <button
                                            onClick={() => setActiveView('editor')}
                                            className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 ${
                                                activeView === 'editor'
                                                    ? 'bg-purple-600/50 text-white border border-purple-400/30'
                                                    : 'text-gray-300 hover:text-white hover:bg-purple-500/20'
                                            }`}
                                        >
                                            Text Editor
                                        </button>
                                        <button
                                            onClick={() => setActiveView('mindmap')}
                                            className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 ${
                                                activeView === 'mindmap'
                                                    ? 'bg-purple-600/50 text-white border border-purple-400/30'
                                                    : 'text-gray-300 hover:text-white hover:bg-purple-500/20'
                                            }`}
                                        >
                                            Mind Map
                                        </button>
                                    </div>
                                </div>
                                <TypingIndicator />
                            </div>
                            <ActiveCollaborators />
                        </div>
                        <div className='p-2'>
                            {activeView === 'editor' ? (
                                <CollaborativeEditor 
                                    document={yDoc}
                                    initialContent={initialContent}
                                />
                            ) : (
                                <CollaborativeMindMap content={initialContent || aiOutput} />
                            )}
                        </div>
                    </div>
                </CollaborativeWorkspaceProvider>
            </div>
        </section>
    </div>
  )
}

export default CreateNewContent
