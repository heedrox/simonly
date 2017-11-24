<template>
  <div class="simonly-board">
    <simonly-key :position="1"
                 skin-off="/static/key-images/jorge-off.png"
                 skin-on="/static/key-images/jorge-on.png">
    </simonly-key>
    <simonly-key :position="2"
                 skin-off="/static/key-images/jorge-off.png"
                 skin-on="/static/key-images/jorge-on.png">
    </simonly-key>
    <simonly-key :position="3"
                 skin-off="/static/key-images/jorge-off.png"
                 skin-on="/static/key-images/jorge-on.png">
    </simonly-key>
    <simonly-key :position="4"
                 skin-off="/static/key-images/jorge-off.png"
                 skin-on="/static/key-images/jorge-on.png">
    </simonly-key>
    <simonly-key :position="5"
                 skin-off="/static/key-images/jorge-off.png"
                 skin-on="/static/key-images/jorge-on.png">
    </simonly-key>
    <simonly-key :position="6"
                 skin-off="/static/key-images/jorge-off.png"
                 skin-on="/static/key-images/jorge-on.png">
    </simonly-key>
    <simonly-key :position="7"
                 skin-off="/static/key-images/jorge-off.png"
                 skin-on="/static/key-images/jorge-on.png">
    </simonly-key>
    <simonly-key :position="8"
                 skin-off="/static/key-images/jorge-off.png"
                 skin-on="/static/key-images/jorge-on.png">
    </simonly-key>

  </div>
</template>
<style scoped>
  .simonly-board > div {
    display:inline-block;
    width:10vw;
    max-width:10vw;
  }
</style>


<script>
  import SimonlyKey from '../../components/simonly-key/SimonlyKey.vue';

  export default {
    name: 'simonly-board',
    components: {
      SimonlyKey,
    },
    data() {
      return {
      };
    },
    props: {

    },
    methods: {

    },
  };
</script>
