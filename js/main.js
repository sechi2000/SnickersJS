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
scene.add(new THREE.AmbientLight(0xffffff, 0.8));
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 7.5);
scene.add(dirLight);

// Helpers (debug)
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// Loader
const loader = new THREE.GLTFLoader();
loader.load(
  "assets/mannequin.glb",
  function (gltf) {
    const model = gltf.scene;

    // Forzar materiales visibles
    model.traverse((child) => {
      if (child.isMesh) {
        if (!child.material) {
          child.material = new THREE.MeshNormalMaterial();
        }
      }
    });

    scene.add(model);

    // Calcular bounding box para encuadrar la cámara
    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3()).length();
    const center = box.getCenter(new THREE.Vector3());

    // Reposicionar cámara
    camera.position.copy(center);
    camera.position.x += size / 2;
    camera.position.y += size / 3;
    camera.position.z += size / 2;
    camera.lookAt
