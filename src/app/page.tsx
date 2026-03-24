import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import AdvancedFeatures from '@/components/AdvancedFeatures';
import CompetitiveTable from '@/components/CompetitiveTable';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <AdvancedFeatures />
      <CompetitiveTable />
      <CTA />
      <Footer />
    </>
  );
}
