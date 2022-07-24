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
