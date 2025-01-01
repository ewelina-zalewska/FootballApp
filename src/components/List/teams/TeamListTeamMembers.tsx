import { TeamMembersProps } from "@/types";
import { useGetTeamsMembersQuery } from "@/hooks/react-query/teams/useGetTeamsMembersQuery";
import { TeamListTeamMember } from "@/components/List/teams/TeamListTeamMember";
import { TeamFormPlayers } from "@/components/Forms/teams/TeamFormPlayers";
import styled from "styled-components";

const StyledList = styled.ul`
	padding: 10px;
	width: inherit;
`;

export const TeamListTeamMembers = ({ teamId, teamName }: TeamMembersProps) => {
	const { data, error, isLoading } = useGetTeamsMembersQuery(teamId);

	if (error) return <p>{error.message}</p>;
	if (isLoading) return <p>Loading players...</p>;
	if (!data) return null;
	return (
		<>
			<TeamFormPlayers teamId={teamId} teamName={teamName} />
			<StyledList>
				{data.map((playerData) => (
					<TeamListTeamMember key={playerData.id} element={playerData} />
				))}
			</StyledList>
		</>
	);
};
