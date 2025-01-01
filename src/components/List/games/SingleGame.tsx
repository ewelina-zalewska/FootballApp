import { useEffect, useState } from "react";
import { SingleGameProps } from "@/types";
import { EditGames } from "@/components/List/games/EditGames";
import { SingleGameInfo } from "@/components/Forms/games/SingleGameInfo";
import { TheButton } from "@/components/Shared/TheButton";

export const SingleGame = ({ element }: SingleGameProps) => {
	const [mode, setMode] = useState<"edit" | "none">("none");

	const toggleEditMode = () =>
		setMode((prevMode) => (prevMode === "edit" ? "none" : "edit"));

	useEffect(() => {
		setMode("none");
	}, [element]);

	return (
		<div>
			<SingleGameInfo element={element} />
			<TheButton
				btnLabel={mode === "edit" ? "CANCEL" : "EDIT"}
				onClick={toggleEditMode}
			/>
			{mode === "edit" && <EditGames game={element} />}
		</div>
	);
};
