<template>
  <div class="new-view">
    <h1>Create your own simon.ly !</h1>
    <p class="row">Identifier: <input type="text" v-model="identifier" placeholder="a string without spaces"> </p>
    <p class="row">Number of keys: <input type="number" step="1" v-model="numKeys"></p>
    <p class="row">(*) Recommended size per image: width 600 x height 400 pixels. It's a sprite horizontally made of two pieces of 300 pixels ( = 600 pixels). The first 300 pixels contains the image without being pressed, and the next 300 pixels contain the image being pressed. <a href="https://simon.ly/_/static/key-files/1.png" target="_blank">You have an example here.</a></p>
    <div v-for="(key, index) in parseInt(numKeys)" :key="key">
      <p class="row">
        <input type="text" class="image" v-model="image[index]" :placeholder="'URL for image '+(index+1)">
        <input type="text" class="audio" v-model="audio[index]" :placeholder="'URL for audio '+(index+1)">
      </p>
    </div>
    <p :class="{ result: true, warning: result.length > 2000 }">Your final URL: (length: {{ result.length }})
    <span v-if="result.length > 2000">
      WARNING: Some servers or browsers do not handle more than 2000 chars.
    </span>
    <input type="button" value="copy to clipboard" v-on:click="copy"></p>
    <textarea id="result">{{ result }}</textarea>
    <p>* <b>TIP</b>: shorten the link with bit.ly, for example, to have a memorable url that you can share.</p>
    <p>What does this do? It creates a JSON object, with the identifier ("id") and an array ("d" element). Each element of array is an object with "i" and "a" property. "i" stands for image, "a" stands for audio. It later codifies it in base64 (btoa) and encodes it (encodeURIComponent). And it is attached to the server URL after the "https://simon.ly/#/_/" part ! <br/>You can try decoding the part after "_"</p>
    <p><router-link :to="{ path: '/explain'}" replace>Go back</router-link></p>
  </div>
</template>
<style scoped>
  .new-view {
    padding: 4vh 3vw;
    text-align: left;
    overflow-y: scroll;
    height: 100vh;
  }
  h1 {
    margin: 0;
    padding: 0 0 5vh;
    font-family: GameFont;
    color: #f4dd06;
    text-shadow: 0.5vw 0.5vw #f5991b, 0.8vw 0.8vw #c82f27, 1vw 1vw #6c100f;
  }
  .new-view, .new-view p, .new-view input {
    font-family: Verdana,serif;
    font-size: 3vh;
  }
  .row {
    margin-top: 2vh;
  }
  .row input {
    width: 45vw;
  }
  textarea {
    width: 100%;
    height: 30vh;
  }

  .new-view .result {
    margin-top: 3vh;
  }
  .new-view p.warning {
    color: #c82f27;
    font-weight: bold;
  }

</style>
<script>
  import { SimonlyDynamicConfigEncode } from '../game-lib/SimonlyDynamicConfig';

  export default {
    data() {
      return {
        numKeys: 2,
        image: [],
        audio: [],
        identifier: '',
      };
    },
    computed: {
      result() {
        const buildJson = () => {
          const json = [];
          for (let index = 0; index < this.numKeys; index += 1) {
            json.push({ i: this.image[index], a: this.audio[index] });
          }
          return { id: this.identifier, d: json };
        };
        try {
          const code = SimonlyDynamicConfigEncode(buildJson());
          return `https://simon.ly/_/#/${code}`;
        } catch (e) {
          return ` error ${e}`;
        }
      },
    },
    methods: {
      copy() {
        const copyText = window.document.getElementById('result');
        copyText.select();
        window.document.execCommand('Copy');
// eslint-disable-next-line no-alert
        window.alert('copied');
      },
    },
  };
</script>
