import { FormEvent, useEffect, useState } from "react";
import { PlayerFormValue, PlayerFormErrors } from "@/types";
import { useForm } from "@/hooks/useForm";
import { validatePlayer as VALIDATE_PLAYER } from "@/utils/validatePlayer";
import { PlayerFormFieldset } from "@/components/Forms/PlayerFormFieldset";

export const PlayerForm = () => {
	const [submitClicked, setSubmitClicked] = useState<boolean>(false);
	const [success, setSuccess] = useState<boolean>(false);
	const [formState, HANDLE_CHANGE] = useForm<PlayerFormValue>({
		name: "",
		lastName: "",
		belongToTeam: "",
		team: "",
	});

	const [errors, setErrors] = useState<PlayerFormErrors>({
		name: [],
		lastName: [],
		belongToTeam: [],
		team: [],
	});

	useEffect(() => {
		if (submitClicked) {
			const { newErrors } = VALIDATE_PLAYER(formState);
			setErrors(newErrors);
		}
	}, [formState, submitClicked]);

	const HANDLE_SUBMIT = (e: FormEvent) => {
		e.preventDefault();
		const { newErrors, isSuccess } = VALIDATE_PLAYER(formState);
		setErrors(newErrors);
		setSuccess(isSuccess);

		if (!success) {
			setSubmitClicked(true);
		} else {
			setSubmitClicked(false);
			console.log("Form is being sent!");
		}
	};

	return (
		<PlayerFormFieldset
			HANDLE_CHANGE={HANDLE_CHANGE}
			HANDLE_SUBMIT={HANDLE_SUBMIT}
			errors={errors}
			success={success}
			formState={formState}
		/>
	);
};
