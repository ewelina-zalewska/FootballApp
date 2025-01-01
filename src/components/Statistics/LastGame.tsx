import styled from "styled-components";
import { useGetGamesQuery } from "@/hooks/react-query/games/useGetGamesQuery";
import { SingleGameInfo } from "@/components/Forms/games/SingleGameInfo";

const StyledLastGame = styled.div`
	display: flex;
	flex-direction: column;
	justify-items: center;
	align-items: center;
	@media (min-width: 768px) {
		width: calc(100% / 3);
	}
`;

export const LastGame = () => {
	const { data: games } = useGetGamesQuery();

	const lastGame = games
		?.slice()
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

	if (!lastGame) return;

	return (
		<StyledLastGame>
			<h2>LAST GAME</h2>
			<SingleGameInfo element={lastGame} />
		</StyledLastGame>
	);
};
