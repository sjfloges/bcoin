<template>
  <div
    v-tippy="{ theme: 'light' }"
    :content="`Withdrawable Balance: <span class='font-weight-500 clr-info'>${this.$options.filters.commaValue(user.withdrawable_balance)}</span>`"
    class="balance d-flex align-items-center radius-large font-weight-500 mr-1 bg-white">
    <div class="balance__left d-flex align-items-center pl-1 pr-1 pr-sm-75 radius-tl-large radius-bl-large radius-tr-large radius-tr-sm-zero radius-br-large radius-br-sm-zero bg-dark clr-white">
      <svg-icon
        icon="botcoin"
        :sizes="[16, 16]"
        :classNames="['d-block d-sm-none', 'fill-white', 'mr-50']" />
      {{ user.balance | commaValue(4) }}
    </div>
    <div class="balance__right d-none d-sm-flex align-items-center pr-1 pl-75 radius-large">
      <svg-icon
        icon="botcoin"
        :sizes="[16, 16]" />
      <span class="ml-25">Balance</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserBalance',
  props: {

  },
  filters: {
    commaValue(value) {
      const testVal = value !== undefined && value !== null && typeof value === 'number'

      if (testVal) {
        const whole = Math.floor(value).toString()
        const decimal = (value % 1).toFixed(2).toString().split('.')[1]
        const newstr = []
        for (let i = whole.length; i > 0; i -= 3) {
          newstr.unshift(whole.substring(i, i - 3))
        }
        return `$${newstr.join(',')}.${decimal}`
      } else {
        return '$0.00'
      }
    },
  },
  computed: {
    user() {
      return this.$store.state.auth.user
    },
  },
}
</script>
