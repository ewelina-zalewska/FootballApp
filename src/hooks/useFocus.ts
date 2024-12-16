import { useRef, useEffect, RefObject } from "react";

export const useFocus = <T extends HTMLElement>(): RefObject<T> => {
	const firstRef = useRef<T>(null);

	useEffect(() => {
		firstRef.current?.focus();
	}, []);

	return firstRef;
};
