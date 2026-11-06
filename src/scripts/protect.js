// Disuasión contra la copia casual: clic derecho, atajos de código fuente, guardar, imprimir y
// arrastrar imágenes. No es seguridad: el navegador siempre recibe el HTML y las imágenes.
function isBlockedShortcut(e) {
  const key = e.key.toLowerCase();
  const mod = e.ctrlKey || e.metaKey;
  if (key === 'f12') return true;
  if (mod && ['u', 's', 'p'].includes(key)) return true;
  // Ctrl+Shift+I/J/C/K en Windows; Cmd+Option+I/J/C/U en Mac.
  return mod && (e.shiftKey || e.altKey) && ['i', 'j', 'c', 'k', 'u'].includes(key);
}

document.addEventListener('contextmenu', (e) => e.preventDefault());
document.addEventListener('dragstart', (e) => {
  if (e.target instanceof HTMLImageElement) e.preventDefault();
});
document.addEventListener('keydown', (e) => {
  if (!isBlockedShortcut(e)) return;
  e.preventDefault();
  e.stopPropagation();
}, true);
