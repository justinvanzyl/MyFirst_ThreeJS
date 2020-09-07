
// Creating  the scene:
var scene = new THREE.Scene();

// Setting up the renderer:
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.shadowMap.enabled = true;
renderer.setClearColor("#C4DCE5");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); 

// Setting up the camera:
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
camera.position.set(0,45,80);
camera.lookAt(scene.position);

// Setting up lighting:
var softlight = new THREE.AmbientLight(0xFFFFFF,.5);
scene.add(softlight);

var sunlight = new THREE.DirectionalLight(0xFFF9E3,1);
sunlight.position.set(150,200,50);
scene.add(sunlight);

// Creating an event listener to autoresize when the window is resized:
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth/window.innerHeight;  
    camera.updateProjectionMatrix();
})

// Creating the ground:
var geometry = new THREE.PlaneGeometry(100, 100);
var material = new THREE.MeshStandardMaterial({color: 0x567D46});
var ground = new THREE.Mesh(geometry, material);
ground.rotateX(-1.5708);
scene.add(ground);

// Creating the watertank:
var geometry = new THREE.CylinderGeometry(5, 5, 16);
var material = new THREE.MeshStandardMaterial({color: 0xADB2BD});
var watertank = new THREE.Mesh(geometry, material);
watertank.position.set(-35,8,35);
scene.add(watertank);

// Creating the house:
var walls = new THREE.BoxGeometry(25, 10, 20);

var roof = new THREE.BoxGeometry(25, 10, 20);
//var geometry = combine geometry 1 & 2
var materials = new THREE.MeshStandardMaterial({color: 0xADB2BD});
var house = new THREE.Mesh(roof, materials);
house.position.set(0,5,0);
scene.add(house);

// Do it:
//requestAnimationFrame(render);
renderer.render(scene, camera);
