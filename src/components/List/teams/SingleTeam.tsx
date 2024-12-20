import { useState } from "react";
import { Team } from "@/types";
import { useTeamsDeleteMutation } from "@/hooks/react-query/teams/useTeamsDeleteMutation";
import { TeamListTeamMembers } from "@/components/List/teams/TeamListTeamMembers";

type SingleTeamProps = {
	element: Team;
};

export const SingleTeam = ({ element }: SingleTeamProps) => {
	const { isPending, error, mutate: DELETE_TEAM } = useTeamsDeleteMutation();
	const [showPlayersData, setShowPlayersData] = useState<boolean>(false);

	const onDelete = () => {
		DELETE_TEAM(element.id);
	};

	const TOGGLE_PLAYERSDATA = () => {
		setShowPlayersData((prevPlayersdata) => !prevPlayersdata);
	};
	return (
		<>
			<li>
				<p>{element.name}</p>
				<p>{element.yearOfFoundation}</p>
				<p>{element.location}</p>
				<button disabled={isPending} onClick={onDelete}>
					DELETE
				</button>
				<button disabled={isPending} onClick={TOGGLE_PLAYERSDATA}>
					SHOW DETAILS
				</button>
				{error && <p>{error.message}</p>}
			</li>
			{showPlayersData && <TeamListTeamMembers teamId={element.id} />}
		</>
	);
};
