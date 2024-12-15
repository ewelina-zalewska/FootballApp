import { GameFormErrors, GameFormValue } from "@/types";

export const validateGame = (GameForm: GameFormValue) => {
	let isSuccess = true;
	const { title, location, duration, team1, team2 } = GameForm;

	const newErrors: GameFormErrors = {
		date: [],
		title: [],
		location: [],
		duration: [],
		team1: [],
		numberOfGoals_team1: [],
		team2: [],
		numberOfGoals_team2: [],
	};

	if (!title.trim()) {
		newErrors.title.push("Title of game is required.");
	} else if (title.length < 3) {
		newErrors.title.push("Title must be at least 3 characters long.");
	}

	if (!location.trim()) {
		newErrors.location.push("Location of game is required.");
	} else if (location.length < 3) {
		newErrors.location.push("Location must be at least 3 characters long.");
	}

	if (duration < 90) {
		newErrors.duration.push(
			"Duration must be greater than or equal to 90 minutes.",
		);
	}

	if (!team1.trim()) {
		newErrors.team1.push("Team name is required.");
	}

	if (!team2.trim()) {
		newErrors.team2.push("Team name is required.");
	} else if (team1 === team2) {
		newErrors.team2.push("There must be two different teams");
	}

	if (
		!title.trim() ||
		title.length < 3 ||
		!location.trim() ||
		location.length < 3 ||
		!duration ||
		duration < 90 ||
		!team1.trim() ||
		!team2.trim() ||
		team1 === team2
	) {
		isSuccess = false;
	}
	return { newErrors, isSuccess };
};
