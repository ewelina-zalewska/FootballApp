import { useGamesListDelete } from "@/hooks/games/useGamesListDelete";
import { GameListProps } from "@/types";
import { useEffect } from "react";

type SingleGameProps = {
	remove: (id: string) => void;
	element: GameListProps;
};

export const SingleGame = ({ element, remove }: SingleGameProps) => {
	const { loading, error, DELETE_GAME, data } = useGamesListDelete();

	const onDelete = () => {
		DELETE_GAME(element.id);
	};

	useEffect(() => {
		if (!data) return;
		remove(data.id);
	}, [data]);

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
			<button disabled={loading} onClick={onDelete}>
				DELETE
			</button>
			{error && <p>{error}</p>}
		</li>
	);
};
