'use client';
import React, {useEffect} from 'react';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { useUserContext } from '@/app/contexts/UserContext';

interface ScriptTagProps {
    src: string;
    strategy?: 'beforeInteractive' | 'afterInteractive' | 'lazyOnload';
  }
  
const TagManager: React.FC<ScriptTagProps> = ({ src, strategy = 'beforeInteractive'}) => (
  <>
    <Script 
    src={src}
    strategy={strategy}
    />
  </>
);


export const URLTracker: React.FC = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { currentUser } = useUserContext();

  useEffect(() => {
    const page: { [key: string]: string | null } = {
      path: pathname,
    };
    searchParams?.forEach((value, key) => {
      page[key] = value;
    });
    const dataLayer = {
      event: 'pageview',
      page: page,
      user: currentUser
    }
    if (window.adobeDataLayer){
      window.adobeDataLayer.push(dataLayer);
    }
  }, [pathname, searchParams, currentUser])
  return <></>;
}

export default TagManager;