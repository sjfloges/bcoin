<template>
  <div
    class="badge"
    :class="[classNames, typeClass, sizeClass]">
    {{ text }}
  </div>
</template>

<script>
export default {
  name: 'Badge',
  props: {
    text: {
      type: String,
      required: true,
      default: () => 'Badge',
    },
    classNames: {
      type: Array,
      default: () => [],
    },
    type: {
      type: String,
      default: () => 'primary',
    },
    size: {
      type: String,
      default: () => 'medium',
    },
  },
  data() {
    return {

    }
  },
  computed: {
    typeClass() {
      return `badge-${this.type.replace(/['"]+/g, '')}`
    },

    sizeClass() {
      return `badge-${this.size.replace(/['"]+/g, '')}`
    }
  },
  methods: {

  },
  mounted() {

  },
}
</script>
