import { NoDataGiven } from './errors';
import utils from './utils';

const createTransactionRaw = ({
	recipient,
	token,
	amount,
	data_string,
	data_raw
}: {
	recipient: string;
	token: string;
	amount: number | bigint;
	data_string?: string;
	data_raw?: Uint8Array | string;
}) => {
	if (!data_raw) {
		if (data_string) {
			data_raw = data_string;
		} else {
			throw new NoDataGiven();
		}
	}

	const { data, messageHash } = utils.dataToHash(recipient, token, amount, data_raw);
	return {
		data,
		messageHash
	};
};

export default createTransactionRaw;
