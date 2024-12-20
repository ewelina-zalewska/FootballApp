import { TeamMember } from "@/types";
import { useTeamMemberDeleteMutation } from "@/hooks/react-query/teams/useTeamMemberDeleteMutation";

type TeamListTeamMember = {
	element: TeamMember;
};

export const TeamListTeamMember = ({ element }: TeamListTeamMember) => {
	const { mutate: DELETE_TEAMS_LIST_PLAYER } = useTeamMemberDeleteMutation();
	const onDelete = () => {
		DELETE_TEAMS_LIST_PLAYER(element.id);
	};

	return (
		<li>
			<p>
				{element.name} {element.lastname}
			</p>
			<button onClick={onDelete}>Delete player</button>
		</li>
	);
};
