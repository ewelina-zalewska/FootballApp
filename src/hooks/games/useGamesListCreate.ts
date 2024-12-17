import { useState } from "react";
import { Game, GameDto } from "@/types";
import { useApi } from "@/hooks/useApi";

export const useGamesListCreate = () => {
	const { API_POST, loading, error } = useApi();
	const [data, setData] = useState<Game>();

	const CREATE_GAME = async (
		date: string,
		title: string,
		location: string,
		duration: number,
		team1: string,
		numberOfGoals_team1: number,
		team2: string,
		numberOfGoals_team2: number,
	) => {
		const response = await API_POST<Game, GameDto>(`games`, {
			date,
			title,
			location,
			duration,
			team1,
			numberOfGoals_team1,
			team2,
			numberOfGoals_team2,
		});
		if (response) setData(response);
	};

	return { CREATE_GAME, data, error, loading };
};
