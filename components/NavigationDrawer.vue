<template>
  <v-navigation-drawer
    v-model="scopedIsOpenDrawer"
    app
    temporary
    width="280"
  >
    <v-list
      nav
      dense
    >
    <v-list-item-group>
      <!-- Dark Mode -->
      <v-list-item @click="$emit('update:darkMode', !darkMode)">
        <v-list-item-icon>
          <v-icon><slot name="themeIcon" /></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ $t('navigationDrawer.list.darkMode') }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- About -->
      <v-list-item @click="$emit('update:isOpenDialog', !isOpenDialog)">
        <v-list-item-icon>
          <v-icon>mdi-information-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>
            {{ $t('navigationDrawer.list.about') }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <!-- Developer -->
      <v-list-group>
        <template #activator>
          <v-list-item-icon>
            <v-icon>mdi-contactless-payment-circle-outline</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              Contact Developer
            </v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title class="primary--text">
              Gmail : zlc.blue15210@gmail.com
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item
          v-for="(item, idx) in contactItems"
          :key="idx"
        >
          <v-list-item-content>
            <v-list-item-title>
              <a :href="item.url" target="_blank">{{ item.text }}</a>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list-item-group>
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
    isOpenDialog: {
      type: Boolean,
      default: () => false
    },
    darkMode: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      contactItems: [
        {
          text: 'Google Form',
          url: 'https://forms.gle/cdjsoLzpXF9PPqRb9'
        },
        {
          text: 'GitHub',
          url: 'https://github.com/smartvain'
        }
      ]
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

<style scoped>
.cursor:hover {
  cursor: pointer;
}
</style>