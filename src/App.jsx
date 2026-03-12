import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Footer from './components/Footer';
import './styles/globals.css';

const LazyStorySection = lazy(() => import('./components/StorySection'));
const LazyMenuSection = lazy(() => import('./components/MenuSection'));
const LazyBranchesSection = lazy(() => import('./components/BranchesSection'));
const LazyGallerySection = lazy(() => import('./components/GallerySection'));
const LazyCtaBanner = lazy(() => import('./components/CtaBanner'));

function App() {
  return (
    <div className="app-wrapper">
      <Navbar />
      <Hero />

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
    </div>
  );
}

export default App;
