import { UserPlus, FileText, Rocket, CheckCircle } from "lucide-react";

const STEPS = [
  {
    icon: <UserPlus className="text-white w-6 h-6" />,
    title: "Create Account",
    desc: "Sign up in seconds to manage your listings and track buyer leads in real-time.",
    color: "bg-blue-500",
  },
  {
    icon: <FileText className="text-white w-6 h-6" />,
    title: "Add Property Details",
    desc: "Fill in the form above with your property's best features and high-res photos.",
    color: "bg-purple-500",
  },
  {
    icon: <Rocket className="text-white w-6 h-6" />,
    title: "Launch Listing",
    desc: "Our team reviews your post and pushes it live to our global network of buyers.",
    color: "bg-[#FF7F32]",
  },
  {
    icon: <CheckCircle className="text-white w-6 h-6" />,
    title: "Close the Deal",
    desc: "Receive offers, chat with verified buyers, and finalize your sale securely.",
    color: "bg-green-500",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 px-6 md:px-16 bg-[#f0f2f5]/50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold text-[#0a1629] mb-4">How it works</h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Selling your property shouldn't be a headache. We've streamlined the process into four simple steps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative">
          {/* Subtle connecting line for desktop */}
          <div className="hidden lg:block absolute top-12 left-0 w-full h-[2px] bg-gray-200 -z-10" />

          {stepData.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center group">
              {/* Number/Icon Circle */}
              <div className={`w-20 h-20 rounded-[24px] ${step.color} flex items-center justify-center shadow-xl mb-8 group-hover:scale-110 transition-transform duration-300 relative`}>
                <span className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-[10px] font-black text-[#0a1629] shadow-md border border-gray-100">
                  0{index + 1}
                </span>
                {step.icon}
              </div>

              <h3 className="text-xl font-bold text-[#0a1629] mb-3">{step.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed px-4">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Quick fix for the map variable name I used above
const stepData = STEPS;