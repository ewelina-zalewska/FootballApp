import { useEffect, useState } from "react";
import { SingleGameProps } from "@/types";
import { EditGames } from "@/components/List/games/EditGames";
import { SingleGameInfo } from "@/components/Forms/games/SingleGameInfo";

export const SingleGame = ({ element }: SingleGameProps) => {
	const [mode, setMode] = useState<"edit" | "none">("none");

	const toggleEditMode = () =>
		setMode((prevMode) => (prevMode === "edit" ? "none" : "edit"));

	useEffect(() => {
		setMode("none");
	}, [element]);

	return (
		<>
			<SingleGameInfo element={element} />
			<button onClick={toggleEditMode}>
				{mode === "edit" ? "CANCEL" : "EDIT"}
			</button>

			{mode === "edit" && <EditGames game={element} />}
		</>
	);
};
