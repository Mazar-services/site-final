import { useEffect, useRef, useState } from 'react'

const serviceItems = [
  {
    title: 'Entretien de bureaux et entreprises',
    text: 'Nettoyage discret, régulier et organisé pour offrir un environnement de travail impeccable à vos équipes.',
    image:
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=80',
    alt: 'Open space professionnel propre et lumineux'
  },
  {
    title: 'Nettoyage de commerces et boutiques',
    text: 'Valorisez votre image auprès de vos clients avec des espaces de vente propres, lumineux et accueillants.',
    image:
      'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1400&q=80',
    alt: 'Boutique de prêt-à-porter propre et bien présentée'
  },
  {
    title: 'Entretien de copropriétés et immeubles',
    text: 'Halls, escaliers, parties communes et vitrages entretenus avec un suivi sérieux et constant.',
    image:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1400&q=80',
    alt: 'Hall de copropriété propre avec parties communes entretenues'
  },
  {
    title: 'Nettoyage de fin de chantier',
    text: 'Remise en état professionnelle après travaux, avec intervention structurée selon vos contraintes de délai.',
    image:
      'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1400&q=80',
    alt: 'Fin de chantier et remise en état d’un local professionnel'
  },
  {
    title: 'Entretien régulier',
    text: 'Planification personnalisée : 1 fois par semaine, plusieurs passages ou quotidien selon votre activité.',
    image:
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?auto=format&fit=crop&w=1400&q=80',
    alt: 'Technicien de surface nettoyant des bureaux professionnels'
  },
  {
    title: 'Interventions ponctuelles',
    text: 'Besoin urgent ou opération exceptionnelle : nous proposons des interventions rapides et efficaces.',
    image:
      'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=1400&q=80',
    alt: 'Intervention ponctuelle de nettoyage sur site professionnel'
  }
]

const cities = [
  'Grenoble',
  'Échirolles',
  'Saint-Martin-d’Hères',
  'Fontaine',
  'Meylan',
  'Saint-Égrève',
  'Sassenage',
  'Le Pont-de-Claix',
  'Seyssinet-Pariset',
  'La Tronche',
  'Gières',
  'Eybens',
  'Claix',
  'Crolles',
  'Voiron',
  'Pontcharra',
  'Domène',
  'Montbonnot-Saint-Martin'
]

const faq = [
  {
    q: 'En combien de temps répondez-vous ?',
    a: 'Nous répondons sous 24h ouvrées dans la majorité des cas.'
  },
  {
    q: 'Intervenez-vous pour les particuliers ?',
    a: 'Notre priorité est le nettoyage professionnel (entreprises, commerces et copropriétés), mais certaines demandes particulières peuvent être étudiées.'
  },
  {
    q: 'Faites-vous des prestations régulières ?',
    a: 'Oui, nous proposons des prestations régulières ou ponctuelles selon vos besoins.'
  },
  {
    q: 'Comment obtenir un devis ?',
    a: 'Complétez le formulaire de devis ou envoyez un email avec le type de local, l’adresse, la surface et la fréquence souhaitée.'
  },
  {
    q: 'Quelle zone couvrez-vous ?',
    a: 'Nous intervenons sur Grenoble, le bassin grenoblois, le Grésivaudan et les communes voisines.'
  }
]

