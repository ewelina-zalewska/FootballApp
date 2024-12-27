import { useGetTeamsQuery } from "@/hooks/react-query/teams/useGetTeamsQuery";
import { SingleGameProps } from "@/types";
import { getWinner as GET_WINNER } from "@/utils/getWinner";
import { useEffect, useState } from "react";

export const SingleGameInfo = ({ element }: SingleGameProps) => {
	const { data: teams } = useGetTeamsQuery();
	const [winner, setWinner] = useState<string>("");

	const team1Name = teams?.find((team) => team.id === element.teamId1);
	const team2Name = teams?.find((team) => team.id === element.teamId2);

	useEffect(() => {
		setWinner(GET_WINNER(element));
	}, [element]);

	return (
		<li>
			<p>{element.date}</p>
			<p>{element.title}</p>
			<p>{element.duration}</p>
			<p>{element.location}</p>
			<p>{team1Name?.name}</p>
			<p>{element.numberOfGoals_team1}</p>
			<p>{team2Name?.name}</p>
			<p>{element.numberOfGoals_team2}</p>
			{winner === "Remis" ? (
				<p> REMIS</p>
			) : (
				<p>
					{teams?.filter((team) => team.id === winner).map((team) => team.name)}
				</p>
			)}
		</li>
	);
};
