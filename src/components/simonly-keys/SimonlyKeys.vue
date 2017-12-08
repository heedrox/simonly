<template>
    <div class="simonly-keys">
      <simonly-key class="key" :position="1" :externallyPressedKey="simonlyUI && simonlyUI.pressedKey" @keypress="userPressed"
                   skin="1" :showRightKey="simonlyUI && simonlyUI.theRightKey">
      </simonly-key>
      <simonly-key class="key" :position="2" :externallyPressedKey="simonlyUI && simonlyUI.pressedKey" @keypress="userPressed"
                   skin="2" :showRightKey="simonlyUI && simonlyUI.theRightKey">
      </simonly-key>
      <simonly-key class="key" :position="3" :externallyPressedKey="simonlyUI && simonlyUI.pressedKey" @keypress="userPressed"
                   skin="3" :showRightKey="simonlyUI && simonlyUI.theRightKey">
      </simonly-key>
      <simonly-key class="key" :position="4" :externallyPressedKey="simonlyUI && simonlyUI.pressedKey" @keypress="userPressed"
                   skin="4" :showRightKey="simonlyUI && simonlyUI.theRightKey">
      </simonly-key>
      <simonly-key class="key" :position="5" :externallyPressedKey="simonlyUI && simonlyUI.pressedKey" @keypress="userPressed"
                   skin="5" :showRightKey="simonlyUI && simonlyUI.theRightKey">
      </simonly-key>
      <simonly-key class="key" :position="6" :externallyPressedKey="simonlyUI && simonlyUI.pressedKey" @keypress="userPressed"
                   skin="6" :showRightKey="simonlyUI && simonlyUI.theRightKey">
      </simonly-key>
      <simonly-key class="key" :position="7" :externallyPressedKey="simonlyUI && simonlyUI.pressedKey" @keypress="userPressed"
                   skin="7" :showRightKey="simonlyUI && simonlyUI.theRightKey">
      </simonly-key>
      <simonly-key class="key" :position="8" :externallyPressedKey="simonlyUI && simonlyUI.pressedKey" @keypress="userPressed"
                   skin="8" :showRightKey="simonlyUI && simonlyUI.theRightKey">
      </simonly-key>
  </div>
</template>
<style scoped src="./SimonlyKeys.css"></style>

<script>
  import SimonlyKey from '../simonly-key/SimonlyKey.vue';

  export default {
    name: 'simonly-keys',
    components: {
      SimonlyKey,
    },
    props: {
      simonlyUI: {},
      whenUserPress: {
        type: Function,
        default() {
          return () => {};
        },
      },
    },
    computed: {
    },
    methods: {
      userPressed(ev) {
        this.whenUserPress(ev.key);
      },
    },
  };
</script>
