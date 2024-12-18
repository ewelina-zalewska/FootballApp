import { useEffect, useState } from "react";

export const useSuccess = () => {
	const [success, setSuccess] = useState<boolean>(false);
	useEffect(() => {
		if (!success) return;
		const timeout = setTimeout(() => {
			setSuccess(false);
		}, 3000);
		return () => {
			clearTimeout(timeout);
		};
	}, [success]);

	return { success, setSuccess };
};
