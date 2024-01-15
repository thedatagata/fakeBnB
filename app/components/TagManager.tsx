import React from 'react';
import Script from 'next/script';

interface ScriptTagProps {
    src: string;
    strategy?: 'beforeInteractive' | 'afterInteractive' | 'lazyOnload';
  }

  
const TagManager: React.FC<ScriptTagProps> = ({ src, strategy = 'afterInteractive'}) => (
  <>
    <Script 
    src={src}
    strategy={strategy}
    />
  </>
);
  
export default TagManager;
  
  