import { usePlayersList } from "@/hooks/players/usePlayersList";
import { SinglePlayer } from "@/components/List/SinglePlayer";
import { PlayerForm } from "@/components/Forms/PlayerForm";

export const PlayersList = () => {
	const { data, error, loading, REMOVE_PLAYER, ADD_PLAYER } = usePlayersList();

	if (loading) return <p> Loading...</p>;
	if (error) return <p>{error}</p>;
	if (!data) return null;
	return (
		<>
			<PlayerForm onNewPlayer={ADD_PLAYER} />
			<ul>
				{data.map((element) => (
					<SinglePlayer
						element={element}
						key={element.id}
						remove={REMOVE_PLAYER}
					/>
				))}
			</ul>
		</>
	);
};
