import { TeamListProps } from "@/types";

type SingleTeamProps = {
	element: TeamListProps;
};

export const SingleTeam = ({ element }: SingleTeamProps) => {
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
			<button>DELETE</button>
		</li>
	);
};
