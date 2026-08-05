const fs = require('fs');

let code = fs.readFileSync('src/App.jsx', 'utf8');

if (!code.includes('gsap')) {
  const imports = `import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
`;
  code = code.replace(/import React,.*?;\n/, match => match + imports);
}

// Replace the main layout return block
const appBodyRegex = /return \([\s\S]*?\);\s*\}/;
const newAppBody = `return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-slate-900 selection:text-white bg-[#f0f6ff] w-full max-w-full">
      {/* GLOBAL HEADER */}
      <GlobalHeader searchQuery={searchQuery} onSearchChange={handleSearchChange} />

      {/* MAIN CONTENT AREA WITH ASHOK STAMBH WATERMARK */}
      <div id="cards-container" className="flex-1 flex flex-col w-full relative">
        
        {/* Ashok Stambh Watermark */}
        <div id="watermark-bg" className="absolute inset-0 z-0 pointer-events-none select-none">
          <div className="h-screen w-full flex items-center justify-center p-4 sm:p-8 overflow-hidden">
            <img
              src="/image.png"
              alt="Ashok Stambh Watermark"
              className={\`w-auto max-w-[92vw] object-contain opacity-[0.05] grayscale filter drop-shadow-sm transition-all duration-500 \${selectedPage === 'KYCDI'
                ? 'h-full max-h-[300px] sm:max-h-[400px] md:max-h-[500px] lg:max-h-[550px]'
                : 'h-full max-h-[580px] sm:max-h-[780px] md:max-h-[950px] lg:max-h-[1100px]'
                }\`}
            />
          </div>
        </div>

        <div className="relative z-10 flex-1 flex flex-col w-full">
          {selectedPage === null ? (
            <main className="flex-1 w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 py-6 sm:py-8 lg:py-10">
              {query && filteredMainTools.length === 0 && filteredSubTools.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 opacity-0 animate-fade-in" style={{ animation: 'fadeIn 0.4s ease-out forwards' }}>
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4 sm:mb-5">
                    <svg className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-[#1e2a52] mb-1 sm:mb-2 text-center">No matching intelligence modules found</h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium text-center">Try adjusting your search query.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-8">
                  {/* Top-Level Categories */}
                  {(!query || filteredMainTools.length > 0) && (
                    <div>
                      {query && <h2 className="text-xl font-bold text-[#1e2a52] mb-4">Main Categories</h2>}
                      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
                        {filteredMainTools.map((tool, index) => (
                          <div className="tool-card-gsap" key={tool.name}>
                            <ToolCard tool={tool} index={index} onClick={handleToolClick} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sub-Tools */}
                  {query && filteredSubTools.length > 0 && (
                    <div className="mt-4 pt-6 border-t border-slate-200">
                      <h2 className="text-xl font-bold text-[#1e2a52] mb-4">Inner Intelligence Tools</h2>
                      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-5">
                        {filteredSubTools.map((tool, index) => (
                          <div className="tool-card-gsap" key={\`\${tool.parentId}-\${tool.id}\`}>
                            <ToolCard tool={tool} index={index} onClick={handleToolClick} />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </main>
          ) : selectedPage === "CDR" ? <CDRPage onBack={handleBack} searchQuery={searchQuery} />
            : selectedPage === "SDR" ? <SDRPage onBack={handleBack} searchQuery={searchQuery} />
              : selectedPage === "TDR" ? <TDRPage onBack={handleBack} searchQuery={searchQuery} />
                : selectedPage === "ILD" ? <ILDPage onBack={handleBack} searchQuery={searchQuery} />
                  : selectedPage === "ITDR" ? <ITDRPage onBack={handleBack} searchQuery={searchQuery} />
                    : selectedPage === "IPDR" ? <IPDRPage onBack={handleBack} searchQuery={searchQuery} />
                      : selectedPage === "IDR" ? <IDRPage onBack={handleBack} searchQuery={searchQuery} />
                        : selectedPage === "LAR" ? <LARPage onBack={handleBack} searchQuery={searchQuery} />
                          : selectedPage === "OSINT" ? <OSINTPage onBack={handleBack} searchQuery={searchQuery} />
                            : selectedPage === "SMI" ? <SMIPage onBack={handleBack} searchQuery={searchQuery} />
                              : selectedPage === "BSAR" ? <BSARPage onBack={handleBack} searchQuery={searchQuery} />
                                : selectedPage === "BRI" ? <BRIPage onBack={handleBack} searchQuery={searchQuery} />
                                  : selectedPage === "RTOI" ? <RTOIPage onBack={handleBack} searchQuery={searchQuery} />
                                    : selectedPage === "PRI" ? <PRIPage onBack={handleBack} searchQuery={searchQuery} />
                                      : selectedPage === "LIH" ? <LIHPage onBack={handleBack} searchQuery={searchQuery} />
                                        : selectedPage === "BI" ? <BIPage onBack={handleBack} searchQuery={searchQuery} />
                                          : selectedPage === "FRI" ? <FRIPage onBack={handleBack} searchQuery={searchQuery} />
                                            : selectedPage === "LRI" ? <LRIPage onBack={handleBack} searchQuery={searchQuery} />
                                              : selectedPage === "ERI" ? <ERIPage onBack={handleBack} searchQuery={searchQuery} />
                                                : selectedPage === "KYCDI" ? <KYCDIPage onBack={handleBack} searchQuery={searchQuery} />
                                                  : selectedPage === "PSRI" ? <PSRIPage onBack={handleBack} searchQuery={searchQuery} />
                                                    : selectedPage === "CoRI" ? <CoRIPage onBack={handleBack} searchQuery={searchQuery} />
                                                      : selectedPage === "PORI" ? <PORIPage onBack={handleBack} searchQuery={searchQuery} />
                                                        : selectedPage === "TGRI" ? <TGRIPage onBack={handleBack} searchQuery={searchQuery} />
                                                          : selectedPage === "GHLRI" ? <GHLRIPage onBack={handleBack} searchQuery={searchQuery} />
                                                            : selectedPage === "PPRI" ? <PPRIPage onBack={handleBack} searchQuery={searchQuery} />
                                                              : selectedPage === "RII" ? <RIIPage onBack={handleBack} searchQuery={searchQuery} />
                                                                : selectedPage === "PCRI" ? <PCRIPage onBack={handleBack} searchQuery={searchQuery} />
                                                                  : selectedPage === "CRI" ? <CRIPage onBack={handleBack} searchQuery={searchQuery} />
                                                                    : selectedPage === "MDRI" ? <MDRIPage onBack={handleBack} searchQuery={searchQuery} />
                                                                      : selectedPage === "AboutUs" ? <AboutUsPage onBack={handleBack} searchQuery={searchQuery} />
                                                                        : selectedPage === "AccountSetting" ? <AccountSettingPage onBack={handleBack} searchQuery={searchQuery} />
                                                                          : query !== "" ? (
                                                                            <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 pt-2 pb-2 overflow-x-hidden flex-1 flex flex-col">
                                                                              <main className="flex-1 pt-2 pb-2">
                                                                                <div className="mb-4 space-y-6">
                                                                                  {filteredMainTools.length > 0 && (
                                                                                    <div>
                                                                                      <h2 className="text-lg font-bold text-slate-800 mb-4 px-1 flex items-center gap-2">
                                                                                        <span>Matching Categories</span>
                                                                                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">{filteredMainTools.length}</span>
                                                                                      </h2>
                                                                                      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
                                                                                        {filteredMainTools.map((tool, idx) => (
                                                                                          <div className="tool-card-gsap" key={tool.id}>
                                                                                            <ToolCard tool={tool} index={idx} onClick={(t) => { setSearchQuery(''); handleToolClick(t); }} />
                                                                                          </div>
                                                                                        ))}
                                                                                      </div>
                                                                                    </div>
                                                                                  )}

                                                                                  {filteredMainTools.length === 0 && (
                                                                                    <div className="text-center py-16 bg-white rounded-2xl border border-slate-200/80 shadow-sm text-slate-500">
                                                                                      <p className="text-base font-semibold text-slate-700">No tools found matching "{searchQuery}"</p>
                                                                                      <p className="text-xs text-slate-400 mt-1">Try searching with a different term or keyword.</p>
                                                                                    </div>
                                                                                  )}
                                                                                </div>
                                                                              </main>
                                                                            </div>
                                                                          ) : (
                                                                            <div className="w-full max-w-[1720px] mx-auto px-4 sm:px-6 md:px-10 pt-2 pb-2 overflow-x-hidden flex-1 flex flex-col">
                                                                              <main className="flex-1 pt-2 pb-2">
                                                                                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-4 md:gap-5">
                                                                                  {NEXORA_MODULES.map((tool, idx) => (
                                                                                    <div className="tool-card-gsap" key={tool.id}>
                                                                                      <ToolCard
                                                                                        tool={tool}
                                                                                        index={idx}
                                                                                        onClick={handleToolClick}
                                                                                      />
                                                                                    </div>
                                                                                  ))}
                                                                                </div>
                                                                              </main>
                                                                            </div>
                                                                          )}
        </div>
      </div>

      {/* GLOBAL FOOTER */}
      <GlobalFooter pageName="NEXORA INTELLIGENCE" audience="Law Enforcement & Security Agencies" />
    </div>
  );
}`;

