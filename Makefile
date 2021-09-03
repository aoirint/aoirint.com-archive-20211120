.PHONY: serve
serve:
	miyadaiku-build . -sw -o ./public

.PHONY: build
build:
	miyadaiku-build . -o ./public

.PHONY: init
init:
	git submodule update --init --recursive
