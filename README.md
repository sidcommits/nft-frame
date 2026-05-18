# NFT Frame

A trustless NFT display rental system built on Ethereum. Physical screen owners rent out display time to NFT owners — entirely on-chain.

## How it works

1. **Display owners** use the Admin app to register screens and set rental rates
2. **NFT owners** scan the QR code on a screen, pick an NFT, set a duration, and pay rent
3. **The frame** listens for on-chain events and shows the NFT — no backend required

## Apps

| App | Description | Dev |
|-----|-------------|-----|
| `apps/landing` | Portfolio landing page | `npm run dev:landing` |
| `apps/admin` | Display owner dashboard | `npm run dev:admin` |
| `apps/client` | Physical frame display | `npm run dev:client` |
| `apps/user` | NFT rental flow (scanned from QR) | `npm run dev:user` |

## Quick start

```bash
npm install
npm run dev:landing   # http://localhost:5173
npm run dev:admin     # http://localhost:5174
npm run dev:client    # http://localhost:5175
npm run dev:user      # http://localhost:5176
```

Each app that uses web3modal requires a `VITE_WALLETCONNECT_PROJECT_ID` in its `.env` file.  
`apps/user` additionally requires `VITE_MORALIS_API_KEY`.

## Smart contract

`smart-contract.sol` — deployed to Ethereum (address in `packages/contracts/src/address.ts`).

- 95% of rent goes to the display owner
- 5% stays in the contract (withdrawn by contract owner)
- `isOccupied()` compares `display.endTime` against `block.timestamp`

## Stack

Vite · React 18 · TypeScript · Zustand · ethers v6 · web3modal v3 · npm workspaces · Solidity ^0.8.0

## License

MIT
