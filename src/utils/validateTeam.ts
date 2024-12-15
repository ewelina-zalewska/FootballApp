import { TeamFormErrors, TeamFormValue } from "@/types";

export const validateTeam = (TeamForm: TeamFormValue) => {
	const { name, location } = TeamForm;

	let isSuccess = true;
	const newErrors: TeamFormErrors = {
		name: [],
		yearOfFoundation: [],
		location: [],
	};

	if (!name.trim()) {
		newErrors.name.push("Team name is required.");
	} else if (name.length < 2) {
		newErrors.name.push("Team name must be at least 2 characters long.");
	}

	if (!location.trim()) {
		newErrors.location.push("Location name is required.");
	} else if (location.length < 3) {
		newErrors.location.push(
			"Location name must be at least 3 characters long.",
		);
	}

	if (
		!name.trim() ||
		name.length < 2 ||
		!location.trim() ||
		location.length < 3
	) {
		isSuccess = false;
	}
	return { newErrors, isSuccess };
};
