import { useEffect, useState } from "react";
import { PlayerListProps } from "@/types";
import { useApi } from "@/hooks/useApi";

export const usePlayersList = () => {
	const { API_GET, loading, error } = useApi();
	const [data, setData] = useState<PlayerListProps[]>();

	const getPlayersList = async () => {
		const response = await API_GET<PlayerListProps[]>("players");
		if (response) setData(response);
	};

	useEffect(() => {
		getPlayersList();
	});

	return { data, error, loading };
};
