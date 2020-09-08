// Three.js variables:
var scene;
var camera;
var renderer;

// Settings dictionary:
var settings = {
	rotation: true,
	clockwise: true,
	speed: 0.02,
	zoom: 1
};

// Build the scene:
function init() {
	// Initialising  the scene:
	scene = new THREE.Scene();

	// Setting up the camera:
	camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
	camera.position.set(0, 45, 80);

	// Setting up the renderer:
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.shadowMap.enabled = true;
	renderer.setClearColor("#C4DCE5");
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	// Setting up lighting:
	var softlight = new THREE.AmbientLight(0xFFFFFF, .5);
	scene.add(softlight);

	var sunlight = new THREE.DirectionalLight(0xFFF9E3, 1);
	sunlight.position.set(150, 200, 50);
	scene.add(sunlight);

	var geometry;
	var material;
	// Building the farm:
	farm = new THREE.Group();
	// Creating the ground:
	geometry = new THREE.PlaneGeometry(100, 100);
	material = new THREE.MeshStandardMaterial({ color: 0x567D46 });
	var ground = new THREE.Mesh(geometry, material);
	ground.rotateX(-1.5708);
	farm.add(ground);

	// Creating the watertank:
	geometry = new THREE.CylinderGeometry(6, 6, 8, 32);
	material = new THREE.MeshStandardMaterial({ color: 0xADB2BD });
	var watertank = new THREE.Mesh(geometry, material);
	watertank.position.set(-30, 8, 35);
	farm.add(watertank);

	// Creating the house:
	house = new THREE.Group();

	//first the walls:
	geometry = new THREE.BoxGeometry(25, 10, 20);
	material = new THREE.MeshStandardMaterial({ color: 0xEDE9CE });
	var walls = new THREE.Mesh(geometry, material);
	walls.position.set(0, 5, 0);
	house.add(walls);

	// then the roof:
	var shape = new THREE.Shape();
	shape.moveTo(0, 0);
	shape.lineTo(0, 20);
	shape.lineTo(20, 0);
	shape.lineTo(0, 0);

	var extrudeSettings = {
		steps: 2,
		depth: 22,
		bevelEnabled: false,
	};
	geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
	material = new THREE.MeshStandardMaterial({ color: 0x996633 });
	var roof = new THREE.Mesh(geometry, material);
	roof.rotateZ(-2.355);
	roof.scale.set
	roof.position.set(0, 23, -11);

	house.add(roof);
	house.position.set(10, 0, 0);
	house.rotateY(-0.25);
	farm.add(house);


	// Creating trees:
	var woods = [];
	var tree = new THREE.Group();

	// the trunk:
	geometry = new THREE.CylinderGeometry(1, 1, 10);
	material = new THREE.MeshStandardMaterial({ color: 0x553318 });
	var trunk = new THREE.Mesh(geometry, material);
	trunk.position.y = 5;
	tree.add(trunk);

	// the crown:
	geometry = new THREE.ConeGeometry(3, 12, 32);
	material = new THREE.MeshStandardMaterial({color: 0x476A30});
	var crown = new THREE.Mesh(geometry, material);
	crown.position.y = 10;
	tree.add(crown);

	for (var i = 0; i < 10; i++) {
		woods.push(tree.clone());
		farm.add(woods[i]);
	}
	woods[0].position.set(-45,0,-45);
	woods[1].position.set(-30, 0, -36);
	woods[2].position.set(-15, 0, -37);
	woods[3].position.set(-38,0,-32);
	woods[4].position.set(-25, 0, -30);
	woods[5].position.set(-33, 0, -25);
	woods[6].position.set(-35,0,-43);
	woods[7].position.set(-40, 0, -15);
	woods[8].position.set(-28, 0, 20);
	woods[9].position.set(35,0,-30);


	// the igloo:
	geometry = new THREE.SphereGeometry(7, 32, 32);
	material = new THREE.MeshStandardMaterial({ color: 0xA5F2F3});
	var shape1 = new THREE.Mesh(geometry, material);
	shape1.position.y = 5;
	var ball = new ThreeBSP(shape1);

	geometry = new THREE.BoxGeometry(14, 10, 14);
	material = new THREE.MeshStandardMaterial({ color: 0xA5F2F3 });
	var shape2 = new THREE.Mesh(geometry, material);
	shape2.position.y = 0;
	var subtraction = new ThreeBSP(shape2);

	var igloo = ball.subtract(subtraction).toMesh();
	igloo.geometry.computeFaceNormals();
	igloo.geometry.computeVertexNormals();
	igloo.material = new THREE.MeshStandardMaterial({ color: 0xA5F2F3 });
	igloo.position.set(25, 0, 35);
	farm.add(igloo);

	scene.add(farm);
}

// Animation loop:
function render() {
	requestAnimationFrame(render);
	renderer.render(scene, camera);
	camera.lookAt(scene.position);

	if (settings.rotation)	//check if rotation is enabled
		if (settings.clockwise)	// check rotational direction
			scene.rotation.y -= settings.speed;
		else
			scene.rotation.y += settings.speed;

	camera.zoom = settings.zoom;	// Update the zoom value
	camera.updateProjectionMatrix();
}

init();
render();

// Window-resize event handler:
window.addEventListener('resize', () => {
	renderer.setSize(window.innerWidth, window.innerHeight);
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
})

// Rotation button functionality:
function toggleRotation() {
	settings.rotation = !settings.rotation;
}

// Direction button functionality:
function toggleDirection() {
	settings.clockwise = !settings.clockwise;
}

// Zoom slider functionality:
function updateZoom(value) {
	settings.zoom = value/2; //range is from 0.5 to 5
}

// speed slider functionality:
function updateSpeed(value) {
	settings.speed = value/100; //range is from 0.01 to 0.1
}

function increaseZoom() {
	settings.zoom += .5;
	document.getElementById("zoom").value++;
	if (settings.zoom > 5)
		settings.zoom = 5;
}

function decreaseZoom() {
	settings.zoom -= .5;
	document.getElementById("zoom").value--;
	if (settings.zoom < .5)
		settings.zoom = .5;
}

// Context Menu event handler:
window.addEventListener("contextmenu", function(event) {
	event.preventDefault();
	var contextElement = document.getElementById("context-menu");
	contextElement.style.top = event.offsetY + "px";
	contextElement.style.left = event.offsetX + "px";
	contextElement.classList.add("active");
});

// Click-event handler (for context menu):
window.addEventListener("click", function() {
	document.getElementById("context-menu").classList.remove("active");
});
