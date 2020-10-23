
class ViewSettings {
  constructor(selector, width, height) {
    this.scene = new THREE.Scene();
    this.camera = null;
    this.meshes = null;
    this.light = null;
    this.renderer = new THREE.WebGLRenderer({
      canvas: document.querySelector(selector)
    });
    this.group = null;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);
  }
}

class Modeling {
  constructor() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }


  /**カプセル集合体を作成 */
  addCapsules(count) {
    for (let i = 0; i < count; i++) {
      const color = 0x0000;
      const mesh = this.createCapsule(color, 300);

      mesh.position.x = (Math.random() - 0.5) * 2000;
      mesh.position.y = (Math.random() - 0.5) * 2000;
      mesh.position.z = (Math.random() - 0.5) * 2000;
      mesh.rotation.x = Math.random() * 2 * Math.PI;
      mesh.rotation.y = Math.random() * 2 * Math.PI;
      mesh.rotation.z = Math.random() * 2 * Math.PI;
      // グループに格納する
      
      this.option.group.add(mesh);
    }
  }

  /**グループ追加 */
  addGroup() {
    this.option.group = new THREE.Group();
    this.option.scene.add(this.group);
  }

  /**カプセル追加 */
  createCapsule(color = 0xFF0000, size = 300) {
    // 球体を作成
    const geometry = new THREE.SphereGeometry(size, 30, 30);
    const material = new THREE.MeshStandardMaterial({color});
    // メッシュを作成
    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
  }

  settingLight(directionalColor = 0xff0000, ambientColor = 0x00ffff){
    // 平行光源
    const directionalLight = new THREE.DirectionalLight(directionalColor, 2); 
    this.option.scene.add(directionalLight);
    
    // 環境光源
    const ambientLight = new THREE.AmbientLight(ambientColor); 
    this.option.scene.add(ambientLight); 
  }

  /**カメラ初期化 */
  initCamera() {
    const camera = new THREE.PerspectiveCamera(45, this.width / this.height);
    camera.position.set(0, 0, +1000);  
  
    this.option.camera = camera;
  }

  /**FOGを追加 */
  addFog(colorCode) {
    this.option.scene.fog = new THREE.Fog(colorCode, 50, 2000);
  }


  init() {
    this.option = new ViewSettings('#myCanvas', this.width, this.height);
    this.initCamera();
    this.addFog();

    this.addGroup();
    this.addCapsules();
    this.settingLight();
  }
}
