import { useCallback, useState } from 'react';
import { AnnouncementBar } from './components/AnnouncementBar.jsx';
import { Navbar } from './components/Navbar.jsx';
import { Hero } from './components/Hero.jsx';
import { PreorderCard } from './components/PreorderCard.jsx';
import { TrustStrip } from './components/TrustStrip.jsx';
import { ProblemSection } from './components/ProblemSection.jsx';
import { SolutionSection } from './components/SolutionSection.jsx';
import { HowItWorks } from './components/HowItWorks.jsx';
import { Features } from './components/Features.jsx';
import { Gallery } from './components/Gallery.jsx';
import { BuySection } from './components/BuySection.jsx';
import { Testimonials } from './components/Testimonials.jsx';
import { FAQ } from './components/FAQ.jsx';
import { FinalCTA } from './components/FinalCTA.jsx';
import { Footer } from './components/Footer.jsx';
import { SuccessModal } from './components/SuccessModal.jsx';
import { BackToTop } from './components/BackToTop.jsx';

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);

  const users = [
    { name: "Hisham", role: "admin" },
    { name: "Ahmed", role: "user" },
    { name: "Ali", role: "admin" },
    { name: "Omar", role: "user" }
  ];

  const totalusers = users.reduce((acc, cur) => {
    acc[cur.role] = (acc[cur.role] || 0) + 1;
    return acc;
  }, {});

  console.log(totalusers)

  const handleLeadSuccess = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  return (
    <>
      <AnnouncementBar />
      <Navbar />

      <main>
        <Hero />
        <Gallery />

        <div className="py-16 sm:py-20">
          <PreorderCard onSuccess={handleLeadSuccess} />
        </div>
        <ProblemSection />
        <SolutionSection />
        <HowItWorks />
        <Features />
        <BuySection />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
      <BackToTop />
      <SuccessModal open={modalOpen} onClose={closeModal} />
    </>
  );
}
