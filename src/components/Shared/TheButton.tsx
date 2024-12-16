import { forwardRef, ForwardedRef, MouseEventHandler } from "react";

type buttonProps = {
	type: "submit" | "reset" | "button";
	btnName: string;
	onClick: MouseEventHandler<HTMLButtonElement>;
};

export const TheButton = forwardRef(
	(
		{ type, btnName, onClick }: buttonProps,
		ref: ForwardedRef<HTMLButtonElement>,
	) => {
		return (
			<button ref={ref} type={type} onClick={onClick}>
				{btnName}
			</button>
		);
	},
);
