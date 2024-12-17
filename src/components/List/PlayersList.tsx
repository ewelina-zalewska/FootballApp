import { SinglePlayer } from "@/components/List/SinglePlayer";
import { usePlayersList } from "@/hooks/usePlayersList";

export const PlayersList = () => {
	const { data, error, loading } = usePlayersList();

	if (loading) return <p> Loading...</p>;
	if (error) return <p>{error}</p>;
	if (!data) return null;
	return (
		<ul>
			{data.map((element) => (
				<SinglePlayer element={element} key={element.id} />
			))}
		</ul>
	);
};
