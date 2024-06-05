# bun

To install Bun

- Windows

```bash
powershell -c "irm bun.sh/install.ps1 | iex"
```

- Linux & MacOS

```bash
curl -fsSL https://bun.sh/install | bash
```

To install dependencies:

```bash
bun install
```

To run local environment with docker:

```bash
bun run build-local-envir
```

To run project:

```bash
bun run authApi-local #local
bun run authApi-dev #dev
```

To run Test:

```bash
bun run test
```
