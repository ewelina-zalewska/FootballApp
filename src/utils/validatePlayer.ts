import { PlayerFormErrors, PlayerFormValue } from "@/types";

export const validatePlayer = (playerForm: PlayerFormValue) => {
	const { name, lastname } = playerForm;

	let isSuccess = true;
	const newErrors: PlayerFormErrors = {
		name: [],
		lastname: [],
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

	if (
		!name.trim() ||
		name.length < 3 ||
		!lastname.trim() ||
		lastname.length < 3
	) {
		isSuccess = false;
	}
	return { newErrors, isSuccess };
};
