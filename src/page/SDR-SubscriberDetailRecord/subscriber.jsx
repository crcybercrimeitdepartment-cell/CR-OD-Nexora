import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

function GlobalStyles() {
  useEffect(() => {
    document.documentElement.style.color = "#16324f";
    document.documentElement.style.background =
      "radial-gradient(circle at top, rgba(125, 211, 252, 0.35), transparent 32%), radial-gradient(circle at bottom right, rgba(253, 224, 71, 0.28), transparent 24%), linear-gradient(135deg, #f6fbff 0%, #eef6ff 42%, #fffaf0 100%)";
    document.documentElement.style.fontFamily = 'Inter, "Segoe UI", sans-serif';

    document.body.classList.add("m-0", "min-h-screen");

    const rootElement = document.getElementById("root");
    rootElement?.classList.add("min-h-screen");

    return () => {
      document.documentElement.style.color = "";
      document.documentElement.style.background = "";
      document.documentElement.style.fontFamily = "";
      document.body.classList.remove("m-0", "min-h-screen");
      rootElement?.classList.remove("min-h-screen");
    };
  }, []);

  return (
    <style>{`
      @keyframes floatCard {
        0%,
        100% {
          transform: translate3d(0, 0, 0) scale(1);
        }
        25% {
          transform: translate3d(0, -8px, 0) scale(1.03);
        }
        50% {
          transform: translate3d(0, -14px, 0) scale(1.05);
        }
        75% {
          transform: translate3d(0, -6px, 0) scale(1.02);
        }
      }

      .hide-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }

      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
    `}</style>
  );
}

const introClusterPositions = [
  "-translate-x-[50%] -translate-y-[170%]",
  "translate-x-[35%] -translate-y-[155%]",
  "translate-x-[105%] -translate-y-[105%]",
  "translate-x-[150%] -translate-y-[35%]",
  "translate-x-[160%] translate-y-[45%]",
  "translate-x-[120%] translate-y-[120%]",
  "translate-x-[45%] translate-y-[165%]",
  "-translate-x-[30%] translate-y-[175%]",
  "-translate-x-[105%] translate-y-[145%]",
  "-translate-x-[155%] translate-y-[85%]",
  "-translate-x-[175%] translate-y-[10%]",
  "-translate-x-[165%] -translate-y-[65%]",
  "-translate-x-[120%] -translate-y-[125%]",
  "-translate-x-[60%] -translate-y-[165%]",
  "translate-x-[5%] -translate-y-[185%]",
  "translate-x-[85%] -translate-y-[145%]",
];

const introScatterPositions = [
  "-translate-x-[20vw] -translate-y-[11vh] rotate-[-16deg] scale-[1.02]",
  "-translate-x-[15vw] -translate-y-[20vh] rotate-[9deg] scale-[0.98]",
  "-translate-x-[8vw] -translate-y-[25vh] rotate-[-8deg] scale-[1.04]",
  "translate-x-[1vw] -translate-y-[22vh] rotate-[12deg] scale-[0.97]",
  "translate-x-[10vw] -translate-y-[16vh] rotate-[-10deg] scale-[1.03]",
  "translate-x-[18vw] -translate-y-[7vh] rotate-[14deg] scale-[0.98]",
  "translate-x-[20vw] translate-y-[7vh] rotate-[-12deg] scale-[1.01]",
  "translate-x-[12vw] translate-y-[18vh] rotate-[10deg] scale-[0.97]",
  "translate-x-[2vw] translate-y-[24vh] rotate-[-9deg] scale-[1.03]",
  "-translate-x-[8vw] translate-y-[23vh] rotate-[11deg] scale-[0.98]",
  "-translate-x-[17vw] translate-y-[17vh] rotate-[-13deg] scale-[1.02]",
  "-translate-x-[22vw] translate-y-[5vh] rotate-[8deg] scale-[0.97]",
  "-translate-x-[11vw] -translate-y-[3vh] rotate-[-14deg] scale-[1.04]",
  "-translate-x-[1vw] translate-y-[2vh] rotate-[7deg] scale-[0.96]",
  "translate-x-[9vw] translate-y-[3vh] rotate-[-11deg] scale-[1.02]",
  "translate-x-[14vw] -translate-y-[1vh] rotate-[13deg] scale-[0.99]",
];

