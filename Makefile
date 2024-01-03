# Make Commands

PACKAGE=strata_town
DOCKER_CONTAINER=$(PACKAGE)-db

# Paths
SERVER = $(CURDIR)/server

LOCAL_DEV_HOST?=localhost
LOCAL_DEV_CLIENT_PORT=9001
LOCAL_DEV_SERVER_PORT?=9000
LOCAL_DEV_DB_HOST?=$(LOCAL_DEV_HOST)
LOCAL_DEV_DB_PORT?=9002
DB_CONNECTION_STRING="mongodb+srv://$(LOCAL_DEV_DB_HOST):$(LOCAL_DEV_DB_PORT)"

.PHONY: client
client:
	  make client-generate && cd client && PORT=$(LOCAL_DEV_CLIENT_PORT) npm run dev

.PHONY: client-generate
client-generate:
	cd client && VITE_GRAPHQL_API=http://$(LOCAL_DEV_HOST):$(LOCAL_DEV_SERVER_PORT)/graphql npm run generate

.PHONY: client-watch
client-watch:
	GRAPHQL_API=$(LOCAL_DEV_HOST):$(LOCAL_DEV_SERVER_PORT)/graphql npm run watch


.PHONY: server
server: 
	cd server && CLIENT_ORIGIN=http://$(LOCAL_DEV_HOST):$(LOCAL_DEV_CLIENT_PORT) npm run dev

.PHONY: init
init:
	 make db-init || make server-install && make db-seed

.PHONY: server-install
server-install:
	cd server && npm install

.PHONY: db-init
db-init: 
	docker run --name $(PACKAGE)-db -p $(LOCAL_DEV_DB_PORT):27017 -d mongo:7.0.2

.PHONY: db-drop
db-drop:
	docker stop $(PACKAGE)-db && docker rm $(PACKAGE)-db

.PHONY: db-seed
db-seed:
	cd server && CLIENT_ORIGIN=http://$(LOCAL_DEV_HOST):$(LOCAL_DEV_CLIENT_PORT) npm run seed

.PHONY: server-prod
server-prod:
	cd server && npm run build && npm run start:prod

.PHONY: client-build
client-build:
	  cd client && PORT=$(LOCAL_DEV_SERVER_PORT) npm run build