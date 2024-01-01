# Make Commands

PACKAGE=strata_town
DOCKER_CONTAINER=$(PACKAGE)-db

# Paths
SERVER = $(CURDIR)/server

LOCAL_DEV_DB_HOST?=localhost
LOCAL_DEV_DB_PORT?=3002
DB_CONNECTION_STRING="mongodb+srv://$(LOCAL_DEV_DB_HOST):$(LOCAL_DEV_DB_PORT)"

.PHONY: serve
serve: 
	cd server && npm run dev

.PHONY: init
init:
	make db-drop || make db-init || make server-install && make db-seed

.PHONY: server-install
server-install:
	cd server && npm install

.PHONY: db-init
db-init: 
	docker run --name $(PACKAGE)-db -p $(LOCAL_DEV_DB_PORT):27017 -d mongo:7.0.2

.PHONY: db-drop
db-drop:
	docker rm $(PACKAGE)-db

.PHONY: db-seed
db-seed:
	cd server && npm run seed