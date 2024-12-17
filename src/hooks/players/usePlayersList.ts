import { useEffect, useState } from "react";
import { Player } from "@/types";
import { useApi } from "@/hooks/useApi";

export const usePlayersList = () => {
	const { API_GET, loading, error } = useApi();
	const [data, setData] = useState<Player[]>();

	const GET_PLAYERS_LIST = async () => {
		const response = await API_GET<Player[]>("players");
		if (response) setData(response);
	};

	const REMOVE_PLAYER = (id: string) => {
		setData((prevData) => prevData?.filter((data) => data.id !== id));
	};

	const ADD_PLAYER = (player: Player) => {
		setData((prevData) => [...(prevData || []), player]);
	};

	useEffect(() => {
		GET_PLAYERS_LIST();
	}, []);

	return { data, error, loading, REMOVE_PLAYER, ADD_PLAYER };
};
