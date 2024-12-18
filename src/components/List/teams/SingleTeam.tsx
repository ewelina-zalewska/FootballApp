import { useEffect, useState } from "react";
import { Team } from "@/types";
import { useTeamsListDelete } from "@/hooks/teams/useTeamsListDelete";
import { TeamListTeamMembers } from "@/components/List/teams/TeamListTeamMembers";

type SingleTeamProps = {
	remove: (id: string) => void;
	element: Team;
};

export const SingleTeam = ({ element, remove }: SingleTeamProps) => {
	const { loading, error, DELETE_TEAM, data } = useTeamsListDelete();
	const [showPlayersData, setShowPlayersData] = useState<boolean>(false);

	const onDelete = () => {
		DELETE_TEAM(element.id);
	};

	const TOGGLE_PLAYERSDATA = () => {
		setShowPlayersData((prevPlayersdata) => !prevPlayersdata);
	};

	useEffect(() => {
		if (!data) return;
		remove(data.id);
	}, [data]);

	return (
		<>
			<li>
				<p>{element.name}</p>
				<p>{element.yearOfFoundation}</p>
				<p>{element.location}</p>
				<button disabled={loading} onClick={onDelete}>
					DELETE
				</button>
				<button disabled={loading} onClick={TOGGLE_PLAYERSDATA}>
					SHOW DETAILS
				</button>
				{error && <p>{error}</p>}
			</li>
			{showPlayersData && <TeamListTeamMembers teamId={element.id} />}
		</>
	);
};
