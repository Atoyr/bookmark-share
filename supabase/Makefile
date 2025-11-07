.PHONY: start stop reset

start:
	@if [ ! -f .env ]; then echo "Error: .env file not found"; exit 1; fi
	@set -a && source .env && set +a && \
	envsubst < supabase/config.toml.template > supabase/config.toml && \
	supabase start

stop:
	supabase stop

reset:
	supabase db reset
