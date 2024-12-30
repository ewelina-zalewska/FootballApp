import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "@/assets/style/GlobalStyle";
import { useDarkMode } from "@/hooks/useDarkMode";
import { useChangeSection } from "@/hooks/useChangeSection";
import { StyledWrapper } from "@/assets/style/StyledWrapper";
import { StyledSection } from "@/assets/style/StyledSection";
import { NaviButton } from "@/components/Navigation/NaviButton";
import { TeamsList } from "@/components/List/teams/TeamsList";
import { GamesList } from "@/components/List/games/GamesList";
import { PlayersList } from "@/components/List/players/PlayersList";
import { TheStats } from "@/components/Statistics/TheStats";
import { TheButton } from "@/components/Shared/TheButton";

export const FootballApp = () => {
	const { dark, lightTheme, darkTheme, TOGGLE_DARK_MODE } = useDarkMode();
	const {
		players,
		teams,
		games,
		SHOW_PLAYERS,
		statistics,
		SHOW_TEAMS,
		SHOW_GAMES,
		SHOW_STATISTICS,
	} = useChangeSection();

	return (
		<ThemeProvider theme={dark ? darkTheme : lightTheme}>
			<GlobalStyle />
			<StyledWrapper>
				<header>
					<p>Football App</p>
					<TheButton
						btnLabel={dark ? "LIGHT" : "DARK"}
						onClick={TOGGLE_DARK_MODE}
					/>
				</header>
				<nav>
					<NaviButton btnLabel="players" onClick={SHOW_PLAYERS} />
					<NaviButton btnLabel="teams" onClick={SHOW_TEAMS} />
					<NaviButton btnLabel="games" onClick={SHOW_GAMES} />
					<NaviButton btnLabel="statistics" onClick={SHOW_STATISTICS} />
				</nav>
				<StyledSection>
					{players && <PlayersList />}
					{teams && <TeamsList />}
					{games && <GamesList />}
					{statistics && <TheStats />}
				</StyledSection>
			</StyledWrapper>
		</ThemeProvider>
	);
};
