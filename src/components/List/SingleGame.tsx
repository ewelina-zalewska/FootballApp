import { useGamesListDelete } from "@/hooks/games/useGamesListDelete";
import { Game } from "@/types";
import { useEffect } from "react";

type SingleGameProps = {
	remove: (id: string) => void;
	element: Game;
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
			<p>{element.date}</p>
			<p>{element.duration}</p>
			<p>{element.location}</p>
			<p>{element.team1}</p>
			<p>{element.numberOfGoals_team1}</p>
			<p>{element.team2}</p>
			<p>{element.numberOfGoals_team2}</p>

			<button disabled={loading} onClick={onDelete}>
				DELETE
			</button>
			{error && <p>{error}</p>}
		</li>
	);
};
