<template>
  <q-page class="center">
   <q-infinite-scroll :handler="loadMore">
      <q-list>
      <transition-group name="list" tag="div">
        <p v-for="(feed,index) in feeds" v-bind:key="index" :id="index">
          <feed :feed="feed.node" v-on:deleted="onDeleted(index)"/>
        </p>
      </transition-group>
      </q-list>
      <q-spinner-dots slot="message" :size="40"></q-spinner-dots>
    </q-infinite-scroll>
<router-link :to="{path: '/feeds/add'}">
  <q-btn  round  color="primary"  class="fixed" style="right: 18px; bottom: 18px" >
      <q-icon name="add" />
  </q-btn>
  </router-link>
  </q-page>
</template>


<script>
import rssFeederApi from '../lib/rssFeederApi.js';
import feed from '../components/Feed';
import {
  QInfiniteScroll,
  QChip,
  QSpinnerDots
} from 'quasar'

export default {
  components: {
    feed: feed,
    QInfiniteScroll,
    QChip,
    QSpinnerDots
  },
  data() {
    return {
      currentTab: this.$route.params.tab,
      feeds: [],
      nextAfter: null,
    }
  },
  methods: {
    // cases:
    // first load (nextAfter == null)
    // last page: nextAfter == 0
    // any page: nextAfter == xxxxxx

    loadMore(index,done) {
      console.log("loadMore: ", this.nextAfter);
      if (this.nextAfter == 0) {
        if (done) {done()}
        return
      }
      var newTab=this.$route.params.tab;
      var filters={limit: 20,
                   after:  this.nextAfter || ""
                   }

      rssFeederApi.feeds(filters).
      then((result) => {
        if (result.feeds.pageInfo.hasNextPage) {
          this.nextAfter=result.feeds.pageInfo.endCursor
        } else {
          this.nextAfter = 0
        }
        this.feeds=this.feeds.concat(result.feeds.edges);
        if (done) {done()}
      }).
      catch( (e) => {
        if (done) {done()}
        console.log(e)
      })
    },
    onDeleted(index) {
      this.feeds.splice(index, 1)
    },


  }
}
</script>
