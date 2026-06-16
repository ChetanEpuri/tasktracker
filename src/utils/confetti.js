export const triggerConfetti = (x, y) => {
  const colors = ['#C9A84C', '#1A6BAF', '#C4633A', '#FFFFFF'];
  const count = 40;

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 4 + 6; // 6-10px
    
    el.style.position = 'fixed';
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.backgroundColor = color;
    el.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    el.style.pointerEvents = 'none';
    el.style.zIndex = '9999';
    
    const tx = (Math.random() - 0.5) * 100;
    const ty = (Math.random() - 1) * 100 - 40; // Bias upwards
    const rot = Math.random() * 360;
    
    el.animate([
      { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
      { transform: `translate(${tx}px, ${ty}px) rotate(${rot}deg)`, opacity: 0 }
    ], {
      duration: 800 + Math.random() * 400,
      easing: 'cubic-bezier(0.25, 1, 0.5, 1)',
      fill: 'forwards'
    });
    
    document.body.appendChild(el);
    
    // Cleanup
    setTimeout(() => {
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      }
    }, 1500);
  }
};
