<template>
  <v-navigation-drawer
    v-model="scopedIsOpenDrawer"
    app
    temporary
  >
    <v-list
      nav
      dense
    >
      <v-list-item>
        <v-list-item-icon>
          <v-icon><v-slot name="darkMode" /></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Dark Mode</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Dark Mode</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Dark Mode</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>Dark Mode</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  props: {
    isOpenDrawer: {
      type: Boolean,
      default: () => false
    }
  },
  computed: {
    scopedIsOpenDrawer: {
      get() {
        return this.isOpenDrawer
      },
      set(bool) {
        this.$emit('update:isOpenDrawer', bool)
      }
    }
  }
}
</script>

<style>

</style>
