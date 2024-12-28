import { ChangeEvent, useState } from "react";
import { useGetGamesQuery } from "@/hooks/react-query/games/useGetGamesQuery";
import { Game } from "@/types";

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
				date = `In ${gameDate.getFullYear()}– week number ${findWeek(gameDate)}`;
			} else if (period === "month") {
				date = `${gameDate.getFullYear()}–${("0" + (gameDate.getMonth() + 1)).slice(-2)}`;
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
		<div>
			<fieldset>
				<legend>Select a period</legend>
				<select value={periodOfTime} onChange={handleChange}>
					<option value="day">Day</option>
					<option value="week">Week</option>
					<option value="month">Month</option>
				</select>
			</fieldset>
			<div>
				<h2>
					Number of games per
					<strong> {periodOfTime}</strong>
				</h2>
				<ul>
					{numberOfGames.map((game) => (
						<li key={game.date}>
							<p>{game.date}</p>
							<p>{game.count}</p>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};
