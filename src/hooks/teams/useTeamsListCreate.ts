import { useState } from "react";
import { Team, TeamDto } from "@/types";
import { useApi } from "@/hooks/useApi";

export const useTeamsListCreate = () => {
	const { API_POST, loading, error } = useApi();
	const [data, setData] = useState<Team>();

	const CREATE_TEAM = async (
		name: string,
		yearOfFoundation: string,
		location: string,
	) => {
		const response = await API_POST<Team, TeamDto>(`games`, {
			name,
			yearOfFoundation,
			location,
		});
		if (response) setData(response);
	};

	return { CREATE_TEAM, data, error, loading };
};
