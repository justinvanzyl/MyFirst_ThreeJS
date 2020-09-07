

    var scene = new THREE.Scene();

    var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
    camera.position.z = 5; 
    
    var renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setClearColor("#E5E5E5");
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement); 

    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth/window.innerHeight;  
        camera.updateProjectionMatrix();
    })
    
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector2();

// WATER TANK:
    var geometry = new THREE.CylinderGeometry(3, 3, 20);
    var material = new THREE.MeshStandardMaterial({color: 0xADB2BD});
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

// HOUSE (BARN):
    // walls:
    var geometry = new THREE.BoxGeometry(6, 4, 6);
    var material = new THREE.MeshStandardMaterial({color: 0xF2DFB4});
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // roof:
    var geometry = new THREE.ConeGeometry(6, 3, 4);
    var material = new THREE.MeshStandardMaterial({color: 0xF2DFB4});
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);


//		mesh.position.set(2, 2, -2);
//		mesh.rotation.set(45, 0, 0);
//		mesh.scale.set(1, 2, 1);
//		scene.add(mesh);

    var light = new THREE.PointLight(0xFFFFFF, 1, 1000);
    light.position.set(0,0,0);
    scene.add(light);

    var light = new THREE.PointLight(0xFFFFFF, 2, 1000);
    light.position.set(0,0,25);
    scene.add(light);

    var render = function() {
        requestAnimationFrame(render);
//			mesh.rotation.x += 0.05;
//			mesh.rotation.y += 0.01;
//			mesh.scale.x -= 0.01; 
        renderer.render(scene, camera);
    }

    function onMouseMove(event) {
        event.preventDefault();

        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);
            
        var intersects = raycaster.intersectObjects(scene.children, true);

        for (var i = 0; i < intersects.length; i++) {
            this.tl = new TimelineMax();
            this.tl.to(intersects[i].object.scale, 1, {x: 2, ease: Expo.easeOut})
            this.tl.to(intersects[i].object.scale, .5, {x: .5, ease: Expo.easeOut})
            this.tl.to(intersects[i].object.position, .5, {z: -.5, ease: Expo.easeOut})
            this.tl.to(intersects[i].object.rotation, .5, {y: Math.PI *.5, ease: Expo.easeOut}, "= -1.5")
        }
    }

    render();

    window.addEventListener('mousemove', onMouseMove);
