import { useState } from "react";

export const useChangeSection = () => {
	const [section, setSection] = useState<
		"players" | "teams" | "games" | "statistics"
	>("players");

	const SHOW_PLAYERS = () => setSection("players");
	const SHOW_TEAMS = () => setSection("teams");
	const SHOW_GAMES = () => setSection("games");
	const SHOW_STATISTICS = () => setSection("statistics");

	const players = section === "players";
	const teams = section === "teams";
	const games = section === "games";
	const statistics = section === "statistics";

	return {
		players,
		teams,
		games,
		statistics,
		SHOW_PLAYERS,
		SHOW_TEAMS,
		SHOW_GAMES,
		SHOW_STATISTICS,
	};
};
