import { SinglePlayer } from "@/components/List/SinglePlayer";
import { usePlayersList } from "@/hooks/players/usePlayersList";

export const PlayersList = () => {
	const { data, error, loading, REMOVE_PLAYER } = usePlayersList();

	if (loading) return <p> Loading...</p>;
	if (error) return <p>{error}</p>;
	if (!data) return null;
	return (
		<ul>
			{data.map((element) => (
				<SinglePlayer
					element={element}
					key={element.id}
					remove={REMOVE_PLAYER}
				/>
			))}
		</ul>
	);
};
