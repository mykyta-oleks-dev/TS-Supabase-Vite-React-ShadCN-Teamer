export const validateDateString = (dateStr?: string | null) => {
	if (!dateStr) return false;

	const date = new Date(dateStr);

	if (Number.isNaN(date.getTime())) return false;

	return date;
}
