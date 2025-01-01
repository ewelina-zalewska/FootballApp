import { LastGame } from "@/components/Statistics/LastGame";
import { TopTeams } from "@/components/Statistics/TopTeams";
import { NumberOfGames } from "@/components/Statistics/NumberOfGames";

export const TheStats = () => {
	return (
		<>
			<TopTeams />
			<LastGame />
			<NumberOfGames />
		</>
	);
};
