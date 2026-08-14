import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PaperTexture = () => (
  <div
    className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
    }}
  />
);

const CardContent = ({ section, animateText, index, totalCount }) => {
  if (!section) return null;

  const container = {
    hidden: { opacity: 1 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="w-full h-full bg-white p-8 sm:p-12 flex flex-col justify-center items-center absolute group overflow-hidden">

      {/* Eye-catching Interactive Frame */}
      {/* A stunning glowing frame with sliding corners that appears on hover */}
      <div className="absolute inset-3 sm:inset-4 rounded-xl border border-blue-200/0 group-hover:border-blue-500/50 transition-all duration-700 ease-out shadow-[0_0_0px_rgba(59,130,246,0)] group-hover:shadow-[inset_0_0_40px_rgba(59,130,246,0.1),0_0_20px_rgba(59,130,246,0.15)] pointer-events-none z-10" />

      <div className="absolute inset-0 pointer-events-none z-20">
        {/* Animated corner notches that slide in to frame the text */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-transparent group-hover:border-blue-500 group-hover:top-6 group-hover:left-6 transition-all duration-700 ease-out opacity-0 group-hover:opacity-100" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-transparent group-hover:border-blue-500 group-hover:top-6 group-hover:right-6 transition-all duration-700 ease-out opacity-0 group-hover:opacity-100" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-transparent group-hover:border-blue-500 group-hover:bottom-6 group-hover:left-6 transition-all duration-700 ease-out opacity-0 group-hover:opacity-100" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-transparent group-hover:border-blue-500 group-hover:bottom-6 group-hover:right-6 transition-all duration-700 ease-out opacity-0 group-hover:opacity-100" />
      </div>

      <PaperTexture />

      {/* Massive subtle background number */}
      {index !== undefined && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[calc(180px*var(--text-scale,1))] sm:text-[calc(240px*var(--text-scale,1))] font-black text-slate-100 opacity-50 pointer-events-none select-none z-10 group-hover:scale-105 group-hover:text-blue-50 transition-all duration-700 ease-out">
          {String(index + 1).padStart(2, '0')}
        </div>
      )}

      <motion.div
        className="w-full h-full relative z-30 overflow-y-auto pt-2 pb-8 sm:pt-4 sm:pb-12 px-2 sm:px-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-blue-200/50 hover:[&::-webkit-scrollbar-thumb]:bg-blue-400/80 [&::-webkit-scrollbar-thumb]:rounded-full"
        variants={animateText ? container : undefined}
        initial={animateText ? "hidden" : undefined}
        animate={animateText ? "show" : undefined}
        onWheel={(e) => {
          const target = e.currentTarget;
          const isAtTop = target.scrollTop <= 0;
          const isAtBottom = target.scrollHeight - target.scrollTop <= target.clientHeight + 1;
          
          if ((e.deltaY < 0 && !isAtTop) || (e.deltaY > 0 && !isAtBottom)) {
            e.stopPropagation();
          }
        }}
      >
        <div className="flex flex-col items-center justify-start min-h-full text-center relative z-30">
          {index !== undefined && (
            <motion.div variants={animateText ? item : undefined} className="text-blue-500 font-bold tracking-[0.3em] text-[calc(10px*var(--text-scale,1))] sm:text-xs mb-3 sm:mb-4 uppercase opacity-80 group-hover:opacity-100 transition-all duration-700 ease-out shrink-0">
              {String(index + 1).padStart(2, '0')} &mdash; {totalCount}
            </motion.div>
          )}

          <motion.h2 variants={animateText ? item : undefined} className="text-xl sm:text-2xl font-black tracking-[0.15em] text-slate-800 mb-3 sm:mb-4 uppercase drop-shadow-sm group-hover:text-blue-600 transition-all duration-700 ease-out shrink-0">
            {section.title}
          </motion.h2>

          <motion.div variants={animateText ? item : undefined} className="w-12 h-[2px] bg-slate-300 mb-4 sm:mb-5 rounded-full group-hover:w-24 group-hover:bg-blue-500 transition-all duration-700 ease-out shrink-0" />

          <motion.p variants={animateText ? item : undefined} className="text-slate-600 whitespace-pre-line text-sm sm:text-base font-medium leading-relaxed w-full text-justify group-hover:text-slate-800 transition-colors duration-700 ease-out">
            {section.description}
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};

const BackfaceStamp = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="absolute inset-0 flex items-center justify-center opacity-40">
      <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-slate-200 flex items-center justify-center rotate-[-15deg]">
        <span className="text-slate-300 font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase text-sm sm:text-xl text-center leading-tight">
          CONFIDENTIAL<br />REPORT
        </span>
      </div>
    </div>
  </div>
);

const PaperSlice = ({ section, x, y, w, h, isBackface, index, totalCount }) => {
  const contentWidth = 10000 / w;
  const contentHeight = 10000 / h;
  const shiftX = -(x / w) * 100;
  const shiftY = -(y / h) * 100;

  if (isBackface) {
    return (
      <div className="absolute inset-0 overflow-hidden bg-slate-50 border-[0.5px] border-slate-300/40 shadow-[inset_0_0_20px_rgba(0,0,0,0.03)]" style={{ backfaceVisibility: 'hidden' }}>
        <PaperTexture />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-white" style={{ backfaceVisibility: 'hidden' }}>
      <div className="absolute" style={{ width: `${contentWidth}%`, height: `${contentHeight}%`, left: `${shiftX}%`, top: `${shiftY}%` }}>
        <CardContent section={section} index={index} totalCount={totalCount} />
      </div>
    </div>
  );
};

const FoldingView = ({ content, mode, index, totalCount }) => {
  const isFolding = mode === 'folding_next';

  // Two separate transitions: one for rotations (5 points), one for light glares (9 points)
  const rotTransition = { duration: 1.2, ease: "easeInOut", times: [0, 0.25, 0.5, 0.75, 1] };
  const lightTransition = { duration: 1.2, ease: "linear", times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1] };

  const topRot = isFolding ? [0, -180, -180, -180, -180] : [-180, -180, -180, -180, 0];
  const botRot = isFolding ? [0, 0, 180, 180, 180] : [180, 180, 180, 0, 0];
  const leftRot = isFolding ? [0, 0, 0, 180, 180] : [180, 180, 0, 0, 0];
  const rightRot = isFolding ? [0, 0, 0, 0, -180] : [-180, 0, 0, 0, 0];

  const topZ = isFolding ? [0, 1, 1, 1, 1] : [1, 1, 1, 1, 0];
  const botZ = isFolding ? [0, 0, 2, 2, 2] : [2, 2, 2, 0, 0];
  const leftZ = isFolding ? [0, 0, 0, 10, 10] : [10, 10, 0, 0, 0];
  const rightZ = isFolding ? [0, 0, 0, 0, 20] : [20, 0, 0, 0, 0];

  const topShadow = isFolding ? [0, 1, 1, 1, 1] : [1, 1, 1, 1, 0];
  const botShadow = isFolding ? [0, 0, 1, 1, 1] : [1, 1, 1, 0, 0];
  const leftShadow = isFolding ? [0, 0, 0, 1, 1] : [1, 1, 0, 0, 0];
  const rightShadow = isFolding ? [0, 0, 0, 0, 1] : [1, 0, 0, 0, 0];

  // Specular light glares that spike exactly at the 90-degree mark of each fold
  const topLight = isFolding
    ? [0, 0.4, 0, 0, 0, 0, 0, 0, 0]
    : [0, 0, 0, 0, 0, 0, 0, 0.4, 0];

  const botLight = isFolding
    ? [0, 0, 0, 0.4, 0, 0, 0, 0, 0]
    : [0, 0, 0, 0, 0, 0.4, 0, 0, 0];

  const leftLight = isFolding
    ? [0, 0, 0, 0, 0, 0.4, 0, 0, 0]
    : [0, 0, 0, 0.4, 0, 0, 0, 0, 0];

  const rightLight = isFolding
    ? [0, 0, 0, 0, 0, 0, 0, 0.4, 0]
    : [0, 0.4, 0, 0, 0, 0, 0, 0, 0];

  const shadowAlpha = 0.2;
  const shadowMap = arr => arr.map(v => v * shadowAlpha);

  const cols = [
    { x: 0, w: 25, rot: leftRot, z: leftZ, origin: 'origin-right' },
    { x: 25, w: 50, rot: [0, 0, 0], z: [0, 0, 0], origin: 'origin-center' },
    { x: 75, w: 25, rot: rightRot, z: rightZ, origin: 'origin-left' }
  ];

  return (
    <div className="relative w-full h-full" style={{ perspective: 2500 }}>
      {cols.map((col, i) => (
        <motion.div
          key={i}
          className={`absolute h-[50%] top-[25%] ${col.origin}`}
          style={{ left: `${col.x}%`, width: `${col.w}%`, transformStyle: 'preserve-3d' }}
          animate={{ rotateY: col.rot, z: col.z }}
          transition={rotTransition}
        >
          {/* Top Flap */}
          <motion.div
            className="absolute top-[-50%] left-0 w-full h-[50%] origin-bottom"
            style={{ transformStyle: 'preserve-3d' }}
            animate={{ rotateX: topRot, z: topZ }}
            transition={rotTransition}
          >
            <PaperSlice section={content} x={col.x} y={0} w={col.w} h={25} isBackface={false} index={index} totalCount={totalCount} />
            <motion.div className="absolute inset-0 bg-black pointer-events-none" animate={{ opacity: shadowMap(topShadow) }} transition={rotTransition} />

            {/* Front Specular Glare */}
            <motion.div className="absolute inset-0 bg-gradient-to-b from-white/80 to-transparent pointer-events-none" animate={{ opacity: topLight }} transition={lightTransition} />
            {col.x === 0 && <motion.div className="absolute inset-0 bg-gradient-to-r from-white/80 to-transparent pointer-events-none" animate={{ opacity: leftLight }} transition={lightTransition} />}
            {col.x === 75 && <motion.div className="absolute inset-0 bg-gradient-to-l from-white/80 to-transparent pointer-events-none" animate={{ opacity: rightLight }} transition={lightTransition} />}

            <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}>
              <PaperSlice section={content} x={col.x} y={0} w={col.w} h={25} isBackface={true} />
            </div>
          </motion.div>

          {/* Center Row */}
          <div className="absolute top-0 left-0 w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
            <PaperSlice section={content} x={col.x} y={25} w={col.w} h={50} isBackface={false} index={index} totalCount={totalCount} />

            {/* Cast shadows on the center surface */}
            <motion.div className="absolute top-0 w-full h-[50%] bg-black pointer-events-none z-10" animate={{ opacity: shadowMap(topShadow) }} transition={rotTransition} />
            <motion.div className="absolute bottom-0 w-full h-[50%] bg-black pointer-events-none z-10" animate={{ opacity: shadowMap(botShadow) }} transition={rotTransition} />

            {col.w === 50 && (
              <>
                <motion.div className="absolute left-0 w-[50%] h-full bg-black pointer-events-none z-20" animate={{ opacity: shadowMap(leftShadow) }} transition={rotTransition} />
                <motion.div className="absolute right-0 w-[50%] h-full bg-black pointer-events-none z-20" animate={{ opacity: shadowMap(rightShadow) }} transition={rotTransition} />
              </>
            )}

            {/* Specular Glare for Left/Right Columns */}
            {col.x === 0 && <motion.div className="absolute inset-0 bg-gradient-to-r from-white/80 to-transparent pointer-events-none z-30" animate={{ opacity: leftLight }} transition={lightTransition} />}
            {col.x === 75 && <motion.div className="absolute inset-0 bg-gradient-to-l from-white/80 to-transparent pointer-events-none z-30" animate={{ opacity: rightLight }} transition={lightTransition} />}

            <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}>
              <PaperSlice section={content} x={col.x} y={25} w={col.w} h={50} isBackface={true} />
            </div>
          </div>

          {/* Bottom Flap */}
          <motion.div
            className="absolute top-[100%] left-0 w-full h-[50%] origin-top"
            style={{ transformStyle: 'preserve-3d' }}
            animate={{ rotateX: botRot, z: botZ }}
            transition={rotTransition}
          >
            <PaperSlice section={content} x={col.x} y={75} w={col.w} h={25} isBackface={false} index={index} totalCount={totalCount} />
            <motion.div className="absolute inset-0 bg-black pointer-events-none" animate={{ opacity: shadowMap(botShadow) }} transition={rotTransition} />

            {/* Front Specular Glare */}
            <motion.div className="absolute inset-0 bg-gradient-to-t from-white/80 to-transparent pointer-events-none" animate={{ opacity: botLight }} transition={lightTransition} />
            {col.x === 0 && <motion.div className="absolute inset-0 bg-gradient-to-r from-white/80 to-transparent pointer-events-none" animate={{ opacity: leftLight }} transition={lightTransition} />}
            {col.x === 75 && <motion.div className="absolute inset-0 bg-gradient-to-l from-white/80 to-transparent pointer-events-none" animate={{ opacity: rightLight }} transition={lightTransition} />}

            <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}>
              <PaperSlice section={content} x={col.x} y={75} w={col.w} h={25} isBackface={true} />
            </div>
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

const ExpandingView = ({ toContent, mode, index, totalCount }) => {
  const isExpanding = mode === 'expanding_next';

  const scale = isExpanding ? [0.5, 1] : [1, 0.5];
  const times = [0, 1];

  const opBackface = isExpanding ? [1, 0] : [0, 1];

  return (
    <div className="relative w-full h-full">
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-[4px] shadow-[0_20px_50px_rgba(0,0,0,0.08)] bg-white origin-center"
        initial={{ scale: scale[0] }}
        animate={{ scale }}
        transition={{ duration: 0.7, times, ease: "easeInOut" }}
      >
        <motion.div
          className="absolute inset-0 z-20"
          initial={{ opacity: opBackface[0] }}
          animate={{ opacity: opBackface }}
          transition={{ duration: 0.7, times, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 bg-slate-50 border border-slate-200">
            <PaperTexture />
            <BackfaceStamp />
          </div>
        </motion.div>

        <div className="absolute inset-0 z-10">
          <CardContent section={toContent} animateText={isExpanding} index={index} totalCount={totalCount} />
        </div>
      </motion.div>
    </div>
  );
};

export default function InfiniteFoldingCard({ data = [], heading = "Purpose of NEXORA", onBack }) {
  const [viewState, setViewState] = useState({
    mode: 'idle', // 'idle', 'folding_next', 'expanding_next', 'shrinking_prev', 'unfolding_prev'
    currentIndex: 0,
    targetIndex: 0,
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isDropdownOpen]);

  if (!data || data.length === 0) {
    return <div className="min-h-screen flex items-center justify-center">Loading or No Data Available...</div>;
  }

  const delay = (ms) => new Promise(res => setTimeout(res, ms));

  const jumpTo = async (target, direction = 'next') => {
    if (viewState.mode !== 'idle') return;

    if (direction === 'next') {
      setViewState({ mode: 'folding_next', currentIndex: viewState.currentIndex, targetIndex: target });
      await delay(1200);
      setViewState({ mode: 'expanding_next', currentIndex: viewState.currentIndex, targetIndex: target });
      await delay(700);
    } else {
      setViewState({ mode: 'shrinking_prev', currentIndex: viewState.currentIndex, targetIndex: target });
      await delay(700);
      setViewState({ mode: 'unfolding_prev', currentIndex: viewState.currentIndex, targetIndex: target });
      await delay(1200);
    }

    setViewState({ mode: 'idle', currentIndex: target, targetIndex: target });
  };

  const handleNext = () => {
    if (viewState.mode !== 'idle') return;
    const target = (viewState.currentIndex + 1) % data.length;
    jumpTo(target, 'next');
  };

  const handlePrev = () => {
    if (viewState.mode !== 'idle' || viewState.currentIndex === 0) return;
    const target = (viewState.currentIndex - 1 + data.length) % data.length;
    jumpTo(target, 'prev');
  };

  const renderView = () => {
    const { mode, currentIndex, targetIndex } = viewState;

    const currentContent = data[currentIndex];
    const targetContent = data[targetIndex];

    if (mode === 'idle') {
      return (
        <div className="relative w-full h-full">
          <div className="absolute inset-0 overflow-hidden rounded-[4px] shadow-[0_20px_50px_rgba(0,0,0,0.08)]">
            <CardContent section={currentContent} index={currentIndex} totalCount={data.length} />
          </div>
        </div>
      );
    }

    if (mode === 'folding_next' || mode === 'unfolding_prev') {
      return <FoldingView content={currentContent} mode={mode} index={currentIndex} totalCount={data.length} />;
    }

    if (mode === 'expanding_next' || mode === 'shrinking_prev') {
      return <ExpandingView toContent={targetContent} mode={mode} index={targetIndex} totalCount={data.length} />;
    }
  };

  return (
    <div className="min-h-screen bg-transparent flex flex-col items-center justify-center font-sans w-full px-4 py-12 relative">
      {onBack && (
        <button onClick={onBack}
          className="absolute top-3 left-3 sm:top-6 sm:left-6 md:top-8 md:left-10 z-[100] text-[#1e2a52] hover:text-blue-950 font-bold flex items-center gap-1.5 sm:gap-2 bg-white/90 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full shadow-sm backdrop-blur-md border border-slate-200/90 transition-all hover:shadow-md hover:scale-105 cursor-pointer text-xs sm:text-sm">
          <svg className="w-4 h-4 text-[#1e2a52]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          <span>Back</span>
        </button>
      )}

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] h-[90vw] max-w-[700px] max-h-[700px] bg-blue-400/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-20 mb-8 sm:mb-12 text-center">
        <h1 className="text-3xl sm:text-5xl font-black tracking-[0.2em] uppercase text-slate-800 drop-shadow-sm px-4">
          {heading}
        </h1>
        <div className="w-24 h-[3px] bg-blue-500 mx-auto mt-4 sm:mt-6 rounded-full" />
      </div>

      <div id="card-container" className="w-full max-w-[400px] sm:max-w-[640px] aspect-[4/5] sm:aspect-[4/3] relative z-10">
        {renderView()}
      </div>

      <style>{`
        .cyber-btn {
          border-radius: 0.5em;
          transition: 0.3s;
          background-color: rgba(var(--color), 0.1);
          color: rgb(var(--color));
          fill: rgb(var(--color));
          font-family: monospace;
          font-weight: bolder;
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          cursor: pointer;
          border: 2px solid rgb(var(--color));
          box-shadow: 0 0 10px rgba(var(--color), 0.4);
          outline: none;
          display: flex;
          align-items: center;
          padding: 0.4em 1em;
          gap: 0.5em;
        }
        .cyber-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          filter: grayscale(100%);
        }
        .cyber-btn:not(:disabled):hover {
          box-shadow: 0 0 0 5px rgba(var(--color), 0.5);
          background-color: rgba(var(--color), 0.2);
        }
        .cyber-btn span {
          transform: scale(0.8);
          transition: 0.3s;
        }
        .cyber-btn:not(:disabled):hover span {
          transform: scale(1);
        }
        .cyber-btn:not(:disabled):active {
          transition: 0s;
          box-shadow: 0 0 0 5px rgb(var(--color));
        }

        .cyber-btn-next { --color: 59, 130, 246; }
        .cyber-btn-next svg {
          width: 0;
          opacity: 0;
          transform: scale(0.5) translateX(0%) rotate(-180deg);
          transition: 0.3s;
        }
        .cyber-btn-next:not(:disabled):hover svg {
          width: 20px;
          opacity: 1;
          transform: scale(1) translateX(20%) rotate(0deg);
        }

        .cyber-btn-prev { --color: 100, 116, 139; }
        .cyber-btn-prev svg {
          width: 0;
          opacity: 0;
          transform: scale(0.5) translateX(0%) rotate(180deg);
          transition: 0.3s;
        }
        .cyber-btn-prev:not(:disabled):hover svg {
          width: 20px;
          opacity: 1;
          transform: scale(1) translateX(-20%) rotate(0deg);
        }

        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb { background: #94a3b8; }
      `}</style>
      <div className="flex flex-wrap sm:flex-nowrap justify-center items-center gap-4 sm:gap-6 mt-8 sm:mt-12 relative z-40">
        <button
          onClick={handlePrev}
          disabled={viewState.mode !== 'idle' || viewState.currentIndex === 0}
          className="cyber-btn cyber-btn-prev order-1"
        >
          <ChevronLeft size={20} />
          <span>Prev</span>
        </button>

        <div
          ref={dropdownRef}
          className="relative group flex items-center justify-center gap-3 bg-white/70 hover:bg-white backdrop-blur-xl border border-white/50 px-5 py-2 sm:py-2.5 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all duration-300 order-3 sm:order-2 w-full sm:w-auto mt-2 sm:mt-0 cursor-pointer z-50"
          onClick={() => viewState.mode === 'idle' && setIsDropdownOpen(!isDropdownOpen)}
        >
          <span className="text-blue-500 font-bold text-[calc(10px*var(--text-scale,1))] sm:text-xs uppercase tracking-[0.2em] hidden sm:inline-block">Jump</span>
          
          <div className="flex items-center gap-3 w-full sm:w-auto min-w-[220px]">
            <div className="h-4 w-px bg-slate-300 hidden sm:block" />
            <span className="text-slate-800 font-semibold text-sm flex-1 flex items-center gap-2">
              <span className="text-slate-400 font-mono text-xs">{String(viewState.currentIndex + 1).padStart(2, '0')}</span>
              <span className="truncate max-w-[160px] sm:max-w-[180px]">
                {data[viewState.currentIndex]?.title.replace(/^\d+\.\s*/, '')}
              </span>
            </span>
            <div className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${isDropdownOpen ? 'bg-blue-100 text-blue-600 rotate-180' : 'bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-500'}`}>
               <ChevronRight size={14} className="rotate-90" />
            </div>
          </div>

          {isDropdownOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute bottom-[calc(100%+12px)] left-1/2 -translate-x-1/2 w-full min-w-[320px] bg-white/95 backdrop-blur-2xl border border-white/60 rounded-2xl shadow-[0_-10px_50px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.02)] max-h-[320px] overflow-y-auto z-50 p-2 custom-scrollbar origin-bottom"
              data-lenis-prevent="true"
            >
              {data.map((s, i) => {
                const cleanTitle = s.title.replace(/^\d+\.\s*/, '');
                const isActive = i === viewState.currentIndex;
                return (
                  <div
                    key={i}
                    className={`group/item flex items-center gap-3 px-4 py-3 text-sm font-medium cursor-pointer rounded-xl transition-all duration-200 ${isActive ? 'bg-blue-50 text-blue-700 shadow-[inset_0_0_0_1px_rgba(59,130,246,0.1)]' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsDropdownOpen(false);
                      if (!isActive && viewState.mode === 'idle') {
                        jumpTo(i, i > viewState.currentIndex ? 'next' : 'prev');
                      }
                    }}
                  >
                    <span className={`font-mono text-xs ${isActive ? 'text-blue-500' : 'text-slate-400 group-hover/item:text-slate-500'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="truncate flex-1">
                      {cleanTitle}
                    </span>
                    {isActive && (
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    )}
                  </div>
                );
              })}
            </motion.div>
          )}
        </div>

        <button
          onClick={handleNext}
          disabled={viewState.mode !== 'idle'}
          className="cyber-btn cyber-btn-next order-2 sm:order-3"
        >
          <span>Next</span>
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