const introOrbitPositions = [
  "-translate-x-[42%] -translate-y-[205%] rotate-[-18deg]",
  "translate-x-[55%] -translate-y-[182%] rotate-[15deg]",
  "translate-x-[138%] -translate-y-[118%] rotate-[20deg]",
  "translate-x-[188%] -translate-y-[18%] rotate-[10deg]",
  "translate-x-[176%] translate-y-[88%] rotate-[-13deg]",
  "translate-x-[98%] translate-y-[176%] rotate-[12deg]",
  "-translate-x-[5%] translate-y-[205%] rotate-[-16deg]",
  "-translate-x-[102%] translate-y-[180%] rotate-[18deg]",
  "-translate-x-[182%] translate-y-[108%] rotate-[-12deg]",
  "-translate-x-[205%] translate-y-[4%] rotate-[14deg]",
  "-translate-x-[178%] -translate-y-[98%] rotate-[-17deg]",
  "-translate-x-[102%] -translate-y-[182%] rotate-[12deg]",
  "translate-x-[6%] -translate-y-[212%] rotate-[-14deg]",
  "translate-x-[108%] -translate-y-[170%] rotate-[13deg]",
  "translate-x-[184%] -translate-y-[82%] rotate-[-10deg]",
  "translate-x-[205%] translate-y-[18%] rotate-[16deg]",
];

const introLeftRailTargets = [
  "left-[-64px] top-1/2 -translate-y-[248px] rotate-[-6deg] scale-70",
  "left-[-64px] top-1/2 -translate-y-[188px] rotate-[5deg] scale-70",
  "left-[-64px] top-1/2 -translate-y-[128px] rotate-[-7deg] scale-70",
  "left-[-64px] top-1/2 -translate-y-[68px] rotate-[6deg] scale-70",
  "left-[-64px] top-1/2 -translate-y-[8px] rotate-[-5deg] scale-70",
  "left-[-64px] top-1/2 translate-y-[52px] rotate-[7deg] scale-70",
  "left-[-64px] top-1/2 translate-y-[112px] rotate-[-6deg] scale-70",
  "left-[-64px] top-1/2 translate-y-[172px] rotate-[6deg] scale-70",
];

const introRightRailTargets = [
  "left-[calc(100%-16px)] top-1/2 -translate-y-[248px] rotate-[6deg] scale-70",
  "left-[calc(100%-16px)] top-1/2 -translate-y-[188px] rotate-[-5deg] scale-70",
  "left-[calc(100%-16px)] top-1/2 -translate-y-[128px] rotate-[7deg] scale-70",
  "left-[calc(100%-16px)] top-1/2 -translate-y-[68px] rotate-[-6deg] scale-70",
  "left-[calc(100%-16px)] top-1/2 -translate-y-[8px] rotate-[5deg] scale-70",
  "left-[calc(100%-16px)] top-1/2 translate-y-[52px] rotate-[-7deg] scale-70",
  "left-[calc(100%-16px)] top-1/2 translate-y-[112px] rotate-[6deg] scale-70",
  "left-[calc(100%-16px)] top-1/2 translate-y-[172px] rotate-[-6deg] scale-70",
];

const homeTransitionPositions = [
  "left-[14%] top-[34%] -translate-x-1/2 -translate-y-1/2 rotate-[-8deg]",
  "left-[36%] top-[34%] -translate-x-1/2 -translate-y-1/2 rotate-[7deg]",
  "left-[58%] top-[34%] -translate-x-1/2 -translate-y-1/2 rotate-[-9deg]",
  "left-[80%] top-[34%] -translate-x-1/2 -translate-y-1/2 rotate-[8deg]",
  "left-[14%] top-[50%] -translate-x-1/2 -translate-y-1/2 rotate-[6deg]",
  "left-[36%] top-[50%] -translate-x-1/2 -translate-y-1/2 rotate-[-8deg]",
  "left-[58%] top-[50%] -translate-x-1/2 -translate-y-1/2 rotate-[9deg]",
  "left-[80%] top-[50%] -translate-x-1/2 -translate-y-1/2 rotate-[-7deg]",
  "left-[14%] top-[66%] -translate-x-1/2 -translate-y-1/2 rotate-[10deg]",
  "left-[36%] top-[66%] -translate-x-1/2 -translate-y-1/2 rotate-[-6deg]",
  "left-[58%] top-[66%] -translate-x-1/2 -translate-y-1/2 rotate-[8deg]",
  "left-[80%] top-[66%] -translate-x-1/2 -translate-y-1/2 rotate-[-10deg]",
  "left-[14%] top-[82%] -translate-x-1/2 -translate-y-1/2 rotate-[-7deg]",
  "left-[36%] top-[82%] -translate-x-1/2 -translate-y-1/2 rotate-[9deg]",
  "left-[58%] top-[82%] -translate-x-1/2 -translate-y-1/2 rotate-[-8deg]",
  "left-[80%] top-[82%] -translate-x-1/2 -translate-y-1/2 rotate-[7deg]",
];

