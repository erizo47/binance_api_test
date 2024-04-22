<script lang="ts" setup>
  import { useRouter } from 'vue-router';

  const router = useRouter();
</script>

<template>
  <v-app-bar
    app
    elevation="3"
    rounded="8"
  >
    <router-link to="/">
      <v-btn
        class="logo_btn"
        @click="router.push('/')"
      >
        <img
          alt="logo"
          class="logo_btn__img"
          src="@/assets/images/logo.svg"
        >
        Кошелек.ру
      </v-btn>
    </router-link>
    <v-spacer />
    <div class="nav_btns">
      <v-tooltip
        location="bottom"
        text="Настройки"
      >
        <template #activator="{ props }">
          <router-link
            to="/currency"
          >
            <v-btn
              class="nav_btn"
              icon="mdi-currency-btc"
              v-bind="props"
            />
          </router-link>
        </template>
      </v-tooltip>
      <v-tooltip
        location="bottom"
        text="Order Book"
      >
        <template #activator="{ props }">
          <router-link
            to="/order-book"
          >
            <v-btn
              class="nav_btn"
              icon="mdi-align-vertical-bottom"
              v-bind="props"
            />
          </router-link>
        </template>
      </v-tooltip>
    </div>
  </v-app-bar>
</template>

<style lang="scss">
.v-app-bar {
  border-radius: 0 0 8px 8px;

  .logo_btn {
    margin-left: 24px;

    .logo_btn__img {
      margin-right: 8px;
    }
  }

  .nav_btns {
    display: flex;
    gap: 10px;
    align-items: center;
    justify-content: space-between;
    margin-right: 24px;
  }
}
</style>
