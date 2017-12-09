# simonly
simon.ly - play simon with your family

Simonly is a HTML game written in VueJS. 

I did it so my nephews had a game in which they were the main characters!

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

# Dynamic config

No need to install this in your site to add your own keys! 

Now simonly allows dynamic configuration from URL.
 
You can replace the name of the family (the id of the game), and the keys image and audio from an external
configuration, through the URL.

You can set as many keys as you like. Recommended from 4 to 8 max.

Example: 
https://simon.ly/#/_/eyJpZCI6ImNoaXF1aXRvIiwiZCI6W3siaSI6Imh0dHBzOi8vc2ltb24ubHkvc3RhdGljLWNoaXF1aXRvLzEucG5nIiwiYSI6Imh0dHBzOi8vc2ltb24ubHkvc3RhdGljLWNoaXF1aXRvLzEubTRhIn0seyJpIjoiaHR0cHM6Ly9zaW1vbi5seS9zdGF0aWMtY2hpcXVpdG8vMi5wbmciLCJhIjoiaHR0cHM6Ly9zaW1vbi5seS9zdGF0aWMtY2hpcXVpdG8vMi5tNGEifSx7ImkiOiJodHRwczovL3NpbW9uLmx5L3N0YXRpYy1jaGlxdWl0by8zLnBuZyIsImEiOiJodHRwczovL3NpbW9uLmx5L3N0YXRpYy1jaGlxdWl0by8zLm00YSJ9LHsiaSI6Imh0dHBzOi8vc2ltb24ubHkvc3RhdGljLWNoaXF1aXRvLzQucG5nIiwiYSI6Imh0dHBzOi8vc2ltb24ubHkvc3RhdGljLWNoaXF1aXRvLzQubTRhIn1dfQ%3D%3D

The code that goes after /_/ must be generated like this:
```
encodeURIComponent(window.btoa(JSON.stringify(json)));
```

being json something with this format:

```
{ 
 "id": "myid",
 "d": [
  { "i": "https://simon.ly/static-chiquito/1.png", "a": "https://simon.ly/static-chiquito/1.m4a" },
  { "i": "https://simon.ly/static-chiquito/2.png", "a": "https://simon.ly/static-chiquito/1.m4a" }, 
  { "i": "https://simon.ly/static-chiquito/3.png", "a": "https://simon.ly/static-chiquito/1.m4a" },
  { "i": "https://simon.ly/static-chiquito/4.png", "a": "https://simon.ly/static-chiquito/1.m4a" }
  ]
}
``

# Technologies of this repo

- This uses VueJS + Firebase.
- Unit tests with Karma + Mocha + Chai.
- Firebase is used for Hall Of Fame.

# Want to improve this?
- Do a PR, I would love to hear from you!
- You can improve the design a little bit. I'm a developer, not a designer, I've tried to do my best! :)

# Where am I going?
- Collaborative mode: my nephews and nieces playing together!

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
