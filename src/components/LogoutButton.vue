<template>

      <q-btn
        flat round
        icon="exit_to_app"
        @click="logout"
      >{{ $store.state.session.session.user().login }}
      </q-btn>

</template>
<script>
export default {
  methods: {
    logout() {
      this.$store.commit('session/logout');
      console.log("logout")
      this.$router.push({path: "/"});
    }
  }
}
</script>
