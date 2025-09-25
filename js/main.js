// Escena
const scene = new THREE.Scene();
scene.background = null;

// Cámara
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / 500, 0.1, 1000);
camera.position.set(0, 1.5, 3);

// Render
const canvas = document.getElementById("sneaker-canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, 500);

// Luces
const ambient = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambient);

const light1 = new THREE.DirectionalLight(0xffffff, 1);
light1.position.set(2, 2, 5);
scene.add(light1);

const light2 = new THREE.PointLight(0xff1e56, 1, 10);
light2.position.set(-2, 2, 3);
scene.add(light2);

const light3 = new THREE.PointLight(0x3a86ff, 1, 10);
light3.position.set(2, -1, 3);
scene.add(light3);

// Cargar modelo
const loader = new THREE.GLTFLoader();
loader.load(
  "assets/mannequin.glb",
  function (gltf) {
    const model = gltf.scene;

    // Ajustes para que siempre se vea
    model.scale.set(0.5, 0.5, 0.5);
    model.position.set(0, -1.5, 0);

    model.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({ color: 0xffffff });
      }
    });

    scene.add(model);

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
