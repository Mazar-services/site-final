const https = require('https');

const BREVO_API_KEY = process.env.BREVO_API_KEY;
const ADMIN_EMAIL = 'contact@mazar-services.fr';

function sendBrevoEmail(to, subject, htmlContent) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify({
      to: [{ email: to }],
      sender: { name: 'MAZAR SERVICES', email: 'contact@mazar-services.fr' },
      subject: subject,
      htmlContent: htmlContent,
    });

    const options = {
      hostname: 'api.brevo.com',
      port: 443,
      path: '/v3/smtp/email',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
        'api-key': BREVO_API_KEY,
      },
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`Brevo API error: ${res.statusCode}`));
        }
      });
    });

    req.on('error', (err) => { reject(err); });
    req.write(payload);
    req.end();
  });
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  try {
    const body = JSON.parse(event.body);
    const { email, name, serviceType, city, surface, frequency, message } = body;

    if (!email) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Email manquant' }) };
    }

    // ── Customer Confirmation Email ────────────────────────────────────────
    const confirmationHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmation de devis</title>
  <style>
    body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', sans-serif; line-height: 1.6; color: #2c3e50; background: #f5f5f5; }
    .wrapper { background: #f5f5f5; padding: 20px 0; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .header { background: linear-gradient(135deg, #1a1a1a 0%, #2c2c2c 100%); padding: 30px 20px; text-align: center; }
    .logo { max-width: 180px; height: auto; margin-bottom: 15px; }
    .header h1 { color: #C9A961; margin: 0; font-size: 28px; font-weight: 600; }
    .subheader { color: #aaa; font-size: 14px; margin-top: 5px; }
    .content { padding: 40px; }
    .greeting { font-size: 16px; margin-bottom: 25px; }
    .intro { color: #2c3e50; margin-bottom: 30px; line-height: 1.8; }
    .intro strong { color: #1a1a1a; }
    .process-title { color: #1a1a1a; font-size: 18px; font-weight: 600; margin: 30px 0 20px 0; }
    .steps { background: #f9f9f9; border-radius: 6px; padding: 20px; margin: 20px 0; }
    .step { margin: 15px 0; padding: 15px 0; border-bottom: 1px solid #e0e0e0; }
    .step:last-child { border-bottom: none; }
    .step-number { color: #C9A961; font-weight: 700; font-size: 15px; margin-bottom: 5px; }
    .step p { margin: 5px 0 0 0; color: #555; font-size: 14px; }
    .acceleration { background: #f0f8ff; border-left: 4px solid #C9A961; padding: 15px; margin: 25px 0; border-radius: 4px; }
    .acceleration p { margin: 0; color: #2c3e50; font-size: 14px; }
    .acceleration strong { color: #C9A961; }
    .principles { background: #fafafa; padding: 20px; margin: 25px 0; border-radius: 6px; }
    .principles-title { color: #1a1a1a; font-weight: 600; margin-bottom: 12px; }
    .principles ul { margin: 0; padding-left: 20px; color: #555; font-size: 14px; }
    .principles li { margin: 8px 0; }
    .cta-button { display: inline-block; background: #C9A961; color: #1a1a1a; padding: 12px 30px; border-radius: 4px; text-decoration: none; font-weight: 600; margin: 20px 0; font-size: 14px; }
    .cta-button:hover { background: #b8985c; }
    .footer { background: #f9f9f9; border-top: 1px solid #e0e0e0; padding: 30px 20px; text-align: center; }
    .footer-divider { border-top: 2px solid #C9A961; margin: 0 0 20px 0; }
    .footer-text { margin: 8px 0; color: #666; font-size: 13px; }
    .footer-text strong { color: #1a1a1a; }
    .contact-info { margin-top: 15px; padding-top: 15px; border-top: 1px solid #e0e0e0; }
    .contact-link { color: #C9A961; text-decoration: none; }
    .contact-link:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <img src="https://www.mazar-services.fr/logo-full.svg" alt="MAZAR SERVICES" class="logo">
        <h1>Devis reçu ✓</h1>
        <p class="subheader">Nous vous répondons dans 24 heures</p>
      </div>

      <div class="content">
        <p class="greeting">Bonjour,</p>

        <p class="intro">Votre demande de devis vient de nous parvenir, et nous vous remercions sincèrement de la confiance que vous accordez à <strong>MAZAR SERVICES</strong>.</p>

        <p class="process-title">Voici comment votre dossier va être traité :</p>

        <div class="steps">
          <div class="step">
            <div class="step-number">1. Étude de votre demande</div>
            <p>Un chargé de clientèle examine dès aujourd'hui les éléments que vous nous avez transmis afin d'identifier la solution la plus adaptée à votre besoin.</p>
          </div>

          <div class="step">
            <div class="step-number">2. Proposition personnalisée</div>
            <p>Vous recevrez sous <strong>24 heures ouvrées</strong> un devis détaillé, transparent et sans engagement, accompagné d'un plan d'intervention clair.</p>
          </div>

          <div class="step">
            <div class="step-number">3. Échange & ajustements</div>
            <p>Si nécessaire, nous reviendrons vers vous pour préciser certains éléments — surface exacte, fréquence d'intervention, contraintes d'accès, horaires souhaités.</p>
          </div>
        </div>

        <div class="acceleration">
          <p><strong>Pour accélérer le traitement :</strong> Répondez directement à ce message en joignant tout document utile (plans, photos, cahier des charges).</p>
        </div>

        <p>Cet accusé de réception est automatique, mais à partir de maintenant, <strong>votre demande est suivie par un interlocuteur unique</strong>. Nous nous engageons sur trois principes simples :</p>

        <div class="principles">
          <div class="principles-title">Nos engagements :</div>
          <ul>
            <li>Une <strong>réponse claire</strong> et détaillée</li>
            <li>Un <strong>tarif juste</strong> et transparent</li>
            <li>Une <strong>prestation à la hauteur</strong> de vos attentes — assurée par des intervenants formés, des produits certifiés et un suivi dédié</li>
          </ul>
        </div>

        <p style="text-align: center; margin-top: 30px;">
          <a href="mailto:contact@mazar-services.fr" class="cta-button">Nous contacter</a>
        </p>
      </div>

      <div class="footer">
        <div class="footer-divider"></div>
        <p class="footer-text"><strong>L'équipe MAZAR SERVICES</strong></p>
        <p class="footer-text">Nettoyage professionnel</p>
        <p class="footer-text">Bureaux · Commerces · Copropriétés</p>
        <p class="footer-text" style="margin-top: 12px;">Grenoble & Grésivaudan — 7j/7</p>
        <div class="contact-info">
          <p class="footer-text">
            <a href="https://www.mazar-services.fr" class="contact-link">www.mazar-services.fr</a>
          </p>
          <p class="footer-text">
            <a href="tel:+33" class="contact-link">Appelez-nous</a> ·
            <a href="mailto:contact@mazar-services.fr" class="contact-link">Email</a>
          </p>
        </div>
      </div>
    </div>
  </div>
</body>
</html>
    `;

    // ── Admin Notification Email ────────────────────────────────────────────
    const adminHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Nouvelle demande de devis</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #333; background: #f5f5f5; margin: 0; padding: 0; }
    .container { max-width: 600px; margin: 0 auto; background: #fff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    .header { background: #1a1a1a; color: #C9A961; padding: 15px; border-radius: 4px; margin-bottom: 20px; }
    .header h2 { margin: 0; font-size: 20px; }
    .field { margin: 15px 0; padding: 10px; background: #f9f9f9; border-left: 3px solid #C9A961; border-radius: 3px; }
    .field-label { font-weight: 600; color: #1a1a1a; }
    .field-value { color: #555; margin-top: 3px; }
    .footer { border-top: 1px solid #ddd; margin-top: 20px; padding-top: 15px; font-size: 12px; color: #999; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>🎯 Nouvelle demande de devis reçue</h2>
    </div>

    <div class="field">
      <div class="field-label">Email du client</div>
      <div class="field-value"><a href="mailto:${email}">${email}</a></div>
    </div>

    ${name ? `
    <div class="field">
      <div class="field-label">Nom</div>
      <div class="field-value">${name}</div>
    </div>
    ` : ''}

    ${serviceType ? `
    <div class="field">
      <div class="field-label">Type de service</div>
      <div class="field-value">${serviceType}</div>
    </div>
    ` : ''}

    ${city ? `
    <div class="field">
      <div class="field-label">Ville / Zone</div>
      <div class="field-value">${city}</div>
    </div>
    ` : ''}

    ${surface ? `
    <div class="field">
      <div class="field-label">Surface approximative</div>
      <div class="field-value">${surface}</div>
    </div>
    ` : ''}

    ${frequency ? `
    <div class="field">
      <div class="field-label">Fréquence souhaitée</div>
      <div class="field-value">${frequency}</div>
    </div>
    ` : ''}

    ${message ? `
    <div class="field">
      <div class="field-label">Message additionnel</div>
      <div class="field-value">${message}</div>
    </div>
    ` : ''}

    <div class="footer">
      <p><strong>Action :</strong> Accédez à votre tableau de bord Brevo pour gérer cette demande.</p>
      <p>Timestamp: ${new Date().toLocaleString('fr-FR')}</p>
    </div>
  </div>
</body>
</html>
    `;

    // Send customer confirmation email
    await sendBrevoEmail(
      email,
      'Devis — Réponse en 24h ✓ MAZAR SERVICES',
      confirmationHtml
    );

    // Send admin notification email
    await sendBrevoEmail(
      ADMIN_EMAIL,
      `Nouvelle demande de devis — ${email}`,
      adminHtml
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Quote request received and confirmed' }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process quote request' }),
    };
  }
};
