import Navigation from '@/components/navigation';
import HeroSection from '@/components/hero-section';
import SocialProofBar from '@/components/social-proof-bar';
import ProblemsSection from '@/components/problems-section';
import PlatformSection from '@/components/platform-section';
import ImpactSection from '@/components/impact-section';
import HowWeWorkSection from '@/components/how-we-work-section';
import ThoughtLeadershipSection from '@/components/thought-leadership-section';
import FoundersSection from '@/components/founders-section';
import FinalCtaSection from '@/components/final-cta-section';
import Footer from '@/components/footer';
import ThemeToggle from '@/components/theme-toggle';

export default function Home() {
  return (
    <main className="min-h-screen" style={{ background: 'var(--background)' }}>
      <Navigation />
      <HeroSection />
      <SocialProofBar />
      <ProblemsSection />
      <PlatformSection />
      <ImpactSection />
      <HowWeWorkSection />
      <ThoughtLeadershipSection />
      <FoundersSection />
      <FinalCtaSection />
      <Footer />
      <ThemeToggle />
    </main>
  );
}
