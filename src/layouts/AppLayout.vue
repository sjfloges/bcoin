<template>
  <component
    :is="layout"
    class="layout"
    :class="[layoutClassnames, scrollPosition > 0 && layoutIsScrollable ? 'layout--scrolled' : '']">
    <slot />
  </component>
</template>

<script>
import debounce from 'lodash/debounce'
const defaultLayout = 'AppLayoutFull'

export default {
  name: "AppLayout",
  data() {
    return {
      scrollPosition: 0,
    }
  },
  computed: {
    layout() {
      const layout = this.$route.meta.layout || defaultLayout
      return () => import(`@/layouts/${layout}.vue`)
    },

    layoutClassnames() {
      const layout = this.$route.meta.layout || defaultLayout

      if (layout === 'AppLayoutFull') return 'layout--full'
      if (layout === 'AppLayoutDefault') return 'layout--default'

      return null
    },

    layoutIsScrollable() {
      const layout = this.$route.meta.layout || defaultLayout

      return layout === 'AppLayoutDefault'
    },
  },
  methods: {
    handleScroll() {
      this.scrollPosition = window.scrollY
    },
  },
  created() {
    window.addEventListener('scroll', debounce(this.handleScroll, 100))
  },
  mounted() {

  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>
