import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Team } from "@/types";
import { useApi } from "@/hooks/useApi";

export const useTeamsDeleteMutation = () => {
	const { API_DELETE } = useApi();
	const queryClient = useQueryClient();
	const { data, mutate, isPending, error } = useMutation({
		mutationKey: ["teams"],
		mutationFn: async (teamId: string) => {
			return API_DELETE<Team>(`teams/${teamId}`);
		},
		onSuccess: (deletedTeam: Team) => {
			queryClient.setQueryData<Team[]>(["teams"], (oldTeams) => {
				return oldTeams?.filter((team) => team.id !== deletedTeam.id);
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
