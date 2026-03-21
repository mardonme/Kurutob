import { lazy, Suspense, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import ReservationModal from './components/ReservationModal';
import './styles/globals.css';

const LazyStorySection = lazy(() => import('./components/StorySection'));
const LazyMenuSection = lazy(() => import('./components/MenuSection'));
const LazyBranchesSection = lazy(() => import('./components/BranchesSection'));
const LazyGallerySection = lazy(() => import('./components/GallerySection'));
const LazyCtaBanner = lazy(() => import('./components/CtaBanner'));

function App() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  const openReservation = () => {
    setIsReservationOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeReservation = () => {
    setIsReservationOpen(false);
  };

  return (
    <div className="app-wrapper">
      <Navbar onOpenReservation={openReservation} />
      <Hero onOpenReservation={openReservation} />

      <main>
        <Suspense fallback={<div className="section-skeleton"></div>}>
          <LazyStorySection />
          <LazyMenuSection />
          <LazyBranchesSection />
          <LazyGallerySection />
          <LazyCtaBanner />
        </Suspense>
      </main>

      <Footer />

      <ReservationModal
        isOpen={isReservationOpen}
        onClose={closeReservation}
      />
    </div>
  );
}

export default App;
