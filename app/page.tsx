import HeroSection from "@/components/home/herosection";
import LatestProperties from "@/components/home/latestproperties";
import PropertyCategorySection from "@/components/home/propertycategorysection";
import WhyChooseUs from "@/components/home/whychooseus";
import CallToAction from "@/components/home/calltoaction";

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
