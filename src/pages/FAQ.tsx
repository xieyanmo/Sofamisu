import { useState } from 'react'
import { siteContent } from '../content/siteContent'

function AccordionTriangle({ isOpen }: { isOpen: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`grid h-7 w-7 place-items-center text-[#944E25] transition-transform duration-300 ease-out ${
        isOpen ? 'rotate-180' : 'rotate-0'
      }`}
    >
      <svg className="h-6 w-6" fill="none" viewBox="0 0 40 40">
        <path
          d="M4.4 10h31.2L20 37.02 4.4 10Z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1"
        />
        <path
          d="M11.35 14h17.3L20 28.98 11.35 14Z"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="1"
        />
      </svg>
    </span>
  )
}

function FAQItem({
  answer,
  question,
}: {
  answer: string
  question: string
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border-t border-[#BE8B48]/30">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex w-full items-center justify-between gap-8 py-6 text-left font-['Neue_Haas_Grotesk','Inter',sans-serif] text-base font-light text-[#3A1C0F]"
      >
        {question}
        <AccordionTriangle isOpen={isOpen} />
      </button>
      {isOpen && (
        <p className="max-w-3xl pb-7 font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light leading-7 text-[#744026]">
          {answer}
        </p>
      )}
    </div>
  )
}

export function FAQ() {
  return (
    <main className="-mt-[95px] min-h-screen bg-[#F7F4EF] px-6 pt-12 pb-24 text-[#3A1C0F] lg:px-20">
      <section className="mx-auto w-full">
        <nav
          aria-label="Breadcrumb"
          className="mb-5 font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light tracking-[0.14em] text-[#744026]"
        >
          {siteContent.faq.breadcrumb.join(' / ')}
        </nav>

        <h1 className="font-['Neue_Haas_Grotesk','Inter',sans-serif] text-5xl font-light text-[#944E25]">
          {siteContent.faq.title}
        </h1>

        <div className="mt-14 grid gap-20 lg:grid-cols-[minmax(0,5fr)_minmax(24rem,2fr)]">
          <div className="max-w-5xl">
            {siteContent.faq.categories.map((category) => (
              <section key={category.title} className="mb-16">
                <h2 className="mb-5 font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light tracking-[0.18em] text-[#005A4F]">
                  {category.title}
                </h2>
                <div className="border-b border-[#BE8B48]/30">
                  {category.items.map((item) => (
                    <FAQItem
                      key={item.question}
                      answer={item.answer}
                      question={item.question}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>

          <aside className="lg:pt-1">
            <h2 className="font-['Neue_Haas_Grotesk','Inter',sans-serif] text-3xl font-light text-[#944E25]">
              Still have a question?
            </h2>
            <p className="mt-5 font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light leading-7 text-[#744026]">
              Can't find the answer you're looking for? Send us a message and
              we'll get back to you as soon as possible.
            </p>

            <form className="mt-10 space-y-9">
              <label className="block">
                <span className="font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light tracking-[0.14em] text-[#005A4F]">
                  Full Name
                </span>
                <input
                  type="text"
                  className="mt-4 w-full border-0 border-b border-[#BE8B48]/40 bg-transparent px-0 py-3 font-['Neue_Haas_Grotesk','Inter',sans-serif] text-base font-light text-[#3A1C0F] outline-none transition-colors duration-200 focus:border-[#944E25]"
                  placeholder="Your name"
                />
              </label>

              <label className="block">
                <span className="font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light tracking-[0.14em] text-[#005A4F]">
                  Email Address
                </span>
                <input
                  type="email"
                  className="mt-4 w-full border-0 border-b border-[#BE8B48]/40 bg-transparent px-0 py-3 font-['Neue_Haas_Grotesk','Inter',sans-serif] text-base font-light text-[#3A1C0F] outline-none transition-colors duration-200 focus:border-[#944E25]"
                  placeholder="you@example.com"
                />
              </label>

              <label className="block">
                <span className="font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light tracking-[0.14em] text-[#005A4F]">
                  Your Question
                </span>
                <textarea
                  className="mt-4 min-h-32 w-full resize-none border-0 border-b border-[#BE8B48]/40 bg-transparent px-0 py-3 font-['Neue_Haas_Grotesk','Inter',sans-serif] text-base font-light text-[#3A1C0F] outline-none transition-colors duration-200 focus:border-[#944E25]"
                  placeholder="Write your question here"
                />
              </label>

              <button
                type="button"
                className="rounded-[16px] bg-[#944E25] px-8 py-4 font-['Neue_Haas_Grotesk','Inter',sans-serif] text-sm font-light tracking-[0.18em] text-[#F7F4EF] transition-colors duration-200 hover:bg-[#744026] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#BE8B48]"
              >
                Send Message
              </button>
            </form>
          </aside>
        </div>
      </section>
    </main>
  )
}
