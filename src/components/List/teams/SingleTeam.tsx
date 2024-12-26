import { useEffect, useState } from "react";
import { Team } from "@/types";
import { useTeamsDeleteMutation } from "@/hooks/react-query/teams/useTeamsDeleteMutation";
import { EditTeams } from "./EditTeams";
import { DeleteTeamConfirmation } from "@/components/List/teams/DeleteTeamConfirmation";
import { TeamListTeamMembers } from "./TeamListTeamMembers";

type SingleTeamProps = {
	element: Team;
};

export const SingleTeam = ({ element }: SingleTeamProps) => {
	const [mode, setMode] = useState<"edit" | "delete" | "none">("none");
	const { isPending, error } = useTeamsDeleteMutation();

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
				<p>{element.yearOfFoundation}</p>
				<p>{element.location}</p>
				<button disabled={isPending} onClick={toggleEditMode}>
					{mode === "edit" ? "CANCEL" : "EDIT"}
				</button>
				<button disabled={isPending} onClick={toggleDeleteMode}>
					{mode === "delete" ? "CANCEL" : "DELETE"}
				</button>
			</li>
			{mode === "edit" && <EditTeams team={element} />}
			{mode === "delete" && (
				<DeleteTeamConfirmation onCancel={toggleDeleteMode} team={element} />
			)}
			<TeamListTeamMembers teamId={element.id} teamName={element.name} />
			{error && <p>{error.message}</p>}
		</>
	);
};
