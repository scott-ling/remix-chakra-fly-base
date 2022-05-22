# Welcome to Remix + Chakra UI with Fly.io Deployment!

- [Remix Docs](https://remix.run/docs)
- [Chakra Docs](https://chakra-ui.com/docs)
- [Fly.io Docs](https://fly.io/docs)

## Overview

This is a basic git template for an empty Remix Project, with Chakra UI support
which deploys on Fly.io. (with styles maintained for error Boundaries in
root.tsx)

This is heavily based on the Remix example and solution by Chakra-UI
(documentation) and two community repositories:
https://github.com/NoQuarterTeam/boilerplate-remix and
https://github.com/NoQuarterTeam/boilerplate-remix

## Fly Setup

1. [Install `flyctl`](https://fly.io/docs/getting-started/installing-flyctl/)

2. Sign up and log in to Fly

```sh
flyctl auth signup
```

3. Setup Fly. It might ask if you want to deploy, say no since you haven't built
   the app yet.

```sh
flyctl launch
```

## Development

From your terminal:

```sh
npm run dev
```

This starts your app in development mode, rebuilding assets on file changes.

## Deployment

If you've followed the setup instructions already, all you need to do is run
this:

```sh
npm run deploy
```

You can run `flyctl info` to get the URL and ip address of your server.

Check out the [fly docs](https://fly.io/docs/getting-started/node/) for more
information.
