import { useEffect, useState } from "react";
import { useTeamsList } from "@/hooks/teams/useTeamsList";

export const usePlayersFormAvailableTeams = () => {
	const [availableTeams, setAvailableTeams] = useState<string[]>([]);
	const { data } = useTeamsList();

	useEffect(() => {
		const teamName: string[] = [];
		if (!data) return;
		data.map((name) => teamName.push(name.name));
		setAvailableTeams([...teamName]);
	}, [data]);

	return availableTeams;
};
