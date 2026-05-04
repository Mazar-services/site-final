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
    const { name, phone, timeSlot, email } = body;

    // Admin notification email
    const adminHtml = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <title>Nouvelle demande de rappel</title>
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
      <h2>📞 Nouvelle demande de rappel reçue</h2>
    </div>

    <div class="field">
      <div class="field-label">Nom / Raison sociale</div>
      <div class="field-value">${name || 'Non fourni'}</div>
    </div>

    <div class="field">
      <div class="field-label">Téléphone</div>
      <div class="field-value"><a href="tel:${phone}">${phone || 'Non fourni'}</a></div>
    </div>

    ${email ? `
    <div class="field">
      <div class="field-label">Email</div>
      <div class="field-value"><a href="mailto:${email}">${email}</a></div>
    </div>
    ` : ''}

    ${timeSlot ? `
    <div class="field">
      <div class="field-label">Créneau préféré</div>
      <div class="field-value">${timeSlot}</div>
    </div>
    ` : ''}

    <div class="footer">
      <p><strong>Action :</strong> Appelez ce client rapidement.</p>
      <p>Timestamp: ${new Date().toLocaleString('fr-FR')}</p>
    </div>
  </div>
</body>
</html>
    `;

    // Send admin notification email
    await sendBrevoEmail(
      ADMIN_EMAIL,
      `Demande de rappel — ${name || 'Sans nom'}`,
      adminHtml
    );

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Callback request received' }),
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process callback request' }),
    };
  }
};
