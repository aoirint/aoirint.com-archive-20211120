.PHONY: serve
serve:
	miyadaiku-build . -sw -o ./public

.PHONY: build
build:
	miyadaiku-build . -o ./public

.PHONY: rebuild
rebuild:
	miyadaiku-build . -o ./public --rebuild

.PHONY: init
init:
	git submodule update --init --recursive
