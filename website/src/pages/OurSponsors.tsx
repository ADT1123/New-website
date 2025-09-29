// pages/ProjectsPage.tsx
import Navigation from '@/components/Navigation';
import SponsorsComponent from '@/components/Sponsors';
import Footer from '@/components/Footer';

const Sponsorus = () => {
  return (
    <div>
      <Navigation />
      <div className="pt-20">
        <SponsorsComponent />
      </div>
      <Footer />
    </div>
  );
};

export default Sponsorus;
