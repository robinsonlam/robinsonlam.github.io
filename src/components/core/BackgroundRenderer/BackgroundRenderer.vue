<script lang="ts">
import { Vector3 } from 'three';
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
	PARTICLE_MIN_SIZE: 0.001,
	PARTICLE_MAX_SIZE: 3,
	PARTICLE_ROTATION_SPEED: 0.6,
	SCENE_ROTATION_SPEED: 0.3,
	COLORS: {
		YELLOW: "#ffb000",
		WHITE: "#ffffff",
		SOFT_WHITE: "#fafafa"
	},
	PARTICLE_COUNT: 1024
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
				let rotationSpeed = Math.random() * (GLOBAL.PARTICLE_ROTATION_SPEED) * 0.03;
				p.rotation.x += rotationSpeed;
				p.rotation.y += rotationSpeed;
				p.rotation.z += rotationSpeed;
			})
		});

		// window.addEventListener('resize', this.onWindowResize);
	},
	beforeDestroy() {
		// window.removeEventListener('resize', this.onWindowResize); 
	},
	data() {
		return {
			sceneRotationSpeed: GLOBAL.SCENE_ROTATION_SPEED,
			sceneBGColor: GLOBAL.COLORS.YELLOW,
			lightColor: GLOBAL.COLORS.WHITE,
			bottomLightColor: GLOBAL.COLORS.WHITE,
			ambientLightColor: GLOBAL.COLORS.SOFT_WHITE,
			cameraPosition: {
				x: 0, y: 0, z: 0
			},
			sceneRotation: {
				x: 0, y: 0, z: 0
			},
			bgParticles: [] as Particle[],
			bgParticlesRefs: [] as { rotation: Matrix }[],
			scenePosition: new Vector3(0, 0, 0),
		}
	},
	methods: {
		onWindowResize() {
			let renderer = this.$refs.renderer as typeof Renderer;
			let camera = this.$refs.camera as typeof Camera;
			
			renderer.width = window.innerWidth.toString();
			renderer.height = window.innerHeight.toString();
			camera.aspect = window.innerWidth / window.innerHeight;
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
		particle.positionMatrix.x = Math.random() * 500 - 250;
		particle.positionMatrix.y = Math.random() * 300 - 150;
		particle.positionMatrix.z = Math.random() * 500 - 250;

		particle.scaleMatrix.x = particle.scaleMatrix.y = particle.scaleMatrix.z = Math.random() * (GLOBAL.PARTICLE_MAX_SIZE - GLOBAL.PARTICLE_MIN_SIZE) + GLOBAL.PARTICLE_MIN_SIZE

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
	cameraPosition.z = 300;

	return cameraPosition;
};
</script>

<template>
	<div id="backgroundRenderer">
		<Renderer
			ref="renderer"
			resize 
			antialias
			shadow
			:orbitCtrl="{
				autoRotate: true,
				enableDamping: true,
				target: scenePosition,
				autoRotateSpeed: sceneRotationSpeed
			}"
		>
			<Camera :position="cameraPosition" />
			<Scene 
				:background="sceneBGColor"
			>
				<DirectionalLight
					cast-shadow
					:color="lightColor"
					:intensity="0.8"
					:position="{
						x: 0,
						y: 100,
						z: 0
					}"
				/>
				<DirectionalLight
					cast-shadow
					:color="bottomLightColor"
					:intensity="0.2"
					:position="{
						x: 0,
						y: -100,
						z: 0
					}"
				/>
				<AmbientLight 
					:color="ambientLightColor"
					:intensity="0.7"
					:position="scenePosition"
				/>

				<Box
					v-for="particle in bgParticles"
					:scale="particle.scaleMatrix"
					:position="particle.positionMatrix"
					:rotation="particle.rotationMatrix"
					ref="bgParticlesRefs"
					receive-shadow
				>
					<LambertMaterial 
						:color="sceneBGColor"
					/>
				</Box>
			</Scene>
		</Renderer>
	</div>
</template>

<style scoped>
	#backgroundRenderer {
		filter: brightness(0.8);
		z-index: -10;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
	}
</style>





