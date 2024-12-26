const API_BASE = import.meta.env.VITE_API_URL;

export const useApi = () => {
	const CALL = async <R, P = void>(
		url: string,
		method: "GET" | "DELETE" | "POST" | "PUT" | "PATCH",
		payload?: P,
	): Promise<R> => {
		const commonData = {
			method,
			headers: {
				"Content-type": "application/json",
			},
		};

		const reqData = payload
			? {
					...commonData,
					body: JSON.stringify(payload),
				}
			: commonData;

		try {
			const response = await fetch(`${API_BASE}${url}`, reqData);
			if (response.ok) {
				const data: R = await response.json();
				return data;
			} else {
				const apiError: string = await response.text();
				throw new Error(apiError);
			}
		} catch (e) {
			alert(e);
			throw new Error("Failed to fetch api request");
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

	const API_PUT = async <R, P>(url: string, payload: P) => {
		return await CALL<R, P>(url, "PUT", payload);
	};

	const API_PATCH = async <R, P>(url: string, payload: P) => {
		return await CALL<R, P>(url, "PATCH", payload);
	};

	return {
		API_GET,
		API_POST,
		API_DELETE,
		API_PUT,
		API_PATCH,
	};
};
