// Disuasión contra la copia casual: clic derecho, atajos de código fuente, guardar, imprimir,
// arrastrar imágenes y atajos de captura. No es seguridad: el navegador siempre recibe el HTML y
// las imágenes, y el sistema operativo puede capturar la pantalla sin que la página se entere.
const root = document.documentElement;
let shieldTimer = 0;

function raiseShield(ms) {
  root.classList.add('shield');
  clearTimeout(shieldTimer);
  if (ms) shieldTimer = setTimeout(lowerShield, ms);
}

function lowerShield() {
  clearTimeout(shieldTimer);
  root.classList.remove('shield');
}

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
  if (isBlockedShortcut(e)) {
    e.preventDefault();
    e.stopPropagation();
    return;
  }
  // Win+Shift+S y Cmd+Shift+3/4/5 empiezan con la tecla del sistema: se difumina antes del recorte.
  if (e.key === 'Meta' || e.key === 'OS' || e.key === 'PrintScreen') raiseShield(e.key === 'PrintScreen' ? 1500 : 0);
}, true);
document.addEventListener('keyup', (e) => {
  if (e.key === 'PrintScreen') {
    raiseShield(1500);
    // La imagen capturada queda en el portapapeles: se reemplaza cuando el navegador lo permite.
    if (navigator.clipboard) navigator.clipboard.writeText('').catch(() => {});
  } else if (e.key === 'Meta' || e.key === 'OS') {
    raiseShield(1500);
  }
}, true);

// Las herramientas de recorte y las grabadoras suelen quitarle el foco a la ventana.
addEventListener('blur', () => raiseShield(0));
addEventListener('focus', lowerShield);
