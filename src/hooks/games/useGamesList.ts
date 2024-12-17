import { useEffect, useState } from "react";
import { GameListProps } from "@/types";
import { useApi } from "@/hooks/useApi";

export const useGamesList = () => {
	const { API_GET, loading, error } = useApi();
	const [data, setData] = useState<GameListProps[]>();

	const GET_GAMES_LIST = async () => {
		const response = await API_GET<GameListProps[]>("games");
		if (response) setData(response);
	};

	const REMOVE_GAME = (id: string) => {
		setData((prevData) => prevData?.filter((data) => data.id !== id));
	};

	useEffect(() => {
		GET_GAMES_LIST();
	}, []);

	return { data, error, loading, REMOVE_GAME };
};
