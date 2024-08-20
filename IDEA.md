# ChainPay idea
ChainPay should be a fully open source, fully on-chain, solution for accepting payments. May it be reccuring payments or one-time payments, it shouldn't be hard to accept payments on the chain.

## Currently
Currently every website that accepts payments either uses a centralized solution offered by a 3rd party, or creates their own payments interface. ChainPay is looking to unify this, and make payment accepting simple.

## Goals
- Create a "product" with 1 on-chain interaction
- Product can be set to reccuring or one-time payments
    - If recurring, the contract keeps track till when they have a subscription
- Payment should be able to get accepted in any currency / token
    - If payment is done in a currency other than what's supported by the recipient, it should automatically get exchanged at a dex (I guess Sushiswap) and *then* sent to the recipient.
- (OPTIONAL) Recipient can set if they want to pay for transaction fees or the user does