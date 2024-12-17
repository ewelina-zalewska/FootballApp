import { useEffect, useState } from "react";
import { Team } from "@/types";
import { useApi } from "@/hooks/useApi";

export const useTeamsList = () => {
	const { API_GET, loading, error } = useApi();
	const [data, setData] = useState<Team[]>();

	const GET_TEAMS_LIST = async () => {
		const response = await API_GET<Team[]>("teams");
		if (response) setData(response);
	};

	const REMOVE_TEAM = (id: string) => {
		setData((prevData) => prevData?.filter((data) => data.id !== id));
	};

	const ADD_TEAM = (team: Team) => {
		setData((prevData) => [...(prevData || []), team]);
	};

	useEffect(() => {
		GET_TEAMS_LIST();
	}, []);

	return { data, error, loading, REMOVE_TEAM, ADD_TEAM };
};
