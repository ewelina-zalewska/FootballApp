export const getDate = () => {
	const year1900 = "1900-01-01";
	const date = new Date();
	const yearBefore = `${date.getFullYear() - 1}-${date.getMonth() + 1}-${date.getDate()}`;
	const now = `${date.getFullYear()}-${("0" + date.getMonth() + 1).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
	return { now, year1900, yearBefore };
};
