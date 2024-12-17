import { useState } from "react";

const API_BASE = import.meta.env.VITE_API_URL;

export const useApi = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	const CALL = async <R, P = void>(
		url: string,
		method: "GET" | "DELETE" | "POST",
		body?: P,
	) => {
		setLoading(true);

		const commonData = {
			method,
			headers: {
				"Content-type": "application/json",
			},
		};

		const reqData = body
			? {
					...commonData,
					body: JSON.stringify(body),
				}
			: commonData;

		try {
			const response = await fetch(`${API_BASE}${url}`, reqData);
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

	const API_POST = async <R, P>(url: string, data: P) => {
		return await CALL<R, P>(url, "POST", data);
	};

	const API_DELETE = async <R>(url: string) => {
		return await CALL<R>(url, "DELETE");
	};

	return {
		API_GET,
		API_POST,
		API_DELETE,
		loading,
		error,
	};
};