const records = [
  {
    slug: "customer-application-form-caf",
    title: "Customer Application Form (CAF)",
    short: "CAF",
    accent: "from-sky-400 to-cyan-300",
  },
  {
    slug: "ekyc-customer-verification",
    title: "e-KYC & Customer Verification",
    short: "KYC",
    accent: "from-emerald-400 to-teal-300",
  },
  {
    slug: "subscriber-registration-record",
    title: "Subscriber Registration Record",
    short: "REG",
    accent: "from-violet-400 to-fuchsia-300",
  },
  {
    slug: "sim-activation-record",
    title: "SIM Activation Record",
    short: "ACT",
    accent: "from-amber-400 to-orange-300",
  },
  {
    slug: "sim-deactivation-disconnection-record",
    title: "SIM Deactivation & Disconnection Record",
    short: "OFF",
    accent: "from-rose-400 to-pink-300",
  },
  {
    slug: "sim-reconnection-reactivation-record",
    title: "SIM Reconnection & Reactivation Record",
    short: "ON",
    accent: "from-lime-400 to-green-300",
  },
  {
    slug: "mobile-number-portability-mnp-record",
    title: "Mobile Number Portability (MNP) Record",
    short: "MNP",
    accent: "from-indigo-400 to-blue-300",
  },
  {
    slug: "subscriber-ownership-transfer-record",
    title: "Subscriber Ownership / Transfer Record",
    short: "OWN",
    accent: "from-cyan-400 to-sky-300",
  },
  {
    slug: "kyc-update-rekyc-record",
    title: "KYC Update / Re-KYC Record",
    short: "UPD",
    accent: "from-teal-400 to-emerald-300",
  },
  {
    slug: "sim-replacement-history",
    title: "SIM Replacement History",
    short: "REP",
    accent: "from-pink-400 to-rose-300",
  },
  {
    slug: "mobile-number-allocation-record",
    title: "Mobile Number Allocation Record",
    short: "NUM",
    accent: "from-yellow-400 to-amber-300",
  },
  {
    slug: "alternate-mobile-number-record",
    title: "Alternate Mobile Number Record",
    short: "ALT",
    accent: "from-blue-400 to-indigo-300",
  },
  {
    slug: "imei-sim-device-association-record",
    title: "IMEI-SIM / Device Association Record",
    short: "DEV",
    accent: "from-purple-400 to-violet-300",
  },
  {
    slug: "demo-1",
    title: "DEMO",
    short: "D1",
    accent: "from-red-400 to-rose-300",
  },
  {
    slug: "demo-2",
    title: "DEMO",
    short: "D2",
    accent: "from-orange-400 to-amber-300",
  },
  {
    slug: "demo-3",
    title: "DEMO",
    short: "D3",
    accent: "from-fuchsia-400 to-pink-300",
  },
];



function TransitionCircleOverlay({ activeSlug, stage }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-300/18 blur-3xl" />
      <div className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/25 bg-white/6 backdrop-blur-[2px]" />
      <div className="absolute left-1/2 top-1/2 h-[16rem] w-[16rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-200/30" />

      {records.map((item, index) => (
        <div
          key={`transition-${item.slug}`}
          className={`absolute left-1/2 top-1/2 flex h-20 w-20 items-center justify-center rounded-[1.8rem] bg-gradient-to-br ${item.accent} text-xl font-black tracking-[0.08em] text-white shadow-[0_24px_40px_rgba(15,23,42,0.2)] ring-1 ring-white/40 transition-all duration-[950ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
            activeSlug === item.slug ? "scale-110" : "scale-100"
          } ${
            stage === "gather"
              ? `left-1/2 top-1/2 ${introClusterPositions[index]}`
              : homeTransitionPositions[index]
          }`}
          style={{ transitionDelay: stage === "gather" ? `${index * 42}ms` : "0ms" }}
        >
          <div className="absolute inset-0 rounded-[1.8rem] opacity-25 [background:linear-gradient(180deg,rgba(255,255,255,0.4),transparent_45%,rgba(0,0,0,0.14))]" />
          <div className="absolute inset-[4px] rounded-[1.45rem] border border-white/30" />
          <span className="relative drop-shadow-sm">{item.short}</span>
        </div>
      ))}
    </div>
  );
}

