import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";



const scene = new THREE.Scene();

const cubeTextureLoader = new THREE.CubeTextureLoader()
const environmentMap = cubeTextureLoader.load([
  "../px.png",
  "../nx.png",
  "../py.png",
  "../ny.png",
  "../pz.png",
  "../nz.png",
])

scene.environment = environmentMap
scene.background = environmentMap

const canvas = document.querySelector("canvas.webgl");

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);


window.addEventListener("resize",()=>{
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()
  
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
})

camera.position.z = 20;

scene.add(camera);


const renderer = new THREE.WebGLRenderer({ canvas });
const controls = new OrbitControls(camera,canvas)


renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);


const tick = ()=>{
  window.requestAnimationFrame(tick)
  renderer.render(scene,camera)
}
tick()
