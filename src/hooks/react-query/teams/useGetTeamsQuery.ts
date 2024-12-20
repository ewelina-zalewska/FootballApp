import { Team } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useApi } from "@/hooks/useApi";

export const useGetTeamsQuery = () => {
	const { API_GET } = useApi();
	const { data, isLoading, error } = useQuery({
		queryKey: ["teams"],
		queryFn: async () => {
			return API_GET<Team[]>("teams");
		},
	});

	return {
		data,
		isLoading,
		error,
	};
};
