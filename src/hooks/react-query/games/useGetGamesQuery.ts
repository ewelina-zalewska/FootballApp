import { Game } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useApi } from "@/hooks/useApi";

export const useGetGamesQuery = () => {
	const { API_GET } = useApi();
	const { data, isLoading, error } = useQuery({
		queryKey: ["games"],
		queryFn: async () => {
			return API_GET<Game[]>("games");
		},
	});

	return {
		data,
		isLoading,
		error,
	};
};
