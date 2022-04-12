<template>
  <div
    class="card"
    :class="[classNames, type]">
    <div
      v-if="title.length && titleRequired"
      class="card__title">
      <h4 class="m-0">
        {{ title }}
      </h4>
    </div>
    <div class="card__body">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    title: {
      type: String,
      default: () => '',
    },
    titleRequired: {
      type: Boolean,
      default: () => true,
    },
    type: {
      type: String,
      default: () => 'card--basic',
    },
    classNames: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {

    }
  },
  methods: {

  },
  mounted() {

  },
}
</script>
