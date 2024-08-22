import { TransactionType } from "./types";
import utils from "./utils";

export interface PayInput {
	transaction: string | TransactionType;
	token: `0x${string}`; // token user wants to pay with
	amount: bigint; // amount user wants to pay with
    chainpayAddress: `0x${string}`;
}

const WRAPPED_BNB = '0xbb4cdb9cbd36b01bd1cbaebf2de08d9173bc095c';

const pay = async ({ transaction, token, amount, chainpayAddress }: PayInput) => {
    if (typeof transaction === 'string') {
		transaction = utils.decodeTransaction(transaction);
	}

    let data: {
        value?: bigint,
        args: any
    };

    if (transaction.token === WRAPPED_BNB && token === WRAPPED_BNB) {
        // invoice in BNB, pays in BNB
        // pay(address recipient, bytes memory signature, bytes memory data) payable
        data = {
            value: BigInt(transaction.amount),
            args: [transaction.recipient, transaction.signature, transaction.data]
        };
    } else if (transaction.token === token) {
        // invoice in token, pays in same token
        //  pay(address recipient, address token, uint256 amount, bytes memory signature, bytes memory data)
        data = {
            args: [
                transaction.recipient,
                transaction.token,
                transaction.amount,
                transaction.signature,
                transaction.data
            ]
        }
    } else if (transaction.token !== WRAPPED_BNB && token === WRAPPED_BNB) {
        // invoice in token, pays in BNB
        // pay(address recipient, address token, uint256 amount, uint24 fee, bytes memory signature, bytes memory data) payable

    } else {
        // invoice in token or BNB, pays in other token
        // pay(address recipient, address expectedToken, uint256 expectedTokenAmount, address payingToken, uint256 payingTokenAmount, uint24 fee, bytes memory signature, bytes memory data)
    }
}