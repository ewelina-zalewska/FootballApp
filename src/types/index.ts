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
	legend: string;
	onChange: (e: FormChangeEvent) => void;
	onClick: () => Promise<void>;
	data: Team[];
};

//errors
export type FieldErrorsProps = {
	errors: string[];
};
export type TeamFormErrors = {
	[key in keyof TeamFormValue]: string[];
};

export type GameFormErrors = {
	[key in keyof GameDto]: string[];
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
};

export type PlayerDto = {
	name: string;
	lastname: string;
	team: string;
	teamId: string;
};

export type Player = {
	id: string;
	name: string;
	lastname: string;
	team: string;
};

export type TeamMember = Player & {
	teamId: string;
};

export type TeamMembers = Player & {
	players: TeamMember[];
};

export type TeamMembersProps = {
	teamId: string;
	teamName: string;
};

export type TeamFormPlayersFieldsetProps = {
	HANDLE_SUBMIT: (e: FormEvent) => void;
	availablePlayers: TeamMember[];
	showAvailablePlayers: boolean;
	TOGGLE_SHOW_AVAILABLE_PLAYERS: () => void;
	SET_AVAILABLE_PLAYER: () => void;
	selectedPlayerId: string;
	SELECT_PLAYER_ID: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	formState: PlayerFormValue;
	success: boolean;
	isLoading: boolean;
	error: Error | null;
};
export type PlayerFormFieldsetProps = {
	HANDLE_CHANGE: (e: FormChangeEvent) => void;
	HANDLE_SUBMIT: (e: FormEvent) => void;
	errors: PlayerFormErrors;
	success: boolean;
	formState: PlayerFormValue;
	fieldName: string;
};

//Games
export type GameFormValue = {
	date: string;
	title: string;
	location: string;
	duration: number;
	teamId1: string;
	numberOfGoals_team1: number;
	teamId2: string;
	numberOfGoals_team2: number;
};

export type GameDto = {
	date: string;
	title: string;
	location: string;
	duration: number;
	teamId1: string;
	numberOfGoals_team1: number;
	teamId2: string;
	numberOfGoals_team2: number;
};

export type Game = {
	id: string;
	date: string;
	title: string;
	location: string;
	duration: number;
	teamId1: string;
	numberOfGoals_team1: number;
	teamId2: string;
	numberOfGoals_team2: number;
};

export type GameFormFieldsetProps = {
	HANDLE_CHANGE: (e: FormChangeEvent) => void;
	HANDLE_SUBMIT: (e: FormEvent) => void;
	errors: GameFormErrors;
	success: boolean;
	formState: GameFormValue;
	winner?: string;
	fieldName: string;
};

export type SingleGameProps = {
	element: Game;
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
	fieldName: string;
};
