import { TeamMember } from "@/types";
import { useUpdatePlayerMutation } from "@/hooks/react-query/players/useUpdatePlayerMutation";
import { TheButton } from "@/components/Shared/TheButton";
import styled from "styled-components";

const StyledItem = styled.li`
	display: flex;
	justify-content: space-between;
	width: 100%;
	& > div {
	}
`;

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
		<>
			<StyledItem>
				<p>
					{element.name} {element.lastname}
				</p>
				<div>
					<TheButton btnLabel="REMOVE" onClick={onDelete} />
				</div>
			</StyledItem>
			{error && <p>{error.message}</p>}
		</>
	);
};
