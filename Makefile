.PHONY: serve
serve:
	watchexec \
		--restart \
		--watch ./miyadaiku \
		--watch ./aoirint-miyadaiku-theme-blog \
		-- \
		miyadaiku-build . -s -p 18000 --rebuild -o ./public

.PHONY: build
build:
	miyadaiku-build . --rebuild -o ./public

.PHONY: pip
pip:
	pip3 install -e ./miyadaiku
	pip3 install -e ./aoirint-miyadaiku-theme-blog

.PHONY: init
init:
	git submodule update --init --recursive
