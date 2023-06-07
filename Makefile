YML := ./docker-compose.yml
YML_AWS := ./docker-compose-aws.yml
YML_DEV := ./docker-compose-dev.yml
ENV_DEV := ./.env.development
DOCKER_COMPOSE := docker compose --file $(YML)
DOCKER_COMPOSE_AWS := docker compose --file $(YML_AWS)
DOCKER_COMPOSE_DEV := docker compose --file $(YML_DEV) --env-file $(ENV_DEV)

# HELP
# https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
.PHONY: help
help: ## This help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

.PHONY: build
build: ## Build containers
	$(DOCKER_COMPOSE) build

.PHONY: build-aws
build-aws: ## [AWS] Build containers
	export NODE_OPTIONS="--max-old-space-size=2048" ; \
	cd ./frontend && yarn install ; \
	yarn build
	$(DOCKER_COMPOSE_AWS) build

.PHONY: build-dev
build-dev: ## [dev] Build containers
	cd ./backend && yarn install
	$(DOCKER_COMPOSE_DEV) build

.PHONY: build-dev-no
build-dev-no: ## [dev] Build containers no cache
	cd ./backend && yarn install
	$(DOCKER_COMPOSE_DEV) build --no-cache

.PHONY: up
up: ## Create and start containers
	$(DOCKER_COMPOSE) up --build -d

.PHONY: up-aws
up-aws: ## [AWS] Create and start containers
	$(DOCKER_COMPOSE_AWS) up --build -d

.PHONY: up-dev
up-dev: ## [dev] Create and start containers
	$(DOCKER_COMPOSE_DEV) up

.PHONY: down
down: ## Stop and remove containers, networks
	$(DOCKER_COMPOSE) down

.PHONE: start
start: ## Start services
ifeq ($(shell $(DOCKER_COMPOSE) ps --services | wc -l | tr -d ' '), 1)
	$(info No containers running)
else
	$(DOCKER_COMPOSE) start
endif

.PHONY: stop
stop: ## Stop running containers
	$(DOCKER_COMPOSE) stop

.PHONY: rm
rm: ## Removes stopped service containers
	$(DOCKER_COMPOSE) rm

.PHONY: show
show: ## Show containers, images, and logs
	@echo "<Running projects>"
	@$(DOCKER_COMPOSE) ps
	@echo "\n<Images>"
	@$(DOCKER_COMPOSE) images

.PHONY: logs
logs: ## Show logs
	$(DOCKER_COMPOSE) logs -f

DOCKER_COMPOSE_DOWN_OPTIONS := --rmi all --volumes --remove-orphans
DOCKER_PRUNE := docker system prune --volumes

.PHONY: clean
clean: ## Stop and remove running containers, networks, images, and volumes
	$(DOCKER_COMPOSE) down $(DOCKER_COMPOSE_DOWN_OPTIONS)
	$(DOCKER_PRUNE)

.PHONY: clean-aws
clean-aws: ## [AWS] Stop and remove running containers, networks, images, and volumes
	$(DOCKER_COMPOSE_AWS) down $(DOCKER_COMPOSE_DOWN_OPTIONS)
	$(DOCKER_PRUNE)

.PHONY: clean-dev
clean-dev: ## [dev] Stop and remove running containers, networks, images, and volumes
	$(DOCKER_COMPOSE_DEV) down $(DOCKER_COMPOSE_DOWN_OPTIONS)
	$(DOCKER_PRUNE)

.PHONY: re
re: clean build ## clean & build

