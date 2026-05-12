export async function onRequestPost({ request, env }) {
  try {
    if (!env.SLACK_WEBHOOK_URL) {
      return new Response(JSON.stringify({ error: 'SLACK_WEBHOOK_URL not set' }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    }

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

    const body = await res.text();
    if (!res.ok) return new Response(JSON.stringify({ error: 'Slack error', status: res.status, body }), { status: 500, headers: { 'Content-Type': 'application/json' } });
    return new Response('ok', { status: 200 });
  } catch (e) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}
