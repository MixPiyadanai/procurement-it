<template>
  <v-app>
    <v-main>
      <!-- <v-app-bar dense elevation="3" app>
        <v-toolbar-title>ระบบจัดซื้อจัดจ้าง</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-app-bar> -->
      <v-container class="elevation-12 px-8" style="min-height: 100vh;">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "DefaultLayout",
  data() {
    return {};
  },
};
</script>
