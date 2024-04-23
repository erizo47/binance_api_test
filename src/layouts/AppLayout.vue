<script lang="ts" setup>

  import HeaderBar from '@/modules/navigation/components/HeaderBar.vue';
  import SnackBar from '@/modules/feedback/components/SnackBar.vue';
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
        class="app_layout_container pa-xs-1 pa-sm-3 pa-md-6"
      >
        <router-view :key="$route.path" />
      </v-container>
    </v-main>
    <snack-bar />
  </v-app>
</template>

<style lang="scss">
.app_layout {
  .app_layout_main {
    max-height: 100vh;
  }

  .app_layout_container {
    max-height: calc(100% - 48px);
  }
}
</style>
