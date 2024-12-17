import { useEffect, useState } from "react";
import { PlayerListProps } from "@/types";
import { useApi } from "@/hooks/useApi";

export const usePlayersList = () => {
	const { API_GET, loading, error } = useApi();
	const [data, setData] = useState<PlayerListProps[]>();

	const GET_PLAYERS_LIST = async () => {
		const response = await API_GET<PlayerListProps[]>("players");
		if (response) setData(response);
	};

	const REMOVE_PLAYER = (id: string) => {
		setData((prevData) => prevData?.filter((data) => data.id !== id));
	};

	useEffect(() => {
		GET_PLAYERS_LIST();
	}, []);

	return { data, error, loading, REMOVE_PLAYER };
};
