<template>
  <div>
    <img class="keyImage"
         v-on:mousedown="pressImage"
         v-on:touchstart="pressImage"
         v-on:mouseup="releaseImage"
         v-on:touchend="releaseImage"
         :src="pressed ? skinOn : skinOff">
  </div>
</template>
<style scoped>
  .keyImage {
    width:100%;
  }
</style>


<script>
  export default {
    name: 'simonly-key',
    data() {
      return {
        pressed: false,
      };
    },
    props: {
      position: {
        type: Number,
        default() {
          return 1;
        },
      },
      skinOn: {
        type: String,
        default() {
          return '';
        },
      },
      skinOff: {
        type: String,
        default() {
          return '';
        },
      },
    },
    methods: {
      pressImage() {
        this.pressed = true;
      },
      releaseImage() {
        this.pressed = false;
      },
    },
  };
</script>
