import { useEffect, useState } from "react";
import { Game } from "@/types";
import { useApi } from "@/hooks/useApi";

export const useGamesList = () => {
	const { API_GET, loading, error } = useApi();
	const [data, setData] = useState<Game[]>();

	const GET_GAMES_LIST = async () => {
		const response = await API_GET<Game[]>("games");
		if (response) setData(response);
	};

	const REMOVE_GAME = (id: string) => {
		setData((prevData) => prevData?.filter((data) => data.id !== id));
	};

	const ADD_GAME = (game: Game) => {
		setData((prevData) => [...(prevData || []), game]);
	};

	useEffect(() => {
		GET_GAMES_LIST();
	}, []);

	return { data, error, loading, REMOVE_GAME, ADD_GAME };
};
