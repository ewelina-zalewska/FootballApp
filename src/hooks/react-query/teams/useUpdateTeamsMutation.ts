import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TeamDto, Team } from "@/types";
import { useApi } from "@/hooks/useApi";

export const useUpdateTeamsMutation = (teamId: string) => {
	const { API_PUT } = useApi();
	const queryClient = useQueryClient();

	const { mutate, data, error, isPending } = useMutation({
		mutationKey: ["teams", teamId],
		mutationFn: async (payload: TeamDto) => {
			return API_PUT<Team, TeamDto>(`teams/${teamId}`, payload);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["teams"],
			});
		},
	});

	return { mutate, error, data, isPending };
};