code = code.replace(appBodyRegex, newAppBody);

const useGSAPHook = `
  useGSAP(() => {
    // Revert existing scroll triggers before creating new ones to prevent duplication on re-renders
    ScrollTrigger.getAll().forEach(t => t.kill());

    if (selectedPage === null) {
      // 1. Pin the background watermark
      ScrollTrigger.create({
        trigger: "#cards-container",
        pin: "#watermark-bg",
        start: "top top",
        end: "bottom bottom",
        pinSpacing: false, // Freeze without adding empty space padding
      });

      // 2. Animate cards dynamically
      const cards = gsap.utils.toArray('.tool-card-gsap');
      if(cards.length > 0) {
        gsap.fromTo(cards, 
          {
            y: 60,
            opacity: 0,
            scale: 0.96
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.05,
            ease: "power2.out",
            scrollTrigger: {
              trigger: "#cards-container",
              start: "top 80%", // Start animating when top of container hits 80% down viewport
              end: "bottom top",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    }
  }, { dependencies: [selectedPage, query] }); // hook depends on route and search query changes
`;

if (!code.includes('useGSAP(() => {')) {
  code = code.replace(/const handleSearchChange = \(val\) => \{/, useGSAPHook + '\n  const handleSearchChange = (val) => {');
}

fs.writeFileSync('src/App.jsx', code);
console.log('App.jsx updated with GSAP.');
