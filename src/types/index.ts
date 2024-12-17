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

// Forms annd Lists
export type FormChangeEvent = ChangeEvent<HTMLInputElement | HTMLSelectElement>;

//Players
export type PlayerFormValue = {
	name: string;
	lastname: string;
	belongToTeam: string;
	team: string;
};

export type PlayerDto = {
	name: string;
	lastname: string;
	belongToTeam: string;
	team: string;
};

export type Player = {
	id: string;
	name: string;
	lastname: string;
	belongToTeam: string;
	team: string;
};

export type PlayerFormProps = {
	onNewPlayer: (player: Player) => void;
};

export type PlayerFormFieldsetProps = {
	HANDLE_CHANGE: (e: FormChangeEvent) => void;
	HANDLE_SUBMIT: (e: FormEvent) => void;
	errors: PlayerFormErrors;
	success: boolean;
	formState: PlayerFormValue;
};

//Games
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

export type GameDto = {
	date: string;
	title: string;
	location: string;
	duration: number;
	team1: string;
	numberOfGoals_team1: number;
	team2: string;
	numberOfGoals_team2: number;
};

export type Game = {
	id: string;
	date: string;
	title: string;
	location: string;
	duration: number;
	team1: string;
	numberOfGoals_team1: number;
	team2: string;
	numberOfGoals_team2: number;
};

export type GameFormProps = {
	onNewGame: (game: Game) => void;
};
export type GameFormFieldsetProps = {
	HANDLE_CHANGE: (e: FormChangeEvent) => void;
	HANDLE_SUBMIT: (e: FormEvent) => void;
	errors: GameFormErrors;
	success: boolean;
	formState: GameFormValue;
	winner: string;
};

//Teams
export type TeamFormValue = {
	name: string;
	yearOfFoundation: string;
	location: string;
};

export type TeamDto = {
	name: string;
	yearOfFoundation: string;
	location: string;
};

export type Team = {
	id: string;
	name: string;
	yearOfFoundation: string;
	location: string;
};

export type TeamFormProps = {
	onNewTeam: (team: Team) => void;
};

export type TeamFormFieldsetProps = {
	HANDLE_CHANGE: (e: FormChangeEvent) => void;
	HANDLE_SUBMIT: (e: FormEvent) => void;
	errors: TeamFormErrors;
	success: boolean;
	formState: TeamFormValue;
};
