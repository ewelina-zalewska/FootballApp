import { Player } from "@/types";
import { useQuery } from "@tanstack/react-query";
const API_BASE = import.meta.env.VITE_API_URL;

export const useGetPlayersQuery = () => {
	const { data } = useQuery({
		queryKey: ["players"],
		queryFn: async () => {
			const response = await fetch(`${API_BASE}players`);
			return response.json() as Promise<Player[]>;
		},
	});

	return {
		data,
	};
};
