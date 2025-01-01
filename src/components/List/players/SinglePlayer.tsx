import { TeamMember } from "@/types";
import { usePlayersDeleteMutation } from "@/hooks/react-query/players/usePlayersDeleteMutation";
import { EditPlayers } from "@/components/List/players/EditPlayers";
import { useEffect, useState } from "react";
import { DeletePlayerConfirmation } from "@/components/List/players/DeletePlayerConfirmation";
import { TheButton } from "@/components/Shared/TheButton";
import styled from "styled-components";

type SinglePlayerProps = {
	element: TeamMember;
};

const StyledItem = styled.li`
	display: flex;
	justify-content: space-between;
	width: inherit;
	border-bottom: 2px solid #04040e;
	margin-bottom: 25px;
	& > p {
		width: 80%;
	}
	& > div {
		min-width: 100px;
		flex-wrap: nowrap;
	}
`;

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
			<StyledItem>
				<p>
					{element.name} {element.lastname} –{" "}
					{!element.team ? "No team" : `${element.team}`}
				</p>
				<div>
					<TheButton
						btnLabel={mode === "edit" ? "CANCEL" : "EDIT"}
						disabled={isPending}
						onClick={toggleEditMode}
					/>

					<TheButton
						btnLabel={mode === "delete" ? "CANCEL" : "DELETE"}
						disabled={isPending}
						onClick={toggleDeleteMode}
					/>
				</div>
			</StyledItem>
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
