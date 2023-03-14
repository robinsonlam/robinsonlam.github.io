<script setup lang="ts">
	import * as THREE from 'three';

	interface ThreeCamera {
		camera: THREE.PerspectiveCamera,
	}

	interface ThreeRenderer {
		renderer: THREE.WebGLRenderer,
	}

	interface ThreeScene {
		scene: THREE.Scene,
	};

	const GLOBAL = {
		SCENE_ROTATION_SPEED: 0.0002,
		COLORS: {
			YELLOW: 0xffb000
		}
	};

	const setupScene = () => {
		// * Setup Camera & Camera Position
		const camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 4000 );
			// Set camera position
		camera.position.z = 200;
		camera.position.y = 0;
		camera.position.x = 0;

		// * Setup Renderer
		const renderer = new THREE.WebGLRenderer();
		renderer.setSize( window.innerWidth, window.innerHeight );

		// * Setup Scene
		const scene = new THREE.Scene();
		scene.background = new THREE.Color( GLOBAL.COLORS.YELLOW );

		return { camera, renderer, scene };
	};
	const setupLighting = ({ scene }: ThreeScene) => {
		// * Setup Lighting
		var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.4 );
		var light = new THREE.AmbientLight( 0xfafafa ); // soft white light

		scene.add( directionalLight );
		scene.add( light );
	};
	const createParticles = ({ scene }: ThreeScene) => {
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
			scene.add( particle );
		}
	};
	const onWindowResize = ({ camera, renderer }: ThreeCamera & ThreeRenderer) => {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize( window.innerWidth, window.innerHeight );
	};
	// const createSphere = ({ scene, radius = 1, widthSegments = 32, heightSegments = 32, color = GLOBAL.COLORS.YELLOW }) => {
	// 	var geometry = new THREE.SphereGeometry( radius, widthSegments, heightSegments );
	// 	var material = new THREE.MeshLambertMaterial({ color });
	// 	var sphere = new THREE.Mesh( geometry, material );
	// 	scene.add( sphere );
	// };
	const animate = ({ camera, renderer, scene  }: ThreeCamera & ThreeRenderer & ThreeScene ) => {
		requestAnimationFrame( () => animate({ scene, renderer, camera }) );
		renderer.render( scene, camera );

		scene.rotation.x += GLOBAL.SCENE_ROTATION_SPEED;
		scene.rotation.y += GLOBAL.SCENE_ROTATION_SPEED * 2;

		for (var i = 0; i < scene.children.length; i++) {
			var meshItem = scene.children[i];
			if (meshItem.name === "Cube Particle" ) {
				let meshItemRotateSpeed = Math.random() * 0.008;
				meshItem.rotation.x += meshItemRotateSpeed + GLOBAL.SCENE_ROTATION_SPEED;
				meshItem.rotation.y += meshItemRotateSpeed + GLOBAL.SCENE_ROTATION_SPEED;
				meshItem.rotation.z += meshItemRotateSpeed + GLOBAL.SCENE_ROTATION_SPEED;
			}
		}
	};


	// * Init
	const { camera, renderer, scene } = setupScene();
	setupLighting({ scene });

	// Set size and responsive functionality for renderer
	window.addEventListener( 'resize', () => onWindowResize({ camera, renderer }), false );

	// Add renderer to DOM
	const BackgroundDomElement = renderer.domElement;

	// Create shapes
	createParticles({ scene });

	// Start frame animation
	animate({ camera, renderer, scene });
</script>

<template>
    {{ BackgroundDomElement }}
</template>

<style scoped>
</style>





