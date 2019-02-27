const roleSliderData = [
	{
		"category": "web",
		"roles":		["Developer", "Designer"]
	},
	{
		"category": "volleyball",
		"roles":		["Player", "Addict"]
	},
	{
		"category": "dog",
		"roles":		["Owner", "Samoyed"]
	},
	{
		"category": "hobby",
		"roles":		["Gamer", "Designer"]
	}
];

let categoryIndex = 0;
let roleIndex = 0;
let roleSliderTimer = 0;
let category = '';
let role = '';

const initiateRoleSlider = () => {
	roleSliderTimer = window.setInterval(incrementRoleSlider, 800);

	category = $(".webRole .category").html();
	role = $(".webRole .role").html();
}

const incrementRoleSlider = () => {

	if (roleIndex < (roleSliderData[categoryIndex].roles.length - 1)) {
		roleIndex++;

	} else {
		if (categoryIndex < (roleSliderData.length - 1)) {
			categoryIndex++;
			roleIndex = 0;
		} else {
			categoryIndex = 0;
		}
	}

	$(".webRole .category").html(roleSliderData[categoryIndex]["category"]);
	$(".webRole .role").html(roleSliderData[categoryIndex]["roles"][roleIndex]);

	// $(".webRole .category").lettering();
	// $(".webRole .role").lettering();
}

const resetRoleSlider = () => {
	categoryIndex = 0;
	roleIndex = 0;

	window.clearInterval(roleSliderTimer);
}

$(document).ready(initiateRoleSlider);
