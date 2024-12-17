import { useState } from "react";
import { Player } from "@/types";
import { useApi } from "@/hooks/useApi";

export const usePlayersListDelete = () => {
	const { API_DELETE, loading, error } = useApi();
	const [data, setData] = useState<Player>();

	const DELETE_PLAYER = async (id: string) => {
		const response = await API_DELETE<Player>(`players/${id}`);
		if (response) setData(response);
	};

	return { DELETE_PLAYER, data, error, loading };
};
