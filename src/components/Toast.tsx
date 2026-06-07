import React from 'react';

export function Toast({ message, visible }: { message: string | null, visible: boolean }) {
  return (
    <div 
      className={`fixed bottom-[72px] left-1/2 -translate-x-1/2 bg-[#1e1e32] border border-white/15 rounded-lg px-[18px] py-[9px] text-[12px] z-[9999] whitespace-nowrap pointer-events-none transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      {message}
    </div>
  );
}
