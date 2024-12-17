import { useState } from "react";
import { FormChangeEvent } from "@/types";

type UseFormReturn<T> = [
	T,
	React.Dispatch<React.SetStateAction<T>>,
	(e: FormChangeEvent) => void,
];

export const useForm = <T>(initialValue: T): UseFormReturn<T> => {
	const [formState, setFormState] = useState<T>(initialValue);

	const getValue = (target: FormChangeEvent["target"]) => {
		if (target.type === "number") return Number(target.value);
		return target.value;
	};

	const HANDLE_CHANGE = (e: FormChangeEvent) => {
		setFormState((prevFormState) => ({
			...prevFormState,
			[e.target.name]: getValue(e.target),
		}));
	};

	return [formState, setFormState, HANDLE_CHANGE];
};
