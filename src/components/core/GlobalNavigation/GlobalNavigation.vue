<script setup lang="ts">

// * Pages
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

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

</script>

<template>
	<div id="globalNavigation">
		<div class="headerIcon">
			<img src="@assets/RL_LOGO_WHITE.svg" alt="image">
		</div>

		<nav class="headerNav">
			<h4><router-link :to="{ name: 'MusicPlayer' }"><a>Work</a></router-link></h4>
			<h4><router-link to="/MusicPlayer"><a>About</a></router-link></h4>
			<h4><router-link to="/MusicPlayer"><a>Contact</a></router-link></h4>
		</nav>
	</div>
</template>

<style scoped lang="scss">
$color-black: 				#091925;
$color-white:					#F9F9F9;
$color-gray: 					#8C8C8C;
$color-yellow: 				#FFB000;


$padding-small:				5px;
$padding-half:				10px;
$padding-general:			20px;
$padding-large:				40px;

$divider-line-height: 3px;

#globalNavigation {
	height: 100px;

    display: flex;
    align-items: center;

    position: fixed;
    top: 0;
    left: 0;
    right: 20px;
}
.headerIcon {
	padding:	$padding-general;
	img {
		height: 40px;
	}
}

.headerNav {
	padding: 0 $padding-general;
	display: flex;
	flex-direction: row;
	margin-left: auto;

	h4 {
		padding: $padding-half;
		margin-left: $padding-general;

		a {
			color: $color-white;
			text-decoration: none;

			&:hover {
				color: $color-yellow;
			}
		}
	}
}

@media all and (max-width: 480px) {
	#globalNavigation {
		.headerNav {
			margin-left: $padding-general;
			padding: 0;

			h4 {
				margin-left: 0;
				margin-right: $padding-half;

				a {
					padding: 0;
				}
			}
		}
	}
}
</style>





