import { TeamMember } from "@/types";
import { usePlayersDeleteMutation } from "@/hooks/react-query/players/usePlayersDeleteMutation";
import { EditPlayers } from "@/components/List/players/EditPlayers";
import { useEffect, useState } from "react";
import { DeletePlayerConfirmation } from "@/components/List/players/DeletePlayerConfirmation";

type SinglePlayerProps = {
	element: TeamMember;
};

export const SinglePlayer = ({ element }: SinglePlayerProps) => {
	const [mode, setMode] = useState<"edit" | "delete" | "none">("none");
	const { isPending, error } = usePlayersDeleteMutation();

	const toggleEditMode = () =>
		setMode((prevMode) => (prevMode === "edit" ? "none" : "edit"));
	const toggleDeleteMode = () =>
		setMode((prevMode) => (prevMode === "delete" ? "none" : "delete"));

	useEffect(() => {
		setMode("none");
	}, [element]);

	return (
		<>
			<li>
				<p>{element.name}</p>
				<p> {element.lastname}</p>
				<p>{element.team}</p>

				<button disabled={isPending} onClick={toggleEditMode}>
					{mode === "edit" ? "CANCEL" : "EDIT"}
				</button>
				<button disabled={isPending} onClick={toggleDeleteMode}>
					{mode === "delete" ? "CANCEL" : "DELETE"}
				</button>
			</li>
			{mode === "edit" && <EditPlayers player={element} />}
			{mode === "delete" && (
				<DeletePlayerConfirmation
					onCancel={toggleDeleteMode}
					player={element}
				/>
			)}
			{error && <p>{error.message}</p>}
		</>
	);
};
