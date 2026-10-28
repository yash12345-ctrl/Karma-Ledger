import { useCallback, useEffect, useState } from 'react'
import './App.css'
import Intro from './components/Intro'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Journey from './components/Journey'
import CtaCards from './components/CtaCards'
import OneNFPage from './components/OneNFPage'
import TwoNFPage from './components/TwoNFPage'
import ThreeNFPage from './components/ThreeNFPage'
import BCNFPage from './components/BCNFPage'

export default function App() {
  // The cinematic intro plays first; the home page mounts underneath at the
  // moment the golden exit flash begins, then the intro unmounts.
  const [showIntro, setShowIntro] = useState(true)
  const [showHome, setShowHome] = useState(false)
  const [activeView, setActiveView] = useState<'home' | '1nf' | '2nf' | '3nf' | 'bcnf'>('home')

  const reveal = useCallback(() => setShowHome(true), [])
  const done = useCallback(() => setShowIntro(false), [])

  const handleOpen1NF = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setActiveView('1nf')
  }, [])

  const handleOpen2NF = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setActiveView('2nf')
  }, [])

  const handleOpen3NF = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setActiveView('3nf')
  }, [])

  const handleOpenBCNF = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setActiveView('bcnf')
  }, [])

  const handleBackToHome = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setActiveView('home')
  }, [])

  // Listen to hash changes (e.g. #1nf, #2nf, #3nf, #bcnf)
  useEffect(() => {
    const checkHash = () => {
      if (window.location.hash === '#bcnf') {
        setActiveView('bcnf')
      } else if (window.location.hash === '#3nf') {
        setActiveView('3nf')
      } else if (window.location.hash === '#2nf') {
        setActiveView('2nf')
      } else if (window.location.hash === '#1nf') {
        setActiveView('1nf')
      }
    }
    checkHash()
    window.addEventListener('hashchange', checkHash)
    return () => window.removeEventListener('hashchange', checkHash)
  }, [])

  return (
    <>
      {activeView === '1nf' ? (
        <OneNFPage onBackToHome={handleBackToHome} onOpen2NF={handleOpen2NF} />
      ) : activeView === '2nf' ? (
        <TwoNFPage
          onBackToHome={handleBackToHome}
          onOpen1NF={handleOpen1NF}
          onOpen3NF={handleOpen3NF}
        />
      ) : activeView === '3nf' ? (
        <ThreeNFPage
          onBackToHome={handleBackToHome}
          onOpen2NF={handleOpen2NF}
          onOpenBCNF={handleOpenBCNF}
        />
      ) : activeView === 'bcnf' ? (
        <BCNFPage
          onBackToHome={handleBackToHome}
          onOpen3NF={handleOpen3NF}
        />
      ) : (
        showHome && (
          <div className="page page--enter">
            <Navbar onOpen1NF={handleOpen1NF} />
            <main>
              <Hero />
              <div className="below-fold">
                <Journey
                  onSelect1NF={handleOpen1NF}
                  onSelect2NF={handleOpen2NF}
                  onSelect3NF={handleOpen3NF}
                  onSelectBCNF={handleOpenBCNF}
                />
                <CtaCards />
              </div>
            </main>
          </div>
        )
      )}
      {showIntro && <Intro onReveal={reveal} onDone={done} />}
    </>
  )
}

