import React from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useStickyNavAnimation({ selectedPage, layoutConfig, query, scopeRef }) {
  useGSAP(() => {
    ScrollTrigger.getAll().forEach(t => t.kill());

    if (selectedPage !== 'AccountSetting') {
      // 1. Enable interactions on Sticky Nav exactly when Header leaves screen
      gsap.to('#sticky-icon-nav', {
        pointerEvents: "auto",
        scrollTrigger: {
          trigger: "#cards-container",
          start: "top 0px", // Starts when container reaches top (Header is gone)
          end: "top -50px",
          scrub: true,
        }
      });

      const cards = gsap.utils.toArray('.tool-card-gsap');

      // 0. Smooth Stepped Pagination for Sticky Nav (ONLY ON MOBILE/TABLET)
      const navScroll = document.getElementById('sticky-icon-nav-scroll');

      if (navScroll) {
        const uniqueOffsets = [...new Set(cards.map((_, i) => document.getElementById(`sticky-icon-${i}`)?.offsetTop).filter(n => n !== undefined))].sort((a, b) => a - b);

        if (uniqueOffsets.length > 0) {
          const baseOffset = uniqueOffsets[0];

          let mm = gsap.matchMedia();

          mm.add("(max-width: 1023px)", () => {
            // Loop through pages (every 2 rows) and create a scrubbed transition for each
            for (let i = 2; i < uniqueOffsets.length; i += 2) {
              const targetOffset = uniqueOffsets[i];
              const yShift = -(targetOffset - baseOffset);

              // Find the first card that belongs to this new page
              const tIndex = cards.findIndex((_, idx) => document.getElementById(`sticky-icon-${idx}`)?.offsetTop >= targetOffset);

              if (tIndex !== -1) {
                const pageTriggerCard = cards[tIndex];

                gsap.to('#sticky-icon-nav-scroll', {
                  y: yShift,
                  ease: "power1.inOut",
                  scrollTrigger: {
                    trigger: pageTriggerCard,
                    start: "top 70%", // Start shifting smoothly as the page begins filling
                    end: "top 30%",
                    scrub: true,
                  }
                });
              }
            }
          });
        }
      }

      cards.forEach((card, index) => {
        const targetIcon = document.getElementById(`sticky-icon-${index}`);
        if (!targetIcon) return;

        // All cards in a row must fly simultaneously to avoid any visual overlap during the flight.
        // This ensures the side cards and center cards move up together in perfect sync.
        const staggerDelay = 0;

        const isMobile = window.innerWidth < 768;
        // Animation starts ONLY AFTER the header section has scrolled up (startOffset = 35px mobile / 45px desktop)
        const startOffset = isMobile ? 35 : 45;
        const endOffset = 5;

        const getDynamicStart = () => {
          const navScroll = document.getElementById('sticky-icon-nav-scroll');
          const navBottom = navScroll?.getBoundingClientRect().bottom || 80;
          return `top ${navBottom + startOffset}px`;
        };

        // Complete the animation right as the card reaches the sticky nav
        const getDynamicEnd = () => {
          const navScroll = document.getElementById('sticky-icon-nav-scroll');
          const navBottom = navScroll?.getBoundingClientRect().bottom || 80;
          return `top ${navBottom + endOffset}px`;
        };

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: getDynamicStart,
            end: getDynamicEnd,
            scrub: true,
          }
        });

        const actualCard = card.querySelector('div[role="button"]');
        const textStack = actualCard ? actualCard.querySelector('.flex-col') : card.querySelector('.flex-col');
        const innerIconEl = actualCard ? actualCard.querySelector('.shrink-0') : null;

        const morphStart = 0.2;
        const morphDuration = 0.35;

        // 1. Text fades out as card reaches top row
        if (textStack) {
          tl.to(textStack, { opacity: 0, duration: morphDuration, ease: "power2.out" }, morphStart);
        }

        // 2. Card background dissolves as card reaches top row
        if (actualCard) {
          tl.to(actualCard, {
            backgroundColor: "transparent",
            borderColor: "transparent",
            boxShadow: "none",
            duration: morphDuration,
            ease: "power2.out"
          }, morphStart);
        }

        // 3. Morph inner icon into a circle as card reaches top row
        if (innerIconEl) {
          tl.to(innerIconEl, {
            borderRadius: "50%",
            duration: morphDuration,
            ease: "power2.out"
          }, morphStart);
        }

        const targetWrapper = document.getElementById(`sticky-wrapper-${index}`);

        const cols = layoutConfig.cols;
        const row = Math.floor(index / cols);
        const gridCol = index % cols;

        // On phone view, collapse the icon from 4 rows ago so the top row maintains exactly 8 icons total (4 left, 4 right)
        if (isMobile && row >= 4) {
          const oldIndex = (row - 4) * cols + gridCol;
          const oldWrapper = document.getElementById(`sticky-wrapper-${oldIndex}`);
          if (oldWrapper) {
            tl.to(oldWrapper, {
              maxWidth: 0,
              opacity: 0,
              duration: 0.5,
              ease: "power1.inOut"
            }, 0);
          }
        }

        // Flight trajectory: moves card into position in top icon row
        tl.to(card, {
          x: () => {
            if (!targetWrapper) return 0;
            const innerRect = innerIconEl ? innerIconEl.getBoundingClientRect() : card.getBoundingClientRect();
            const initialInnerCenterX = innerRect.left + (innerRect.width / 2);

            const queueContainer = targetWrapper.parentElement;
            if (!queueContainer) return 0;

            const queueRect = queueContainer.getBoundingClientRect();
            const mid = Math.ceil(cols / 2);
            const isLeftSide = gridCol < mid;

            const wrapperWidth = isMobile ? Math.min(44, Math.floor((window.innerWidth - 16) / 8)) : 75;
            let finalTargetCenterX = 0;

            if (isLeftSide) {
              const queueIdx = isMobile ? (row % 4) : gridCol;
              finalTargetCenterX = queueRect.left + (queueIdx * wrapperWidth) + (wrapperWidth / 2);
            } else {
              const distFromEdge = isMobile ? (row % 4) : ((cols - 1) - gridCol);
              finalTargetCenterX = queueRect.right - (distFromEdge * wrapperWidth) - (wrapperWidth / 2);
            }

            return finalTargetCenterX - initialInnerCenterX;
          },
          y: () => {
            if (!targetIcon || !innerIconEl) return 0;
            const targetRect = targetIcon.getBoundingClientRect();
            const finalTargetCenterY = targetRect.top + (targetRect.height / 2);

            const navScroll = document.getElementById('sticky-icon-nav-scroll');
            const navBottom = navScroll?.getBoundingClientRect().bottom || 80;

            const cardTopAtStart = navBottom + startOffset;
            const innerOffsetTop = innerIconEl.offsetTop || 14;
            const innerTopAtStart = cardTopAtStart + innerOffsetTop;
            const innerHeight = innerIconEl.offsetHeight || 44;
            const innerCenterYAtStart = innerTopAtStart + (innerHeight / 2);
            const naturalFinalCenterY = innerCenterYAtStart - (startOffset - endOffset);

            return finalTargetCenterY - naturalFinalCenterY;
          },
          duration: 0.8,
          ease: "power2.inOut",
          force3D: true
        }, 0);

        // Scale down to icon size near top
        tl.to(card, {
          scale: 0.45,
          duration: isMobile ? 0.45 : 0.4,
          ease: "power2.out"
        }, morphStart);

        // Simultaneously expand target wrapper width invisibly so space opens up in the top row for landing
        if (targetWrapper) {
          const wrapperWidth = isMobile ? Math.min(44, Math.floor((window.innerWidth - 16) / 8)) : 75;
          tl.to(targetWrapper, {
            maxWidth: wrapperWidth,
            duration: 0.8,
            ease: "power1.inOut"
          }, 0);
        }

        // PERFECT 1-TO-1 HANDOFF AT POSITION 0.8:
        // 1. Flying card fades out right as it lands in the top row slot
        tl.to(card, { opacity: 0, duration: 0.15 }, 0.8);

        // 2. Top row sticky wrapper turns visible at position 0.8 (only when card lands)
        if (targetWrapper) {
          tl.to(targetWrapper, {
            opacity: 1,
            duration: 0.15
          }, 0.8);
        }

        // 3. Sticky nav icon pops in at position 0.8 to seamlessly replace the flying card
        const targetIconEl = document.getElementById(`sticky-icon-${index}`);
        if (targetIconEl) {
          tl.to(targetIconEl, { scale: 1, duration: 0.2, ease: "back.out(1.7)" }, 0.8);
        }
      });
    }

    if (selectedPage === null) {
      const mainCards = gsap.utils.toArray('.tool-card-gsap');
      if (mainCards.length > 0) {
        gsap.fromTo(mainCards,
          { x: (i) => Math.floor(i / 4) % 2 === 0 ? -120 : 120, y: 0, opacity: 0, scale: 0.96 },
          {
            x: 0, y: 0, opacity: 1, scale: 1, duration: 0.7, stagger: 0.05, ease: "expo.out", force3D: true,
            scrollTrigger: { trigger: "#cards-container", start: "top 80%", end: "bottom top", toggleActions: "play none none reverse" }
          }
        );
      }
    }

    // Refresh ScrollTrigger to calculate exact start/end positions after layout render
    ScrollTrigger.refresh();
  }, { scope: scopeRef, dependencies: [selectedPage, query, layoutConfig.cols] });
}
