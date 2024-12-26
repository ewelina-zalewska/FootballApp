import { FormEvent, useState } from "react";
import { PlayerFormValue, TeamMember, TeamMembersProps } from "@/types";
import { useGetPlayersQuery } from "@/hooks/react-query/players/useGetPlayersQuery";
import { useForm } from "@/hooks/forms/useForm";
import { useSuccess } from "@/hooks/forms/useSuccess";
import { useUpdatePlayerMutation } from "@/hooks/react-query/players/useUpdatePlayerMutation";
import { usePlayerSelect } from "@/hooks/players/usePlayerSelect";
import { TeamFormPlayersFieldset } from "@/components/Forms/teams/TeamFormPlayersFieldset";

export const TeamFormPlayers = ({ teamId, teamName }: TeamMembersProps) => {
	const { data: players, isLoading, error } = useGetPlayersQuery();
	const [availablePlayers, setAvailablePlayers] = useState<TeamMember[]>([]);
	const { selectedPlayerId, SELECT_PLAYER_ID } = usePlayerSelect(
		availablePlayers || [],
	);
	const { mutate: UPDATE_TEAM_LIST_PLAYER } =
		useUpdatePlayerMutation(selectedPlayerId);

	const [formState, setFormState] = useForm<PlayerFormValue>({
		name: "",
		lastname: "",
	});
	const [showAvailablePlayers, setShowAvailablePlayers] =
		useState<boolean>(false);
	const { success, setSuccess } = useSuccess();

	const HANDLE_SUBMIT = (e: FormEvent) => {
		e.preventDefault();
		if (selectedPlayerId) {
			UPDATE_TEAM_LIST_PLAYER({
				name: formState.name,
				lastname: formState.lastname,
				team: teamName,
				teamId,
			});
			setSuccess(true);
		}
	};

	const SET_AVAILABLE_PLAYER = () => {
		setAvailablePlayers(players || []);
		availablePlayers
			?.filter((player) => player.id === selectedPlayerId)
			.map((player) =>
				setFormState({
					name: player.name,
					lastname: player.lastname,
				}),
			);
	};

	const TOGGLE_SHOW_AVAILABLE_PLAYERS = () =>
		setShowAvailablePlayers(!showAvailablePlayers);

	return (
		<>
			<TeamFormPlayersFieldset
				HANDLE_SUBMIT={HANDLE_SUBMIT}
				availablePlayers={availablePlayers}
				showAvailablePlayers={showAvailablePlayers}
				TOGGLE_SHOW_AVAILABLE_PLAYERS={TOGGLE_SHOW_AVAILABLE_PLAYERS}
				SET_AVAILABLE_PLAYER={SET_AVAILABLE_PLAYER}
				selectedPlayerId={selectedPlayerId}
				SELECT_PLAYER_ID={SELECT_PLAYER_ID}
				formState={formState}
				success={success}
				isLoading={isLoading}
				error={error}
			/>
		</>
	);
};
