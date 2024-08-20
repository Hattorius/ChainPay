export type TransactionType<T> = {
	data: T;
	token: string;
	amount: bigint;
	recipient: string;
	signature: ArrayBuffer;
};
