import { GameListProps } from "@/types";

type SingleGameProps = {
	element: GameListProps;
};

export const SingleGame = ({ element }: SingleGameProps) => {
	return (
		<li>
			<p>{element.title}</p>
			<p> {element.date}</p>
			<p>{element.location}</p>
			<ol>
				<p>TEAMS:</p>
				{element.teams.map((team) => (
					<li key={team.id}>
						{team.name} {team.numberOfGoals}
					</li>
				))}
			</ol>
			<button>DELETE</button>
		</li>
	);
};
