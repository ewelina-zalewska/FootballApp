import { ChangeEvent, useState } from "react";
import { useGetGamesQuery } from "@/hooks/react-query/games/useGetGamesQuery";
import { Game } from "@/types";
import styled from "styled-components";

const StyledBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	@media (min-width: 768px) {
		width: calc(100% / 3);
	}
`;

const StyledSelect = styled.select`
	border: none;
	padding: 5px;
	background-color: ${(props) => props.theme.colors.bodyColors};
	color: #d1ccc3;
`;

const StyledList = styled.ul`
	list-style: none;
	padding: 0;
	& > li {
		width: 70%;
		margin: 0 auto;
	}
`;

export const NumberOfGames = () => {
	const { data: games, error, isLoading } = useGetGamesQuery();
	const [periodOfTime, setPeriodOfTime] = useState<"day" | "week" | "month">(
		"day",
	);

	const findWeek = (date: Date): number => {
		const gameDate = new Date(date.getTime());
		const Jan01 = new Date(gameDate.getFullYear(), 0, 1);
		const periodBetween =
			gameDate.setHours(0, 0, 0, 0) - Jan01.setHours(0, 0, 0, 0);
		return Math.ceil((periodBetween / 86400000 + 1) / 7);
	};

	const handleData = (games: Game[], period: "day" | "week" | "month") => {
		const dates: { [date: string]: number } = {};

		games.map((game) => {
			const gameDate = new Date(game.date);
			let date = "";

			if (period === "day") {
				date = gameDate.toISOString().split("T")[0];
			} else if (period === "week") {
				date = `${findWeek(gameDate)} week ${gameDate.getFullYear()} `;
			} else if (period === "month") {
				date = `${("0" + (gameDate.getMonth() + 1)).slice(-2)}.${gameDate.getFullYear()}`;
			}

			dates[date] = (dates[date] || 0) + 1;
		});

		const data = Object.keys(dates)
			.map((date) => ({
				date,
				count: dates[date],
			}))
			.sort((a, b) => (a.date > b.date ? 1 : -1));
		return data;
	};
	const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setPeriodOfTime(e.target.value as "day" | "week" | "month");
	};

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>{error.message}</p>;

	const numberOfGames = handleData(games || [], periodOfTime);

	return (
		<StyledBox>
			<h2>NUMBER OF GAMES</h2>
			<legend>Select a period</legend>
			<StyledSelect value={periodOfTime} onChange={handleChange}>
				<option value="day">Day</option>
				<option value="week">Week</option>
				<option value="month">Month</option>
			</StyledSelect>

			<div>
				<h3>
					Number of games per
					<strong> {periodOfTime}</strong>
				</h3>
				<StyledList>
					{numberOfGames.map((game) => (
						<li key={game.date}>
							<p>
								{game.date} – {game.count} {game.count === 1 ? "game" : "games"}
							</p>
						</li>
					))}
				</StyledList>
			</div>
		</StyledBox>
	);
};
