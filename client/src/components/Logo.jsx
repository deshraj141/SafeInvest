import React, { useState, useEffect } from 'react';
import { getCompanyInitials, getGradientForString } from '../utils/helpers';

/**
 * Reusable Logo component with multi-stage fallbacks
 * Clearbit Logo -> Google Favicon -> Gradient Avatar with Initials
 */
export default function Logo({ name, domain, size = "md" }) {
  const [stage, setStage] = useState(0); // 0: Clearbit, 1: Google favicon, 2: Gradient avatar
  const [imgSrc, setImgSrc] = useState("");

  // Re-initialize when domain/name changes
  useEffect(() => {
    setStage(domain ? 0 : 2);
  }, [domain, name]);

  useEffect(() => {
    if (stage === 0 && domain) {
      setImgSrc(`https://logo.clearbit.com/${domain}`);
    } else if (stage === 1 && domain) {
      setImgSrc(`https://www.google.com/s2/favicons?sz=128&domain=${domain}`);
    }
  }, [stage, domain]);

  const handleError = () => {
    if (stage === 0) {
      setStage(1);
    } else if (stage === 1) {
      setStage(2);
    }
  };

  const getDimensions = () => {
    switch (size) {
      case "sm": return "w-6 h-6 text-xs";
      case "lg": return "w-16 h-16 text-lg";
      case "xl": return "w-24 h-24 text-2xl font-bold";
      case "md":
      default: return "w-10 h-10 text-sm";
    }
  };

  if (stage === 2 || !domain) {
    const initials = getCompanyInitials(name);
    const bgGradient = getGradientForString(name || "AI");
    
    return (
      <div 
        className={`${getDimensions()} rounded-full flex items-center justify-center text-white select-none font-semibold shrink-0 shadow-inner`}
        style={{ background: bgGradient }}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={imgSrc}
      alt={`${name || 'Company'} logo`}
      onError={handleError}
      className={`${getDimensions()} rounded-full object-cover shrink-0 bg-white border border-light-border dark:border-slate-700 shadow-sm`}
    />
  );
}
