const FaqSection = ({ faqs = [] }) => {
  if (!faqs.length) return null;

  return (
    <section className="py-16 px-4 bg-black">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-white text-3xl font-semibold mb-10 text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-700 rounded-xl"
            >
              <details className="group">
                <summary className="cursor-pointer p-5 text-white font-medium flex justify-between">
                  {faq.question}
                  <span className="group-open:hidden">+</span>
                  <span className="hidden group-open:inline">−</span>
                </summary>
                <div className="p-5 pt-0 text-gray-400">
                  {faq.answer}
                </div>
              </details>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
