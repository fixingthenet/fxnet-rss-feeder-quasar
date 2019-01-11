//import Axios from 'axios';
import Config from '../lib/config'
const config = new Config()
import graphql from  'graphql.js'
const API_URL = `${config.get('RSS_FEEDER_API_URL')}graphql`;
import {LocalStorage} from 'quasar'



const rssFeederApi = function() {
  var token=LocalStorage.get.item('login_token');
  console.log("token",token)
  return graphql(API_URL, {
    method: "POST", // POST by default.
    asJSON: true,
    alwaysAutodeclare: true,
    headers: {
      "Access-Token": token
    },
    fragments: {
      // fragments, you don't need to say `fragment name`.
      //    auth: "on User { token }",
      errors: "on InputError { base fields{ name errors} }"
    }
  })
}

const q={
  stories: function(vars) {
    var res=rssFeederApi().query(`
       stories(orderBy: AGE,
               first: $limit,
               onlyUnread: $onlyUnread) {
         pageInfo { hasNextPage endCursor startCursor}
         edges {
           node {
             id title
             published body permalink entry_id
             read_later_at last_opened_at
             feed { id name }
           }
         }
       }

`)(vars)
    return res
  },
  openStory: function(vars) {
    var res=rssFeederApi().mutate(`
      openStory(input: {storyId: $storyId}){storyId last_opened_at}
`)(vars)
    return res
  },
  unopenStory: function(vars) {
    var res=rssFeederApi().mutate(`
      unopenStory(input: {storyId: $storyId}){storyId}
`)(vars)
    return res
  },
  bookmarkStory: function(vars) {
    var res=rssFeederApi().mutate(`
      bookmarkStory(input: {storyId: $storyId}){storyId read_later_at}
`)(vars)
    return res
  },
  unbookmarkStory: function(vars) {
    var res=rssFeederApi().mutate(`
      unbookmarkStory(input: {storyId: $storyId}){storyId}
`)(vars)
    return res
  },
}
//, {}, }

export default q;
