import PropertyCard from "@/components/property/PropertyCard";
import { MOCK_PROPERTIES } from "@/lib/constants";

export default function PropertiesPage() {
  return (
    <div className="max-w-6xl mx-auto px-5 py-12">
      <h1 className="text-3xl font-extrabold text-[#1a3c5e] mb-2">All Properties</h1>
      <p className="text-slate-400 text-sm mb-8">Explore our full collection of properties.</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {MOCK_PROPERTIES.map((p) => <PropertyCard key={p.id} property={p} />)}
      </div>
    </div>
  );
}
