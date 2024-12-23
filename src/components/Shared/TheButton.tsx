import { forwardRef, ForwardedRef, MouseEventHandler } from "react";

type buttonProps = {
	type: "submit" | "reset" | "button";
	btnLabel: string;
	onClick: MouseEventHandler<HTMLButtonElement>;
};

export const TheButton = forwardRef(
	(
		{ type, btnLabel, onClick }: buttonProps,
		ref: ForwardedRef<HTMLButtonElement>,
	) => {
		return (
			<button ref={ref} type={type} onClick={onClick}>
				{btnLabel}
			</button>
		);
	},
);
