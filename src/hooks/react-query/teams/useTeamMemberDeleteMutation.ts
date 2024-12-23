﻿import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TeamMember } from "@/types";
import { useApi } from "@/hooks/useApi";

export const useTeamMemberDeleteMutation = () => {
	const { API_DELETE } = useApi();
	const queryClient = useQueryClient();

	const { mutate, isPending, error, data } = useMutation({
		mutationKey: ["players"],
		mutationFn: async (teamId: string) => {
			return API_DELETE<TeamMember>(`players/${teamId}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["players"] });
		},
	});
	return { mutate, isPending, error, data };
};