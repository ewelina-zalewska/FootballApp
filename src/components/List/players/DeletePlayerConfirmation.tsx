import { usePlayersDeleteMutation } from "@/hooks/react-query/players/usePlayersDeleteMutation";
import { TeamMember } from "@/types";

type DeletePlayerConfirmationProps = {
	onCancel: () => void;
	player: TeamMember;
};

export const DeletePlayerConfirmation = ({
	player,
	onCancel,
}: DeletePlayerConfirmationProps) => {
	const { mutate, isPending } = usePlayersDeleteMutation();

	const HANDLE_DELETE = () => {
		mutate(player.id);
	};
	if (isPending) return <p>Loading...</p>;
	return (
		<div>
			<p>
				Do you really want to delete player{" "}
				<strong>
					{player.name} {player.lastname}?
				</strong>
			</p>
			<button onClick={HANDLE_DELETE}>Delete</button>
			<button onClick={onCancel}>Cancel</button>
		</div>
	);
};
