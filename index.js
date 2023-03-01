import * as THREE from "https://cdn.skypack.dev/three@0.125.0";
import { gsap } from 'https://cdn.skypack.dev/gsap@3.11.0';
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.125.0/examples/jsm/loaders/GLTFLoader";
import { ScrollTrigger } from "https://cdn.skypack.dev/gsap@3.11.0/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// --- CONSTS

const COLORS = {
	background: 'white',
	light: '#ffffff',
	sky: '#aaaaff',
	ground: '#88ff88'
}

const PI = Math.PI;

// --- SCENE

let size = { width: 0, height: 0 }

const scene = new THREE.Scene();
scene.background = new THREE.Color(COLORS.background);
scene.fog = new THREE.Fog(COLORS.background, 15, 20);

// --- RENDERER

const renderer = new THREE.WebGLRenderer({
  antialias: true
})

renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 5;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const container = document.querySelector('.canvas-container');
container.appendChild( renderer.domElement );

// --- CAMERA

const camera = new THREE.PerspectiveCamera(40, size.width / size.height, 0.1, 100);
camera.position.set(0, 1, 5);
let cameraTarget = new THREE.Vector3(0, 1, 0);

scene.add(camera);

// --- LIGHTS

const directionalLight = new THREE.DirectionalLight(COLORS.light, 2);
directionalLight.castShadow = true;
directionalLight.shadow.camera.far = 10;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.normalBias = 0.05;
directionalLight.position.set(2, 5, 3);

scene.add(directionalLight);

const hemisphereLight = new THREE.HemisphereLight( COLORS.sky, COLORS.ground, 0.5 );
scene.add(hemisphereLight)

// --- FLOOR

const plane = new THREE.PlaneGeometry(100, 100);
const floorMaterial = new THREE.MeshStandardMaterial({ color: COLORS.ground })
const floor = new THREE.Mesh(plane, floorMaterial);
floor.receiveShadow = true;
floor.rotateX(-Math.PI * 0.5)

scene.add(floor);

// --- ON RESIZE

const onResize = () => {
	size.width = container.clientWidth;
	size.height = container.clientHeight;

	camera.aspect = size.width / size.height
	camera.updateProjectionMatrix()

	renderer.setSize(size.width, size.height)
	renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))	
}

window.addEventListener('resize', onResize)
onResize();

// --- TICK

const tick = () => {
  camera.lookAt(cameraTarget);
  renderer.render(scene, camera);
  window.requestAnimationFrame(() => tick())
}

tick();

const models = {};

const hideLoading = () => {
	document.body.classList.add('ready')
	gsap.to('.loading', {y: '-150%', ease: 'power4.in', duration: 0.4 })
}

const setupAnimation = () => {
	hideLoading();

  models.witch.position.x = 10;
  models.bear.position.x = -10;
  desktopAnimation();
}

const desktopAnimation = () => {
  let section = 0;

	const tl = gsap.timeline({
		default: {
			duration: 1,
			ease: "power2.inOut"
		},
		scrollTrigger: {
			trigger: ".page",
			start: "top top",
			end: "bottom bottom",
			scrub: 0.1,
			markers: true
		}
	});

	tl.to(models.witch.position, { x: 1 }, section);
  tl.to(models.bear.position, { x: -1 }, section);
	tl.to(models.bear.rotation, { y: PI * 0.5 }, section);

	section += 1;
	tl.to(models.witch.position, { x: 5 }, section);
	tl.to(models.bear.rotation, { y: 0 }, section);
}

const LoadingManager = new THREE.LoadingManager(() => {
	setupAnimation();
});

const gltfLoader = new GLTFLoader(LoadingManager);

const toLoad = [
	{
		name: "witch",
		file: "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/witch/model.gltf"
	},
	{
		name: "bear",
		file: "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/bear/model.gltf"
	}
];

toLoad.forEach((item) => {
	gltfLoader.load(item.file, (model) => {
		model.scene.traverse((child) => {
			if (child instanceof THREE.Mesh) {
				child.receiveShadow = true;
				child.castShadow = true;
			}
		});

    scene.add(model.scene);
    models[item.name] = model.scene;
	});
});
