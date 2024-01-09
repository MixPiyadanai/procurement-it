<template>
  <v-app>
    <v-main>
      <!-- <v-app-bar dense elevation="3" app>
        <v-toolbar-title>ระบบจัดซื้อจัดจ้าง</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-app-bar> -->
      <v-container
        :class="` ${isMobile ? 'pa-0' : 'px-8'}`"
        style="min-height: 100vh"
      >
        <div class="fixed-version">
          <span
            :style="
              $vuetify.theme.isDark
                ? 'background-color: #121212'
                : 'background-color: #ffffff'
            "
            class="pa-1 pr-2 rounded-xl"
          >
            <v-icon dense class="mt-n1" color="success">mdi-earth</v-icon>
            {{ version }}
          </span>
        </div>
        <div class="fixed-toggle-theme">
          <v-btn
            icon
            elevation="2"
            @click="toggleTheme"
            :style="
              $vuetify.theme.isDark
                ? 'background-color: #ffffff'
                : 'background-color: #121212'
            "
          >
            <v-icon :color="!$vuetify.theme.isDark ? 'white' : 'black'">
              {{
                $vuetify.theme.isDark
                  ? "mdi-moon-waxing-crescent"
                  : "mdi-white-balance-sunny"
              }}
            </v-icon>
          </v-btn>
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
    toggleTheme() {
      const vuetify = this.$vuetify;

      vuetify.theme.isDark = !vuetify.theme.isDark;
    },
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
  padding-left: 3px;
  padding-bottom: 5px;
  bottom: 0;
  left: 0;
  z-index: 9999;
}

.fixed-toggle-theme {
  position: fixed;
  padding-right: 10px;
  padding-bottom: 10px;
  bottom: 0;
  right: 0;
  z-index: 999;
}
</style>
