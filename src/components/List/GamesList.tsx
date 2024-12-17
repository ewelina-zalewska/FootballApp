import { SingleGame } from "@/components/List/SingleGame";
import { useGamesList } from "@/hooks/games/useGamesList";

export const GamesList = () => {
	const { data, error, loading, REMOVE_GAME } = useGamesList();

	if (loading) return <p> Loading... </p>;
	if (error) return <p>{error}</p>;
	if (!data) return null;
	return (
		<ul>
			{data.map((element) => (
				<SingleGame element={element} key={element.id} remove={REMOVE_GAME} />
			))}
		</ul>
	);
};
