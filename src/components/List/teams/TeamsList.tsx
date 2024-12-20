import { SingleTeam } from "@/components/List/teams/SingleTeam";
import { useGetTeamsQuery } from "@/hooks/react-query/teams/useGetTeamsQuery";
import { TeamForm } from "@/components/Forms/teams/TeamForm";

export const TeamsList = () => {
	const { data, isLoading, error } = useGetTeamsQuery();

	if (isLoading) return <p> Loading...</p>;
	if (error) return <p>{error.message}</p>;
	if (!data) return null;

	return (
		<div>
			<TeamForm />
			<ul>
				{data.map((element) => (
					<SingleTeam element={element} key={element.id} />
				))}
			</ul>
		</div>
	);
};
