# ChainPay contract

The chain pay contract doesn't actually hold any tokens or coins at any time. It will always empty itself, or at least, there shouldn't be anything left after running the `pay` functions. It practically just directs tokens & coins to the right recipient and swaps tokens if necessary all in 1 transaction.