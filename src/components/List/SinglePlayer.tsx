import { PlayerListProps } from "@/types";

type SinglePlayerProps = {
	element: PlayerListProps;
};

export const SinglePlayer = ({ element }: SinglePlayerProps) => {
	return (
		<li>
			<p>{element.name}</p>
			<p> {element.lastname}</p>
			<p>{element.team}</p>
			<button>DELETE</button>
		</li>
	);
};
