# Copilot Coding Agent Instructions — Spectra Token List

## Project Overview

This is the **Spectra Token List** (`@perspectivefi/token-list`), a data-driven token registry for the Spectra Finance DeFi ecosystem. It provides standardized metadata for ERC-20 tokens, ERC-4626 vault wrappers, and protocol yield-multiplier configurations across multiple blockchain networks.

There is **no application logic or business logic** in this repository—it is a curated dataset published as an npm package.

## Repository Layout

```
src/
├── tokens/{chainId}/{address}/     # Token metadata (index.json + logo.svg/png)
├── wrappers/{chainId}/{address}/   # ERC4626 wrapper metadata (index.json + logo.svg/png)
├── protocols/protocolList.json     # Protocol multiplier configurations
├── schema/
│   ├── token.schema.json           # JSON schema for tokens and wrappers
│   └── protocolList.schema.json    # JSON schema for protocol list
├── build.ts                        # Build script (aggregates JSON → build.json, copies logos)
└── index.ts                        # Package entry point (re-exports build outputs)
```

- `src/tokens/build.json` and `src/wrappers/build.json` are **generated** files (gitignored).
- `src/images/tokens/` is a **generated** directory (gitignored) containing copied logos.
- `dist/` is the **compiled output** (gitignored).

## Tech Stack

| Tool         | Purpose                          |
|-------------|----------------------------------|
| TypeScript  | Type definitions and entry point |
| Bun         | Runs `build.ts` (data aggregation) |
| tsup        | Bundles `src/index.ts` → `dist/` |
| Prettier    | JSON formatting                  |
| npm         | Dependency management (lockfile is `package-lock.json`) |

> **Note on package manager**: `package.json` declares `"packageManager": "yarn@1.22.22"` but the CI uses `npm ci`. Always use **npm** for install and CI commands. Use `npm ci` (not `npm install`) for reproducible installs.

## Build & Development Commands

```bash
# Install dependencies
npm ci

# Build (aggregates token/wrapper JSON into build.json, copies logos, then bundles with tsup)
npm run build
# Equivalent to: bun run src/build.ts && tsup

# Format JSON files with Prettier
npm run format
# Equivalent to: prettier --write src/**/*.json
```

There is **no test suite** in this repository. Validation is performed in CI via JSON schema checks (see below).

## CI / Validation

### Pull Request Validation (`token-validation.yml`)

Runs on every pull request. Validates all token, wrapper, and protocol JSON files against their schemas using `nhalstead/validate-json-action@0.1.3`:

- Tokens validated against `src/schema/token.schema.json`
- Wrappers validated against `src/schema/token.schema.json` (same schema as tokens)
- Protocols validated against `src/schema/protocolList.schema.json`

### Deployment (`deploy.yml`)

Runs on push to `main`. Auto-bumps version, builds, publishes to npm, and triggers a Vercel deployment webhook.

## How to Add or Modify Data

### Adding a Token

1. Create directory: `src/tokens/{chainId}/{address}/`
2. Add `index.json` conforming to `src/schema/token.schema.json`:
   ```json
   {
       "chainId": 1,
       "address": "0x...",
       "name": "Token Name",
       "symbol": "TKN",
       "decimals": 18,
       "logoURI": "/images/tokens/{chainId}/{address}.svg"
   }
   ```
3. Add a logo file: `logo.svg` (preferred) or `logo.png` (64×64px minimum).
4. The `logoURI` path format must be `/images/tokens/{chainId}/{lowercased_address}.{extension}`.
5. Run `npm run format` to auto-format the JSON file.
6. Run `npm run build` to verify the build succeeds.

### Adding an ERC4626 Wrapper

Same as adding a token, but in `src/wrappers/{chainId}/{address}/`. Wrappers typically include `extensions.vault` and `extensions.underlying` fields.

### Adding/Editing a Protocol

Edit `src/protocols/protocolList.json`. Each entry requires `ptAddress` (0x-prefixed, 40 hex chars) and `chainId`. Multipliers can be a flat array or an object with `lp`/`yt` keys.

## Formatting Rules

Prettier is configured with unusual settings (`.prettierrc`):
- **`printWidth: 20`** — this intentionally produces very tall, narrow JSON output.
- `tabWidth: 4`, `useTabs: false`, `semi: false`, `singleQuote: false`, `bracketSpacing: true`.

Always run `npm run format` after editing any JSON under `src/`. Do not manually try to match the formatting—let Prettier handle it.

## Schema Validation

Before submitting changes to token/wrapper/protocol JSON files, validate them against the schemas:

- **Tokens & Wrappers**: `src/schema/token.schema.json`
  - Required fields: `chainId` (integer), `address` (0x + 40 hex), `name`, `symbol`, `decimals` (1–18), `logoURI`
  - `additionalProperties: false` — no extra top-level fields allowed
  - Optional `extensions` object with fields like `tags`, `underlying`, `protocol`, `vault`, `ibtRoutes`, etc.
- **Protocols**: `src/schema/protocolList.schema.json`
  - Array of objects, each requiring `ptAddress` and `chainId`
  - Multipliers can be an array of `{amount, name}` or `{lp: [...], yt: [...]}`

## Supported Chain IDs

1 (Ethereum Mainnet), 10 (Optimism), 14 (Flare), 56 (BSC), 143 (Worldchain), 146 (Sonic), 1329 (Sei), 8453 (Base), 42161 (Arbitrum), 43111 (Hemi), 43114 (Avalanche), 747474 (custom/internal), 11155111 (Sepolia testnet), 999 (testnet).

## Common Pitfalls & Troubleshooting

1. **`bun` must be available**: The build script uses `bun run src/build.ts`. The `bun` package is an npm dependency, so `npm ci` installs it. If you see `bun: command not found`, ensure `node_modules/.bin` is on your PATH or use `npx bun run src/build.ts`.
2. **Token addresses must be lowercase in `logoURI`**: The build script lowercases the address when copying logos (`address.toLowerCase()`), so `logoURI` paths should use lowercase hex addresses.
3. **No test command exists**: There is no `npm test` script. Validation is schema-based and runs in CI. To verify changes locally, run `npm run build` and confirm it exits successfully.
4. **Prettier's `printWidth: 20`**: This produces very narrow JSON. Don't be alarmed by the output—it is intentional. Always use `npm run format` rather than formatting manually.
5. **Generated files are gitignored**: `src/tokens/build.json`, `src/wrappers/build.json`, `src/images/tokens/`, and `dist/` should never be committed.
6. **Branch naming convention**: `chore/token-<SYMBOL>-<CHAIN_ID>`, `chore/wrapper-<SYMBOL>-<CHAIN_ID>`, or `chore/protocol-<PROTOCOL_NAME>-<CHAIN_ID>`.
7. **Commit message convention**: `chore: add <SYMBOL>, chainId: <CHAIN_ID>` (or similar descriptive message).
