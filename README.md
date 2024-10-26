<p align="center">
  <a href="https://flare.network/" target="blank"><img src="https://flare.network/wp-content/uploads/Artboard-1-1.svg" width="400" height="300" alt="Flare Logo" /></a>
</p>

# JsonApi verifier server

This repo contains a verifier server that supports the [JsonApi](./contracts/interfaces/types/IJsonApi.sol) type.

# Getting started

We use [Yarn](https://yarnpkg.com/) for package management.
First run

```bash
yarn
```

to get all the needed packages.

## Docker

Familiarize yourself with [Docker](https://www.docker.com/).

The Dockerfile inside `server/IJsonApi` folder prepares the server to be run inside a Docker container.

```zsh
yarn build
```

To build an image run

```zsh
docker build -t library/verifier-indexer-api-JsonApi -f server/IJsonApi/Dockerfile .
```

To start the server run and expose the server on <PORT> run.

```zsh
docker run --rm --publish <PORT>:8000  library/verifier-indexer-api--JsonApi
```

## Verification contract

The repo contains a mock verification contract (and its interface) in solidity with a method `verifyJsonApi` that accepts attestation response with Merkle proof (see struct Proof in `IJsonApi.sol`) and always confirms it.
(A verification contract in a real setup would check the response with proof against the Merkle root stored on the Relay contract.)
