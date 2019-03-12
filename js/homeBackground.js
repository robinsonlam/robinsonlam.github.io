
var COLOR_YELLOW = 0xffb000;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 4000 );
var renderer = new THREE.WebGLRenderer();
scene.background = new THREE.Color( COLOR_YELLOW );

var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.4 );
var light = new THREE.AmbientLight( 0xfafafa ); // soft white light

scene.add( directionalLight );
scene.add( light );

var sceneRotationSpeed = 0.0002;


// Set size and responsive functionality for renderer
renderer.setSize( window.innerWidth, window.innerHeight );


window.addEventListener( 'resize', onWindowResize, false );

// Add renderer to DOM
$("#backgroundRenderer").append( renderer.domElement );

// Create shapes
createParticles();

// Set camera position
camera.position.z = 200;
camera.position.y = 0;
camera.position.x = 0;

// Start frame animation
animate();

// Functions
function createParticles() {
	var particleCount = 1024;

	for ( var i = 0; i < particleCount; i++ ) {

		var scaleX = Math.random() * 2;

		var geometry = new THREE.BoxGeometry( scaleX, scaleX, scaleX );

		var pMaterial = new THREE.MeshLambertMaterial({ color: 0xffb000 });

		var particle = new THREE.Mesh( geometry, pMaterial );

		particle.name = "Cube Particle";

		particle.position.x = Math.random() * 200 - 100;
		particle.position.y = Math.random() * 200 - 100;
		particle.position.z = Math.random() * 200 - 100;

		// particle.scale.x = particle.scale.y = particle.scale.z = 0.00001;
		particle.rotateSpeed = Math.random() * 0.008;

		scene.add( particle );
	}
}

function onWindowResize() {
   camera.aspect = window.innerWidth / window.innerHeight;
   camera.updateProjectionMatrix();
   renderer.setSize( window.innerWidth, window.innerHeight );
}

function createSphere(radius = 1, widthSegments = 32, heightSegments = 32, color = COLOR_YELLOW) {
	var geometry = new THREE.SphereGeometry( radius, widthSegments, heightSegments );
	var material = new THREE.MeshLambertMaterial({ color });
	var sphere = new THREE.Mesh( geometry, material );
	scene.add( sphere );
}

function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera );

	scene.rotation.x += sceneRotationSpeed;
	scene.rotation.y += sceneRotationSpeed * 2;

	for (var i = 0; i < scene.children.length; i++) {
		var meshItem = scene.children[i];
		if (meshItem.name === "Cube Particle" ) {
			meshItem.rotation.x += meshItem.rotateSpeed + sceneRotationSpeed;
			meshItem.rotation.y += meshItem.rotateSpeed + sceneRotationSpeed;
			meshItem.rotation.z += meshItem.rotateSpeed + sceneRotationSpeed;
		}
	}

}
