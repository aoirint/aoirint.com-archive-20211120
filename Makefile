.PHONY: serve
serve:
	miyadaiku-build . -sw -o ./public

.PHONY: build
build:
	miyadaiku-build . -o ./public

.PHONY: pip-install
pip-install: init
	pip3 install -e ./miyadaiku
	pip3 install -e ./watchdog

.PHONY: init
init:
	git submodule update --init --recursive
