<template>
    <div class="simonly-keys">
      <simonly-key class="key" :position="1" :externallyPressedKey="simonlyUI && simonlyUI.pressedKey" @keypress="userPressed"
                   skin="maria" :showRightKey="simonlyUI && simonlyUI.theRightKey">
      </simonly-key>
      <simonly-key class="key" :position="2" :externallyPressedKey="simonlyUI && simonlyUI.pressedKey" @keypress="userPressed"
                   skin="jone" :showRightKey="simonlyUI && simonlyUI.theRightKey">
      </simonly-key>
      <simonly-key class="key" :position="3" :externallyPressedKey="simonlyUI && simonlyUI.pressedKey" @keypress="userPressed"
                   skin="ines" :showRightKey="simonlyUI && simonlyUI.theRightKey">
      </simonly-key>
      <simonly-key class="key" :position="4" :externallyPressedKey="simonlyUI && simonlyUI.pressedKey" @keypress="userPressed"
                   skin="inigo" :showRightKey="simonlyUI && simonlyUI.theRightKey">
      </simonly-key>
      <simonly-key class="key" :position="5" :externallyPressedKey="simonlyUI && simonlyUI.pressedKey" @keypress="userPressed"
                   skin="olatz" :showRightKey="simonlyUI && simonlyUI.theRightKey">
      </simonly-key>
      <simonly-key class="key" :position="6" :externallyPressedKey="simonlyUI && simonlyUI.pressedKey" @keypress="userPressed"
                   skin="jorge" :showRightKey="simonlyUI && simonlyUI.theRightKey">
      </simonly-key>
      <simonly-key class="key" :position="7" :externallyPressedKey="simonlyUI && simonlyUI.pressedKey" @keypress="userPressed"
                   skin="irene" :showRightKey="simonlyUI && simonlyUI.theRightKey">
      </simonly-key>
      <simonly-key class="key" :position="8" :externallyPressedKey="simonlyUI && simonlyUI.pressedKey" @keypress="userPressed"
                   skin="mariatxiki" :showRightKey="simonlyUI && simonlyUI.theRightKey">
      </simonly-key>
  </div>
</template>
<style scoped>
  .key {
    display: inline-block;
    width: 11vw;
    max-width: 11vw;
  }

</style>

<script>
  import SimonlyKey from '../simonly-key/SimonlyKey.vue';

  export default {
    name: 'simonly-keys',
    components: {
      SimonlyKey,
    },
    props: {
      game: {},
      simonlyUI: {},
    },
    computed: {
    },
    methods: {
      userPressed(ev) {
        this.game.userPressed(ev.key);
      },
    },
  };
</script>
