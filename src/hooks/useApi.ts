import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL;

export const useApi = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	const CALL = async <R>(url: string, method: "GET" | "DELETE") => {
		setLoading(true);
		try {
			const response = await fetch(`${API_BASE}${url}`, { method });
			if (response.ok) {
				const data: R = await response.json();
				return data;
			} else {
				const apiError: string = await response.text();
				setError(apiError);
				alert(error);
				throw new Error();
			}
		} catch (e) {
			alert(e);
			throw new Error();
		} finally {
			setLoading(false);
		}
	};

	const API_GET = async <R>(url: string) => {
		return await CALL<R>(url, "GET");
	};

	const API_DELETE = async <R>(url: string) => {
		return await CALL<R>(url, "DELETE");
	};

	return {
		API_GET,
		API_DELETE,
		loading,
		error,
	};
};
