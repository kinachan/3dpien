let width = window.innerWidth;
let height = window.innerHeight;


const createCapsule = (color = 0xFF0000, size = 300) => {
  // 球体を作成
  const geometry = new THREE.SphereGeometry(size, 30, 30);
  const material = new THREE.MeshStandardMaterial({color});
  // メッシュを作成
  const mesh = new THREE.Mesh(geometry, material);
  return mesh;
}


const init = () => {
  width = window.innerWidth;
  height = window.innerHeight;

  // render設定
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas'),
    antialias: true,
    devicePixelRatio: window.devicePixelRatio
  });
  renderer.setSize(width, height);
  // renderer.setClearColor(0xa00037, 0);

  const scene = new THREE.Scene();
  const fogColor = 0xf5f5f5;
  scene.fog = new THREE.Fog(fogColor, 50, 2000);

  // カメラ
  const camera = new THREE.PerspectiveCamera(45, this.width / this.height);
  camera.position.set(0, 0, +1000);

  // 各種設定
  const directionalColor = 0xff0000;
  const ambientColor = 0x00ffff;

  const count = 100;

    // カプセル追加。
  const group = new THREE.Group();
  scene.add(group);

  const color = 0xFF0000;
  // 球体を作成
  const geometry = new THREE.BoxBufferGeometry(50, 50, 50);
  const material = new THREE.MeshStandardMaterial();

  for (let i = 0; i < 1000; i++) {
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - 0.5) * 2000;
    mesh.position.y = (Math.random() - 0.5) * 2000;
    mesh.position.z = (Math.random() - 0.5) * 2000;
    mesh.rotation.x = Math.random() * 2 * Math.PI;
    mesh.rotation.y = Math.random() * 2 * Math.PI;
    mesh.rotation.z = Math.random() * 2 * Math.PI;
    // グループに格納する
    group.add(mesh);
  }
  
  const directionalLight = new THREE.DirectionalLight(directionalColor, 2); 
  // directionalLight.position.set(1, 1, 1).normalize();
  scene.add(directionalLight);
  
  // 環境光源
  const ambientLight = new THREE.AmbientLight(ambientColor); 
  scene.add(ambientLight); 

  tick();

  function tick() {
    // グループを回す
    group.rotateY(0.01);
    renderer.render(scene, camera); // レンダリング
    requestAnimationFrame(tick);
  }
}

const initalize = () => {
  width = window.innerWidth;
  height = window.innerHeight;

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas'),
    antialias: true,
    devicePixelRatio: window.devicePixelRatio
  });
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();

  // フォグを設定
  const whiteSmoke = 0xf5f5f5;

  scene.fog = new THREE.Fog(whiteSmoke, 50, 2000);
  scene.background = new THREE.Color( whiteSmoke );

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(0, 0, +1000);

  // グループを作成
  const group = new THREE.Group();
  scene.add(group);

  // const geometry = new THREE.BoxBufferGeometry(50, 50, 50);
  // const material = new THREE.MeshStandardMaterial();

  const geometry = new THREE.TorusGeometry( 500, 1, 16, 100 );
  // const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );

  const colors = [0xba000d, 0xb0003a, 0x6a0080, 0x320b86, 0x002984, 0x0069c0
    , 0x007ac1, 0x008ba3, 0x00675b, 0x087f23, 0x5a9216, 0x99aa00, 0xc8b900
    , 0xc79100, 0xc66900, 0xc41c00, 0x4b2c20, 0x707070, 0x34515e
  ];

  for (let i = 0; i < 1000; i++) {
    const colorIndex = Math.floor(Math.random() * (colors.length + 1));
    const material = new THREE.MeshBasicMaterial( {color: colors[colorIndex]} );

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = (Math.random() - 0.5) * 2000;
    mesh.position.y = (Math.random() - 0.5) * 2000;
    mesh.position.z = (Math.random() - 0.5) * 2000;
    mesh.rotation.x = Math.random() * 2 * Math.PI;
    mesh.rotation.y = Math.random() * 2 * Math.PI;
    mesh.rotation.z = Math.random() * 2 * Math.PI;
    // グループに格納する
    group.add(mesh);
  }

  // 光源
  scene.add(new THREE.DirectionalLight(0xff0000, 2)); // 平行光源
  scene.add(new THREE.AmbientLight(0x00ffff)); // 環境光源

  tick();

  function tick() {
    // グループを回す
    group.rotateY(0.01);
    renderer.render(scene, camera); // レンダリング
    requestAnimationFrame(tick);
  }
}

// ページの読み込みを待つ
window.addEventListener('load', initalize);
window.onresize = initalize;