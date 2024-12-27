import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GameDto, Game } from "@/types";
import { useApi } from "@/hooks/useApi";

export const useUpdateGameMutation = (gameId: string) => {
	const { API_PUT } = useApi();
	const queryClient = useQueryClient();

	const { mutate, data, error, isPending } = useMutation({
		mutationKey: ["games", gameId],
		mutationFn: async (payload: GameDto) => {
			return API_PUT<Game, GameDto>(`games/${gameId}`, payload);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["games"],
			});
		},
	});

	return { mutate, error, data, isPending };
};
