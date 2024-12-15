import { ChangeEvent, FormEvent } from "react";

//Field
export type FieldProps = {
	type: "text" | "radio" | "date" | "number";
	name: string;
	errors: string[];
	value: string | number;
	label: string;
	onChange: (e: FormChangeEvent) => void;
	minDate?: string;
	maxDate?: string;
};

export type SelectProps = {
	name: string;
	errors: string[];
	value: string;
	labels: string[];
	legend: string;
	onChange: (e: FormChangeEvent) => void;
};

//errors
export type FieldErrorsProps = {
	errors: string[];
};
export type TeamFormErrors = {
	[key in keyof TeamFormValue]: string[];
};

export type GameFormErrors = {
	[key in keyof GameFormValue]: string[];
};

export type PlayerFormErrors = {
	[key in keyof PlayerFormValue]: string[];
};

// Forms
export type FormChangeEvent = ChangeEvent<HTMLInputElement | HTMLSelectElement>;

export type PlayerFormValue = {
	name: string;
	lastName: string;
	belongToTeam: string;
	team: string;
};
export type PlayerFormFieldsetProps = {
	HANDLE_CHANGE: (e: FormChangeEvent) => void;
	HANDLE_SUBMIT: (e: FormEvent) => void;
	errors: PlayerFormErrors;
	success: boolean;
	formState: PlayerFormValue;
};

export type GameFormValue = {
	date: string;
	title: string;
	location: string;
	duration: number;
	team1: string;
	numberOfGoals_team1: number;
	team2: string;
	numberOfGoals_team2: number;
};
export type GameFormFieldsetProps = {
	HANDLE_CHANGE: (e: FormChangeEvent) => void;
	HANDLE_SUBMIT: (e: FormEvent) => void;
	errors: GameFormErrors;
	success: boolean;
	formState: GameFormValue;
	winner: string;
};

export type TeamFormValue = {
	name: string;
	yearOfFoundation: string;
	location: string;
};
export type TeamFormFieldsetProps = {
	HANDLE_CHANGE: (e: FormChangeEvent) => void;
	HANDLE_SUBMIT: (e: FormEvent) => void;
	errors: TeamFormErrors;
	success: boolean;
	formState: TeamFormValue;
};
