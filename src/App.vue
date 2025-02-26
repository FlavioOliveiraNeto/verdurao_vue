<template>
  <div class="h-screen grid">
    <!--<nav>
      <router-link to="/">🏠 Página Inicial</router-link>
    </nav>
    <router-view />-->
    <AlertMessage :text="message.text" :type="message.type" :visible="message.visible" />
    <router-view></router-view>
  </div>
</template>

<script>
import AlertMessage from './templates/AlertMessage.vue'

export default {
  name: 'App',
  components: {
    AlertMessage,
  },
  data() {
    return {
      message: {
        text: '',
        type: '',
        visible: false,
      },
    }
  },
  methods: {
    showMessage(text, type) {
      this.message.text = text
      this.message.type = type
      this.message.visible = true

      setTimeout(() => {
        this.message.visible = false
      }, 5000)
    },
  },
}
</script>

<style>
@import 'tailwindcss';
</style>
