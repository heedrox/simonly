# simonly
simon.ly - play simon with your family

## Build Setup

``` bash
# install dependencies
npm install

# Copy config.template.js as config.js and edit your own firebase properties
cp ./config.template.js ./config.js
vi config.js

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

# Ignored files you need to add.
- src / assets / comic.ttf (font)
- static / key-files / 1.png ... 8.png - 800 x 635 sprite. On and off for each key (horizontally)
- static / key-files / 1.m4a ... 8.m4a - sounds for each key
- config.js (copy config.template.js)

# Technologies of this repo

This uses VueJS + Firebase. 

Unit tests with Karma + Mocha + Chai.

Firebase is used for Hall Of Fame.

# License stuff 

## About images
I bought them in game dev market. Forbidden its use.

## About sounds
http://soundbible.com/1003-Ta-Da.html
http://soundbible.com/1343-Jump.html
http://soundbible.com/1204-Buzz.html

## About comic.tff

Please read this before any use of the font.

-----------------------

This font is for PERSONAL USE ONLY:

Do not under any circumstances use the font in public media unless 
permission is given from designer MÂns Greb‰ck or legal reseller. 

You may not share this font, neither on websites or to other computers,
unless MÂns Greb‰ck's permission is given.

If you do not accept these agreements, do not install or use the font. 


-----------------------

For further information, purchase and licence, please contact designer:

MÂns Greb‰ck 
mawns@live.se
+46763068614 (Sweden)

http://www.mawns.com

# For this source code

Licensed under MIT License; all the source code, excluded the contents of directory "static"
and "src/assets", which are ruled by licenses above.

The MIT License

Copyright (c) 2010-2017 Google, Inc. http://angularjs.org

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
