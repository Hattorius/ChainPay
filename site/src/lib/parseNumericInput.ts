const parseNumericInput = (input: string, decimals: number) => {
	input = input.replace(/,/g, '.');
	const dotCount = input.split('.').length - 1;

	if (dotCount > 1) {
		return '';
	}

	if (dotCount === 0) {
		const parsed = parseInt(input);
		if (isNaN(parsed)) return '';
		return parsed.toString();
	}

	const endsWithDot = input.charAt(input.length - 1) === '.';
	if (dotCount === 1 && endsWithDot && decimals > 0) {
		const parsed = parseInt(input);
		if (isNaN(parsed)) return '';
		return `${parsed}.`;
	}

	if (dotCount === 1) {
		const [left, right] = input.split('.').map((v) => parseInt(v));
		if (!isNaN(left) && isNaN(right)) {
			return left.toString();
		} else if (isNaN(left)) {
			return '';
		}

		if (right.toString().length > decimals) {
			return `${left}.${right.toString().slice(0, decimals)}`;
		}

		return `${left}.${right}`;
	}

	return '';
};

export default parseNumericInput;