export default function App() {
  const [quoteState, setQuoteState] = useState({ loading: false })
  const [callbackState, setCallbackState] = useState({ loading: false })
  const [selectedCity, setSelectedCity] = useState('Grenoble')
  const [toast, setToast] = useState({ message: '', type: 'success', leaving: false })
  const [pendingSubmission, setPendingSubmission] = useState(null)
  const iframeLoadedOnce = useRef(false)
  const submitTimeoutRef = useRef(null)

  useEffect(() => {
    if (!toast.message) return undefined

    const startLeaving = setTimeout(() => {
      setToast((prev) => ({ ...prev, leaving: true }))
    }, 5000)

    const clearToast = setTimeout(() => {
      setToast({ message: '', type: 'success', leaving: false })
    }, 5400)

    return () => {
      clearTimeout(startLeaving)
      clearTimeout(clearToast)
    }
  }, [toast.message])


  useEffect(() => {
    return () => {
      if (submitTimeoutRef.current) clearTimeout(submitTimeoutRef.current)
    }
  }, [])

  const resetLoadingStates = () => {
    setQuoteState({ loading: false })
    setCallbackState({ loading: false })
  }

  const setSubmissionTimeout = () => {
    if (submitTimeoutRef.current) clearTimeout(submitTimeoutRef.current)

    submitTimeoutRef.current = setTimeout(() => {
      resetLoadingStates()
      setPendingSubmission(null)
      setToast({
        message: 'Envoi impossible pour le moment. Merci de réessayer dans quelques secondes.',
        type: 'error',
        leaving: false
      })
    }, 8000)
  }

  const handleQuoteSubmit = () => {
    setQuoteState({ loading: true })
    setPendingSubmission('quote')
    setSubmissionTimeout()
  }

  const handleCallbackSubmit = () => {
    setCallbackState({ loading: true })
    setPendingSubmission('callback')
    setSubmissionTimeout()
  }

  const handleHiddenFrameLoad = () => {
    if (!iframeLoadedOnce.current) {
      iframeLoadedOnce.current = true
      return
    }

    if (!pendingSubmission) return

    if (submitTimeoutRef.current) {
      clearTimeout(submitTimeoutRef.current)
      submitTimeoutRef.current = null
    }

    const successMessage =
      pendingSubmission === 'quote'
        ? 'Merci de nous avoir contactés. Notre équipe va répondre à votre requête dans les plus brefs délais.'
        : 'Merci pour votre demande de rappel. Notre équipe vous recontacte dans les plus brefs délais.'

    resetLoadingStates()
    setPendingSubmission(null)
    setToast({
      message: successMessage,
      type: 'success',
      leaving: false
    })
  }


  return (
    <>
      <header className="site-header">
        <div className="container nav-wrap">
          <a href="#top" className="brand" aria-label="Aller en haut de page">
            <img src="/logo-full.svg" alt="Logo MAZAR SERVICES" />
          </a>

          <nav aria-label="Navigation principale">
            <a href="#services">Services</a>
            <a href="#pourquoi">Pourquoi nous</a>
            <a href="#zone">Zone d’intervention</a>
            <a href="#devis">Demande de devis</a>
          </nav>

          <div className="header-cta">
            <a className="btn btn-outline" href="#rappel">
              Être rappelé
            </a>
            <a className="btn" href="#devis">
              Demander un devis
            </a>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero section">
          <div className="container hero-grid">
            <div>
              <p className="eyebrow">NETTOYAGE PROFESSIONNEL • GRENOBLE & GRÉSIVAUDAN</p>
              <h1>Entreprise de nettoyage professionnel à Grenoble et dans le Grésivaudan</h1>
              <p className="lead">
                Prestations adaptées à chaque structure – Intervention 7j/7 – Réponse sous 24h.
              </p>
              <p>
                MAZAR SERVICES accompagne les entreprises, commerces, copropriétés et structures professionnelles avec des prestations de nettoyage fiables, organisées et adaptées à vos besoins.
              </p>
              <div className="hero-actions">
                <a className="btn" href="#devis">
                  Demander un devis
                </a>
                <a className="btn btn-outline" href="#rappel">
                  Être rappelé
                </a>
              </div>
              <ul className="hero-points">
                <li>Devis simple et sans engagement</li>
                <li>Organisation selon vos horaires et contraintes</li>
                <li>Suivi sérieux et interlocuteur réactif</li>
              </ul>
            </div>
            <div className="hero-visual" role="img" aria-label="Visuel professionnel nettoyage en bureau">
              <img
                src="https://images.unsplash.com/photo-1603712725038-e9334ae8f39f?auto=format&fit=crop&w=1500&q=80"
                alt="Bureaux professionnels propres et lumineux"
                loading="eager"
              />
            </div>
          </div>
        </section>

        <section className="section" id="services">
          <div className="container">
            <h2>Services de nettoyage professionnel</h2>
            <p className="section-intro">
              Chaque prestation est organisée selon votre activité, vos horaires, vos surfaces et vos contraintes.
            </p>
            <div className="services-grid">
              {serviceItems.map((item) => (
                <article key={item.title} className="card service-card">
                  <img className="service-photo" src={item.image} alt={item.alt} loading="lazy" />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section surface-light" id="pourquoi">
          <div className="container">
            <h2>Pourquoi choisir MAZAR SERVICES</h2>
            <div className="reasons-grid">
              {[
                'Intervention 7j/7',
                'Réponse sous 24h',
                'Devis simple et sans engagement',
                'Organisation adaptée à chaque structure',
                'Suivi sérieux et réactivité',
                'Fiabilité et image professionnelle renforcée'
              ].map((reason) => (
                <div className="reason" key={reason}>
                  {reason}
                </div>
              ))}
            </div>
            <div className="process-strip" aria-label="Processus de travail en 3 étapes">
              <h3>Notre méthode en 3 étapes</h3>
              <div className="process-grid">
                <article>
                  <span>1</span>
                  <h4>Analyse rapide</h4>
                  <p>Nous analysons vos besoins, surfaces, contraintes horaires et objectifs d’image.</p>
                </article>
                <article>
                  <span>2</span>
                  <h4>Plan d’intervention</h4>
                  <p>Vous recevez un plan clair, sans engagement, avec une organisation adaptée à votre structure.</p>
                </article>
                <article>
                  <span>3</span>
                  <h4>Suivi qualité</h4>
                  <p>Contrôle régulier, ajustements rapides et interlocuteur disponible pour un service fiable.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="zone">
          <div className="container zone-grid">
            <div>
              <h2>Zone d’intervention</h2>
              <p>
                Nous intervenons sur Grenoble, le bassin grenoblois, le Grésivaudan et les communes environnantes.
              </p>
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
                title="Carte interactive zone d’intervention MAZAR SERVICES"
                src={`https://www.google.com/maps?q=${encodeURIComponent(selectedCity + ', Isère, France')}&z=12&output=embed`}
                loading="lazy"
              />
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(selectedCity + ', Isère, France')}`}
                target="_blank"
                rel="noreferrer"
              >
                Ouvrir la carte en plein écran
              </a>
            </div>
          </div>
        </section>

        <section className="section form-section" id="devis">
          <div className="container form-grid">
            <div>
              <h2>Demande de devis</h2>
              <p>Décrivez votre besoin et recevez une réponse rapide avec une proposition adaptée.</p>
              <div className="devis-helper">
                <h3>Pour un devis plus rapide</h3>
                <ul>
                  <li>Adresse du site à entretenir</li>
                  <li>Surface approximative</li>
                  <li>Fréquence souhaitée</li>
                  <li>Contraintes horaires ou accès</li>
                </ul>
              </div>
              <p className="reply-time">⏱ Réponse sous 24h ouvrées (généralement plus rapide).</p>
              <form className="devis-form" onSubmit={handleQuoteSubmit} action="https://formsubmit.co/contact@mazar-services.fr" method="POST" target="hidden-form-target">
                <input type="hidden" name="_subject" value="Nouvelle demande de devis - MAZAR SERVICES" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />

                <label>
                  Entreprise / structure
                  <input name="Entreprise" type="text" required />
                </label>
                <label>
                  Nom du contact
                  <input name="name" type="text" required />
                </label>
                <label>
                  Email
                  <input name="email" type="email" required />
                </label>

                <label>
                  Type de structure
                  <select name="Type de structure" required defaultValue="">
                    <option value="" disabled>
                      Sélectionnez
                    </option>
                    <option>Bureaux / open space</option>
                    <option>Commerce / boutique</option>
                    <option>Immeuble / copropriété</option>
                    <option>Cabinet / local professionnel</option>
                    <option>Restaurant / accueil client</option>
                    <option>Particulier</option>
                    <option>Autre</option>
                  </select>
                </label>

                <label>
                  Adresse de l’entreprise / du site
                  <input name="Adresse" type="text" required />
                </label>

                <div className="two-cols">
                  <label>
                    Surface approximative
                    <select name="Surface" required defaultValue="">
                      <option value="" disabled>
                        Sélectionnez
                      </option>
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
                      <option value="" disabled>
                        Sélectionnez
                      </option>
                      <option>1 fois par semaine</option>
                      <option>2 à 3 fois par semaine</option>
                      <option>Quotidien</option>
                      <option>Ponctuel</option>
                      <option>À définir ensemble</option>
                    </select>
                  </label>
                </div>

                <label>
                  Message / précisions
                  <textarea
                    name="message"
                    rows="5"
                    placeholder="Jours souhaités, horaires, contraintes, type de locaux, besoin particulier..."
                  />
                </label>

                <button className="btn submit-btn" type="submit" disabled={quoteState.loading}>
                  {quoteState.loading ? 'Envoi en cours...' : 'Envoyer la demande'}
                </button>
              </form>
            </div>

            <aside id="rappel" className="callback">
              <h3>Être rappelé rapidement</h3>
              <p>Insérez votre numéro pour être appelé dans les plus brefs délais.</p>
              <form onSubmit={handleCallbackSubmit} action="https://formsubmit.co/contact@mazar-services.fr" method="POST" target="hidden-form-target">
                <input type="hidden" name="_subject" value="Demande de rappel - MAZAR SERVICES" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />

                <label>
                  Téléphone
                  <input type="tel" name="Téléphone" required />
                </label>
                <button className="btn submit-btn" type="submit" disabled={callbackState.loading}>
                  {callbackState.loading ? 'Envoi en cours...' : 'Demander un rappel'}
                </button>
              </form>

              <div className="contact-box">
                <h4>Contact direct</h4>
                <p>
                  <strong>Email :</strong>{' '}
                  <a href="mailto:contact@mazar-services.fr">contact@mazar-services.fr</a>
                </p>
                <p>
                  <strong>Délai de réponse :</strong> sous 24h ouvrées
                </p>
                <p>
                  <strong>Zone :</strong> Grenoble, Grésivaudan et alentours
                </p>
                <p>
                  <strong>SIRET :</strong> 94172006200012
                </p>
              </div>
            </aside>
          </div>
        </section>

        <section className="section surface-light" id="faq">
          <div className="container">
            <h2>FAQ</h2>
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

      <footer className="site-footer">
        <div className="container footer-grid">
          <div>
            <img src="/logo-full-light.svg" alt="Logo MAZAR SERVICES" className="footer-logo" />
            <p>Nettoyage professionnel</p>
          </div>
          <div>
            <p>
              <a href="mailto:contact@mazar-services.fr">contact@mazar-services.fr</a>
            </p>
            <p>Réponse sous 24h ouvrées</p>
            <p>SIRET : 94172006200012</p>
          </div>
          <div>
            <a href="/mentions-legales.html">Mentions légales</a>
            <a href="/politique-confidentialite.html">Politique de confidentialité</a>
          </div>
        </div>
      </footer>

      {toast.message && (
        <div
          className={`toast ${toast.type === 'error' ? 'toast-error' : 'toast-success'} ${toast.leaving ? 'toast-leave' : 'toast-enter'}`}
          role="status"
          aria-live="polite"
        >
          {toast.message}
        </div>
      )}

      <iframe title="Soumission formulaire" name="hidden-form-target" className="hidden-frame" onLoad={handleHiddenFrameLoad} />

      <a className="sticky-mobile-cta" href="#devis">
        Demander un devis
      </a>
    </>
  )
}
