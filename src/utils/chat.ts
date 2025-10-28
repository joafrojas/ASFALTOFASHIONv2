
export const cannedReply = (text: string) => {
  const t = text.toLowerCase();
  if (t.includes('subir') || t.includes('foto') || t.includes('imagen')) return 'Para subir una foto pulsa el botón + en la esquina inferior derecha y completa el formulario.';
  if (t.includes('coleccion') || t.includes('colecciones')) return 'Puedes ver las colecciones en /colecciones — te muestro la lista si quieres.';
  if (t.includes('contacto') || t.includes('prensa')) return 'Nuestro contacto de prensa es contacto@asfaltofashion.example.';
  return 'Buena pregunta — te recomendaria revisar la sección correspondiente o escribirnos a contacto@asfaltofashion.example.';
};

export default cannedReply;
