<template>
<q-card>
  <q-card-title>

    <a :href="story.permalink" target="_feeder" v-on:click="markOpened">{{story.safeTitle}}</a> <br/>
    <div class="row">
      <div class="feed col-9">{{story.feed.name}}</div>
      <div class="time col-3">{{publishedTime}}</div>
    </div>
  </q-card-title>
  <q-card-main>
    {{shortened(story.safeBody,500)}}
    <br/>
    <span> {{moment(story.last_opened_at)}}- </span>
  </q-card-main>
  <q-card-actions class="justify-end">
    <q-btn round small :icon="openedIcon()" v-on:click="toggleOpened" />
    <q-btn round small :icon="markedIcon()" v-on:click="toggleMarked" />
  </q-card-actions>
</q-card>
</template>

<script type="text/javascript">
import rssApi from '../lib/rssFeederApi.js';
import {QCard, QCardMain, QCardTitle,
        QCardSeparator, QCardActions} from 'quasar';
import mmt from 'moment';

export default {
  components: {
    QCard,
    QCardMain,
    QCardTitle,
    QCardSeparator,
    QCardActions,
  },
  data() {
    return {}
  },
  props: {
    story: {
      required: true,
      type: Object
    }
  },
  computed: {
    publishedTime() {
      var t=new Date(this.story.published);
      return `${t.getDate()}.${t.getMonth()+1}.${t.getFullYear()} ${t.getHours()}:${t.getMinutes()}`
    }
  },
  methods: {
    shortened(sth,lth) {
      if (sth && sth.slice) {
        return sth.slice(0,lth)
      } else {
        return ''
      }
    },

    moment(arg) {
      if (arg) {
        return mmt(Date.parse(arg)).fromNow()
      } else {
        return ''
      }
    },
    markedIcon: function() {
      if (this.story.read_later_at) {
         return 'bookmark';
      } else {
         return 'bookmark border';
      }
    },
    openedIcon: function() {
      if (this.story.last_opened_at) {
         return 'done';
      } else {
         return '';
      }
    },
    toggleOpened(event, done) {
     console.log("toggle opened");
     if (this.story.last_opened_at) {
        rssApi.unopenStory({storyId: this.story.id}).
        then((result)=> {
          this.story.last_opened_at = null
        }).
        catch((e) =>{});
        this.$emit('unopened');
     } else {
       this.markOpened()
      }
    },
    markOpened: function(event, done) {
      console.log("mark opened");
      rssApi.openStory({storyId: this.story.id}).
        then((result)=> {
//          console.log("result: ",
//          result.openStory.last_opened_at,
//          this.story.id
//          );
          this.story.last_opened_at = result.openStory.last_opened_at
        }).
        catch((e) =>{
          console.log("error", e)
        });
      this.$emit('opened');
    },
    toggleMarked(event, done) {
      console.log("toggle marked");
      if (this.story.read_later_at)  {
        rssApi.unbookmarkStory({storyId: this.story.id}).
        then((result)=> {
          this.story.read_later_at = null
        }).
        catch((e) =>{});
        this.$emit('unbookmarked');
     } else {
        rssApi.bookmarkStory({storyId: this.story.id}).
        then((result)=> {
          console.log("result: ",
          result.bookmarkStory.read_later_at,
          this.story.id
          );
          this.story.read_later_at = result.bookmarkStory.read_later_at
        }).
        catch((e) =>{});
        this.$emit('bookmarked');
      }
    },
  }
}

</script>
<style lang="css" scoped>
 .feed {
   font-size: 0.8em;
  }
 .time {
   text-align: right;
   font-size: 0.7em;
 }
</style>
