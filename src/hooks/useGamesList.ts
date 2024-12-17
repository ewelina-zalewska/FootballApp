import { useEffect, useState } from "react";
import { GamesListProps } from "@/types";
import { useApi } from "@/hooks/useApi";

export const useGamesList = () => {
	const { API_GET, loading, error } = useApi();
	const [data, setData] = useState<GamesListProps[]>();

	const getGamesList = async () => {
		const response = await API_GET<GamesListProps[]>("games");
		if (response) setData(response);
	};

	useEffect(() => {
		getGamesList();
	});

	return { data, error, loading };
};
