<script lang="ts" setup>

  import HeaderBar from '@/modules/navigation/components/HeaderBar.vue';
</script>

<template>
  <v-app
    class="app_layout"
    theme="dark"
  >
    <header-bar />

    <v-main
      class="app_layout_main"
    >
      <v-container
        class="pa-6"
        fluid
      >
        <router-view :key="$route.path" />
      </v-container>
    </v-main>
  </v-app>
</template>

<style lang="scss">
.app_layout {
  .app_layout_main {
    max-height: 100vh;
  }
}
</style>
