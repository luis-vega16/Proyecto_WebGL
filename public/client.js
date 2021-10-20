import * as THREE from '/build/three.module.js';
//console.log(THREE);  
import { OrbitControls } from '/jsm/controls/OrbitControls.js';
//console.log(OrbitControls);
import Stats from '/jsm/libs/stats.module.js';
//console.log(Stats);


let scene;
let camera;
let renderer;
const canvas = document.querySelector('.webgl');

scene = new THREE.Scene();

const fov = 60;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
scene.add(camera);

renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio((window.devicePixelRatio) ? window.devicePixelRatio : 1);
renderer.autoClear = false;
renderer.setClearColor(0x000000, 0.0);


const earthGeometry = new THREE.SphereGeometry(0.6, 32, 32);

const earthMaterial = new THREE.MeshPhongMaterial({
    roughness: 1,
    metalness: 0,
    map: THREE.ImageUtils.loadTexture('texture/earthmap1k.jpg'),
    
});

const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
scene.add(earthMesh);

const ambientlight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientlight);

const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.set(5, 3, 5);
scene.add(pointLight);

const animate = () => {
    requestAnimationFrame(animate);
    earthMesh.rotation.y -= 0.0015;
    render();
   
};

const render = () => {
    renderer.render(scene, camera);
}

animate();