import { Player } from "@/types";
import { usePlayersListDelete } from "@/hooks/players/usePlayersListDelete";
import { useEffect } from "react";

type SinglePlayerProps = {
	remove: (id: string) => void;
	element: Player;
};

export const SinglePlayer = ({ element, remove }: SinglePlayerProps) => {
	const { loading, error, DELETE_PLAYER, data } = usePlayersListDelete();

	const onDelete = () => {
		DELETE_PLAYER(element.id);
	};

	useEffect(() => {
		if (!data) return;
		remove(data.id);
	}, [data]);

	return (
		<li>
			<p>{element.name}</p>
			<p> {element.lastname}</p>
			<p>{element.team}</p>
			<button disabled={loading} onClick={onDelete}>
				DELETE
			</button>
			{error && <p>{error}</p>}
		</li>
	);
};
