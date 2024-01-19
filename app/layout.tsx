import { Nunito } from 'next/font/google'
import Navbar from '@/app/components/navbar/Navbar';
import LoginModal from '@/app/components/modals/LoginModal';
import RegisterModal from '@/app/components/modals/RegisterModal';
import SearchModal from '@/app/components/modals/SearchModal';
import RentModal from '@/app/components/modals/RentModal';


import ToasterProvider from '@/app/providers/ToasterProvider';

import './globals.css'
import ClientOnly from './components/ClientOnly';
import UserContextProvider from './contexts/UserContext';
import getCurrentUser from './actions/getCurrentUser';
import TagManager, { URLTracker } from './components/tags/TagManager';


export const metadata = {
  title: 'FakeBnB',
  description: 'Where our accommodations are even faker than the real thing.',
}

const font = Nunito({ 
  subsets: ['latin'], 
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUser();
  return (
    <html lang="en">
      <head>
        <TagManager
            src="https://assets.adobedtm.com/74c02e71ae0f/cfece2b4e3b6/launch-ea8cee475d0a-development.min.js"
            strategy="beforeInteractive"
          />
      </head>
      <body className={font.className}>
        <ClientOnly>
          <UserContextProvider currentUser={currentUser}>
            <URLTracker />
            <ToasterProvider />
            <LoginModal />
            <SearchModal />
            <RegisterModal />
            <RentModal />
            <Navbar />
          </UserContextProvider>
        </ClientOnly>
        <div className="pb-20 pt-28">
          {children}
        </div>
      </body>
    </html>
  )
}
