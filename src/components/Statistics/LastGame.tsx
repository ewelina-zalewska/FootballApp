import { useGetGamesQuery } from "@/hooks/react-query/games/useGetGamesQuery";
import { SingleGameInfo } from "@/components/Forms/games/SingleGameInfo";

export const LastGame = () => {
	const { data: games } = useGetGamesQuery();

	const lastGame = games
		?.slice()
		.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

	if (!lastGame) return;

	return <SingleGameInfo element={lastGame} />;
};
