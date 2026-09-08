# Contributing to Draupnir

Thanks for taking the time to contribute! The following is a short guide to
get you productive quickly.

## Getting started

```bash
git clone https://github.com/hashedalgorithm/draupnir.git
cd draupnir
yarn install
```

`yarn install` builds the package via the `prepare` script, so you should
end up with a working `dist/` folder right away.

## Development workflow

```bash
yarn start      # bunchee --watch, rebuilds on file changes
yarn build      # compile CSS, bundle with bunchee, build the standalone tailwind.css
yarn lint        # oxlint
yarn test        # vitest
yarn typecheck    # tsc --noEmit (via tsdx)
```

The `example/` app is a small Parcel-based playground that imports the
library directly from `../dist`, useful for manually exercising components
while you work.

## Making changes

1. Fork the repo and create a branch off `main`.
2. Make your change, keeping it focused — unrelated refactors make review
   harder.
3. Run `yarn lint` and `yarn build` locally before opening a PR.
4. Open a pull request describing what changed and why. Link any related
   issue.

## Reporting bugs

Please open an issue using the bug report template and include a minimal
reproduction (schema + component usage) where possible.

## Code style

The project uses `prettier` defaults declared in `package.json`
(`printWidth: 80`, single quotes, trailing commas). Formatting isn't
strictly enforced yet, but please keep new code consistent with the
surrounding style.

## Code of Conduct

This project follows a [Code of Conduct](./CODE_OF_CONDUCT.md). By
participating, you're expected to uphold it.
