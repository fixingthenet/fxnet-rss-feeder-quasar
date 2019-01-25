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
        <logout-button/>
      </q-toolbar>
    </q-layout-header>

  <q-layout-drawer side="left" v-model="leftDrawerOpen">
    <q-list no-border link inset-separator>
      <q-list-header>RSS Feeder</q-list-header>
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
import LogoutButton from '../components/LogoutButton.vue'

export default {
  name: 'LayoutDefault',
  components: {
    LogoutButton
  },
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      appName: this.$fx_config.app_name,
    }
  },
  methods: {
    openURL,
  }
}
</script>

<style>
</style>
