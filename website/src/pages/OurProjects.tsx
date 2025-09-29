// pages/ProjectsPage.tsx
import Navigation from '@/components/Navigation';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';

const ProjectsPage = () => {
  return (
    <div>
      <Navigation />
      <div className="pt-20">
        <Projects />
      </div>
      <Footer />
    </div>
  );
};

export default ProjectsPage;
