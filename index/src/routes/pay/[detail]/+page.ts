import chainpay from 'chainpay';
import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';

export const load: PageLoad = ({ url, params }) => {
	const embed = url.searchParams.get('embed') !== null ? true : false;

	try {
		return {
			transactionDetails: chainpay.utils.decodeTransaction(params.detail),
			success: true,
			embed
		};
	} catch (e) {
		if (embed) {
			return error(404, 'Transaction not found');
		}

		return {
			success: false
		};
	}
};
