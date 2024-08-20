import createTransactionCryptoKeyPair, {
	CreateTransactionCryptoKeyPairInput
} from './transacting/createTransactionCryptoKeyPair';
import createTransactionEthersWallet, {
	CreateTransactionEthersWalletInput
} from './transacting/createTransactionEthersWallet';
import { CreateTransactionInputType } from './types';

const isCryptoKeyPairInput = (
	input: CreateTransactionInputType
): input is CreateTransactionCryptoKeyPairInput =>
	(input as CreateTransactionCryptoKeyPairInput).key !== undefined;

const isEthersWalletInput = (
	input: CreateTransactionInputType
): input is CreateTransactionEthersWalletInput =>
	(input as CreateTransactionEthersWalletInput).wallet !== undefined;

const createTransaction = async (data: CreateTransactionInputType) => {
	if (isCryptoKeyPairInput(data)) {
		return await createTransactionCryptoKeyPair(data);
	} else if (isEthersWalletInput(data)) {
		return await createTransactionEthersWallet(data);
	}

	return undefined;
};

export default createTransaction;
