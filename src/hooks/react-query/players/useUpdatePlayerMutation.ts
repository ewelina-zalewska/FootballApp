import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PlayerDto, TeamMember } from "@/types";
import { useApi } from "@/hooks/useApi";

export const useUpdatePlayerMutation = (playerId: string) => {
	const { API_PUT } = useApi();
	const queryClient = useQueryClient();

	const { mutate, data, error, isPending } = useMutation({
		mutationKey: ["players", playerId],
		mutationFn: async (payload: PlayerDto) => {
			return API_PUT<TeamMember, PlayerDto>(`players/${playerId}`, payload);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["players"],
			});
		},
	});

	return { mutate, error, data, isPending };
};
