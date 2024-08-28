const extractError = (error: string) => {
	const [first, ...rest] = error.split(':');
	const second = rest.join(':');
	return second.split(/\r?\n/)[0];
};

export default extractError;
