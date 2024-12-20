import { useQuery } from "@tanstack/react-query";
import { TeamMembers } from "@/types";
import { useApi } from "@/hooks/useApi";

export const useGetTeamsMembersQuery = (teamId?: string) => {
	const { API_GET } = useApi();

	const { data, isLoading, error } = useQuery({
		queryKey: ["players", teamId],
		queryFn: async () => {
			return API_GET<TeamMembers>(`teams/${teamId}?_embed=players`);
		},
		enabled: !!teamId,
	});

	return {
		data: data?.players,
		isLoading,
		error,
	};
};
