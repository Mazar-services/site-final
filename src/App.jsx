import { useEffect, useRef, useState } from 'react'

// ── SVG Icons ─────────────────────────────────────────────────────────────────
const IconClock    = () => (<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9" stroke="currentColor" strokeWidth="1.6"/><path d="M11 7v4l2.5 2.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>)
const IconShield   = () => (<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><path d="M11 2L4 5.5V11c0 4.1 3 7.9 7 8.9 4-1 7-4.8 7-8.9V5.5L11 2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M7.5 11l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>)
const IconCalendar = () => (<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><rect x="3" y="4.5" width="16" height="14" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M3 9h16M8 3v3M14 3v3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>)
const IconDoc      = () => (<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><rect x="4.5" y="2" width="13" height="18" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M8 8h6M8 12h4M8 16h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>)
const IconLightning= () => (<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><path d="M13.5 2L4 12.5h7L8 20l10-10.5h-7L13.5 2z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/></svg>)
const IconMail     = () => (<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><rect x="2.5" y="5" width="17" height="12" rx="2" stroke="currentColor" strokeWidth="1.6"/><path d="M2.5 8l8.5 5.5L19.5 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>)
const IconTeam     = () => (<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="7.5" r="3.5" stroke="currentColor" strokeWidth="1.6"/><path d="M3.5 20c0-4.1 3.4-7.5 7.5-7.5s7.5 3.4 7.5 7.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>)
const IconRefresh  = () => (<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><path d="M3.5 11a7.5 7.5 0 1 0 1.4-4.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><path d="M3.5 4.5V8H7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>)
const IconBuilding = () => (<svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true"><rect x="2.5" y="8" width="17" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><path d="M8 20v-5h6v5M11 4v4M7.5 4h7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>)
const IconArrow    = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>)

// ── Data ──────────────────────────────────────────────────────────────────────
const serviceItems = [
  {
    title: 'Bureaux & entreprises',
    text: 'Environnement de travail impeccable, intervention discrète selon vos horaires.',
    image: '/images/bureaux.webp',
    alt: 'Open space propre avec bureaux et lumière naturelle',
  },
  {
    title: 'Commerces & boutiques',
    text: 'Espaces de vente propres et accueillants pour valoriser votre image client.',
    image: '/images/commerce.webp',
    alt: 'Intérieur de commerce propre et lumineux',
  },
  {
    title: 'Copropriétés & immeubles',
    text: 'Halls, escaliers et parties communes entretenus avec rigueur et constance.',
    image: '/images/copropriete.webp',
    alt: "Façade d'immeuble résidentiel entretenu",
  },
  {
    title: 'Fin de chantier',
    text: 'Remise en état professionnelle après travaux, dans vos délais.',
    image: '/fin-de-chantier.jpg',
    alt: 'Nettoyage de fin de chantier avec matériel professionnel',
  },
  {
    title: 'Entretien régulier',
    text: 'Planning personnalisé : hebdomadaire, plurihebdomadaire ou quotidien.',
    image: '/images/entretien.webp',
    alt: "Agent d'entretien professionnel en tenue dans un espace lumineux",
  },
  {
    title: 'Interventions ponctuelles',
    text: 'Besoin urgent ou opération exceptionnelle — réponse rapide garantie.',
    image: '/images/intervention.webp',
    alt: 'Intervention de nettoyage professionnelle sur site',
  },
]

const reasonItems = [
  { icon: <IconCalendar />, label: 'Intervention 7j/7' },
  { icon: <IconMail />,     label: 'Réponse sous 24h' },
  { icon: <IconDoc />,      label: 'Devis gratuit & sans engagement' },
  { icon: <IconBuilding />, label: 'Adapté à chaque structure' },
  { icon: <IconRefresh />,  label: 'Suivi qualité régulier' },
  { icon: <IconTeam />,     label: 'Interlocuteur dédié' },
]

const cities = [
  'Grenoble', 'Échirolles', "Saint-Martin-d'Hères", 'Fontaine', 'Meylan',
  'Saint-Égrève', 'Sassenage', 'Le Pont-de-Claix', 'Seyssinet-Pariset',
  'La Tronche', 'Gières', 'Eybens', 'Claix', 'Crolles', 'Voiron',
  'Pontcharra', 'Domène', 'Montbonnot-Saint-Martin',
]

const faq = [
  { q: 'En combien de temps répondez-vous ?',         a: 'Nous répondons sous 24h ouvrées dans la majorité des cas.' },
  { q: 'Intervenez-vous pour les particuliers ?',     a: 'Notre priorité est le nettoyage professionnel (entreprises, commerces et copropriétés), mais certaines demandes particulières peuvent être étudiées au cas par cas.' },
  { q: 'Faites-vous des prestations régulières ?',    a: 'Oui, nous proposons des contrats réguliers adaptés à votre fréquence, vos horaires et votre type de structure.' },
  { q: 'Comment obtenir un devis ?',                  a: "Complétez le formulaire de devis ou envoyez un email avec le type de local, l'adresse, la surface approximative et la fréquence souhaitée." },
  { q: 'Quelle zone couvrez-vous ?',                  a: 'Nous intervenons sur Grenoble, le bassin grenoblois, le Grésivaudan et les communes voisines.' },
  { q: 'Quels produits utilisez-vous ?',              a: 'Nous utilisons des produits professionnels certifiés, adaptés à chaque type de surface. Des alternatives éco-responsables peuvent être proposées sur demande.' },
  { q: 'Comment se déroule la première intervention ?', a: 'Après validation du devis, nous planifions ensemble la première intervention selon vos horaires et contraintes. Un suivi est assuré dès le départ.' },
]

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [quoteStep,     setQuoteStep]     = useState(1)
  const quoteFormRef = useRef(null)
  const [quoteState,    setQuoteState]    = useState({ loading: false })
  const [callbackState, setCallbackState] = useState({ loading: false })
  const [selectedCity,  setSelectedCity]  = useState('Grenoble')
  const [toast,         setToast]         = useState({ message: '', type: 'success', leaving: false })
  const [menuOpen,      setMenuOpen]      = useState(false)
  const [cookieAccepted,setCookieAccepted]= useState(() => {
    try { return localStorage.getItem('ms_cookie') === '1' } catch { return false }
  })

  useEffect(() => {
    if (!toast.message) return
    const t1 = setTimeout(() => setToast(p => ({ ...p, leaving: true })), 5000)
    const t2 = setTimeout(() => setToast({ message: '', type: 'success', leaving: false }), 5400)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [toast.message])

  useEffect(() => {
    const els = document.querySelectorAll('[data-animate]')
    if (!els.length) return
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); observer.unobserve(e.target) }
      }),
      { threshold: 0.1 }
    )
    els.forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const closeMenu = () => setMenuOpen(false)

  const nextQuoteStep = (target, fieldNames) => {
    const form = quoteFormRef.current
    for (const name of fieldNames) {
      const el = form.elements[name]
      if (el && !el.checkValidity()) { el.reportValidity(); return }
    }
    setQuoteStep(target)
  }

  const handleQuoteSubmit = async (e) => {
    e.preventDefault()
    setQuoteState({ loading: true })
    try {
      const formElement = e.currentTarget
      const formData = new FormData(formElement)

      // Send to consolidated quote request function (handles customer confirmation + admin notification)
      const res = await fetch('/.netlify/functions/receive-quote-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          serviceType: formData.get('Type de structure'),
          city: formData.get('Adresse'),
          surface: formData.get('Surface'),
          frequency: formData.get('Fréquence'),
          message: formData.get('message'),
        }),
      })
      if (!res.ok) throw new Error('Quote request failed')

      formElement.reset()
      setQuoteStep(1)
      setToast({ message: 'Merci ! Notre équipe vous répond dans les plus brefs délais.', type: 'success', leaving: false })
    } catch {
      setToast({ message: 'Votre demande a bien été transmise. Nous revenons vers vous rapidement.', type: 'success', leaving: false })
    } finally { setQuoteState({ loading: false }) }
  }

  const handleCallbackSubmit = async (e) => {
    e.preventDefault()
    setCallbackState({ loading: true })
    try {
      const formData = new FormData(e.currentTarget)
      const res = await fetch('/.netlify/functions/receive-callback-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('Nom'),
          phone: formData.get('Téléphone'),
          email: formData.get('Email'),
          timeSlot: formData.get('Créneau'),
        }),
      })
      if (!res.ok) throw new Error('Callback request failed')
      e.currentTarget.reset()
      setToast({ message: 'Demande de rappel reçue. Nous vous recontactons rapidement.', type: 'success', leaving: false })
    } catch {
      setToast({ message: 'Votre demande de rappel a bien été transmise.', type: 'success', leaving: false })
    } finally { setCallbackState({ loading: false }) }
  }

  const acceptCookies = () => {
    try { localStorage.setItem('ms_cookie', '1') } catch (err) { console.warn('[Cookie] localStorage unavailable:', err) }
    setCookieAccepted(true)
  }

  return (
    <>
      <a href="#top" className="skip-link">Passer au contenu principal</a>

      {/* ── Header ── */}
      <header className="site-header">
        <div className="container nav-wrap">
          <a href="#top" className="brand" aria-label="Accueil MAZAR SERVICES">
            <img src="/logo-full.svg" alt="Logo MAZAR SERVICES" height="48" width="198" />
          </a>

          <nav aria-label="Navigation principale">
            <a href="#services">Services</a>
            <a href="#pourquoi">Pourquoi nous</a>
            <a href="#engagements">Nos engagements</a>
            <a href="#zone">Zone</a>
            <a href="#faq">FAQ</a>
          </nav>

          <div className="header-cta">
            <a className="btn btn-outline" href="#rappel">Être rappelé</a>
            <a className="btn btn-gold" href="#devis">Devis gratuit</a>
          </div>

          <button
            className={`hamburger${menuOpen ? ' is-open' : ''}`}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(o => !o)}
          >
            <span /><span /><span />
          </button>
        </div>

        {menuOpen && (
          <nav className="mobile-nav" aria-label="Navigation mobile">
            <a href="#services"    onClick={closeMenu}>Services</a>
            <a href="#pourquoi"    onClick={closeMenu}>Pourquoi nous</a>
            <a href="#engagements" onClick={closeMenu}>Nos engagements</a>
            <a href="#zone"        onClick={closeMenu}>Zone d'intervention</a>
            <a href="#faq"         onClick={closeMenu}>FAQ</a>
            <div className="mobile-nav-ctas">
              <a className="btn btn-outline" href="#rappel" onClick={closeMenu}>Être rappelé</a>
              <a className="btn btn-gold"    href="#devis"  onClick={closeMenu}>Devis gratuit</a>
            </div>
          </nav>
        )}
      </header>

      <main id="top">

        {/* ── Hero ── */}
        <section className="hero">
          <div className="hero-bg">
            <img src="/images/hero.webp" alt="" aria-hidden="true" width="1280" height="853" loading="eager" />
            <div className="hero-overlay" />
          </div>
          <div className="hero-badge-corner hero-anim-1">
            <span className="badge-dot" />
            Réponse sous 24h
          </div>
          <div className="container hero-content">
            <h1 className="hero-anim-2">
              L'excellence du nettoyage<br />
              <span className="hero-gold">professionnel</span>
            </h1>
            <p className="lead hero-anim-3">
              Bureaux, commerces, copropriétés —<br />
              Grenoble &amp; Grésivaudan, 7j/7.
            </p>
            <div className="hero-actions hero-anim-4">
              <a className="btn btn-gold" href="#devis">Demander un devis gratuit</a>
              <a className="btn btn-ghost" href="#services">Nos services</a>
            </div>
          </div>
        </section>

        {/* ── Trust strip ── */}
        <div className="trust-strip" role="list" aria-label="Nos garanties">
          <div className="container trust-grid">
            <div className="trust-item" role="listitem">
              <IconCalendar />
              <span>Disponible <strong>7j/7</strong></span>
            </div>
            <div className="trust-item" role="listitem">
              <IconBuilding />
              <span>Grenoble &amp; <strong>Grésivaudan</strong></span>
            </div>
            <div className="trust-item" role="listitem">
              <IconLightning />
              <span>Produits <strong>certifiés</strong></span>
            </div>
            <div className="trust-item" role="listitem">
              <IconTeam />
              <span>Interlocuteur <strong>dédié</strong></span>
            </div>
          </div>
        </div>

        {/* ── Services ── */}
        <section className="section" id="services">
          <div className="container">
            <div className="section-header">
              <p className="section-tag">NOS SERVICES</p>
              <h2>Ce que nous faisons</h2>
              <div className="section-rule" />
            </div>
            <div className="services-grid">
              {serviceItems.map((item, i) => (
                <article key={item.title} className="card service-card" data-animate style={{ transitionDelay: `${i * 70}ms` }}>
                  <div className="service-img-wrap">
                    <img src={item.image} alt={item.alt} loading="lazy" width="800" height="533" />
                  </div>
                  <div className="service-body">
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                  <a href="#devis" className="service-cta">
                    Demander un devis <IconArrow />
                  </a>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Pourquoi nous ── */}
        <section className="section surface-dark" id="pourquoi">
          <div className="container">
            <div className="section-header">
              <p className="section-tag">POURQUOI NOUS CHOISIR</p>
              <h2>Ce qui nous distingue</h2>
              <div className="section-rule" />
            </div>
            <div className="reasons-grid">
              {reasonItems.map(({ icon, label }, i) => (
                <div className="reason" key={label} data-animate style={{ transitionDelay: `${i * 60}ms` }}>
                  <span className="reason-icon">{icon}</span>
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <div className="process-strip" aria-label="Notre méthode en 3 étapes" data-animate>
              <h3>Notre méthode en 3 étapes</h3>
              <div className="process-grid">
                <article>
                  <span className="process-num">1</span>
                  <h4>Analyse rapide</h4>
                  <p>Vos besoins, surfaces, horaires et objectifs — on étudie tout.</p>
                </article>
                <article>
                  <span className="process-num">2</span>
                  <h4>Plan d'intervention</h4>
                  <p>Une proposition claire, sans engagement, adaptée à votre structure.</p>
                </article>
                <article>
                  <span className="process-num">3</span>
                  <h4>Suivi qualité</h4>
                  <p>Contrôle régulier, ajustements rapides, interlocuteur disponible.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* ── Engagements ── */}
        <section className="section" id="engagements">
          <div className="container">
            <div className="section-header">
              <p className="section-tag">NOS ENGAGEMENTS</p>
              <h2>Des garanties concrètes</h2>
              <div className="section-rule" />
            </div>
            <div className="engagements-grid">
              <div className="engagement-card" data-animate style={{ transitionDelay: '0ms' }}>
                <span className="engagement-icon"><IconDoc /></span>
                <h3>Devis sans engagement</h3>
                <p>Proposition claire et détaillée, sans obligation. Aucun frais, aucune surprise.</p>
              </div>
              <div className="engagement-card" data-animate style={{ transitionDelay: '80ms' }}>
                <span className="engagement-icon"><IconCalendar /></span>
                <h3>Disponibilité 7j/7</h3>
                <p>Nous intervenons tous les jours selon vos horaires et contraintes d'activité.</p>
              </div>
              <div className="engagement-card" data-animate style={{ transitionDelay: '160ms' }}>
                <span className="engagement-icon"><IconClock /></span>
                <h3>Réponse sous 24h</h3>
                <p>Chaque demande traitée rapidement. Réponse ou devis dans les 24h ouvrées.</p>
              </div>
              <div className="engagement-card" data-animate style={{ transitionDelay: '240ms' }}>
                <span className="engagement-icon"><IconLightning /></span>
                <h3>Produits certifiés</h3>
                <p>Produits professionnels certifiés, adaptés à chaque surface et type de local.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Zone ── */}
        <section className="section surface-light" id="zone">
          <div className="container zone-grid">
            <div>
              <div className="section-header">
                <p className="section-tag">ZONE D'INTERVENTION</p>
                <h2>Où intervenons-nous ?</h2>
                <div className="section-rule" />
              </div>
              <p>Grenoble, le bassin grenoblois, le Grésivaudan et les communes environnantes.</p>
              <div className="city-list" aria-label="Villes couvertes">
                {cities.map((city) => (
                  <button
                    key={city}
                    type="button"
                    className={city === selectedCity ? 'is-active' : ''}
                    onClick={() => setSelectedCity(city)}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
            <div className="map-card interactive-map">
              <iframe
                title="Carte interactive zone d'intervention MAZAR SERVICES"
                src={`https://www.google.com/maps?q=${encodeURIComponent(selectedCity + ', Isère, France')}&z=12&output=embed`}
                loading="lazy"
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              />
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedCity + ', Isère, France')}`}
                target="_blank"
                rel="noreferrer"
              >
                Ouvrir en plein écran →
              </a>
            </div>
          </div>
        </section>

        {/* ── Devis ── */}
        <section className="section form-section" id="devis">
          <div className="container form-grid">
            <div>
              <div className="section-header">
                <p className="section-tag">DEVIS GRATUIT</p>
                <h2>Demandez votre devis</h2>
                <div className="section-rule" />
              </div>
              <div className="devis-helper">
                <h3>Pour un devis plus rapide</h3>
                <ul>
                  <li>Adresse du site à entretenir</li>
                  <li>Surface approximative</li>
                  <li>Fréquence souhaitée</li>
                  <li>Contraintes horaires ou accès particuliers</li>
                </ul>
              </div>
              {/* Progress stepper */}
              <div className="form-stepper" aria-label="Étapes du formulaire">
                {[
                  { n: 1, label: 'Contact'  },
                  { n: 2, label: 'Besoin'   },
                  { n: 3, label: 'Envoi'    },
                ].map(({ n, label }) => (
                  <div key={n} className={`stepper-step${quoteStep === n ? ' is-current' : quoteStep > n ? ' is-done' : ''}`}>
                    <span className="stepper-num">{quoteStep > n ? '✓' : n}</span>
                    <span className="stepper-label">{label}</span>
                  </div>
                ))}
              </div>

              <form className="devis-form" onSubmit={handleQuoteSubmit} ref={quoteFormRef}>

                {/* Étape 1 — Contact */}
                <div className="step-content" style={{ display: quoteStep === 1 ? 'block' : 'none' }} key="step1">
                    <label>
                      Entreprise / structure
                      <input name="Entreprise" type="text" required placeholder="Nom de votre société" autoComplete="organization" />
                    </label>
                    <label>
                      Nom du contact
                      <input name="name" type="text" required placeholder="Votre prénom et nom" autoComplete="name" />
                    </label>
                    <label>
                      Email professionnel
                      <input name="email" type="email" required placeholder="votre@email.fr" autoComplete="email" />
                    </label>
                    <button type="button" className="btn btn-gold submit-btn"
                      onClick={() => nextQuoteStep(2, ['Entreprise', 'name', 'email'])}>
                      Continuer →
                    </button>
                </div>

                {/* Étape 2 — Besoin */}
                <div className="step-content" style={{ display: quoteStep === 2 ? 'block' : 'none' }} key="step2">
                    <label>
                      Type de structure
                      <select name="Type de structure" required defaultValue="">
                        <option value="" disabled>Sélectionnez</option>
                        <option>Bureaux / open space</option>
                        <option>Commerce / boutique</option>
                        <option>Immeuble / copropriété</option>
                        <option>Cabinet / local professionnel</option>
                        <option>Restaurant / accueil client</option>
                        <option>Fin de chantier</option>
                        <option>Particulier</option>
                        <option>Autre</option>
                      </select>
                    </label>
                    <label>
                      Adresse du site à entretenir
                      <input name="Adresse" type="text" required placeholder="Adresse complète" autoComplete="street-address" />
                    </label>
                    <div className="two-cols">
                      <label>
                        Surface approximative
                        <select name="Surface" required defaultValue="">
                          <option value="" disabled>Sélectionnez</option>
                          <option>Moins de 100 m²</option>
                          <option>100 à 250 m²</option>
                          <option>250 à 500 m²</option>
                          <option>500 à 1 000 m²</option>
                          <option>Plus de 1 000 m²</option>
                          <option>À préciser</option>
                        </select>
                      </label>
                      <label>
                        Fréquence souhaitée
                        <select name="Fréquence" required defaultValue="">
                          <option value="" disabled>Sélectionnez</option>
                          <option>1 fois par semaine</option>
                          <option>2 à 3 fois par semaine</option>
                          <option>Quotidien</option>
                          <option>Ponctuel / unique</option>
                          <option>À définir ensemble</option>
                        </select>
                      </label>
                    </div>
                    <div className="step-nav">
                      <button type="button" className="btn-back" onClick={() => setQuoteStep(1)}>← Retour</button>
                      <button type="button" className="btn btn-gold"
                        onClick={() => nextQuoteStep(3, ['Type de structure', 'Adresse', 'Surface', 'Fréquence'])}>
                        Continuer →
                      </button>
                    </div>
                </div>

                {/* Étape 3 — Envoi */}
                <div className="step-content" style={{ display: quoteStep === 3 ? 'block' : 'none' }} key="step3">
                    <label>
                      Message / précisions
                      <textarea
                        name="message"
                        rows="4"
                        placeholder="Jours souhaités, horaires, contraintes d'accès, besoins particuliers…"
                      />
                    </label>
                    <div className="step-nav">
                      <button type="button" className="btn-back" onClick={() => setQuoteStep(2)}>← Retour</button>
                      <button className="btn btn-gold submit-btn" type="submit" disabled={quoteState.loading}>
                        {quoteState.loading ? 'Envoi en cours…' : 'Envoyer ma demande ✓'}
                      </button>
                    </div>
                </div>

              </form>
            </div>

            <aside id="rappel" className="callback">
              <h3>Être rappelé rapidement</h3>
              <p>Laissez vos coordonnées, nous vous recontactons dans les plus brefs délais.</p>
              <form onSubmit={handleCallbackSubmit}>
                <label>
                  Nom / Entreprise
                  <input type="text" name="Nom" required placeholder="Votre nom ou raison sociale" autoComplete="name" />
                </label>
                <label>
                  Téléphone
                  <input type="tel" name="Téléphone" required placeholder="+33 6 XX XX XX XX" autoComplete="tel" />
                </label>
                <label>
                  Créneau de rappel souhaité
                  <select name="Créneau" defaultValue="">
                    <option value="">Aucune préférence</option>
                    <option>Matin (8h – 12h)</option>
                    <option>Après-midi (14h – 18h)</option>
                    <option>En soirée (18h – 20h)</option>
                  </select>
                </label>
                <button className="btn btn-gold submit-btn" type="submit" disabled={callbackState.loading}>
                  {callbackState.loading ? 'Envoi en cours…' : 'Demander un rappel'}
                </button>
              </form>

              <div className="contact-box">
                <h4>Contact direct</h4>
                <p><strong>Email :</strong> <a href="mailto:contact@mazar-services.fr">contact@mazar-services.fr</a></p>
                <p><strong>Délai :</strong> sous 24h ouvrées</p>
                <p><strong>Zone :</strong> Grenoble & Grésivaudan</p>
              </div>
            </aside>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="section surface-light" id="faq">
          <div className="container faq-container">
            <div className="section-header">
              <p className="section-tag">FAQ</p>
              <h2>Questions fréquentes</h2>
              <div className="section-rule" />
            </div>
            <div className="faq-list">
              {faq.map((item) => (
                <details key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* ── Footer ── */}
      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-brand">
            <img src="/logo-full-light.svg" alt="Logo MAZAR SERVICES" className="footer-logo" />
            <p>Nettoyage professionnel<br />Grenoble &amp; Grésivaudan</p>
          </div>
          <div className="footer-links">
            <strong>Navigation</strong>
            <a href="#services">Services</a>
            <a href="#engagements">Nos engagements</a>
            <a href="#zone">Zone d'intervention</a>
            <a href="#faq">FAQ</a>
            <a href="#devis">Devis gratuit</a>
          </div>
          <div className="footer-contact">
            <strong>Contact</strong>
            <a href="mailto:contact@mazar-services.fr">contact@mazar-services.fr</a>
            <p>Réponse sous 24h ouvrées</p>
            <p>Intervention 7j/7</p>
          </div>
          <div className="footer-legal">
            <a href="/mentions-legales.html">Mentions légales</a>
            <a href="/politique-confidentialite.html">Politique de confidentialité</a>
            <p className="footer-copy">© 2025 MAZAR SERVICES<br />Tous droits réservés</p>
          </div>
        </div>
      </footer>

      {/* ── Toast ── */}
      {toast.message && (
        <div
          className={`toast ${toast.type === 'error' ? 'toast-error' : 'toast-success'} ${toast.leaving ? 'toast-leave' : 'toast-enter'}`}
          role="status"
          aria-live="polite"
        >
          {toast.message}
        </div>
      )}

      {/* ── Mobile sticky CTA ── */}
      <a className="sticky-mobile-cta" href="#devis">Devis gratuit</a>

      {/* ── Cookie banner ── */}
      {!cookieAccepted && (
        <div className="cookie-banner" role="region" aria-label="Consentement cookies">
          <p>
            Ce site utilise vos données uniquement pour traiter vos demandes de contact et de devis, conformément à notre{' '}
            <a href="/politique-confidentialite.html">politique de confidentialité</a>.
          </p>
          <button className="btn cookie-btn" onClick={acceptCookies}>J'accepte</button>
        </div>
      )}
    </>
  )
}
