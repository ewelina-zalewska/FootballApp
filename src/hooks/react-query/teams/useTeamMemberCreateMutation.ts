import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Player, PlayerDto } from "@/types";
import { useApi } from "@/hooks/useApi";

export const useTeamMemberCreateMutation = () => {
	const { API_POST } = useApi();
	const queryClient = useQueryClient();

	const { mutate, isPending, error, data } = useMutation({
		mutationKey: ["players"],
		mutationFn: async (payload: PlayerDto) => {
			return API_POST<Player, PlayerDto>(`players`, payload);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["players"] });
		},
	});
	return { mutate, isPending, error, data };
};
