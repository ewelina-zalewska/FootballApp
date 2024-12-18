import { useEffect, useState } from "react";
import { TeamMember, TeamMembers, TeamMembersProps } from "@/types";
import { useApi } from "@/hooks/useApi";

export const TeamListTeamMembers = ({ teamId }: TeamMembersProps) => {
	const { API_GET } = useApi();
	const [playersData, setPlayersData] = useState<TeamMember[]>([]);

	const GET_PLAYERS = async () => {
		const playersData = await API_GET<TeamMembers>(
			`teams/${teamId}?_embed=players`,
		);

		if (playersData) setPlayersData(playersData.players);
	};

	useEffect(() => {
		GET_PLAYERS();
	}, []);
	return (
		<ul>
			{playersData.map((playerData) => (
				<li key={playerData.id}>
					{playerData.name} {playerData.lastname}
				</li>
			))}
		</ul>
	);
};
