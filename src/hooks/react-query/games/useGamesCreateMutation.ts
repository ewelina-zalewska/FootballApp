import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Game, GameDto } from "@/types";
import { useApi } from "@/hooks/useApi";

export const useGamesCreateMutation = () => {
	const { API_POST } = useApi();
	const queryClient = useQueryClient();

	const { mutate, isPending, error, data } = useMutation({
		mutationKey: ["games", "create"],
		mutationFn: async (payload: GameDto) => {
			return API_POST<Game, GameDto>(`games`, payload);
		},
		onSuccess: (createdGame) => {
			queryClient.setQueryData<Game[]>(["games"], (oldTeams) => {
				return [...(oldTeams || []), createdGame];
			});
		},
	});
	return { mutate, isPending, error, data };
};
