import styled from "styled-components";
import { useGetPlayersQuery } from "@/hooks/react-query/players/useGetPlayersQuery";
import { SinglePlayer } from "@/components/List/players/SinglePlayer";
import { PlayerForm } from "@/components/Forms/players/PlayerForm";

const StyledList = styled.ul`
	display: flex;
	flex-direction: column;
	justify-items: center;
	align-items: center;
	width: 90%;
	list-style: none;
	padding: 10px;
`;

export const PlayersList = () => {
	const { data, isLoading, error } = useGetPlayersQuery();

	if (isLoading) return <p> Loading...</p>;
	if (error) return <p>{error.message}</p>;
	if (!data) return <p> No data...</p>;
	return (
		<>
			<PlayerForm />
			<StyledList>
				{data.map((element) => (
					<SinglePlayer element={element} key={element.id} />
				))}
			</StyledList>
		</>
	);
};
