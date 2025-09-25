// MAIN.JS - Probador 3D básico con Three.js

// Escena
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf5f5f5);

// Cámara
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / 500,
  0.1,
  1000
);
camera.position.set(0, 1.5, 3);

// Render
const canvas = document.getElementById("sneaker-canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, 500);

// Luz
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5);
scene.add(light);

// Modelo 3D (muñeco)
const loader = new THREE.GLTFLoader();
loader.load(
  "assets/mannequin.glb", // Ruta al modelo 3D
  function (gltf) {
    const model = gltf.scene;
    scene.add(model);

    // Animación: rotación automática
    function animate() {
      requestAnimationFrame(animate);
      model.rotation.y += 0.01;
      renderer.render(scene, camera);
    }
    animate();
  },
  undefined,
  function (error) {
    console.error("Error cargando el modelo:", error);
  }
);