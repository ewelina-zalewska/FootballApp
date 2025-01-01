import { useEffect, useState } from "react";
import styled from "styled-components";
import { useGetTeamsQuery } from "@/hooks/react-query/teams/useGetTeamsQuery";
import { SingleGameProps } from "@/types";
import { getWinner as GET_WINNER } from "@/utils/getWinner";

const StyledList = styled.ul`
	display: flex;
	flex-direction: column;
	justify-items: center;
	align-items: center;
	width: 200px;
	height: auto;
	padding: 20px;
	& > legend {
		padding: 30px;
		font-size: 22px;
	}
`;

export const SingleGameInfo = ({ element }: SingleGameProps) => {
	const { data: teams } = useGetTeamsQuery();
	const [winner, setWinner] = useState<string>("");

	const team1Name = teams?.find((team) => team.id === element.teamId1);
	const team2Name = teams?.find((team) => team.id === element.teamId2);

	useEffect(() => {
		setWinner(GET_WINNER(element));
	}, [element]);

	return (
		<StyledList>
			<p>
				<strong>{team1Name?.name}</strong> vs <strong>{team2Name?.name}</strong>
			</p>
			<p>
				Result:{" "}
				<strong>
					{element.numberOfGoals_team1} : {element.numberOfGoals_team2}
				</strong>
			</p>
			<p>
				Winner:{" "}
				{winner === "Remis" ? (
					<strong>REMIS</strong>
				) : (
					<strong>
						{teams
							?.filter((team) => team.id === winner)
							.map((team) => team.name)}
					</strong>
				)}
			</p>
			<p>
				Game date: <strong>{element.date}</strong>
			</p>
			<p>
				Game title: <strong>{element.title}</strong>
			</p>
			<p>
				Game duration: <strong>{element.duration}</strong>
			</p>
			<p>
				Game location:
				<strong>{element.location}</strong>
			</p>
		</StyledList>
	);
};
