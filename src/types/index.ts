import { ChangeEvent } from "react";

export type FormChangeEvent = ChangeEvent<HTMLInputElement | HTMLSelectElement>;

export type FieldProps = {
	type: "text" | "radio" | "number";
	name: string;
	errors: string[];
	value: string | number;
	label: string;
	onChange: (e: FormChangeEvent) => void;
};

export type FieldErrorsProps = {
	errors: string[];
};

export type SelectProps = {
	name: string;
	errors: string[];
	value: string;
	labels: string[];
	legend: string;
	onChange: (e: FormChangeEvent) => void;
};
// Forms
export type PlayerFormValue = {
	name: string;
	lastName: string;
	belongToTeam: string;
	team: string;
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

export type TeamFormValue = {
	name: string;
	yearOfFoundation: string;
	location: string;
};
