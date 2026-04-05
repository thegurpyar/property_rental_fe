import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQSection() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-[#0a1629] text-center mb-16">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-b-gray-100 py-2">
            <AccordionTrigger className="text-lg font-bold text-[#0a1629] hover:no-underline">How long does the review process take?</AccordionTrigger>
            <AccordionContent className="text-gray-500">
              Our team usually reviews and approves listings within 24 hours to ensure high-quality data for our buyers.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2" className="border-b-gray-100 py-2">
            <AccordionTrigger className="text-lg font-bold text-[#0a1629] hover:no-underline">Is there a fee for listing my property?</AccordionTrigger>
            <AccordionContent className="text-gray-500">
              Basic listings are free. We offer premium boost packages if you want your property to appear at the top of search results.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3" className="border-b-gray-100 py-2">
            <AccordionTrigger className="text-lg font-bold text-[#0a1629] hover:no-underline">Can I edit my listing after it's live?</AccordionTrigger>
            <AccordionContent className="text-gray-500">
              Yes, you can log in to your dashboard anytime to update prices, photos, or descriptions.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
}