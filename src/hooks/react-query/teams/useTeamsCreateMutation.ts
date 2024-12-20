import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Team, TeamDto, TeamFormValue } from "@/types";
import { useApi } from "@/hooks/useApi";

export const useTeamsCreateMutation = () => {
	const { API_POST } = useApi();
	const queryClient = useQueryClient();

	const { mutate, isPending, error, data } = useMutation({
		mutationKey: ["teams"],
		mutationFn: async ({ name, yearOfFoundation, location }: TeamFormValue) => {
			return API_POST<Team, TeamDto>(`teams`, {
				name,
				yearOfFoundation,
				location,
			});
		},
		onSuccess: (createdTeam) => {
			queryClient.setQueryData<Team[]>(["teams"], (oldTeams) => {
				return [...(oldTeams || []), createdTeam];
			});
		},
	});
	return { mutate, isPending, error, data };
};
