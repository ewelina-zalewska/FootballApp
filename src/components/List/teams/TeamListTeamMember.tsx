import { TeamMember } from "@/types";
import { useUpdatePlayerMutation } from "@/hooks/react-query/players/useUpdatePlayerMutation";

type TeamListTeamMember = {
	element: TeamMember;
};

export const TeamListTeamMember = ({ element }: TeamListTeamMember) => {
	const {
		mutate: EDIT_PLAYER,
		isPending,
		error,
	} = useUpdatePlayerMutation(element.id);
	const onDelete = () => {
		EDIT_PLAYER({
			name: element.name,
			lastname: element.lastname,
			team: "",
			teamId: "",
		});
	};
	if (isPending) return <p>Loading...</p>;
	return (
		<li>
			<p>
				{element.name} {element.lastname}
			</p>
			<button onClick={onDelete}>REMOVE PLAYER FROM TEAM</button>
			{error && <p>{error.message}</p>}
		</li>
	);
};
