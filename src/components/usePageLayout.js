import { useState, useEffect } from 'react';

export function usePageLayout(pageId, defaultTools) {
  const [layoutSettings, setLayoutSettings] = useState(null);

  useEffect(() => {
    const loadLayout = () => {
      try {
        const saved = localStorage.getItem(`nexora_layout_settings_v1_${pageId}`);
        if (saved) {
          setLayoutSettings(JSON.parse(saved));
        } else {
          setLayoutSettings(null);
        }
      } catch (e) {}
    };
    
    loadLayout();
    window.addEventListener('storage', loadLayout);
    window.addEventListener('layoutUpdate', loadLayout);
    return () => {
      window.removeEventListener('storage', loadLayout);
      window.removeEventListener('layoutUpdate', loadLayout);
    };
  }, [pageId]);

  let dynamicGridClass = 'grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
  let displayTools = [...defaultTools];

  if (layoutSettings) {
    if (layoutSettings.arrangement === 'List') {
      dynamicGridClass = 'grid-cols-1';
    } else {
      const cols = layoutSettings.gridColumns || 4;
      if (cols === 2) dynamicGridClass = 'grid-cols-1 sm:grid-cols-2';
      else if (cols === 3) dynamicGridClass = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
      else if (cols === 4) dynamicGridClass = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
    }

    if (layoutSettings.cards && Array.isArray(layoutSettings.cards)) {
      const savedCardIds = layoutSettings.cards.map(c => c.id);
      displayTools.sort((a, b) => {
        const aId = a.id || a.name;
        const bId = b.id || b.name;
        const aIndex = savedCardIds.indexOf(aId);
        const bIndex = savedCardIds.indexOf(bId);
        
        if (aIndex === -1 && bIndex === -1) return 0;
        if (aIndex === -1) return 1;
        if (bIndex === -1) return -1;
        return aIndex - bIndex;
      });
    }
  }

  return { dynamicGridClass, displayTools };
}
