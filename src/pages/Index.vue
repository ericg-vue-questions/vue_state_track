<template>
  <q-page class="flex flex-center">

    <q-btn v-show="this.lvl >= 0" size="sm" flat round icon="far fa-window-close" @click="close()" />

    <div v-for="value in level" :key="value.id">
      <q-btn :label="value" @click="clickMethod( value )"/>&nbsp;
    </div>

  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',

  props: {
    lvl: {
      default: -1,
      type: Number
    }
  },

  computed: {
    level: {
      get () {
        console.log(this.lvl)

        var theArray

        if (this.lvl >= 0) {
          theArray = Array(10).fill(0).map((e, i) => this.lvl + i)
        } else {
          theArray = Array(10).fill(0).map((e, i) => i * 10)
        }

        console.log(theArray)

        return theArray
      }
    }
  },

  methods: {
    clickMethod (value) {
      console.log('value clicked: ' + value)
      this.$router.push({ name: 'level', params: { lvl: value } })
    },

    close () {
      console.log('close')

      this.$router.push('/')
    }
  }
}
</script>
