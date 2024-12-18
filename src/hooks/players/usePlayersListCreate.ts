import { useState } from "react";
import { Player, PlayerDto } from "@/types";
import { useApi } from "@/hooks/useApi";

export const usePlayersListCreate = () => {
	const { API_POST, loading, error } = useApi();
	const [data, setData] = useState<Player>();

	const CREATE_PLAYER = async (
		name: string,
		lastname: string,
		belongToTeam: string,
		team: string,
		teamId: string,
	) => {
		const response = await API_POST<Player, PlayerDto>(`players`, {
			name,
			lastname,
			belongToTeam,
			team,
			teamId,
		});
		if (response) setData(response);
	};

	return { CREATE_PLAYER, data, error, loading };
};
