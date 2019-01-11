<template>
  <q-page>

  <div class="row">
    <div class="col-2 contact-box">
      <q-btn round color="primary">
        <q-icon name="add" />
      </q-btn>
    </div>
    <div class="col-2 contact-box">
        <q-icon name="person" />
        Peter
    </div>

    <div class="col-2 contact-box">
        <q-icon name="person" />
        CTO
    </div>

  </div>
  </q-page>
</template>
<style lang="css">
.contact-box {
  height: 100px !important;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

</style>
<script>

//const config = new Config()

export default {
  name: 'Profiles',
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
