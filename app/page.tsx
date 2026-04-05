import HeroSection from "@/components/home/HeroSection";
import LatestProperties from "@/components/home/LatestProperties";
import PropertyCategorySection from "@/components/home/PropertyCategorySection";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import CallToAction from "@/components/home/CallToAction";

export default function HomePage() {
  return (
    <div className="bg-white">
      <HeroSection />
      <LatestProperties />
      <PropertyCategorySection />
      <WhyChooseUs />
      <CallToAction />
    </div>
  );
}
