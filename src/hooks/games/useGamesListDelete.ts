import { useState } from "react";
import { GameListProps } from "@/types";
import { useApi } from "@/hooks/useApi";

export const useGamesListDelete = () => {
	const { API_DELETE, loading, error } = useApi();
	const [data, setData] = useState<GameListProps>();

	const DELETE_GAME = async (id: string) => {
		const response = await API_DELETE<GameListProps>(`games/${id}`);
		if (response) setData(response);
	};

	return { DELETE_GAME, data, error, loading };
};
