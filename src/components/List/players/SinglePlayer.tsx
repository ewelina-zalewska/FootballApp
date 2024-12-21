import { Player } from "@/types";
import { usePlayersDeleteMutation } from "@/hooks/react-query/players/usePlayersDeleteMutation";

type SinglePlayerProps = {
	element: Player;
};

export const SinglePlayer = ({ element }: SinglePlayerProps) => {
	const {
		isPending,
		error,
		mutate: DELETE_PLAYER,
	} = usePlayersDeleteMutation();

	const onDelete = () => {
		DELETE_PLAYER(element.id);
	};

	return (
		<li>
			<p>{element.name}</p>
			<p> {element.lastname}</p>
			<button disabled={isPending} onClick={onDelete}>
				DELETE
			</button>
			{error && <p>{error.message}</p>}
		</li>
	);
};
