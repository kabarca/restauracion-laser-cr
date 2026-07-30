import type { Faq } from "@/types/content";

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="flex flex-col divide-y divide-text/10 border-y border-text/10">
      {faqs.map((faq) => (
        <details key={faq.id} className="group py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold marker:content-none">
            {faq.question}
            <span className="shrink-0 text-xl text-accent transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 text-text/70">{faq.answer}</p>
        </details>
      ))}
    </div>
  );
}
