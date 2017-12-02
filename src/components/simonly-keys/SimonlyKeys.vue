<template>
    <div class="simonly-keys">
      <simonly-key class="key" :position="1" :externallyPressedKey="simonlyUI.pressedKey" @keypress="userPressed"
                   skin="maria" :showRightKey="simonlyUI.theRightKey">
      </simonly-key>
      <simonly-key class="key" :position="2" :externallyPressedKey="simonlyUI.pressedKey" @keypress="userPressed"
                   skin="jone" :showRightKey="simonlyUI.theRightKey">
      </simonly-key>
      <simonly-key class="key" :position="3" :externallyPressedKey="simonlyUI.pressedKey" @keypress="userPressed"
                   skin="ines" :showRightKey="simonlyUI.theRightKey">
      </simonly-key>
      <simonly-key class="key" :position="4" :externallyPressedKey="simonlyUI.pressedKey" @keypress="userPressed"
                   skin="inigo" :showRightKey="simonlyUI.theRightKey">
      </simonly-key>
      <simonly-key class="key" :position="5" :externallyPressedKey="simonlyUI.pressedKey" @keypress="userPressed"
                   skin="olatz" :showRightKey="simonlyUI.theRightKey">
      </simonly-key>
      <simonly-key class="key" :position="6" :externallyPressedKey="simonlyUI.pressedKey" @keypress="userPressed"
                   skin="jorge" :showRightKey="simonlyUI.theRightKey">
      </simonly-key>
      <simonly-key class="key" :position="7" :externallyPressedKey="simonlyUI.pressedKey" @keypress="userPressed"
                   skin="irene" :showRightKey="simonlyUI.theRightKey">
      </simonly-key>
      <simonly-key class="key" :position="8" :externallyPressedKey="simonlyUI.pressedKey" @keypress="userPressed"
                   skin="mariatxiki" :showRightKey="simonlyUI.theRightKey">
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
      game: null,
      simonlyUI: null,
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