function RecordIcon({ short, accent }) {
  return (
    <div className="relative">
      <div
        className={`absolute inset-0 rounded-[1.7rem] bg-gradient-to-br ${accent} opacity-30 blur-xl transition duration-300 group-hover:scale-110`}
      />
      <div
        className={`relative flex h-14 w-14 items-center justify-center rounded-[1.2rem] bg-gradient-to-br ${accent} text-sm font-black tracking-[0.18em] text-slate-950 shadow-[0_14px_24px_rgba(15,23,42,0.14)]`}
      >
        <div className="absolute inset-[3px] rounded-[1rem] border border-white/55 bg-white/18" />
        <div className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-white/80" />
        <span className="relative">{short}</span>
      </div>
    </div>
  );
}

function RecordCard({ title, short, accent, index, slug, onSelect, dimmed = false }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(slug)}
      className={`group relative flex min-h-[116px] items-center justify-center p-2 transition duration-300 hover:-translate-y-2 ${
        dimmed ? "opacity-0 scale-75" : "opacity-100"
      }`}
      aria-label={title}
      title={title}
      disabled={dimmed}
    >
      <div
        className="absolute inset-x-5 bottom-3 h-10 rounded-full bg-sky-200/25 blur-2xl transition duration-300 group-hover:bg-sky-300/35"
        style={{ animationDelay: `${index * 90}ms` }}
      />
      <div
        className="relative animate-[floatCard_5.5s_ease-in-out_infinite]"
        style={{ animationDelay: `${index * 140}ms` }}
      >
        <RecordIcon short={short} accent={accent} />
      </div>
    </button>
  );
}

function CompactRightSideIcon({ short, title, accent, slug, active = false, onNavigate }) {
  const content = (
    <div 
      className={`group relative flex justify-end h-12 md:h-[74px] transition-all duration-300 ${
        active ? 'w-20 md:w-[104px]' : 'w-12 md:w-[74px]'
      } ${!active && 'hover:-translate-x-1.5 hover:scale-105'}`}
      aria-label={title}
      title={title}
    >
      <div
        className={`absolute right-0 top-0 h-12 md:h-[74px] rounded-xl md:rounded-[1.65rem] bg-gradient-to-br ${accent} ring-1 transition-all duration-300 ${
          active
            ? "w-20 md:w-[104px] ring-white/80 shadow-md"
            : "w-12 md:w-[74px] ring-white/45"
        }`}
      >
        <div className="absolute inset-[3px] md:inset-[4px] rounded-lg md:rounded-[1.35rem] border border-white/35 bg-white/10" />
      </div>

      <div className="relative z-10 flex h-12 md:h-[74px] w-12 md:w-[74px] shrink-0 items-center justify-center text-sm md:text-[1.35rem] font-black tracking-[0.08em] text-white">
        <div className="absolute right-1.5 top-1.5 h-1.5 w-1.5 md:right-2 md:top-2 md:h-2.5 md:w-2.5 rounded-full bg-white/75" />
        <span className="relative">{short}</span>
      </div>
    </div>
  );

  if (active) {
    return <div className="relative">{content}</div>;
  }

  return (
    <button type="button" onClick={() => onNavigate(slug)} className="relative transition duration-300">
      {content}
    </button>
  );
}

