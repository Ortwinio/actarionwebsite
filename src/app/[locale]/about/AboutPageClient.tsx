"use client";

import Image from "next/image";

interface AboutPageClientProps {
  locale: string;
  dictionary: any;
}

export default function AboutPageClient({ locale: _locale, dictionary: _dictionary }: AboutPageClientProps) {
  return (
    <main className="section section-light text-slate-900">
      <div className="section-inner space-y-10">
        <div className="card space-y-10">
          <section className="section-stack">
            <div>
              <p className="eyebrow text-slate-500">About</p>
              <h2 className="section-heading">Why ActARion exists</h2>
              <p className="section-subheading text-slate-600">Clarity for frontline work</p>
            </div>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                Work in operations is changing quickly. Processes are more complex, safety and compliance standards are
                stricter, and experienced technicians are harder to find. Yet many teams still depend on PDFs, classroom
                training and informal shadowing to get work done.
              </p>
              <p>
                ActARion exists to help industrial, logistics and energy companies respond to that reality by enabling
                people to work smarter, faster and safer with the support of AR and AI.
              </p>
              <p>
                We focus on the last step of knowledge transfer: how instructions, procedures and expertise actually
                reach the technician, operator or field engineer at the moment of work.
              </p>
            </div>
          </section>

          <section className="section-stack border-t border-slate-200 pt-8">
            <div>
              <h2 className="section-heading">What we believe</h2>
            </div>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                Our name combines &quot;Action&quot; and &quot;Augmented Reality&quot;. It reflects what we care about
                most: turning real work into something more controlled, more consistent and easier to learn.
              </p>
              <ul className="space-y-5 list-none">
                <li>
                  <h3 className="font-semibold text-slate-900">SOPs are more than documents</h3>
                  <p>
                    Standard Operating Procedures are the backbone of quality, safety and performance. They only create
                    value when they are easy to find, easy to follow and easy to improve.
                  </p>
                </li>
                <li>
                  <h3 className="font-semibold text-slate-900">Knowledge should live where the work happens</h3>
                  <p>
                    People should not have to leave their task or search multiple systems while a line is down. Guidance
                    needs to be available in context, step by step, in the actual environment.
                  </p>
                </li>
                <li>
                  <h3 className="font-semibold text-slate-900">Technology should make work clearer</h3>
                  <p>
                    AR and AI are useful only if they reduce ambiguity, make tasks easier to understand and give teams
                    more confidence in what they do.
                  </p>
                </li>
                <li>
                  <h3 className="font-semibold text-slate-900">Continuous improvement is a daily routine</h3>
                  <p>
                    Every task is a learning moment. Execution data should flow back into better instructions, better
                    training and better processes.
                  </p>
                </li>
              </ul>
            </div>
          </section>

          <section className="section-stack border-t border-slate-200 pt-8">
            <div>
              <h2 className="section-heading">Who we work for</h2>
            </div>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                Our customers are organizations in industry, logistics, utilities and energy that see operations as
                their main differentiator. Typical stakeholders we work with include:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>Operations and plant managers who want consistent performance across sites</li>
                <li>Maintenance and reliability teams that have to protect uptime with fewer experts</li>
                <li>HSE and quality managers responsible for safe, compliant work every day</li>
                <li>HR and L&amp;D teams who must onboard new colleagues faster without overloading senior staff</li>
                <li>Digital, IT and innovation teams looking for practical AR/AI use cases with measurable impact</li>
              </ul>
              <p>
                For these teams, &quot;smarter, faster, safer work&quot; is not a slogan. It is a condition for staying
                competitive, meeting regulation and keeping people engaged.
              </p>
            </div>
          </section>

          <section className="section-stack border-t border-slate-200 pt-8">
            <div>
              <h2 className="section-heading">How we help</h2>
            </div>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>ActARion combines world-class AR technology with local, hands-on support.</p>
              <ul className="space-y-5 list-none">
                <li>
                  <h3 className="font-semibold text-slate-900">Deep Sight AR platform</h3>
                  <p>
                    We work with Deep Sight , an AR-first connected worker platform, to turn procedures and expert
                    knowledge into interactive work instructions and SOPs.
                  </p>
                </li>
                <li>
                  <h3 className="font-semibold text-slate-900">From expert know-how to clear guidance</h3>
                  <p>
                    We help capture expertise from senior technicians and translate it into clear, visual guidance that
                    less experienced colleagues can follow with confidence.
                  </p>
                </li>
                <li>
                  <h3 className="font-semibold text-slate-900">From pilots to scale</h3>
                  <p>
                    We support your teams in identifying use cases, running focused pilots and scaling what works across
                    lines, plants and countries.
                  </p>
                </li>
              </ul>
              <p>Our focus is always the same: closing the gap between procedure and actual performance.</p>
            </div>
          </section>

          <section className="section-stack border-t border-slate-200 pt-8">
            <div>
              <h2 className="section-heading">Smarter, faster, safer in practice</h2>
            </div>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>In projects with our clients, &quot;smarter, faster, safer&quot; becomes visible in concrete outcomes:</p>
              <ul className="space-y-5 list-none">
                <li>
                  <h3 className="font-semibold text-slate-900">Smarter</h3>
                  <p>
                    Operational knowledge is structured, searchable and available across locations. Lessons learned in one
                    site can be reused everywhere.
                  </p>
                </li>
                <li>
                  <h3 className="font-semibold text-slate-900">Faster</h3>
                  <p>
                    Onboarding and training times go down, changeovers become repeatable, and troubleshooting is supported
                    by remote experts when needed.
                  </p>
                </li>
                <li>
                  <h3 className="font-semibold text-slate-900">Safer</h3>
                  <p>
                    Visual, step-by-step guidance and built-in checks reduce variance, incidents and compliance risk.
                    Safety requirements are part of the normal flow of work, not a separate checklist.
                  </p>
                </li>
              </ul>
            </div>
          </section>

          <section className="section-stack border-t border-slate-200 pt-8">
            <div>
              <h2 className="section-heading">Who we are</h2>
            </div>
            <div className="space-y-4 text-slate-700 leading-relaxed">
              <p>
                ActARion is led by Managing Partners Mark Dercksen and Ortwin Verreck, supported by a network of AR, AI
                and operations specialists.
              </p>
              <p>We help European companies to:</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>connect strategy and operational reality through practical AR/AI use cases</li>
                <li>bring operations, engineering, HSE, HR and IT around the same table</li>
                <li>move from one-off pilots to a repeatable way of working across sites</li>
              </ul>
              <p>We like to work closely with clients, test ideas in real environments and adjust based on measurable results.</p>
            </div>
          </section>

          <section className="section-stack border-t border-slate-200 pt-8">
            <div className="summary summary--cta items-start text-left space-y-4">
              <h2 className="section-heading">Let&apos;s explore whether this is relevant for you</h2>
              <p>
                If you are responsible for operations, maintenance, HSE, quality, HR/L&amp;D or digital innovation, and
                you recognize the pressure to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700">
                <li>do more with fewer experienced people</li>
                <li>secure knowledge before it leaves the organization</li>
                <li>improve productivity while staying safe and compliant</li>
              </ul>
              <p>then it may be worth exploring what AR and AI can do in your environment.</p>
              <p className="mb-0">
                We are happy to start with a short discovery session or future of work briefing tailored to your teams
                and use cases.
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}