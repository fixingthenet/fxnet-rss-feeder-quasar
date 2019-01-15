<template>
  <q-page class="center">
    <q-input v-model="feed.name" float-label="Name" placeholder="The name of the feed" />
    <q-input v-model="feed.url" float-label="Url" placeholder="Url of the rss feed" />
      <q-btn  round  color="primary"  @click="createFeed" class="fixed" style="right: 18px; bottom: 18px" >

      <q-icon name="save" />

  </q-btn>
</q-page>
</template>

<script type="text/javascript">
import rssFeederApi from '../lib/rssFeederApi.js';
import {QInput} from 'quasar';

export default {
  components: {
    QInput
  },
  data() {
    return {
      feed: {name: null, url: null},
    }
  },
  computed: {
  },
  created: function() {
  },
  methods: {
    createFeed() {
      rssFeederApi.feedCreate(this.feed).
      then((result) => {
      this.$router.push('/feeds')
      }).
      catch((e) => {

      })
    }
  }
}

</script>

<style>

</style>
