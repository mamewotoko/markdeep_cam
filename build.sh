#! /bin/sh
rm -rf build

npm install
npm run build
mkdir -p build lib/third/css lib/third/js

cp ./node_modules/jquery/dist/jquery.min.js lib/third/js
cp ./node_modules/bootstrap/dist/js/bootstrap.min.js lib/third/js
#cp ./node_modules/svg.js/dist/svg.min.js lib/third/js
#cp ./node_modules/svg.draw.js/dist/svg.draw.min.js lib/third/js
cp ./node_modules/iscroll/build/iscroll.js lib/third/js
cp ./node_modules/bootstrap/dist/css/bootstrap.min.css lib/third/css

cp -r *.html css js lib image build
