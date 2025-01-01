import { useRef } from "react";
import { TeamFormPlayersFieldsetProps, TeamMember } from "@/types";
import { TheButton } from "@/components/Shared/TheButton";
import styled from "styled-components";

const StyledBox = styled.div`
	width: 70%;
`;

const StyledSelect = styled.select`
	padding: 5px;
	background-color: ${(props) => props.theme.colors.primary};
	color: ${(props) => props.theme.colors.secondary};
`;

export const TeamFormPlayersFieldset = ({
	HANDLE_SUBMIT,
	availablePlayers,
	showAvailablePlayers,
	TOGGLE_SHOW_AVAILABLE_PLAYERS,
	SET_AVAILABLE_PLAYER,
	selectedPlayerId,
	SELECT_PLAYER_ID,
	formState,
	success,
	isLoading,
	error,
}: TeamFormPlayersFieldsetProps) => {
	const formRef = useRef<HTMLFormElement>(null);
	const buttonRef = useRef<HTMLButtonElement>(null);

	const SEND_FORM = () => formRef.current?.requestSubmit();

	if (isLoading) return <p>Loading...</p>;
	if (error) return <p>Something went wrong</p>;
	return (
		<StyledBox>
			<TheButton
				btnLabel={!showAvailablePlayers ? "ADD PLAYER TO THE TEAM" : "CLOSE"}
				onClick={TOGGLE_SHOW_AVAILABLE_PLAYERS}
			/>
			{showAvailablePlayers && (
				<form ref={formRef} onSubmit={HANDLE_SUBMIT}>
					{success && (
						<p>
							{formState.name} {formState.lastname} has been added.
						</p>
					)}
					<label htmlFor="teamPlayers">Select a player: </label>
					<StyledSelect
						onClick={SET_AVAILABLE_PLAYER}
						name="teamPlayers"
						id="teamPlayers"
						value={selectedPlayerId}
						onChange={SELECT_PLAYER_ID}
					>
						<option value="" disabled>
							Select a player
						</option>
						{availablePlayers
							?.filter((player: TeamMember) => !player.teamId)
							.map((player: TeamMember) => (
								<option key={player.id} value={player.id}>
									{player.name} {player.lastname}
								</option>
							))}
					</StyledSelect>
					<TheButton
						type="submit"
						btnLabel="ADD PLAYER"
						ref={buttonRef}
						onClick={SEND_FORM}
					/>
				</form>
			)}
		</StyledBox>
	);
};
