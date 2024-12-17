import { useState } from "react";
import { PlayerListProps } from "@/types";
import { useApi } from "@/hooks/useApi";

export const usePlayersListDelete = () => {
	const { API_DELETE, loading, error } = useApi();
	const [data, setData] = useState<PlayerListProps>();

	const DELETE_PLAYER = async (id: string) => {
		const response = await API_DELETE<PlayerListProps>(`players/${id}`);
		if (response) setData(response);
	};

	return { DELETE_PLAYER, data, error, loading };
};
