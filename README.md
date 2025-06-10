# Spectra Token List

## Overview

As Spectra, we use this repository as source of the tokens & platforms for our Web3 app as well as other services. This
list is updated regularly as new tokens are added to the platform.

#### Spectra App: https://app.spectra.finance

## Tokens and Protocols

-   [Spectra Tokens](src/tokens/spectraTokens.json)
-   [Spectra ERC4626 Wrappers](src/tokens/erc4626Wrappers.json)
-   [Protocols](src/protocols/protocolList.json)
-   [Curators](src/curators/curatorList.json)

## How to add a token

Expected structure - `src/tokens/spectraTokens.json`

| chainId | address                                    | symbol | name          | decimals | logoURI                  | extensions                                                  |
| ------- | ------------------------------------------ | ------ | ------------- | -------- | ------------------------ | ----------------------------------------------------------- |
| 1       | 0x6def54ae7e38992a7d1ab60d279483ba7f7b0aeb | KweETH | Wrapped Ether | 18       | /images/tokens/weETH.svg | underlying, ibtRoutes, protocol, faucetAddress, aprEndpoint |

### Steps:

1. Create a new branch from the `main` with the name `chore/token-<token-symbol>-<chain-id>`
2. Add the token to the `src/tokens/spectraTokens.json` file

Example:

```json
[
  ...
  {
    "chainId": 1,
    "address": "0x4104b135dbc9609fc1a9490e61369036497660c8",
    "name": "Spectra",
    "symbol": "APW",
    "decimals": 18,
    "logoURI": "images/tokens/apw.svg"
  }
]
```

3. Add the token logo to the `src/images/tokens` folder (use .png or .svg format)
4. Commit the changes with the message: `chore: add <token-symbol>, chainId: <chain-id>`
5. Create a pull request
6. Once the PR is approved, the token will be added to the list and included in the Spectra platform in the next build.
7. Done

## How to add a protocol

### Expected structure - `src/protocols/protocolList.json`

| ptAddress                                  | chainId | token.symbol | multipliers.amount | multipliers.name |
| ------------------------------------------ | ------- | ------------ | ------------------ | ---------------- |
| 0x6def54ae7e38992a7d1ab60d279483ba7f7b0aeb | 1       | weETH        | 1.5                | Karak XP         |

### Steps:

1. Create a new branch from the `main` with the name `chore/protocol-<protocol-name>-<chain-id>`
2. Add the protocol to the `src/protocols/protocolList.json` file

Example:

```json
[
  ...
  {
    "ptAddress": "0x6def54ae7e38992a7d1ab60d279483ba7f7b0aeb",
    "chainId": 1,
    "multipliers": [
      {
        "amount": 1.5,
        "name": "Karak XP"
      },
      {
        "amount": 3,
        "name": "Ether.fi Points"
      },
      {
        "amount": 1,
        "name": "EigenLayer Points"
      }
    ]
  }
]
```

3. Commit the changes with the message: `chore: add <protocol-name>, chainId: <chain-id>`
4. Create a pull request
5. Once the PR is approved, the protocol will be added to the list and included in the Spectra platform in the next
   build.
6. Done

## How to add a ERC4626 wrapper

### Expected structure - `src/tokens/erc4626Wrappers.json`

| chainId | address                                    | symbol | name          | decimals | logoURI                  | extensions                                          |
| ------- | ------------------------------------------ | ------ | ------------- | -------- | ------------------------ | --------------------------------------------------- |
| 1       | 0x6def54ae7e38992a7d1ab60d279483ba7f7b0aeb | KweETH | Wrapped Ether | 18       | /images/tokens/weETH.svg | underlying, ibtRoutes, protocol, aprEndpoint, vault |

### Steps:

1. Create a new branch from the `main` with the name `chore/wrapper-<token-symbol>-<chain-id>`
2. Add the wrapper to the `src/tokens/erc4626Wrappers.json` file
3. Commit the changes with the message: `chore: add <token-symbol> wrapper, chainId: <chain-id>`
4. Create a pull request
5. Once the PR is approved, the wrapper will be added to the list and included in the Spectra platform in the next
   build.
6. Done
