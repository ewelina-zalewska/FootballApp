import { SingleTeam } from "@/components/List/SingleTeam";
import { useTeamsList } from "@/hooks/teams/useTeamsList";

export const TeamsList = () => {
	const { data, error, loading, REMOVE_TEAM } = useTeamsList();

	if (loading) return <p> Loading...</p>;
	if (error) return <p>{error}</p>;
	if (!data) return null;
	return (
		<ul>
			{data.map((element) => (
				<SingleTeam element={element} key={element.id} remove={REMOVE_TEAM} />
			))}
		</ul>
	);
};