function CompactLeftSideIcon({ short, title, accent, slug, active = false, onNavigate }) {
  const content = (
    <div 
      className={`group relative flex justify-start h-12 md:h-[74px] transition-all duration-300 ${
        active ? 'w-20 md:w-[104px]' : 'w-12 md:w-[74px]'
      } ${!active && 'hover:translate-x-1.5 hover:scale-105'}`}
      aria-label={title}
      title={title}
    >
      <div
        className={`absolute left-0 top-0 h-12 md:h-[74px] rounded-xl md:rounded-[1.65rem] bg-gradient-to-br ${accent} ring-1 transition-all duration-300 ${
          active
            ? "w-20 md:w-[104px] ring-white/80 shadow-md"
            : "w-12 md:w-[74px] ring-white/45"
        }`}
      >
        <div className="absolute inset-[3px] md:inset-[4px] rounded-lg md:rounded-[1.35rem] border border-white/35 bg-white/10" />
      </div>

      <div className="relative z-10 flex h-12 md:h-[74px] w-12 md:w-[74px] shrink-0 items-center justify-center text-sm md:text-[1.35rem] font-black tracking-[0.08em] text-white">
        <div className="absolute right-1.5 top-1.5 h-1.5 w-1.5 md:right-2 md:top-2 md:h-2.5 md:w-2.5 rounded-full bg-white/75" />
        <span className="relative">{short}</span>
      </div>
    </div>
  );

  if (active) {
    return <div className="relative">{content}</div>;
  }

  return (
    <button type="button" onClick={() => onNavigate(slug)} className="relative transition duration-300 hover:translate-x-1">
      {content}
    </button>
  );
}

function HomePage({ onSelect, transitioning = false, activeSlug = null }) {
  const [transitionStage, setTransitionStage] = useState("spread");

  useEffect(() => {
    if (!transitioning) {
      setTransitionStage("spread");
      return undefined;
    }

    const gatherTimer = window.setTimeout(() => {
      setTransitionStage("gather");
    }, 80);

    return () => {
      window.clearTimeout(gatherTimer);
    };
  }, [transitioning]);

  return (
    <section className="relative h-[calc(100vh-3rem)] overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-300/18 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/25 bg-white/6 backdrop-blur-[2px]" />
        <div className="absolute left-1/2 top-1/2 h-[16rem] w-[16rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-200/30" />
        <div className="absolute left-[20%] top-[22%] h-24 w-24 rounded-full bg-cyan-300/16 blur-2xl" />
        <div className="absolute right-[18%] top-[58%] h-28 w-28 rounded-full bg-amber-200/20 blur-2xl" />
      </div>

      <div
        className={`relative z-10 grid h-full grid-cols-2 content-center gap-y-5 transition-all duration-500 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 ${
          transitioning ? "opacity-15 scale-[0.98]" : "opacity-100"
        }`}
      >
        {records.map((record, index) => (
          <RecordCard
            key={record.slug}
            {...record}
            index={index}
            onSelect={onSelect}
            dimmed={transitioning}
          />
        ))}
      </div>

      {transitioning ? (
        <TransitionCircleOverlay activeSlug={activeSlug} stage={transitionStage} />
      ) : null}
    </section>
  );
}

