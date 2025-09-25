// Escena
const scene = new THREE.Scene();
scene.background = null; // fondo transparente (usamos gradiente CSS)

// Cámara
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / 500, 0.1, 1000);
camera.position.set(0, 1.5, 3);

// Render
const canvas = document.getElementById("sneaker-canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, 500);

// Luces
const light1 = new THREE.DirectionalLight(0xffffff, 1);
light1.position.set(2, 2, 5);
scene.add(light1);

const light2 = new THREE.PointLight(0x00ffff, 0.8, 10);
light2.position.set(-2, 2, 3);
scene.add(light2);

const light3 = new THREE.PointLight(0xff00ff, 0.8, 10);
light3.position.set(2, -1, 3);
scene.add(light3);

// Cargar modelo
const loader = new THREE.GLTFLoader();
loader.load(
  "assets/mannequin.glb",
  function (gltf) {
    const model = gltf.scene;
    model.scale.set(1.2, 1.2, 1.2);
    scene.add(model);

    function animate() {
      requestAnimationFrame(animate);
      model.rotation.y += 0.01; // rotación suave
      renderer.render(scene, camera);
    }
    animate();
  },
  undefined,
  function (error) {
    console.error("Error cargando el modelo:", error);
  }
);
