import { SingleGame } from "@/components/List/games/SingleGame";
import { useGetGamesQuery } from "@/hooks/react-query/games/useGetGamesQuery";
import { GameForm } from "@/components/Forms/games/GameForm";
import styled from "styled-components";

const StyledList = styled.li`
	display: flex;
	flex-direction: column;
	justify-items: center;
	align-items: center;
	width: 90%;
`;

export const GamesList = () => {
	const { data, isLoading, error } = useGetGamesQuery();

	if (isLoading) return <p> Loading... </p>;
	if (error) return <p>{error.message}</p>;
	if (!data) return null;
	return (
		<>
			<GameForm />
			<StyledList>
				{data.map((element) => (
					<SingleGame element={element} key={element.id} />
				))}
			</StyledList>
		</>
	);
};
