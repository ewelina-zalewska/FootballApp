import { useEffect, useState } from "react";
import { GameListProps } from "@/types";
import { useApi } from "@/";

export const useGamesList = () => {
	const { API_GET, loading, error } = useApi();
	const [data, setData] = useState<GameListProps[]>();

	const getGamesList = async () => {
		const response = await API_GET<GameListProps[]>("games");
		if (response) setData(response);
	};

	useEffect(() => {
		getGamesList();
	});

	return { data, error, loading };
};
