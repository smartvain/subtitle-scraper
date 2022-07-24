<template>
  <v-dialog v-model="scopedIsOpenDialog" width="670">
    <v-card>
      <v-card-title class="text-h6 font-weight-bold">
        {{ $t('about.title') }}
      </v-card-title>

      <v-divider class="mb-5"/>

      <v-card-text>
        {{ $t('about.description1') }}<br>
        {{ $t('about.description2') }}<br>
        {{ $t('about.description3') }}
      </v-card-text>

      <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="scopedIsOpenDialog = !scopedIsOpenDialog"
          >
            {{ $t('item.close') }}
          </v-btn>
        </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    isOpenDialog: {
      type: Boolean,
      default: () => false
    }
  },
  computed: {
    scopedIsOpenDialog: {
      get() {
        return this.isOpenDialog
      },
      set(bool) {
        this.$emit('update:isOpenDialog', bool)
      }
    }
  }
}
</script>

<style>

</style>