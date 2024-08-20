const deriveKeyFromString = async (passphrase: string, salt: string): Promise<CryptoKey> => {
	const encoder = new TextEncoder();
	const keyMaterial = await crypto.subtle.importKey(
		'raw',
		encoder.encode(passphrase),
		{ name: 'PBKDF2' },
		false,
		['deriveKey']
	);

	return await crypto.subtle.deriveKey(
		{
			name: 'PBKDF2',
			salt: encoder.encode(salt),
			iterations: 100000,
			hash: 'SHA-256'
		},
		keyMaterial,
		{ name: 'HMAC', hash: 'SHA-256', length: 256 },
		true,
		['sign', 'verify']
	);
};

export default deriveKeyFromString;
