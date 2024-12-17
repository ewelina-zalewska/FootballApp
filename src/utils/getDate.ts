export const getDate = () => {
	const year1900 = "1900-01-01";
	const date = new Date();
	const yearBefore = `${date.getFullYear() - 1}-${date.getMonth() + 1}-${date.getDate()}`;
	const now = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
	return { now, year1900, yearBefore };
};
