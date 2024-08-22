import chainpay from 'chainpay';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	try {
		return {
			transactionDetails: chainpay.utils.decodeTransaction(params.detail),
			success: true
		};
	} catch (e) {
		return {
			success: false
		};
	}
};
