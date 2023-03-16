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
	PARTICLE_MAX_SIZE: 3,
	PARTICLE_ROTATION_SPEED: 1,
	SCENE_ROTATION_SPEED: 0.4,
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
	},
	data() {
		return {
			sceneRotationSpeed: GLOBAL.SCENE_ROTATION_SPEED,
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
			bgParticlesRefs: [] as { rotation: Matrix }[],
			scenePosition: new Vector3(0, 0, 0),
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

		particle.scaleMatrix.x = particle.scaleMatrix.y = particle.scaleMatrix.z = Math.random() * GLOBAL.PARTICLE_MAX_SIZE

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
		width="1024"
		height="768"
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
				:color="lightColor"
				:intensity="0.4"
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
</template>

<style scoped>
</style>





