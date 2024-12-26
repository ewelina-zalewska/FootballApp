import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "@/hooks/useApi";

import { TeamMember } from "@/types";

export const useUpdateMultiplePlayersTeamMutation = () => {
	const { API_PATCH } = useApi();
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationKey: ["players", "updateMultiplePlayers"],
		mutationFn: async ({
			playerIds,
			team,
			teamId,
		}: {
			playerIds: string[];
			team: string;
			teamId: string;
		}) => {
			const updatePromises = playerIds.map((playerId) =>
				API_PATCH<TeamMember, Partial<TeamMember>>(`players/${playerId}`, {
					team,
					teamId,
				}),
			);
			return Promise.all(updatePromises);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ["players"],
			});
		},
	});

	return {
		mutate,
		isPending,
	};
};
