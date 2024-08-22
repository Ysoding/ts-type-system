run: install 
	./node_modules/typescript/bin/tsc  -noErrorTruncation rule110.ts | sed 's/\[/\n[/g'

install:
	npm install