import { TheButton } from "@/components/Shared/TheButton";
import { usePlayersDeleteMutation } from "@/hooks/react-query/players/usePlayersDeleteMutation";
import { TeamMember } from "@/types";

type DeletePlayerConfirmationProps = {
	onCancel: () => void;
	player: TeamMember;
};

const validatePlayer = (player: TeamMember): boolean => {
	return !!player.teamId;
};

export const DeletePlayerConfirmation = ({
	player,
	onCancel,
}: DeletePlayerConfirmationProps) => {
	const { mutate: DELETE_PLAYER, isPending } = usePlayersDeleteMutation();
	const consentToDeletion = validatePlayer(player);

	const HANDLE_DELETE = () => {
		if (consentToDeletion) return;
		DELETE_PLAYER(player.id);
	};
	if (isPending) return <p>Loading...</p>;
	return (
		<div>
			{consentToDeletion ? (
				<p>You cannot remove a player who is currently in the team.</p>
			) : (
				<p>
					Do you really want to delete player{" "}
					<strong>
						{player.name} {player.lastname}
					</strong>
					?
				</p>
			)}

			<TheButton btnLabel="Delete" onClick={HANDLE_DELETE} />
			<TheButton btnLabel="Cancel" onClick={onCancel} />
		</div>
	);
};
