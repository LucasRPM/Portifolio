/**
 * Utilitário de scroll estilo "Elevador" para transição contínua entre seções.
 * Realiza uma animação visível e fluida com aceleração e desaceleração suave (easeInOutCubic),
 * permitindo ao usuário ver a página subindo ou descendo até o destino.
 */
export const elevatorScrollTo = (targetY: number, customDuration?: number) => {
  const startY = window.scrollY;
  const distance = targetY - startY;
  
  if (Math.abs(distance) < 2) return;

  // Duração calculada de acordo com a distância para manter sensação realista de elevador
  const duration = customDuration ?? Math.min(Math.max(Math.abs(distance) * 0.45, 650), 1000);
  const startTime = performance.now();

  const easeInOutCubic = (t: number) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const step = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOutCubic(progress);

    window.scrollTo(0, startY + distance * ease);

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
};

export const elevatorScrollToSection = (sectionId: string) => {
  if (sectionId === 'sobre') {
    elevatorScrollTo(0, 750);
    return;
  }

  const el = document.getElementById(sectionId);
  if (el) {
    elevatorScrollTo(el.offsetTop, 850);
  }
};
