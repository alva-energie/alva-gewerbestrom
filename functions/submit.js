export async function onRequestPost({ request, env }) {
  const { name, firma, email, telefon, nachricht, utm, timestamp } = await request.json();

  const lines = [
    '*🔔 Neue Gewerbestrom-Anfrage*',
    `*Name:* ${name}`,
    `*Unternehmen:* ${firma}`,
    `*E-Mail:* ${email}`,
    telefon ? `*Telefon:* ${telefon}` : null,
    nachricht ? `*Nachricht:* ${nachricht}` : null,
    utm ? `*UTM Source:* ${utm}` : null,
    `_${new Date(timestamp).toLocaleString('de-DE', { timeZone: 'Europe/Berlin' })}_`
  ].filter(Boolean).join('\n');

  const res = await fetch(env.SLACK_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: lines })
  });

  if (!res.ok) return new Response('error', { status: 500 });
  return new Response('ok', { status: 200 });
}
