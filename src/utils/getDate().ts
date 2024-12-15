export const getDate = () => {
	const year1900 = "1900-01-01";
	const date = new Date();
	const now = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
	return { now, year1900 };
};
