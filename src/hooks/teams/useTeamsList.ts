import { useEffect, useState } from "react";
import { TeamListProps } from "@/types";
import { useApi } from "@/hooks/useApi";

export const useTeamsList = () => {
	const { API_GET, loading, error } = useApi();
	const [data, setData] = useState<TeamListProps[]>();

	const getTeamsList = async () => {
		const response = await API_GET<TeamListProps[]>("teams");
		if (response) setData(response);
	};

	useEffect(() => {
		getTeamsList();
	});

	return { data, error, loading };
};
