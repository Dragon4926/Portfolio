let scene, camera, renderer, particles;

function initSnow() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
  renderer = new THREE.WebGLRenderer({ alpha: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.domElement.style.position = 'fixed';
  renderer.domElement.style.top = '0';
  renderer.domElement.style.left = '0';
  renderer.domElement.style.zIndex = '-1';
  document.body.insertBefore(renderer.domElement, document.body.firstChild);

  // Create snow particles
  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  const textureLoader = new THREE.TextureLoader();
  
  const sprite = textureLoader.load('/snowflake.png');
  
  for (let i = 0; i < 1000; i++) {
    const x = Math.random() * 2000 - 1000;
    const y = Math.random() * 2000 - 1000;
    const z = Math.random() * 2000 - 1000;
    vertices.push(x, y, z);
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

  const material = new THREE.PointsMaterial({
    size: 4,
    map: sprite,
    transparent: true,
    opacity: 0.7,
    color: 0xffffff
  });

  particles = new THREE.Points(geometry, material);
  scene.add(particles);
  camera.position.z = 1000;
}

function animateSnow() {
  requestAnimationFrame(animateSnow);
  
  particles.rotation.y += 0.001;
  const positions = particles.geometry.attributes.position.array;
  
  for (let i = 1; i < positions.length; i += 3) {
    positions[i] -= 2;
    if (positions[i] < -1000) {
      positions[i] = 1000;
    }
  }
  
  particles.geometry.attributes.position.needsUpdate = true;
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);
initSnow();
animateSnow();