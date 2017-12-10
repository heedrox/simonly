<template>
    <div class="simonly-keys">
        <simonly-key v-for="keyNumber in numKeys" :key="keyNumber" class="key" :position="keyNumber" :externallyPressedKey="simonlyUI && simonlyUI.pressedKey" @keypress="userPressed"
                      :skin="keyNumber" :showRightKey="simonlyUI && simonlyUI.theRightKey"
                     :overwriteSkin="(config.dataKeys && config.dataKeys[parseInt(keyNumber - 1)]) ?config.dataKeys[parseInt(keyNumber - 1)]['i']:null"
                     :overwriteAudio="(config.dataKeys && config.dataKeys[parseInt(keyNumber - 1)]) ?config.dataKeys[parseInt(keyNumber - 1)]['a']:null" >
        </simonly-key>
  </div>
</template>
<style scoped src="./SimonlyKeys.css"></style>

<script>
  import SimonlyKey from '../simonly-key/SimonlyKey.vue';

  export default {
    name: 'simonly-keys',
    ioc: ['config'],
    components: {
      SimonlyKey,
    },
    props: {
      simonlyUI: {},
      numKeys: {
        type: Number,
        default() {
          return 1;
        },
      },
      whenUserPress: {
        type: Function,
        default() {
          return () => {};
        },
      },
    },
    methods: {
      userPressed(ev) {
        this.whenUserPress(ev.key);
      },
    },
  };
</script>
