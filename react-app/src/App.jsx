import React, { useEffect, useRef, useState } from "react";

/* Background-image fill, mirrors the .img-fill behaviour from the static site */
function ImgFill({ src, className = "" }) {
  const style = {
    backgroundImage: `linear-gradient(135deg, rgba(184,149,69,.10), rgba(35,35,32,.10)), url("${src}")`,
  };
  return <div className={`img-fill ${className}`.trim()} style={style} />;
}

const IMG = {
  logo: "/images/f65a0da8d98410db9da9e716848f143ee6c8fd04.png",
  hero: "/images/image.png",
  origin: "/images/f018656ed5e079f0acc9a814ab8730d032cf815c.jpg",
  picnic: "/images/ad82a1af40f03a54897cd745520b369843e2f67c.jpg",
  tasks: "/images/cbf98afe831b069b7c84243fb02a929acaa4ac0f.jpg",
  wish: "/images/photo_2026-08-13_23-02-15.jpg",
  galCherry: "/images/49b46d81ca70db194ab9ed342677b7d9ecabf47f.jpg",
  galYoyogi: "/images/c876f13f4dce115adf932abda167a6d7c42c459b.jpg",
  galKinkaku: "/images/7ce9597304aca9ed11dd9481a89e4582dae8b0d9.jpg",
  galQuiet: "/images/cbf98afe831b069b7c84243fb02a929acaa4ac0f.jpg",
  galKimono: "/images/0a0a655e310dae1a3bce3c31b9970ebc0c906c24.jpg",
  galGolden: "/images/ad82a1af40f03a54897cd745520b369843e2f67c.jpg",
  benjamin: "/images/f2939924900a823b5241c6dd12c6eb0a53e942b6.jpg",
  joseph: "/images/02519ab7d61751be7b29f8ff6f0dba9222df3a65.jpg",
  bard: "/images/8d489635318f2755ca64245339d01710fcb7a011.jpg",
};

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [formNote, setFormNote] = useState({ text: "", cls: "" });
  const [sending, setSending] = useState(false);
  const galleryRef = useRef(null);
  const year = new Date().getFullYear();

  /* Header scroll state */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Lock body scroll when mobile nav open */
  useEffect(() => {
    document.body.classList.toggle("nav-open", navOpen);
  }, [navOpen]);

  /* Reveal-on-scroll */
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const obs = new IntersectionObserver(
      (entries, o) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            o.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const galStep = (dir) => {
    const track = galleryRef.current;
    if (!track) return;
    const first = track.querySelector(".gallery-item");
    const w = first ? first.getBoundingClientRect().width + 18 : 320;
    const amount = w * Math.max(1, Math.floor(track.clientWidth / w));
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const f = e.target;
    const name = f.name.value.trim();
    const email = f.email.value.trim();
    const service = f.service.value;
    const message = f.message.value.trim();
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!name || !emailOk || !service || !message) {
      setFormNote({ text: "Please complete the required fields with a valid email.", cls: "err" });
      return;
    }
    setSending(true);
    // Simulated submission. Wire this to your backend / email service / form provider.
    setTimeout(() => {
      setFormNote({
        text: `Thank you, ${name}. We've received your request and will reply within one business day.`,
        cls: "ok",
      });
      f.reset();
      setSending(false);
    }, 900);
  };

  const closeNav = () => setNavOpen(false);

  return (
    <>
      {/* ============ HEADER ============ */}
      <header className={`site-header${scrolled ? " scrolled" : ""}`} id="siteHeader">
        <div className="container header-inner">
          <a href="#top" className="brand" aria-label="Rirakkusu Japan home">
            <img className="brand-logo" src={IMG.logo} alt="Rirakkusu Japan" />
          </a>

          <nav className={`main-nav${navOpen ? " open" : ""}`} id="mainNav" aria-label="Primary">
            <a href="#about" onClick={closeNav}>About</a>
            <a href="#services" onClick={closeNav}>Services</a>
            <a href="#team" onClick={closeNav}>Team</a>
            <a href="#gallery" onClick={closeNav}>Gallery</a>
            <a href="#contact" onClick={closeNav}>Contact</a>
            <a href="#contact" className="btn btn-gold nav-cta-mobile" onClick={closeNav}>Book Now</a>
          </nav>

          <a href="#contact" className="btn btn-ghost-light nav-cta-desktop">Book Now</a>

          <button
            className="nav-toggle"
            id="navToggle"
            aria-label="Open menu"
            aria-expanded={navOpen}
            aria-controls="mainNav"
            onClick={() => setNavOpen((v) => !v)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </header>

      {/* ============ HERO ============ */}
      <section className="hero" id="top">
        <div
          className="hero-bg"
          style={{ backgroundImage: `url("${IMG.hero}")` }}
        ></div>
        <div className="hero-overlay"></div>
        <div className="container hero-content reveal">
          <p className="eyebrow eyebrow-light">Rirakkusu Japan</p>
          <h1 className="hero-title">
            Reclaim Your Time.<br />
            <em>Reclaim Your Peace.</em>
          </h1>
          <p className="hero-sub-tag">A sanctuary for the busy professional — built for modern Japan.</p>
          <p className="hero-sub">
            Japan works hard. We know. We see it every day. Rirakkusu Japan was built
            for the people who give everything and deserve to get something back.
          </p>
          <div className="hero-actions">
            <a href="#contact" className="btn btn-gold">Book a Picnic Experience</a>
            <a href="#services" className="btn btn-ghost-light">Delegate Your Tasks</a>
          </div>
        </div>
        <a href="#about" className="scroll-cue" aria-label="Scroll down"><em>Scroll</em><span className="scroll-line"></span></a>
      </section>

      {/* ============ PROBLEM ============ */}
      <section className="problem section-dark" id="about">
        <div className="container">
          <div className="problem-head reveal">
            <p className="eyebrow eyebrow-gold">The Problem</p>
            <h2 className="h2-light">
              Japan Has a Problem.<br />
              <em className="text-gold">We Call It Karoshi.</em>
            </h2>
            <p className="lede-light">
              Death from overwork isn't just a statistic in Japan — it's a culture.
              Long hours, no recovery time, and a never-ending list of
              responsibilities that follow you home.
            </p>
            <p className="problem-pull">◆ You deserve better than that.</p>
            <p className="lede-light">
              We built Rirakkusu Japan because we believe your time, energy, and
              peace of mind are worth protecting.
            </p>
          </div>

          <div className="problem-grid reveal">
            <div className="problem-col">
              <span className="problem-num">01</span>
              <h3>Extreme Stress</h3>
              <p>Long working hours with little to no recovery time — normalised, but never acceptable.</p>
            </div>
            <div className="problem-col">
              <span className="problem-num">02</span>
              <h3>No Way to Decompress</h3>
              <p>A lack of accessible, curated relaxation experiences for busy professionals who need to breathe.</p>
            </div>
            <div className="problem-col">
              <span className="problem-num">03</span>
              <h3>Operational Overwhelm</h3>
              <p>Buried in minor but time-consuming tasks that pull you away from what actually matters.</p>
            </div>
            <div className="problem-col">
              <span className="problem-num">04</span>
              <h3>No Holistic Support</h3>
              <p>No service offered both mental wellness relief and operational relief under one roof. Until now.</p>
            </div>
          </div>
          <span className="kanji-watermark" aria-hidden="true">過労</span>
        </div>
      </section>

      {/* ============ QUOTE ============ */}
      <section className="quote-band">
        <div className="container reveal">
          <p className="quote-text">
            “Rirakkusu Japan exists for one reason — to give you back what overwork
            takes. <em>Your time. Your peace. Your life outside the office.</em>”
          </p>
        </div>
      </section>

      {/* ============ OUR STORY ============ */}
      <section className="origin">
        <div className="container origin-inner">
          <div className="origin-media reveal">
            <div className="media-frame">
              <ImgFill src={IMG.origin} />
            </div>
            <div className="origin-badge">
              <span className="origin-badge-label">Est.</span>
              <span className="origin-badge-num">2026</span>
            </div>
          </div>
          <div className="origin-text reveal">
            <p className="eyebrow eyebrow-gold">Our Story</p>
            <h2>We Saw It.<br />We Felt It.<br /><em>So We Built Something About It.</em></h2>
            <p>
              Rirakkusu Japan is a dual-service company built on one mission: give
              people their time, energy, and peace of mind back.
            </p>
            <p>
              <strong>Relax Picnic</strong> addresses the mental and physical fatigue
              side. <strong>Relax Tasks</strong> tackles the operational overload
              side. Together, the mission is simple.
            </p>
            <p className="origin-quote">
              “We don't just plan picnics. We don't just manage tasks. We build
              experiences and systems around you so you can finally breathe again.”
            </p>
            <ul className="origin-stats">
              <li><strong>10+</strong><span>Experiences</span></li>
              <li><strong>3</strong><span>Locations</span></li>
              <li><strong>98%</strong><span>Satisfaction</span></li>
            </ul>
          </div>
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section className="services" id="services">
        <div className="container">
          <div className="section-head center reveal">
            <p className="eyebrow eyebrow-gold">Two Problems. One Solution. One Brand.</p>
            <h2>We Don't Just Plan Picnics.<br /><em>We Don't Just Manage Tasks.</em></h2>
            <p className="lede">We build experiences and systems around you so you can finally breathe again. Together — you get your time back.</p>
          </div>

          <div className="service-row reveal">
            <div className="service-media"><ImgFill src={IMG.picnic} /></div>
            <div className="service-copy">
              <span className="service-tag">Relax Picnic</span>
              <h3>You Show Up. We Handle Everything Else.</h3>
              <p>
                Curated outdoor experiences built around you — whether it's a date, a
                family day, a birthday, or a corporate wellness event. Nothing
                generic. Ever.
              </p>
              <ul className="checklist">
                <li>Custom menu curation</li>
                <li>Premium tableware &amp; styling</li>
                <li>Seasonal floral arrangements</li>
                <li>Date, family, birthday &amp; corporate</li>
                <li>Photography add-on available</li>
              </ul>
              <a href="#contact" className="link-arrow">Book a Picnic Experience</a>
            </div>
          </div>

          <div className="service-row reverse reveal">
            <div className="service-media"><ImgFill src={IMG.tasks} /></div>
            <div className="service-copy">
              <span className="service-tag">Relax Tasks</span>
              <h3>Delegate the Tasks Draining Your Day.</h3>
              <p>
                Inbox management, scheduling, research, errands — handled by a
                dedicated assistant, tailored to how you work. If you can think of it,
                we can get it done.
              </p>
              <ul className="checklist">
                <li>Inbox &amp; email management</li>
                <li>Calendar &amp; scheduling</li>
                <li>Research &amp; reporting</li>
                <li>Errands &amp; coordination</li>
                <li>Ongoing retainer options</li>
              </ul>
              <a href="#contact" className="link-arrow">Delegate Your Tasks</a>
            </div>
          </div>

          <div className="service-row reveal">
            <div className="service-media"><ImgFill src={IMG.wish} /></div>
            <div className="service-copy">
              <span className="service-tag">Make a Wish</span>
              <h3>Nothing Is Too Big. Nothing Is Too Small.</h3>
              <p>
                What if you could ask for anything and someone actually made it
                happen? Plan a surprise team dinner. Source a gift. Help me relocate.
                Organise my week.
              </p>
              <ul className="checklist">
                <li>Surprise event planning</li>
                <li>Gift sourcing &amp; delivery</li>
                <li>Relocation assistance</li>
                <li>Bespoke personal concierge</li>
                <li>Completely tailored to you</li>
              </ul>
              <a href="#contact" className="link-arrow">Make a Wish</a>
            </div>
          </div>
        </div>
      </section>

      {/* ============ HOW WE DO IT ============ */}
      <section className="approach" id="approach">
        <div className="container">
          <div className="section-head center reveal">
            <p className="eyebrow eyebrow-gold">How We Do It</p>
            <h2>How We Make It Happen —<br /><em>For You, Around You</em></h2>
            <p className="lede">We don't do generic. Every experience, every task, every event we touch is curated specifically around the person or company we're serving. Here's how:</p>
          </div>

          <div className="approach-grid reveal">
            <article className="approach-card">
              <span className="approach-num">01</span>
              <h3>We Show Up So You Can Switch Off</h3>
              <p>From the blankets to the food to the decor — our picnic team handles every detail before you arrive. You bring yourself. We bring everything else.</p>
            </article>
            <article className="approach-card">
              <span className="approach-num">02</span>
              <h3>We Take the Small Things Off Your Plate</h3>
              <p>Emails. Scheduling. Research. Errands. Our task assistants are trained, dedicated, and briefed on your workflow — not a template.</p>
            </article>
            <article className="approach-card">
              <span className="approach-num">03</span>
              <h3>We Build Around You — Not the Other Way Around</h3>
              <p>Couples, families, corporates, solo professionals — every experience is designed for who you are, not who we assume you to be.</p>
            </article>
            <article className="approach-card">
              <span className="approach-num">04</span>
              <h3>We Start With Community</h3>
              <p>Before we ask for your business, we invite you in. Free community picnics, open doors, real conversations. Feel Rirakkusu Japan before you ever book it.</p>
            </article>
            <article className="approach-card">
              <span className="approach-num">05</span>
              <h3>We Grow With You</h3>
              <p>Refer a client. Build a partnership. Join a retainer. We're not a one-time service — we're a long-term relationship with your peace of mind.</p>
            </article>

            <article className="approach-card card-gold">
              <p className="eyebrow eyebrow-on-gold">Community Picnic</p>
              <h3>You're Invited.</h3>
              <ul className="invite-list">
                <li>◆ Last Saturday of the Month</li>
                <li>◆ Yoyogi Park, Tokyo</li>
                <li>◆ 12PM – 4PM</li>
                <li>◆ FREE Entry</li>
              </ul>
              <p className="invite-note">Come as you are. Leave lighter than you arrived. This is what Rirakkusu Japan feels like.</p>
              <a href="#contact" className="btn btn-dark">RSVP via LINE · RJT</a>
            </article>
          </div>
        </div>
      </section>

      {/* ============ GALLERY ============ */}
      <section className="gallery section-dark" id="gallery">
        <div className="container">
          <div className="gallery-head reveal">
            <div>
              <p className="eyebrow eyebrow-gold">Moments Captured</p>
              <h2 className="h2-light">A Glimpse of <em className="text-gold">Our World</em></h2>
            </div>
            <div className="gallery-nav">
              <button className="g-arrow" aria-label="Previous" onClick={() => galStep(-1)}>←</button>
              <button className="g-arrow" aria-label="Next" onClick={() => galStep(1)}>→</button>
            </div>
          </div>
          <div className="gallery-track" ref={galleryRef}>
            <figure className="gallery-item"><ImgFill src={IMG.galCherry} /><figcaption>Cherry Blossom Season</figcaption></figure>
            <figure className="gallery-item"><ImgFill src={IMG.galYoyogi} /><figcaption>Yoyogi Picnic</figcaption></figure>
            <figure className="gallery-item"><ImgFill src={IMG.galKinkaku} /><figcaption>Kinkaku-ji Serenity</figcaption></figure>
            <figure className="gallery-item"><ImgFill src={IMG.galQuiet} /><figcaption>Quiet Moments</figcaption></figure>
            <figure className="gallery-item"><ImgFill src={IMG.galKimono} /><figcaption>Kimono Days</figcaption></figure>
            <figure className="gallery-item"><ImgFill src={IMG.galGolden} /><figcaption>Golden Hour</figcaption></figure>
          </div>
          <p className="gallery-cue reveal">Scroll to explore</p>
        </div>
      </section>

      {/* ============ TESTIMONIALS ============ */}
      <section className="testimonials">
        <div className="container">
          <div className="section-head center reveal">
            <p className="eyebrow eyebrow-gold">Guest Voices</p>
            <h2>They Came. <em>They Breathed Again.</em></h2>
          </div>
          <div className="testi-grid reveal">
            <blockquote className="testi-card">
              <span className="testi-tag">Relax Picnic</span>
              <p>I hadn't truly switched off in two years. Rirakkusu Japan gave me back an afternoon that felt like a whole week of rest.</p>
              <footer><span className="testi-avatar">H</span><span><strong>Haruka N.</strong><span>Tokyo, Japan</span></span></footer>
            </blockquote>
            <blockquote className="testi-card">
              <span className="testi-tag">Relax Tasks</span>
              <p>They took over my inbox for a week. I cried — I actually cried at how much lighter I felt. Relax Tasks is not optional. It's essential.</p>
              <footer><span className="testi-avatar">M</span><span><strong>Marcus T.</strong><span>Singapore</span></span></footer>
            </blockquote>
            <blockquote className="testi-card">
              <span className="testi-tag">Meet &amp; Greet</span>
              <p>The meet and greet made Japan feel like home within hours. I felt guided, cared for, and finally present.</p>
              <footer><span className="testi-avatar">S</span><span><strong>Sofia R.</strong><span>Lagos, Nigeria</span></span></footer>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ============ TEAM ============ */}
      <section className="team" id="team">
        <div className="container">
          <div className="section-head center reveal">
            <p className="eyebrow eyebrow-gold">The People Behind It</p>
            <h2>A Team Built <em>on Purpose</em></h2>
            <p className="lede">Every person at Rirakkusu Japan was chosen because they believe in the mission: give people their time, energy, and peace of mind back.</p>
          </div>

          <div className="team-grid reveal">
            <article className="team-card">
              <div className="team-photo"><ImgFill src={IMG.benjamin} /></div>
              <div className="team-body">
                <p className="team-role">Founder &amp; COO</p>
                <h3>Benjamin Emmanuel</h3>
                <p>The vision behind Rirakkusu Japan. Benjamin built this company on a single belief: that busy people deserve both peace and productivity — and shouldn't have to choose between them.</p>
              </div>
            </article>
            <article className="team-card">
              <div className="team-photo"><ImgFill src={IMG.joseph} /></div>
              <div className="team-body">
                <p className="team-role">Co-Founder &amp; CTO</p>
                <h3>Joseph Emmanuel</h3>
                <p>Joseph builds the systems and infrastructure that make Rirakkusu Japan seamless — from backend operations to the digital experience that connects clients with the team.</p>
              </div>
            </article>
            <article className="team-card">
              <div className="team-photo"><ImgFill src={IMG.bard} /></div>
              <div className="team-body">
                <p className="team-role">Director of Media &amp; Publications</p>
                <h3>Bard Tog</h3>
                <p>Bard shapes how the world sees Rirakkusu Japan — crafting the visual language, storytelling, and brand voice that makes this company feel as warm as it truly is.</p>
              </div>
            </article>
          </div>

          <p className="team-sub reveal">Growing With Purpose — Roles Joining Soon</p>
          <div className="team-grid coming-grid reveal">
            <article className="team-card coming">
              <div className="team-photo placeholder">
                <span className="monogram">HP</span>
                <span className="joining-badge">Joining Soon</span>
              </div>
              <div className="team-body">
                <p className="team-role">Director of Hospitality &amp; Planning</p>
                <h3>Coming Soon</h3>
                <span className="rule"></span>
                <p>Leading the Relax Picnic division — ensuring every curated outdoor experience is executed with precision, warmth, and zero compromise on quality.</p>
              </div>
            </article>
            <article className="team-card coming">
              <div className="team-photo placeholder">
                <span className="monogram">CE</span>
                <span className="joining-badge">Joining Soon</span>
              </div>
              <div className="team-body">
                <p className="team-role">Client Experience Lead</p>
                <h3>Coming Soon</h3>
                <span className="rule"></span>
                <p>The first voice you hear and the last smile you see. This role ensures every client journey with Rirakkusu Japan exceeds expectation from first contact to final delivery.</p>
              </div>
            </article>
            <article className="team-card coming">
              <div className="team-photo placeholder">
                <span className="monogram">TO</span>
                <span className="joining-badge">Joining Soon</span>
              </div>
              <div className="team-body">
                <p className="team-role">Task Operations Manager</p>
                <h3>Coming Soon</h3>
                <span className="rule"></span>
                <p>Overseeing the Relax Tasks division — managing our dedicated assistant team to deliver flawless operational support for professionals across Tokyo and beyond.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ============ REFERRAL ============ */}
      <section className="referral section-dark" id="referral">
        <div className="container referral-inner reveal">
          <div>
            <p className="eyebrow eyebrow-gold">Referral Programme</p>
            <h2 className="h2-light">Know Someone Who <em className="text-gold">Needs This?</em></h2>
            <p className="lede-light">Refer a paying client to Rirakkusu Japan and get 20% off your next service. Because the best things are better when shared — and your peace of mind shouldn't be kept a secret.</p>
          </div>
          <a href="#contact" className="btn btn-gold btn-lg">Refer a Friend</a>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <section className="contact" id="contact">
        <div className="container">
          <div className="section-head center reveal">
            <p className="eyebrow eyebrow-gold">Ready to Breathe Again?</p>
            <h2>Your First Step <em>Is Simple.</em></h2>
            <p className="lede">Tell us what you need — we'll build the rest around you.</p>
          </div>

          <div className="contact-inner reveal">
            <div className="contact-aside">
              <ul className="contact-pills">
                <li>◆ Book a Picnic</li>
                <li>◆ Delegate a Task</li>
                <li>◆ Make a Wish</li>
              </ul>
              <div className="contact-meta">
                <p><span className="ci-icon">✉</span><span><strong>Email</strong><a href="mailto:info@rirakkusujapan.com">info@rirakkusujapan.com</a></span></p>
                <p><span className="ci-icon">◎</span><span><strong>Location</strong>Tokyo, Japan</span></p>
                <p><span className="ci-icon">📷</span><span><strong>Instagram</strong>@relaxjapan_tokyo</span></p>
                <p><span className="ci-icon">◷</span><span><strong>Hours</strong>Sat · 9:00 – 18:00 JST</span></p>
              </div>
              <p className="line-note">For quick enquiries, add our LINE ID. <strong>Request: RJT</strong></p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="name">Your Name</label>
                  <input type="text" id="name" name="name" placeholder="Your name" required />
                </div>
                <div className="field">
                  <label htmlFor="service">Service Inquiry</label>
                  <select id="service" name="service" required defaultValue="">
                    <option value="" disabled>Select a service</option>
                    <option>Relax Picnic</option>
                    <option>Relax Tasks</option>
                    <option>Make a Wish</option>
                    <option>Meet &amp; Greet</option>
                    <option>Referral</option>
                  </select>
                </div>
              </div>
              <div className="field">
                <label htmlFor="email">Email Address</label>
                <input type="email" id="email" name="email" placeholder="hello@mail.com" required />
              </div>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="date">Preferred Date</label>
                  <input type="date" id="date" name="date" />
                </div>
                <div className="field">
                  <label htmlFor="guests">Number of Guests</label>
                  <input type="number" id="guests" name="guests" min="1" placeholder="e.g. 2" />
                </div>
              </div>
              <div className="field">
                <label htmlFor="message">Your Message</label>
                <textarea id="message" name="message" rows="4" placeholder="Tell us what you need — we'll build the rest around you…" required></textarea>
              </div>
              <button type="submit" className="btn btn-gold btn-block" disabled={sending}>
                {sending ? "Sending…" : "Send Enquiry"}
              </button>
              <p className="privacy-note">Your information is kept completely private and will never be shared.</p>
              {formNote.text && <p className={`form-note ${formNote.cls}`} role="status" aria-live="polite">{formNote.text}</p>}
            </form>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="site-footer section-dark">
        <div className="container footer-grid">
          <div className="footer-brand">
            <a href="#top" className="brand">
              <span className="brand-mark">理</span>
              <span className="brand-text">Rirakkusu <em>Japan</em></span>
            </a>
            <p>We build experiences and systems around you so you can finally breathe again. Your time. Your peace. Your life outside the office.</p>
            <p className="footer-loc">Tokyo, Japan</p>
            <div className="footer-social">
              <a href="#" aria-label="Instagram">IG</a>
              <a href="#" aria-label="LINE">LINE</a>
              <a href="mailto:info@rirakkusujapan.com" aria-label="Email">EMAIL</a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Services</h4>
            <a href="#services">Relax Picnic</a>
            <a href="#services">Relax Tasks</a>
            <a href="#services">Meet &amp; Greet</a>
            <a href="#services">Make a Wish</a>
            <a href="#services">Corporate Wellness</a>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <a href="#about">About Us</a>
            <a href="#team">The Team</a>
            <a href="#gallery">Gallery</a>
            <a href="#referral">Referral Programme</a>
            <a href="#approach">Community Picnics</a>
          </div>
          <div className="footer-col">
            <h4>Locations</h4>
            <a href="#">Tokyo</a>
            <a href="#">Kyoto</a>
            <a href="#">Osaka</a>
            <a href="#">Nara</a>
            <a href="#">Yoyogi Park</a>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>© {year} Rirakkusu Japan. All rights reserved. Reclaim your peace &amp; your time.</p>
          <p><a href="#">Privacy Policy</a> · <a href="#">Terms of Service</a></p>
        </div>
      </footer>
    </>
  );
}
