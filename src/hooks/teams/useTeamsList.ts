import { useEffect, useState } from "react";
import { TeamListProps } from "@/types";
import { useApi } from "@/hooks/useApi";

export const useTeamsList = () => {
	const { API_GET, loading, error } = useApi();
	const [data, setData] = useState<TeamListProps[]>();

	const GET_TEAMS_LIST = async () => {
		const response = await API_GET<TeamListProps[]>("teams");
		if (response) setData(response);
	};

	const REMOVE_TEAM = (id: string) => {
		setData((prevData) => prevData?.filter((data) => data.id !== id));
	};

	useEffect(() => {
		GET_TEAMS_LIST();
	}, []);

	return { data, error, loading, REMOVE_TEAM };
};