function RecordDetailsPage({ slug, onNavigate, onGoHome }) {
  const record = records.find((item) => item.slug === slug);
  const allRailRecords = [record, ...records.filter((item) => item.slug !== slug)];
  const leftRailRecords = allRailRecords.slice(0, 8);
  const rightRailRecords = allRailRecords.slice(8, 16);
  const [introStage, setIntroStage] = useState("cluster");

  useEffect(() => {
    setIntroStage("cluster");
    const scatterTimer = window.setTimeout(() => {
      setIntroStage("scatter");
    }, 450);
    const railsTimer = window.setTimeout(() => {
      setIntroStage("rails");
    }, 1300);
    const settleTimer = window.setTimeout(() => {
      setIntroStage("settled");
    }, 2000);

    return () => {
      window.clearTimeout(scatterTimer);
      window.clearTimeout(railsTimer);
      window.clearTimeout(settleTimer);
    };
  }, [slug]);

  if (!record) {
    return (
      <section className="flex min-h-[60vh] items-center justify-center">
        <div className="rounded-[1.8rem] border border-sky-100 bg-white/90 px-8 py-10 text-center shadow-[0_14px_34px_rgba(67,111,157,0.12)]">
          <p className="text-lg font-semibold text-slate-800">Record page not found</p>
          <button
            type="button"
            onClick={onGoHome}
            className="mt-4 inline-flex rounded-full bg-sky-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-sky-700"
          >
            Back to all cards
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-[calc(100vh-3rem)] overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-300/18 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/25 bg-white/6 backdrop-blur-[2px]" />
        <div className="absolute left-1/2 top-1/2 h-[16rem] w-[16rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-sky-200/30" />
        <div className="absolute left-[20%] top-[22%] h-24 w-24 rounded-full bg-cyan-300/16 blur-2xl" />
        <div className="absolute right-[18%] top-[58%] h-28 w-28 rounded-full bg-amber-200/20 blur-2xl" />
      </div>
      <div
        className={`pointer-events-none absolute inset-0 z-10 transition-all duration-1000 ease-out ${
          introStage === "settled" ? "opacity-0 blur-sm" : "opacity-100"
        }`}
      >
        {leftRailRecords.map((item, index) => (
          <div
            key={`intro-left-${item.slug}`}
            className={`absolute flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-[1.8rem] bg-gradient-to-br ${item.accent} text-lg md:text-xl font-black tracking-[0.06em] text-white shadow-[0_22px_38px_rgba(15,23,42,0.22)] ring-1 ring-white/35 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              introStage === "cluster"
                ? `left-1/2 top-1/2 ${introClusterPositions[index]} opacity-100`
                : introStage === "orbit"
                  ? `left-1/2 top-1/2 ${introOrbitPositions[index]} opacity-100`
                  : introStage === "scatter"
                    ? `left-1/2 top-1/2 ${introScatterPositions[index]} opacity-100`
                    : introStage === "rails"
                      ? `${introLeftRailTargets[index]} opacity-100`
                      : `${introLeftRailTargets[index]} opacity-0`
            }`}
            style={{
              transitionDelay:
                introStage === "rails" ? `${index * 110}ms` : "0ms",
            }}
          >
            <div className="absolute inset-0 rounded-[1.8rem] opacity-25 [background:linear-gradient(180deg,rgba(255,255,255,0.38),transparent_45%,rgba(0,0,0,0.16))]" />
            <div className="absolute inset-[4px] rounded-[1.45rem] border border-white/30" />
            <span className="relative drop-shadow-sm">{item.short}</span>
          </div>
        ))}

        {rightRailRecords.map((item, index) => (
          <div
            key={`intro-right-${item.slug}`}
            className={`absolute flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-[1.8rem] bg-gradient-to-br ${item.accent} text-lg md:text-xl font-black tracking-[0.06em] text-white shadow-[0_22px_38px_rgba(15,23,42,0.22)] ring-1 ring-white/35 transition-all duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
              introStage === "cluster"
                ? `left-1/2 top-1/2 ${introClusterPositions[index + 8]} opacity-100`
                : introStage === "orbit"
                  ? `left-1/2 top-1/2 ${introOrbitPositions[index + 8]} opacity-100`
                  : introStage === "scatter"
                    ? `left-1/2 top-1/2 ${introScatterPositions[index + 8]} opacity-100`
                    : introStage === "rails"
                      ? `${introRightRailTargets[index]} opacity-100`
                      : `${introRightRailTargets[index]} opacity-0`
            }`}
            style={{
              transitionDelay:
                introStage === "rails" ? `${index * 110}ms` : "0ms",
            }}
          >
            <div className="absolute inset-0 rounded-[1.8rem] opacity-25 [background:linear-gradient(180deg,rgba(255,255,255,0.38),transparent_45%,rgba(0,0,0,0.16))]" />
            <div className="absolute inset-[4px] rounded-[1.45rem] border border-white/30" />
            <span className="relative drop-shadow-sm">{item.short}</span>
          </div>
        ))}
      </div>

      <div
        className={`mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl items-center justify-center px-[60px] sm:px-24 py-10 transition-all duration-900 ease-out ${
          introStage === "settled" ? "opacity-100 translate-y-0 delay-150" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="w-full max-w-4xl rounded-[1.5rem] md:rounded-[2rem] border border-white/70 bg-white/55 p-4 md:p-8 shadow-[0_24px_60px_rgba(67,111,157,0.12)] backdrop-blur-sm sm:p-10">
          <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
            <div className={`mb-4 md:mb-6 flex h-16 w-16 md:h-24 md:w-24 items-center justify-center rounded-2xl md:rounded-[1.8rem] bg-gradient-to-br ${record.accent} text-xl md:text-3xl font-black tracking-[0.08em] text-white shadow-[0_18px_34px_rgba(15,23,42,0.18)]`}>
              {record.short}
            </div>
            <p className="text-xs md:text-sm font-bold uppercase tracking-[0.35em] text-sky-700">
              Subscriber Record Details
            </p>
            <h1 className="mt-3 md:mt-4 text-2xl font-black leading-tight text-slate-900 sm:text-4xl lg:text-5xl">
              {record.title}
            </h1>
            <p className="mt-4 md:mt-6 max-w-2xl text-sm leading-7 md:text-base md:leading-8 text-slate-600 sm:text-lg">
              Review and verify the selected subscriber record information from the side menu.
              Click any icon on the left or right to instantly switch the active record details in
              this center section.
            </p>

            <div className="mt-6 md:mt-8 grid w-full gap-3 md:gap-4 sm:grid-cols-2">
              <div className="rounded-xl md:rounded-[1.4rem] border border-sky-100 bg-white/80 p-4 md:p-5 text-left shadow-sm">
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.22em] text-sky-700">
                  Record Name
                </p>
                <p className="mt-2 md:mt-3 text-base md:text-lg font-bold leading-6 md:leading-7 text-slate-900">{record.title}</p>
              </div>
              <div className="rounded-xl md:rounded-[1.4rem] border border-sky-100 bg-white/80 p-4 md:p-5 text-left shadow-sm">
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.22em] text-sky-700">
                  Record Code
                </p>
                <p className="mt-2 md:mt-3 text-base md:text-lg font-black text-slate-900">{record.short}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <aside className="absolute left-0 top-1/2 z-20 -translate-y-1/2">
        <div className="w-[320px] overflow-visible">
          <div className="flex flex-col items-start gap-2 py-1">
            {leftRailRecords.map((item, index) => (
              <div
                key={item.slug}
                className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  introStage === "settled"
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-8 opacity-0"
                }`}
                style={{
                  transitionDelay: introStage === "settled" ? `${index * 90}ms` : "0ms",
                }}
              >
                <CompactLeftSideIcon
                  short={item.short}
                  title={item.title}
                  accent={item.accent}
                  slug={item.slug}
                  active={item.slug === record.slug}
                  onNavigate={onNavigate}
                />
              </div>
            ))}
          </div>
        </div>
      </aside>

      <aside className="absolute right-0 top-1/2 z-20 -translate-y-1/2">
        <div className="w-[320px] overflow-visible pr-0">
          <div className="flex flex-col items-end gap-2 py-1">
            {rightRailRecords.map((item, index) => (
              <div
                key={item.slug}
                className={`transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  introStage === "settled"
                    ? "translate-x-0 opacity-100"
                    : "translate-x-8 opacity-0"
                }`}
                style={{
                  transitionDelay: introStage === "settled" ? `${index * 90}ms` : "0ms",
                }}
              >
                <CompactRightSideIcon
                  short={item.short}
                  title={item.title}
                  accent={item.accent}
                  slug={item.slug}
                  active={item.slug === record.slug}
                  onNavigate={onNavigate}
                />
              </div>
            ))}
          </div>
        </div>
      </aside>
    </section>
  );
}

