import { useRef } from "react";
import { PlayerFormFieldsetProps } from "@/types";
import { useFocus } from "@/hooks/forms/useFocus";
import { TheField } from "@/components/Shared/TheField";
import { TheButton } from "@/components/Shared/TheButton";
import { StyledForm } from "@/assets/style/StyledForm";

export const PlayerFormFieldset = ({
	HANDLE_CHANGE,
	HANDLE_SUBMIT,
	errors,
	success,
	formState,
	fieldName,
}: PlayerFormFieldsetProps) => {
	const firstRef = useFocus<HTMLInputElement>();
	const buttonRef = useRef<HTMLButtonElement>(null);
	const formRef = useRef<HTMLFormElement>(null);

	const { name, lastname } = formState;

	const SEND_FORM = () => formRef.current?.requestSubmit();

	const nameLabel =
		fieldName === "edit" ? "Change first name" : "Add first name";
	const lastnameLabel =
		fieldName === "edit" ? "Change last name" : "Add last name";

	const btnLabel = fieldName === "edit" ? "CHANGE" : "ADD PLAYER";

	return (
		<form ref={formRef} onSubmit={HANDLE_SUBMIT}>
			<StyledForm>
				<legend>{btnLabel}</legend>
				{success && (
					<p>
						The player {fieldName === "edit" && "data"} has been{" "}
						{fieldName === "edit" ? "changed" : "added"} .
					</p>
				)}
				<TheField
					ref={firstRef}
					type="text"
					name="name"
					errors={errors.name}
					value={name}
					label={nameLabel}
					onChange={HANDLE_CHANGE}
				/>
				<TheField
					type="text"
					name="lastname"
					errors={errors.lastname}
					value={lastname}
					label={lastnameLabel}
					onChange={HANDLE_CHANGE}
				/>

				<TheButton
					type="submit"
					btnLabel={btnLabel}
					ref={buttonRef}
					onClick={SEND_FORM}
				/>
			</StyledForm>
		</form>
	);
};
