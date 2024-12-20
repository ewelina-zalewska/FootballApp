import { usePlayersList } from "@/hooks/players/usePlayersList";
import { useGetPlayersQuery } from "@/hooks/react-query/players/useGetPlayersQuery";
import { SinglePlayer } from "@/components/List/players/SinglePlayer";
import { PlayerForm } from "@/components/Forms/players/PlayerForm";
// import { PlayerForm } from "@/components/Forms/players/PlayerForm";

// const API_BASE = import.meta.env.VITE_API_URL;

export const PlayersList = () => {
	const { data } = useGetPlayersQuery();
	const { REMOVE_PLAYER, ADD_PLAYER } = usePlayersList();

	// if (loading) return <p> Loading...</p>;
	// if (error) return <p>{error}</p>;
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
