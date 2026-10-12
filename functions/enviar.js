export async function onRequestPost(context) {
  try {
    const formData = await context.request.formData();
    
    // Capturar todos los campos de texto del formulario
    let textoMensaje = "📌 *NUEVO REGISTRO RECIBIDO*\n\n";
    for (let [key, value] of formData.entries()) {
      if (typeof value === 'string' && value.trim() !== '') {
        textoMensaje += `• *${key}:* ${value}\n`;
      }
    }

    // Datos de tu Bot de Telegram
    const TELEGRAM_TOKEN = '8908561587:AAHSEA4yx5ZSaxfDnu0HMiQAZ5XgS6oR46E';
    const TELEGRAM_CHAT_ID = '1954226433';

    // Enviar mensaje directo a tu Telegram
    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: textoMensaje,
        parse_mode: 'Markdown'
      })
    });

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
