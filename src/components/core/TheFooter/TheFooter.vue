<script lang="ts">

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
	created() {
	
	},
	mounted() {
	
	},
	beforeDestroy() {
		
	},
	data() {
		return {

		}
	},
	methods: {
		
	}
}
</script>

<template>
	<footer id="theFooter">
		<div class="footerSocial">
			<h5 class="socialHeading">Social</h5>

			<div class="socialIcons">
				<a href="mailto:robinsonlam94@gmail.com"><i class="fas fa-envelope"></i></a>
				<a target="_blank" href="https://github.com/robinsonlam"><i class="fab fa-github"></i></a>
				<a target="_blank" href="https://www.linkedin.com/in/robinsonlam"><i class="fab fa-linkedin"></i></a>
			</div>
		</div>
	</footer>
</template>

<style scoped lang="scss">
$color-black: #091925;
$color-white: #F9F9F9;
$color-gray: #8C8C8C;
$color-yellow :#FFB000;

$padding-small:	5px;
$padding-half:10px;
$padding-general: 20px;
$padding-large:	40px;

$divider-line-height: 3px;

#theFooter {
	position: fixed;
    bottom: 0;
    left: 0;
    right: 0;

	color: $color-white;

	padding: $padding-general;

	display: flex;
	flex-direction: row;
	align-items: center;

	a {
		color: 	$color-white;
		text-decoration: none;

		&:hover {
			color: $color-yellow;
		}
	}
}

.footerNavContainer {
	display: flex;
	flex-direction: row;
	align-items: center;

	a {
		padding: $padding-general;
	}
}

.footerIcon {
	padding: $padding-general;

	img {
		height: 40px;
	}

}

.footerNav {
	display: flex;
	flex-direction: row;
}

.footerSocial {
	display: flex;
	flex-direction: column;
	margin-left: auto;
	padding: $padding-general;
	padding-bottom:	0;

	.socialHeading {
		padding-bottom: $padding-half;
		border-bottom: 	$divider-line-height solid $color-white;
		margin-bottom: 0;
	}
}

.socialIcons {
	display: flex;
	flex-direction: row;
	align-items: flex-start;

	margin-left: -($padding-half);

	a {
		padding: $padding-general $padding-half;
		i {
			font-size: 	18px;
		}
	}
}

@media all and (max-device-width: 900px) {
	.footerNavContainer {
		display: none;
	}

	.socialHeading {
		display: none;
	}

	.footerSocial {
		margin-right: auto;
		padding: 0;
	}

	.socialIcons {
		align-items: center;

		a {
			padding: $padding-general;

			i {
				font-size: 20px;
			}
		}
	}
}

@media all and (min-device-width: 481px) and (max-device-width: 900px) {
	.footerMain {
		align-items: flex-end;
	}

	.footerSocial {
		margin-left: auto;
		margin-right: 0;
	}
}

</style>





