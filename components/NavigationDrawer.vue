<template>
  <v-navigation-drawer
    v-model="scopedIsOpenDrawer"
    style="opacity: .9"
    app
    temporary
  >
    <v-list
      nav
      dense
    >
      <v-list-item>
        <v-list-item-icon>
          <v-icon><slot name="themeIcon" /></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title
            @click="$emit('update:darkMode', !darkMode)"
          >
            {{ $t('navigationDrawer.list.darkMode') }}
          </v-list-item-title>
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
    },
    darkMode: {
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
