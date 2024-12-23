import { ChangeEvent, useState } from "react";
import { TeamMember } from "@/types";

export const usePlayerSelect = (players: TeamMember[]) => {
	const [selectedPlayerId, setSelectedPlayerId] = useState<string>("");
	const [addedPlayers, setAddedPlayers] = useState<TeamMember[]>([]);

	const SELECT_PLAYER_ID = (e: ChangeEvent<HTMLSelectElement>) => {
		setSelectedPlayerId(e.target.value);
	};

	const ADD_PLAYER = () => {
		if (!selectedPlayerId) return;

		const playerToAdd = players?.find(
			(player) => player.id === selectedPlayerId,
		);
		if (
			playerToAdd &&
			!addedPlayers.some((player) => player.id === playerToAdd.id)
		) {
			setAddedPlayers((prevPlayers) => [...prevPlayers, playerToAdd]);
		}
	};

	return {
		selectedPlayerId,
		setSelectedPlayerId,
		addedPlayers,
		setAddedPlayers,
		SELECT_PLAYER_ID,
		ADD_PLAYER,
	};
};
