<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="primary"
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      >
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>

        <q-toolbar-title>
          {{ appName }}
        </q-toolbar-title>

      <q-btn
        flat round
        icon="exit_to_app"
        @click="logout"
      />
      </q-toolbar>
    </q-layout-header>

  <q-layout-drawer side="left" v-model="leftDrawerOpen">
    <q-list no-border link inset-separator>
      <q-list-header>Session</q-list-header>
      <q-item to="/">
        <q-item-side icon="chat" />
        <q-item-main label="Storries"/>
      </q-item>
      <q-item to="/feeds">
        <q-item-side icon="rss feed" />
        <q-item-main label="Feeds"/>
      </q-item>
</q-list>
  </q-layout-drawer>


    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import Config from '../lib/config'
const config = new Config();
//console.log(config);
import store from '../store'

export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      appName: config.get('app_name')
    }
  },
  methods: {
    openURL,
    logout() {
      this.$store.commit('session/logout');
      console.log("logout")
      this.$router.push({path: "/login"});
    }
  }
}
</script>

<style>
</style>