function SubscriberApp() {
  const [recordSlug, setRecordSlug] = useState(() => {
    const path = window.location.pathname;
    return path.startsWith("/record/") ? path.replace("/record/", "") : null;
  });
  const [transitioningSlug, setTransitioningSlug] = useState(null);

  useEffect(() => {
    return () => {
      if (window.__recordTransitionTimer) {
        window.clearTimeout(window.__recordTransitionTimer);
      }
    };
  }, []);

  const handleSelectRecord = (slug) => {
    if (transitioningSlug) return;

    setTransitioningSlug(slug);
    window.__recordTransitionTimer = window.setTimeout(() => {
      setRecordSlug(slug);
      setTransitioningSlug(null);
    }, 1350);
  };

  const handleNavigateRecord = (slug) => {
    setRecordSlug(slug);
  };

  const handleGoHome = () => {
    setRecordSlug(null);
  };

  return (
    <main className="relative isolate min-h-screen overflow-hidden text-[#16324f]">
      <GlobalStyles />
      <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-300/35 blur-3xl" />
      {recordSlug ? (
        <div className="flex min-h-screen flex-col px-4 py-6 sm:px-6 lg:px-8">
          <RecordDetailsPage slug={recordSlug} onNavigate={handleNavigateRecord} onGoHome={handleGoHome} />
        </div>
      ) : (
        <div className="mx-auto flex h-screen max-w-7xl flex-col overflow-hidden px-4 py-6 sm:px-6 lg:px-8">
          <HomePage
            onSelect={handleSelectRecord}
            transitioning={Boolean(transitioningSlug)}
            activeSlug={transitioningSlug}
          />
        </div>
      )}
    </main>
  );
}

export default SubscriberApp;
