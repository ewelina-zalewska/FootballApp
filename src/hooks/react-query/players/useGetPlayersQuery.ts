import { TeamMember } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useApi } from "@/hooks/useApi";

export const useGetPlayersQuery = () => {
	const { API_GET } = useApi();
	const { data, isLoading, error } = useQuery({
		queryKey: ["players"],
		queryFn: async () => {
			return API_GET<TeamMember[]>("players");
		},
	});

	return {
		data,
		isLoading,
		error,
	};
};
