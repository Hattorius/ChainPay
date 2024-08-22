const encode = (input: string) => {
	const uint8Array = new TextEncoder().encode(input);
	let base64String = btoa(String.fromCharCode(...uint8Array));

	let urlSafeBase64 = base64String.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
	return urlSafeBase64;
};

const decode = (input: string) => {
	input = input.replace(/-/g, '+').replace(/_/g, '/');
	while (input.length % 4 !== 0) {
		input += '=';
	}

	let binaryString = atob(input);
	let uint8Array = Uint8Array.from(binaryString, (c) => c.charCodeAt(0));
	return new TextDecoder().decode(uint8Array);
};

export default {
	encode,
	decode
};
