# Spectra Token List

A comprehensive token registry for the Spectra Finance ecosystem, providing standardized metadata for tokens, ERC4626 wrappers and protocolsacross multiple networks.

**App**: https://app.spectra.finance  
**Package**: `@perspectivefi/token-list`

## 📋 Table of Contents

-   [Overview](#overview)
-   [Installation](#installation)
-   [Usage](#usage)
-   [Data Structure](#data-structure)
-   [Contributing](#contributing)
    -   [Adding Tokens](#adding-tokens)
    -   [Adding ERC4626 Wrappers](#adding-erc4626-wrappers)
    -   [Adding Protocols](#adding-protocols)
-   [Schema Validation](#schema-validation)
-   [Supported Networks](#supported-networks)
-   [Development](#development)

## 📖 Overview

This repository maintains curated lists of:

-   **Tokens**: Interest-bearing tokens (IBTs) and yield tokens supported by Spectra
-   **ERC4626 Wrappers**: Standardized vault tokens following the ERC4626 specification
-   **Protocols**: Protocol configurations including yield multipliers and rewards

All data is structured, validated against JSON schemas, and automatically compiled into optimized build files for consumption by the Spectra platform and other applications.

## Installation

```bash
npm install @perspectivefi/token-list
# or
yarn add @perspectivefi/token-list
```

## Usage

```typescript
import {
    spectraTokens,
    erc4626Wrappers,
    protocolList,
    curatorList,
} from "@perspectivefi/token-list"

// Get all tokens
console.log(
    spectraTokens,
)

// Filter tokens by chain ID
const ethereumTokens =
    spectraTokens.filter(
        (token) =>
            token.chainId ===
            1,
    )

// Access protocol configurations
console.log(
    protocolList,
)
```

## Data Structure

### Core Resources

| Resource      | Description                                                             | Build Output                      |
| ------------- | ----------------------------------------------------------------------- | --------------------------------- |
| **Tokens**    | Individual token metadata stored in `/src/tokens/{chainId}/{address}/`  | `src/tokens/build.json`           |
| **Wrappers**  | ERC4626 wrapper metadata stored in `/src/wrappers/{chainId}/{address}/` | `src/wrappers/build.json`         |
| **Protocols** | Protocol configurations and multipliers                                 | `src/protocols/protocolList.json` |

### Token Structure

Each token is stored as an individual directory containing:

```
src/tokens/{chainId}/{address}/
├── index.json    # Token metadata
└── logo.{svg|png} # Token logo
```

## Contributing

We welcome contributions! Please follow the guidelines below for adding new tokens, wrappers, or protocols.

### Adding Tokens

**File Structure**: `src/tokens/{chainId}/{address}/index.json`

#### Required Fields

| Field      | Type   | Description               | Example                                        |
| ---------- | ------ | ------------------------- | ---------------------------------------------- |
| `chainId`  | number | Network chain ID          | `1`                                            |
| `address`  | string | Token contract address    | `"0x4104b135dbc9609fc1a9490e61369036497660c8"` |
| `name`     | string | Human-readable token name | `"Spectra"`                                    |
| `symbol`   | string | Token symbol              | `"APW"`                                        |
| `decimals` | number | Token decimals (1-18)     | `18`                                           |
| `logoURI`  | string | Path to token logo        | `"/images/tokens/1/0x4104...c8.svg"`           |

#### Optional Extensions

| Field           | Type     | Description                                       |
| --------------- | -------- | ------------------------------------------------- |
| `tags`          | string[] | Token categories (`["stable", "liquid-staking"]`) |
| `underlying`    | string   | Underlying asset address                          |
| `protocol`      | string   | Associated protocol name                          |
| `aprEndpoint`   | string   | API endpoint for APR data                         |
| `faucetAddress` | string   | Testnet faucet address                            |
| `ibtRoutes`     | object   | Available IBT operations                          |

#### Steps to Add a Token

1. **Create Branch**

    ```bash
    git checkout -b chore/token-<SYMBOL>-<CHAIN_ID>
    ```

2. **Create Token Directory**

    ```bash
    mkdir -p src/tokens/<CHAIN_ID>/<ADDRESS>
    ```

3. **Add Token Metadata** (`src/tokens/<CHAIN_ID>/<ADDRESS>/index.json`)

    ```json
    {
        "chainId": 1,
        "address": "0x4104b135dbc9609fc1a9490e61369036497660c8",
        "name": "Spectra",
        "symbol": "SPECTRA",
        "decimals": 18,
        "logoURI": "/images/tokens/1/0x4104b135dbc9609fc1a9490e61369036497660c8.svg",
        "extensions": {
            "tags": [
                "stable"
            ]
        }
    }
    ```

4. **Add Token Logo** (`src/tokens/<CHAIN_ID>/<ADDRESS>/logo.{svg|png}`)

    - Preferred format: SVG
    - Alternative: High-quality PNG
    - Recommended size: 64x64px minimum

5. **Commit Changes**

    ```bash
    git add .
    git commit -m "chore: add <SYMBOL>, chainId: <CHAIN_ID>"
    ```

6. **Create Pull Request**
    - Title: `Add <SYMBOL> token (Chain: <CHAIN_ID>)`
    - Include token details and verification links

### Adding ERC4626 Wrappers

**File Structure**: `src/wrappers/{chainId}/{address}/index.json`

ERC4626 wrappers follow the same structure as tokens but with additional vault-specific extensions.

#### Required Extensions for Wrappers

| Field           | Type   | Description                |
| --------------- | ------ | -------------------------- |
| `vault`         | object | Vault contract information |
| `vault.address` | string | Vault contract address     |
| `vault.chainId` | number | Vault chain ID             |
| `vault.name`    | string | Vault name                 |
| `vault.symbol`  | string | Vault symbol               |

#### Steps to Add a Wrapper

1. **Create Branch**

    ```bash
    git checkout -b chore/wrapper-<SYMBOL>-<CHAIN_ID>
    ```

2. **Create Wrapper Directory**

    ```bash
    mkdir -p src/wrappers/<CHAIN_ID>/<ADDRESS>
    ```

3. **Add Wrapper Metadata** (`src/wrappers/<CHAIN_ID>/<ADDRESS>/index.json`)

    ```json
    {
        "chainId": 1,
        "address": "0x6def54ae7e38992a7d1ab60d279483ba7f7b0aeb",
        "name": "Wrapped Ether",
        "symbol": "KweETH",
        "decimals": 18,
        "logoURI": "/images/tokens/1/0x6def54ae7e38992a7d1ab60d279483ba7f7b0aeb.svg",
        "extensions": {
            "underlying": "0xa0b86a33e6c8a6a3f7c5d91c2e4f322b83c2c04e",
            "vault": {
                "chainId": 1,
                "address": "0x6def54ae7e38992a7d1ab60d279483ba7f7b0aeb",
                "name": "Wrapped Ether Vault",
                "symbol": "KweETH",
                "decimals": 18
            },
            "ibtRoutes": {
                "deposit": true,
                "mint": true,
                "withdraw": true,
                "redeem": true
            }
        }
    }
    ```

4. **Commit and Submit**
    ```bash
    git commit -m "chore: add <SYMBOL> wrapper, chainId: <CHAIN_ID>"
    ```

### Adding Protocols

**File**: `src/protocols/protocolList.json`

Protocols define yield multipliers and reward configurations for principal tokens (PTs).

#### Protocol Structure

| Field          | Type         | Description                                    |
| -------------- | ------------ | ---------------------------------------------- |
| `ptAddress`    | string       | Principal token address                        |
| `chainId`      | number       | Network chain ID                               |
| `multipliers`  | array/object | Reward multiplier configuration                |
| `defaultInput` | string       | Default input type (`"ibt"` or `"underlying"`) |

#### Multiplier Types

**Simple Multipliers** (array format):

```json
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
        }
    ]
}
```

**Position-Specific Multipliers** (object format):

```json
{
    "ptAddress": "0x5ca220f0f44e7bc76c2d1968c5d4fd5381432890",
    "chainId": 1,
    "multipliers": {
        "lp": [
            {
                "amount": 2.5,
                "name": "Yield Crumbs"
            }
        ],
        "yt": [
            {
                "amount": 1,
                "name": "Yield Crumbs"
            }
        ]
    }
}
```

#### Steps to Add a Protocol

1. **Create Branch**

    ```bash
    git checkout -b chore/protocol-<PROTOCOL_NAME>-<CHAIN_ID>
    ```

2. **Edit Protocol List** (`src/protocols/protocolList.json`)

    ```json
    [
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
                }
            ]
        }
    ]
    ```

3. **Commit Changes**
    ```bash
    git commit -m "chore: add <PROTOCOL_NAME>, chainId: <CHAIN_ID>"
    ```

## 🔍 Schema Validation

All token data is validated against JSON schemas located in `src/schema/`:

-   `token.schema.json` - Token metadata validation
-   `protocolList.schema.json` - Protocol configuration validation
