<!-- <script setup lang="ts">
	import { onMounted, h } from "vue";
	import * as THREE from 'troisjs';

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

			particle.scale.x = particle.scale.y = particle.scale.z = 0.00001;
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
	// setupLighting({ scene });

	// Set size and responsive functionality for renderer
	window.addEventListener( 'resize', () => onWindowResize({ camera, renderer }), false );

	// Add renderer to DOM
	const RendererElement = renderer.domElement.outerHTML;

	// Create shapes
	createParticles({ scene });

	onMounted(() => {
		animate({ camera, renderer, scene });
	})
</script> -->


<script lang="ts">
import { ref }  from "vue";
import { Box, Camera, LambertMaterial, DirectionalLight, AmbientLight, Renderer, Scene } from 'troisjs';

type Matrix = {
	x: number,
	y: number,
	z: number
}

type Particle = {
	name: string;
	positionMatrix: Matrix;
	rotationMatrix: Matrix;
	scaleMatrix: Matrix;
}

const GLOBAL = {
	SCENE_ROTATION_SPEED: 0.0002,
	COLORS: {
		YELLOW: "#ffb000",
		WHITE: "#ffffff",
		SOFT_WHITE: "#fafafa"
	},
	PARTICLE_COUNT: 120
};

export default {
	components: { Box, Camera, LambertMaterial, DirectionalLight, AmbientLight, Renderer, Scene },
	created() {
		this.cameraPosition = setupCameraPosition()
		this.bgParticles = createParticles()
	},
	mounted() {
		let bgParticleRefs = this.$refs.bgParticlesRefs as { rotation: Matrix }[];
		const renderer = this.$refs.renderer as typeof Renderer;
		renderer.onBeforeRender(() => {	
			bgParticleRefs?.forEach((p) => {
				let rotateSpeed = Math.random() * 0.008;
				p.rotation.x += rotateSpeed + GLOBAL.SCENE_ROTATION_SPEED;
				p.rotation.y += rotateSpeed + GLOBAL.SCENE_ROTATION_SPEED;
				p.rotation.z += rotateSpeed + GLOBAL.SCENE_ROTATION_SPEED;
			})

			this.sceneRotation = {
				...this.sceneRotation,
				x: this.sceneRotation.x + GLOBAL.SCENE_ROTATION_SPEED,
				y: this.sceneRotation.y + (GLOBAL.SCENE_ROTATION_SPEED * 2),
			}
		});
	},
	data() {
		return {
			sceneBGColor: GLOBAL.COLORS.YELLOW,
			lightColor: GLOBAL.COLORS.WHITE,
			ambientLightColor: GLOBAL.COLORS.SOFT_WHITE,
			cameraPosition: {
				x: 0, y: 0, z: 0
			},
			sceneRotation: {
				x: 0, y: 0, z: 0
			},
			bgParticles: [] as Particle[],
			bgParticlesRefs: [] as { rotation: Matrix }[]
		}
	}
};

const createParticles = (): Particle[] => {
	let particles = [];

	for ( var i = 0; i < GLOBAL.PARTICLE_COUNT; i++ ) {
		
		let particle = {
			name: '',
			positionMatrix: { x: 0, y: 0, z: 0 },
			scaleMatrix: { x: 0, y: 0, z: 0 },
			rotationMatrix: { x: 0, y: 0, z: 0 }
		}

		particle.name = "Cube Particle";
		particle.positionMatrix.x = Math.random() * 200 - 100;
		particle.positionMatrix.y = Math.random() * 200 - 100;
		particle.positionMatrix.z = Math.random() * 200 - 100;

		particle.scaleMatrix.x = particle.scaleMatrix.y = particle.scaleMatrix.z = 0.00001;

		particles.push( particle );
	}

	return particles;
}

const setupCameraPosition = () => {
	let cameraPosition = {
		x: 0, y: 0, z: 0
	}

	// * Setup Camera & Camera Position
	cameraPosition.x = 0;
	cameraPosition.y = 0;
	cameraPosition.z = 200;

	return cameraPosition;
};
</script>

<template>
	<Renderer
		ref="renderer"
		resize="'window'"
	>
		<Camera :position="cameraPosition" />
		<Scene :background="sceneBGColor">
		<DirectionalLight
			:color="lightColor"
			:intensity="0.4"
		/>
		<AmbientLight 
			:color="ambientLightColor"
		/>

		<Box
			v-for="particle in bgParticles"
			:scale="particle.scaleMatrix"
			:position="particle.positionMatrix"
			ref="bgParticlesRefs"
		>
			<LambertMaterial 
				:color="sceneBGColor"
			/>
		</Box>
		</Scene>
	</Renderer>
</template>

<style scoped>
</style>





