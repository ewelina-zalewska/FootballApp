import styled from "styled-components";
import { SingleTeam } from "@/components/List/teams/SingleTeam";
import { useGetTeamsQuery } from "@/hooks/react-query/teams/useGetTeamsQuery";
import { TeamForm } from "@/components/Forms/teams/TeamForm";

const StyledList = styled.ul`
	display: flex;
	flex-direction: column;
	justify-items: center;
	align-items: center;
	width: 90%;
	list-style: none;
	margin: 10px;
`;

export const TeamsList = () => {
	const { data, isLoading, error } = useGetTeamsQuery();

	if (isLoading) return <p> Loading...</p>;
	if (error) return <p>{error.message}</p>;
	if (!data) return null;

	return (
		<>
			<TeamForm />
			<StyledList>
				{data.map((element) => (
					<SingleTeam element={element} key={element.id} />
				))}
			</StyledList>
		</>
	);
};
