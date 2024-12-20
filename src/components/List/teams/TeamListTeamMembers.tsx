import { TeamMembersProps } from "@/types";
import { useGetTeamsMembersQuery } from "@/hooks/react-query/teams/useGetTeamsMembersQuery";
import { TeamListTeamMember } from "@/components/List/teams/TeamListTeamMember";
import { TeamFormPlayers } from "@/components/Forms/teams/TeamFormPlayers";

export const TeamListTeamMembers = ({ teamId }: TeamMembersProps) => {
	const { data, error, isLoading } = useGetTeamsMembersQuery(teamId);

	if (error) return <p>{error.message}</p>;
	if (isLoading) return <p>Loading players...</p>;
	if (!data) return null;
	return (
		<>
			<TeamFormPlayers teamId={teamId} />
			<ul>
				{data.map((playerData) => (
					<TeamListTeamMember key={playerData.id} element={playerData} />
				))}
			</ul>
		</>
	);
};
