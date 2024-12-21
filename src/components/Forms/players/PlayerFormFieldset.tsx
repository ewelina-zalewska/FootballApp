import { useRef } from "react";
import { PlayerFormFieldsetProps } from "@/types";
import { useFocus } from "@/hooks/forms/useFocus";
import { TheField } from "@/components/Shared/TheField";
import { TheButton } from "@/components/Shared/TheButton";

export const PlayerFormFieldset = ({
	HANDLE_CHANGE,
	HANDLE_SUBMIT,
	errors,
	success,
	formState,
}: PlayerFormFieldsetProps) => {
	const firstRef = useFocus<HTMLInputElement>();
	const buttonRef = useRef<HTMLButtonElement>(null);
	const formRef = useRef<HTMLFormElement>(null);

	const { name, lastname } = formState;

	const SEND_FORM = () => formRef.current?.requestSubmit();

	return (
		<form ref={formRef} onSubmit={HANDLE_SUBMIT}>
			<TheField
				ref={firstRef}
				type="text"
				name="name"
				errors={errors.name}
				value={name}
				label="Add first name"
				onChange={HANDLE_CHANGE}
			/>
			<TheField
				type="text"
				name="lastname"
				errors={errors.lastname}
				value={lastname}
				label="Add last name"
				onChange={HANDLE_CHANGE}
			/>

			<TheButton
				type="submit"
				btnName="add player"
				ref={buttonRef}
				onClick={SEND_FORM}
			/>
			<div>{success && <p>The player has been added.</p>}</div>
		</form>
	);
};
