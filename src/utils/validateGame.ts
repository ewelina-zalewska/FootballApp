import { GameFormErrors, GameFormValue } from "@/types";

export const validateGame = (GameForm: GameFormValue) => {
	let isSuccess = true;
	const { title, location, duration, teamId1, teamId2 } = GameForm;

	const newErrors: GameFormErrors = {
		date: [],
		title: [],
		location: [],
		duration: [],
		teamId1: [],
		numberOfGoals_team1: [],
		teamId2: [],
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

	if (!teamId1.trim()) {
		newErrors.teamId1.push("Team name is required.");
	}

	if (!teamId2.trim()) {
		newErrors.teamId2.push("Team name is required.");
	} else if (teamId1 === teamId2) {
		newErrors.teamId2.push("There must be two different teams");
	}

	if (
		!title.trim() ||
		title.length < 3 ||
		!location.trim() ||
		location.length < 3 ||
		!duration ||
		duration < 90 ||
		!teamId1.trim() ||
		!teamId2.trim() ||
		teamId1 === teamId2
	) {
		isSuccess = false;
	}
	return { newErrors, isSuccess };
};
