let width = window.innerWidth;
let height = window.innerHeight;
let rot = 0; // 角度
let mouseX = 0; // マウス座標
let mouseY = 0;
let texture;


const init = () => {
  width = window.innerWidth;
  height = window.innerHeight;

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#myCanvas')
  });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  // シーンを作成
  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x000000, 50, 2000);

  // カメラを作成
  const camera = new THREE.OrthographicCamera(-480, +480, 270, -270, 1, 1000);
  camera.position.set(0, 0, +1000);
  settingCamera(camera);

  addPiens(scene);
  scene.add(createLigth());

  tick();

  // 毎フレーム時に実行されるループイベントです
  function tick() {
    mouseX++;
    // mesh.rotation.y += 0.01;
    // マウスの位置に応じて角度を設定
    // マウスのX座標がステージの幅の何%の位置にあるか調べてそれを360度で乗算する
    const targetRot = (mouseX / window.innerWidth) * 360;

    // イージングの公式を用いて滑らかにする
    // 値 += (目標値 - 現在の値) * 減速値
    rot += (targetRot - rot) * 0.02;

    // ラジアンに変換する
    const radian = rot * Math.PI / 180;
    // 角度に応じてカメラの位置を設定
    camera.position.x = 1000 * Math.sin(radian);
    camera.position.z = 1000 * Math.cos(radian);
    // 原点方向を見つめる
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // レンダリング
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
}

const createBoxMesh = () => {
  // 箱を作成
  const geometry = new THREE.BoxGeometry(400, 400, 400);
  const material = new THREE.MeshNormalMaterial();
  const box = new THREE.Mesh(geometry, material);

  return box;
}

const createPien = () => {
  // ぴえんを生成。
  const geometry = new THREE.SphereGeometry(300, 30, 30);
  if (texture != null) {
    texture = new THREE.TextureLoader().load('./pien.jpg');
  }
  const material = new THREE.MeshStandardMaterial({
    map: texture,
  });
  return new THREE.Mesh(geometry, material);;
}

const addBalls = (scene) => {
  // 普通のボールを生成
  for (let i = 0; i < 100; i++) {
    const geometry = new THREE.SphereGeometry(30);
    const material = new THREE.MeshStandardMaterial({color: 0xFF0000});
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set( Math.random()*width-height, Math.random()*width-height, Math.random()*width-height );
    scene.add( mesh );
  }
}

const addPiens = (scene) => {
  for (let i = 0; i < 200; i++) {
    const geometry = new THREE.SphereGeometry(70);
    const texture = new THREE.TextureLoader().load('./pien.jpg');
    const material = new THREE.MeshStandardMaterial({
      map: texture,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set( Math.random()*width-height, Math.random()*width-height, Math.random()*width-height );
    scene.add( mesh );
  }
}

const createLigth = () => {
  // 点光源を作成
  // new THREE.PointLight(色, 光の強さ, 距離, 光の減衰率)
  const light = new THREE.DirectionalLight(0xFFFFFF, 1);
  light.position.set(1, 1, 1).normalize();
  return light;
}

const createDonut = () => {
  // ドーナツを作成
  const geometry = new THREE.TorusGeometry(300, 100, 64, 100);
  // マテリアルを作成
  const material = new THREE.MeshStandardMaterial({color: 0x6699FF, roughness:0.5});
  // メッシュを作成
  const mesh = new THREE.Mesh(geometry, material);

  return mesh;
}

const settingCamera = (camera) => {

  // マウス座標はマウスが動いた時のみ取得できる
  document.addEventListener("mousemove", (event) => {
    mouseX = event.pageX;
    mouseY = event.pageY;
  });
}

// ページの読み込みを待つ
window.addEventListener('load', init);
window.onresize = init;

