import { useState } from 'react'

const serviceItems = [
  {
    title: 'Entretien de bureaux et entreprises',
    text: 'Nettoyage discret, régulier et organisé pour offrir un environnement de travail impeccable à vos équipes.',
    image:
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
    alt: 'Bureaux professionnels modernes et propres'
  },
  {
    title: 'Nettoyage de commerces et boutiques',
    text: 'Valorisez votre image auprès de vos clients avec des espaces de vente propres, lumineux et accueillants.',
    image:
      'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=1200&q=80',
    alt: 'Intérieur de boutique propre et rangée'
  },
  {
    title: 'Entretien de copropriétés et immeubles',
    text: 'Halls, escaliers, parties communes et vitrages entretenus avec un suivi sérieux et constant.',
    image:
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80',
    alt: 'Hall d’immeuble propre et lumineux'
  },
  {
    title: 'Nettoyage de fin de chantier',
    text: 'Remise en état professionnelle après travaux, avec intervention structurée selon vos contraintes de délai.',
    image:
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1200&q=80',
    alt: 'Local professionnel remis en état après travaux'
  },
  {
    title: 'Entretien régulier',
    text: 'Planification personnalisée : 1 fois par semaine, plusieurs passages ou quotidien selon votre activité.',
    image:
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80',
    alt: 'Agent de nettoyage dans un espace de travail professionnel'
  },
  {
    title: 'Interventions ponctuelles',
    text: 'Besoin urgent ou opération exceptionnelle : nous proposons des interventions rapides et efficaces.',
    image:
      'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80',
    alt: 'Équipe de nettoyage professionnel en intervention'
  }
]

const cities = [
  'Grenoble',
  'Échirolles',
  'Saint-Martin-d’Hères',
  'Saint-Égrève',
  'Meylan',
  'Montbonnot-Saint-Martin',
  'Biviers',
  'Bernin',
  'Crolles',
  'Saint-Ismier',
  'Saint-Nazaire-les-Eymes',
  'Domène',
  'Le Versoud',
  'Lumbin',
  'La Terrasse',
  'Le Touvet',
  'Froges',
  'Le Champ-près-Froges',
  'Villard-Bonnot',
  'Brignoud',
  'Lancey',
  'Tencin',
  'Goncelin',
  'Pontcharra'
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

async function submitToFormSubmit(formElement) {
  const formData = new FormData(formElement)
  const response = await fetch('https://formsubmit.co/ajax/contact@mazar-services.fr', {
    method: 'POST',
    headers: { Accept: 'application/json' },
    body: formData
  })

  if (!response.ok) {
    throw new Error('Form submit failed')
  }
}

export default function App() {
  const [quoteState, setQuoteState] = useState({ loading: false, message: '' })
  const [callbackState, setCallbackState] = useState({ loading: false, message: '' })

  const handleQuoteSubmit = async (event) => {
    event.preventDefault()
    setQuoteState({ loading: true, message: '' })

    try {
      await submitToFormSubmit(event.currentTarget)
      event.currentTarget.reset()
      setQuoteState({
        loading: false,
        message:
          'Merci, votre demande a bien été envoyée. Nous revenons vers vous très rapidement par email.'
      })
    } catch {
      setQuoteState({
        loading: false,
        message: 'Un problème est survenu. Merci de réessayer ou d’écrire à contact@mazar-services.fr.'
      })
    }
  }

  const handleCallbackSubmit = async (event) => {
    event.preventDefault()
    setCallbackState({ loading: true, message: '' })

    try {
      await submitToFormSubmit(event.currentTarget)
      event.currentTarget.reset()
      setCallbackState({
        loading: false,
        message: 'Merci, votre demande de rappel a bien été envoyée. Nous vous recontactons rapidement par email.'
      })
    } catch {
      setCallbackState({
        loading: false,
        message: 'Un problème est survenu. Merci de réessayer ou d’écrire à contact@mazar-services.fr.'
      })
    }
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
            <div className="hero-visual" role="img" aria-label="Visuel professionnel bureaux propres">
              <img
                src="https://images.unsplash.com/photo-1497215842964-222b430dc094?auto=format&fit=crop&w=1500&q=80"
                alt="Open space professionnel propre et lumineux"
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
                  <span key={city}>{city}</span>
                ))}
              </div>
            </div>
            <div className="map-card interactive-map">
              <iframe
                title="Carte interactive zone d’intervention MAZAR SERVICES"
                src="https://www.openstreetmap.org/export/embed.html?bbox=5.55%2C45.08%2C6.40%2C45.56&layer=mapnik&marker=45.1885%2C5.7245"
                loading="lazy"
              />
              <a
                href="https://www.openstreetmap.org/?mlat=45.1885&mlon=5.7245#map=10/45.1885/5.7245"
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
              <form className="devis-form" onSubmit={handleQuoteSubmit}>
                <input type="hidden" name="_subject" value="Nouvelle demande de devis - MAZAR SERVICES" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />

                <label>
                  Entreprise / structure
                  <input name="Entreprise" type="text" required />
                </label>
                <label>
                  Nom du contact
                  <input name="Contact" type="text" required />
                </label>
                <label>
                  Email
                  <input name="Email" type="email" required />
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
                    name="Message"
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
              <p>Demande courte : laissez votre email, nous revenons vers vous au plus vite.</p>
              <form onSubmit={handleCallbackSubmit}>
                <input type="hidden" name="_subject" value="Demande de rappel - MAZAR SERVICES" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <label>
                  Email
                  <input type="email" name="Email" required />
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
            <img src="/logo-full.svg" alt="Logo MAZAR SERVICES" className="footer-logo" />
            <p>Nettoyage professionnel</p>
          </div>
          <div>
            <p>
              <a href="mailto:contact@mazar-services.fr">contact@mazar-services.fr</a>
            </p>
            <p>SIRET : 94172006200012</p>
          </div>
          <div>
            <a href="/mentions-legales.html">Mentions légales</a>
            <a href="/politique-confidentialite.html">Politique de confidentialité</a>
          </div>
        </div>
      </footer>

      {(quoteState.message || callbackState.message) && (
        <div className="toast" role="status" aria-live="polite">
          {quoteState.message || callbackState.message}
        </div>
      )}
    </>
  )
}
