import { useTeamsListDelete } from "@/hooks/teams/useTeamsListDelete";
import { TeamListProps } from "@/types";
import { useEffect } from "react";

type SingleTeamProps = {
	remove: (id: string) => void;
	element: TeamListProps;
};

export const SingleTeam = ({ element, remove }: SingleTeamProps) => {
	const { loading, error, DELETE_TEAM, data } = useTeamsListDelete();

	const onDelete = () => {
		DELETE_TEAM(element.id);
	};

	useEffect(() => {
		if (!data) return;
		remove(data.id);
	}, [data]);

	return (
		<li>
			<p>{element.name}</p>
			<p>{element.yearOfFoundation}</p>
			<p>{element.location}</p>
			<ol>
				<p>PLAYER:</p>
				{element.players.map((player) => (
					<li key={player.id}>
						{player.name} {player.lastname}
					</li>
				))}
			</ol>
			<button disabled={loading} onClick={onDelete}>
				DELETE
			</button>
			{error && <p>{error}</p>}
		</li>
	);
};
