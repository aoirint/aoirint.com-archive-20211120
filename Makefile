.PHONY: serve
serve:
	watchmedo auto-restart \
		--recursive \
		-d ./miyadaiku \
		-d ./aoirint-miyadaiku-theme-blog \
		-- \
		miyadaiku-build . -sw -p 18000 --rebuild -o ./public

.PHONY: build
build:
	miyadaiku-build . --rebuild -o ./public

.PHONY: pip-install
pip-install: init
	pip3 install -e ./miyadaiku
	pip3 install -e ./aoirint-miyadaiku-theme-blog
	pip3 install -e ./watchdog

.PHONY: init
init:
	git submodule update --init --recursive
