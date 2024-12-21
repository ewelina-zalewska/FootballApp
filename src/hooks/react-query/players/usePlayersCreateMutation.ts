import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Player, PlayerDto } from "@/types";
import { useApi } from "@/hooks/useApi";

export const usePlayersCreateMutation = () => {
	const { API_POST } = useApi();
	const queryClient = useQueryClient();

	const { mutate, isPending, error, data } = useMutation({
		mutationKey: ["players"],
		mutationFn: async ({ name, lastname, teamId }: PlayerDto) => {
			return API_POST<Player, PlayerDto>(`players`, {
				name,
				lastname,
				teamId,
			});
		},
		onSuccess: (createdTeam) => {
			queryClient.setQueryData<Player[]>(["players"], (oldTeams) => {
				return [...(oldTeams || []), createdTeam];
			});
		},
	});
	return { mutate, isPending, error, data };
};
