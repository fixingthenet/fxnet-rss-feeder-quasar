<template>
  <q-page class="center">
<q-tabs  class="float-left" v-model="currentTab">
  <!-- Tabs - notice slot="title" -->
      <q-route-tab default  to="/stories/new" slot="title" name="new" icon="today" />
      <q-route-tab slot="title" to="/stories/all" name="all" icon="radio button checked"  />
      <q-route-tab slot="title" to="/stories/marked" name="marked" icon="star rate" />
    </q-tabs>
<div class="tabs-button">
      <q-btn flat big class="tabs-button" icon="cached" label="Reload"  @click="tabSelected" />
    </div>
    <div class="list item-inset-delimiter auto">
    <q-infinite-scroll :handler="loadMore">
    <transition-group name="list" tag="div">
      <div v-for="(story,index) in stories" v-bind:key="story.node.id" :id="index">
        <story :story="story.node"
        v-on:opened="onOpened(story.node.id)"
        v-on:unbookmarked="onUnbookmarked(story.node.id)"
        v-on:bookmarked="onBookmarked(story.node.id)"
        />
      </div>
      </transition-group>
      <q-spinner-dots slot="message" :size="40"></q-spinner-dots>
    </q-infinite-scroll>
   </div>
  </q-page>
</template>


<script>

import {QInfiniteScroll,
  QChip,
  QSpinnerDots,
 QRouteTab,
 QTabs} from 'quasar';

import rssFeederApi from '../lib/rssFeederApi.js';
import Story from '../components/Story.vue';

export default {
  name: 'PageIndex',
  components: {
    QRouteTab,
    QTabs,
    QInfiniteScroll,
    QChip,
    QSpinnerDots,
    Story
  },
  data() {
    return {
      currentTab: 'new',
      edges: [],
      stories: []
    }
  },
  created() {
    rssFeederApi.stories({limit: 10, onlyUnread: false}).
    then((result) => {
      console.log(result);
      this.stories=result.stories.edges;
    }).
    catch( (e) => {
      console.log(e)
    })
  },
  methods: {
    onOpened() {},
    onBookmarked() {},
    onUnbookmarked() {},
    tabSelected() {
    },
    loadMore() {
    }
  }
}
</script>
<style>
.tabs-button {
  background: #027be3;
  min-height: 55px;
  color: #fff;
}

.list-enter-active, .list-leave-active {
  transition: all 1s;
}
/*.list-enter,*/
.list-leave-to /* .list-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateX(100px) /*scale(1,0);*/
}

</style>
