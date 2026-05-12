import Navigation from '@/components/navigation';
import HeroSection from '@/components/hero-section';
import ProblemSection from '@/components/problem-section';
import ServicesSection from '@/components/services-section';
import PlatformSection from '@/components/platform-section';
import ContactSection from '@/components/contact-section';
import Footer from '@/components/footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-bg-primary">
      <Navigation />
      <HeroSection />
      <ProblemSection />
      <ServicesSection />
      <PlatformSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
