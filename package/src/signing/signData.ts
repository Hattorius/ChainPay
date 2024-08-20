import { datafy } from '../data';

const signData = async (key: CryptoKey, data: string | {} | any): Promise<ArrayBuffer> => {
	const encoder = new TextEncoder();
	const encodedData = encoder.encode(datafy(data));

	return await crypto.subtle.sign(
		{
			name: 'RSASSA-PKCS1-v1_5'
		},
		key,
		encodedData
	);
};

export default signData;
