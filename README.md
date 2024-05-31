# bun

To install Bun

* Windows

```bash
powershell -c "irm bun.sh/install.ps1 | iex"
```

* Linux & MacOS
  
```bash
curl -fsSL https://bun.sh/install | bash
```

To install dependencies:

```bash
bun install
```

To run docker local envir

```bash
bun run build-local-envir
```

To run auth:

```bash
bun run authApi-local #local
bun run authApi-dev #dev
```

To run Test:

```bash
bun run test
```
