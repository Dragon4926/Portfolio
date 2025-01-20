const mouseCoords = { x: 0, y: 0 };
const dots = document.querySelectorAll(".trail-dot");

// Remove the conflicting cursor declaration since it's not being used
// const cursor = document.querySelector(".cursor");

dots.forEach(function (dot) {
  dot.x = 0;
  dot.y = 0;
});

window.addEventListener("mousemove", function (e) {
  mouseCoords.x = e.clientX;
  mouseCoords.y = e.clientY;
});

function animateTrail() {
  let x = mouseCoords.x;
  let y = mouseCoords.y;
  
  dots.forEach(function (dot, index) {
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    
    dot.x = x;
    dot.y = y;
    
    const nextDot = dots[index + 1] || dots[0];
    x += (nextDot.x - x) * 0.3;
    y += (nextDot.y - y) * 0.3;
    
    // Add opacity based on position in trail
    dot.style.opacity = (dots.length - index) / (dots.length * 2);
  });
  
  requestAnimationFrame(animateTrail);
}

// Performance optimization
const optimizedAnimateTrail = () => {
  let frame;
  return () => {
    if (frame) cancelAnimationFrame(frame);
    frame = requestAnimationFrame(animateTrail);
  };
};

const performantTrail = optimizedAnimateTrail();
window.addEventListener("mousemove", performantTrail, { passive: true });
