"use client"
import React, { useState, createContext } from 'react'
import DashboardTubelightNav from './_components/DashboardTubelightNav';
import { LiveblocksProvider } from '@/liveblocks.config';
import { SearchContext } from './contexts/SearchContext';

// Create context for document info
const DocumentContext = createContext<{
  documentId?: string;
  currentContent?: string;
  onVersionSelect?: (content: string, version: number) => void;
  setDocumentInfo: (info: { documentId?: string; currentContent?: string; onVersionSelect?: (content: string, version: number) => void }) => void;
}>({
  setDocumentInfo: () => {}
});

function layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {

    
    // Document context state
    const [documentInfo, setDocumentInfo] = useState<{
      documentId?: string;
      currentContent?: string;
      onVersionSelect?: (content: string, version: number) => void;
    }>({});

    // Search context state
    const [searchInput, setSearchInput] = useState<string>('');

  return (
    <DocumentContext.Provider value={{...documentInfo, setDocumentInfo}}>
      <SearchContext.Provider value={{ searchInput, setSearchInput }}>
        {/* Wrap the entire dashboard in the LiveblocksProvider */}
        <LiveblocksProvider>
          <div className="min-h-screen bg-[#0a0a0f]">
            <div className="relative bg-[#0a0a0f] min-h-screen">
              {/* Dashboard Tubelight Navbar */}
              <DashboardTubelightNav onSearchInput={setSearchInput} />
              
              {/* Main Content Area */}
              <div className="flex-1 overflow-auto">
                {children}
              </div>
            </div>
          </div>
        </LiveblocksProvider>
      </SearchContext.Provider>
    </DocumentContext.Provider>
  )
}

export default layout
