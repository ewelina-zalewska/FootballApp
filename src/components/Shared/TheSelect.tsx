import { forwardRef, ForwardedRef, useState } from "react";
import { SelectProps, Team } from "@/types";
import { useApi } from "@/hooks/useApi";

import { FieldErrors } from "@/components/Shared/FieldErrors";

export const TheSelect = forwardRef(
	(
		{ name, errors, value, legend, onChange }: SelectProps,
		ref: ForwardedRef<HTMLSelectElement>,
	) => {
		const { API_GET } = useApi();
		const [availableTeams, setAvailableTeams] = useState<Team[]>([]);

		const HANDLE_CLICK = async () => {
			const availableTeams = await API_GET<Team[]>(`teams`);
			setAvailableTeams(availableTeams);
		};

		return (
			<>
				<legend>{legend}</legend>
				<select
					ref={ref}
					name={name}
					value={value}
					onChange={onChange}
					onClick={HANDLE_CLICK}
				>
					{!value && <option value="">Select an option</option>}
					{availableTeams.map((label, i) => (
						<option key={i} value={label.name}>
							{label.name}
						</option>
					))}
				</select>
				{name === "team" && <input name="team" value={value} readOnly />}
				<FieldErrors errors={errors} />
			</>
		);
	},
);
