<template>
  <v-app>
    <v-main>
      <!-- <v-app-bar dense elevation="3" app>
        <v-toolbar-title>ระบบจัดซื้อจัดจ้าง</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-app-bar> -->
      <v-container

        :class="`elevation-2 ${isMobile ? 'pa-0' : 'px-8'}`"
        style="min-height: 100vh"
      >
        <div class="fixed-version">
          <span>
            <v-icon dense class="mt-n1" color="success">mdi-earth</v-icon>
            {{ version }}
          </span>
        </div>
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { debounce } from "~/utils/debounce";
export default {
  name: "DefaultLayout",
  created() {
    if (process.client) {
      window.addEventListener("resize", this.resizeHandler);
    }
  },
  mounted() {
    this.resizeHandler();
  },
  data() {
    return {
      screenWidth: process.client ? window.innerWidth : 0,
      isMobile: false,
      version: "Prod 1.0.0",
    };
  },
  methods: {
    resizeHandler: debounce(function () {
      this.isMobile = window.innerWidth < 600 ? true : false;
    }, 100),
  },
  beforeDestroy() {
    if (process.client) {
      window.removeEventListener("resize", this.resizeHandler);
    }
  },
};
</script>

<style scoped>
.fixed-version {
  position: fixed;
  padding-left: 10px;
  padding-bottom: 10px;
  bottom: 0;
  left: 0;
}
</style>
