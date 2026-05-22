# SuperSim

This is a consolidation of Super DNA Geospatial + Simulation demos

## Tooling

Node.js with Express are used for this backend server.

To Run in development:
`docker compose up`

Note that to connect to the database on mac through docker, I'm routing with this
`socat TCP-LISTEN:5433,fork TCP:10.0.5.201:5432`

## Environment

You need to configure .env files which, for security, are not stored in git.

Contact Mike for them.
