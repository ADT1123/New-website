// pages/ProjectsPage.tsx
import Navigation from '@/components/Navigation';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Contactus = () => {
  return (
    <div>
      <Navigation />
      <div className="pt-20">
        <Contact />
      </div>
      <Footer />
    </div>
  );
};

export default Contactus;
