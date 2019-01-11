<template>
  <q-page>

  <div class="row">
    <div class="col-2 contact-box">
      <q-btn round color="primary">
        <q-icon name="add" />
      </q-btn>
    </div>
    <div class="col-2">
        <q-icon name="email" />
        email
    </div>
        <div class="col-2">
        <q-icon name="email" />
        address
    </div>
    <div class="col-2">
        <q-icon name="email" />
        facebook
    </div>
    <div class="col-2">
        <q-icon name="email" />
        what3words
    </div>
    <div class="col-2">
        <q-icon name="email" />
        Postal Address
    </div>
    <div class="col-2">
        <q-icon name="email" />
        mobile Phone
    </div>
    <div class="col-2">
        <q-icon name="email" />
        Phone
    </div>
    <div class="col-2">
        <q-icon name="email" />
        whatsapp
    </div>
    <div class="col-2">
        <q-icon name="email" />
        <span class="redish">twitter</span>
    </div>

  </div>
  </q-page>
</template>
<style lang="css">
.contact-box {
  height: 100px !important;
  text-align: center;
  vertical-align: center;
}
.redish {
  color: red;
}
</style>
<script>
import Config from '../lib/config'
import authApi from '../lib/auth_api'
import Session from '../lib/session'

//const config = new Config()

export default {
  name: 'PageIndex',
  components: {

  },
  data() {
    return {
    }
  },
  computed: {
  }
}
</script>
