export async function onRequestPost(context) {
  try {
    const formData = await context.request.formData();
    
    const nombreArtistico = formData.get('nombre_artistico') || 'No especificado';
    const categoria = formData.get('categoria') || 'No especificada';

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Registro recibido correctamente',
      data: { nombreArtistico, categoria }
    }), {
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
