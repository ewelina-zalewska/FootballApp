import { SingleGame } from "@/components/List/games/SingleGame";
import { useGamesList } from "@/hooks/games/useGamesList";
import { GameForm } from "@/components/Forms/games/GameForm";

export const GamesList = () => {
	const { data, error, loading, REMOVE_GAME, ADD_GAME } = useGamesList();

	if (loading) return <p> Loading... </p>;
	if (error) return <p>{error}</p>;
	if (!data) return null;
	return (
		<>
			<GameForm onNewGame={ADD_GAME} />
			<ul>
				{data.map((element) => (
					<SingleGame element={element} key={element.id} remove={REMOVE_GAME} />
				))}
			</ul>
		</>
	);
};
