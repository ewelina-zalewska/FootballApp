import { useGetPlayersQuery } from "@/hooks/react-query/players/useGetPlayersQuery";
import { SinglePlayer } from "@/components/List/players/SinglePlayer";
import { PlayerForm } from "@/components/Forms/players/PlayerForm";

export const PlayersList = () => {
	const { data, isLoading, error } = useGetPlayersQuery();

	if (isLoading) return <p> Loading...</p>;
	if (error) return <p>{error.message}</p>;
	if (!data) return null;
	return (
		<>
			<PlayerForm />
			<ul>
				{data.map((element) => (
					<SinglePlayer element={element} key={element.id} />
				))}
			</ul>
		</>
	);
};
