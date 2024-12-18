import { SingleTeam } from "@/components/List/teams/SingleTeam";
import { useTeamsList } from "@/hooks/teams/useTeamsList";
import { TeamForm } from "@/components/Forms/teams/TeamForm";

export const TeamsList = () => {
	const { data, error, loading, REMOVE_TEAM, ADD_TEAM } = useTeamsList();

	if (loading) return <p> Loading...</p>;
	if (error) return <p>{error}</p>;
	if (!data) return null;
	return (
		<>
			<TeamForm onNewTeam={ADD_TEAM} />

			<ul>
				{data.map((element) => (
					<SingleTeam element={element} key={element.id} remove={REMOVE_TEAM} />
				))}
			</ul>
		</>
	);
};
