import { useState } from "react";
import { TeamListProps } from "@/types";
import { useApi } from "@/hooks/useApi";

export const useTeamsListDelete = () => {
	const { API_DELETE, loading, error } = useApi();
	const [data, setData] = useState<TeamListProps>();

	const DELETE_TEAM = async (id: string) => {
		const response = await API_DELETE<TeamListProps>(`teams/${id}`);
		if (response) setData(response);
	};

	return { DELETE_TEAM, data, error, loading };
};
