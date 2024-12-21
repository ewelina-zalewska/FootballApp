import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Player } from "@/types";
import { useApi } from "@/hooks/useApi";

export const usePlayersDeleteMutation = () => {
	const { API_DELETE } = useApi();
	const queryClient = useQueryClient();
	const { data, mutate, isPending, error } = useMutation({
		mutationKey: ["players"],
		mutationFn: async (teamId: string) => {
			return API_DELETE<Player>(`players/${teamId}`);
		},
		onSuccess: (deletedTeam: Player) => {
			queryClient.setQueryData<Player[]>(["players"], (oldTeams) => {
				return oldTeams?.filter((player) => player.id !== deletedTeam.id);
			});
		},
	});

	return {
		data,
		mutate,
		isPending,
		error,
	};
};
