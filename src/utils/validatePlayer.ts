﻿import { PlayerFormErrors, PlayerFormValue } from "@/types";

export const validatePlayer = (playerForm: PlayerFormValue) => {
	const { name, lastname, belongToTeam, team } = playerForm;

	let isSuccess = true;
	const newErrors: PlayerFormErrors = {
		name: [],
		lastname: [],
		belongToTeam: [],
		team: [],
	};

	if (!name.trim()) {
		newErrors.name.push("First name is required.");
	} else if (name.length < 3) {
		newErrors.name.push("First name must be at least 3 characters long.");
	}

	if (!lastname.trim()) {
		newErrors.lastname.push("Last name is required.");
	} else if (lastname.length < 3) {
		newErrors.lastname.push("Last name must be at least 3 characters long.");
	}

	if (belongToTeam.length < 2) {
		newErrors.belongToTeam.push("Select yes or no.");
	}
	if (belongToTeam === "yes" && !team) {
		newErrors.team.push("Choose a team.");
	}

	if (
		!name.trim() ||
		name.length < 3 ||
		!lastname.trim() ||
		lastname.length < 3 ||
		!belongToTeam ||
		(belongToTeam === "yes" && !team)
	) {
		isSuccess = false;
	}
	return { newErrors, isSuccess };
};
