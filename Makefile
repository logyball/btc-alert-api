up:
	docker-compose up -d

down:
	docker-compose down

start:
	npm start

build-release:
	pkg app.js -t node16-linux -o btcapi

build:
	pkg app.js -t node16-macos -o btcapi
