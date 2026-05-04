const https = require('https');

const BREVO_API_KEY = process.env.BREVO_API_KEY;

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
    const customerEmail = body.email;

    if (!customerEmail) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Email manquant' }) };
    }

    const confirmationHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Confirmation de devis</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { text-align: center; margin-bottom: 30px; }
    .header h1 { color: #C9A961; margin: 0; font-size: 24px; }
    .content { background: #f9f9f9; padding: 20px; border-left: 4px solid #C9A961; }
    .step { margin: 20px 0; }
    .step-number { color: #C9A961; font-weight: bold; }
    .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; font-size: 12px; color: #666; }
    .divider { border-top: 1px solid #C9A961; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Votre demande de devis reçue ✓</h1>
    </div>

    <div class="content">
      <p>Bonjour,</p>

      <p>Votre demande de devis vient de nous parvenir, et nous vous remercions sincèrement de la confiance que vous accordez à <strong>MAZAR SERVICES</strong>.</p>

      <p><strong>Voici comment votre dossier va être traité :</strong></p>

      <div class="step">
        <div class="step-number">1. Étude de votre demande</div>
        <p>Un chargé de clientèle examine dès aujourd'hui les éléments que vous nous avez transmis afin d'identifier la solution la plus adaptée à votre site.</p>
      </div>

      <div class="step">
        <div class="step-number">2. Proposition personnalisée</div>
        <p>Vous recevrez sous 24 heures ouvrées un devis détaillé, transparent et sans engagement, accompagné d'un plan d'intervention clair.</p>
      </div>

      <div class="step">
        <div class="step-number">3. Échange & ajustements</div>
        <p>Si nécessaire, nous reviendrons vers vous en amont pour préciser certains éléments — surface exacte, fréquence d'intervention, contraintes d'accès, horaires souhaités — avant la remise définitive.</p>
      </div>

      <p><strong>Pour accélérer le traitement,</strong> il vous suffit de répondre directement à ce message en y joignant tout document utile : plans, photos, cahier des charges.</p>

      <p>Cet accusé de réception est automatique, mais à partir de maintenant, votre demande est suivie par un interlocuteur unique. Nous nous engageons sur trois principes simples :</p>
      <ul>
        <li>Une réponse claire</li>
        <li>Un tarif juste</li>
        <li>Une prestation à la hauteur de vos attentes — assurée par des intervenants formés, des produits certifiés et un suivi dédié</li>
      </ul>

      <p><strong>Pour toute question d'ici là :</strong> <a href="mailto:contact@mazar-services.fr">contact@mazar-services.fr</a></p>
    </div>

    <div class="footer">
      <div class="divider"></div>
      <p><strong>L'équipe MAZAR SERVICES</strong></p>
      <p>Nettoyage professionnel</p>
      <p>Bureaux · Commerces · Copropriétés</p>
      <p>Grenoble & Grésivaudan — 7j/7</p>
      <p><a href="https://www.mazar-service.fr">www.mazar-service.fr</a></p>
    </div>
  </div>
</body>
</html>
    `;

    // Envoyer l'email de confirmation au client
    await sendBrevoEmail(
      customerEmail,
      'Votre demande de devis – MAZAR SERVICES ✓',
      confirmationHtml
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Email sent' }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to send email' }),
    };
  }
};
