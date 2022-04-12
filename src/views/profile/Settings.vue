<template>
  <div class="container">
    <div class="row">
      <div class="col col-12">
        <app-card>
          <h2>
            <i class="fas fa-user-cog mr-75 clr-primary opacity-85" />
            <span class="clr-dark">Profile Settings</span>
          </h2>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae distinctio facilis iste accusantium alias tempore voluptatum nobis molestiae eveniet, voluptate quia labore aspernatur provident odio veniam assumenda numquam neque officiis tempora hic. Possimus repellat velit quos delectus, saepe quae nisi sed? Ratione laboriosam est, autem nulla ea rerum, quas nemo, nobis modi sunt vitae inventore. Deleniti cum velit labore in magnam? Reprehenderit cum in provident iure consectetur ipsam incidunt possimus reiciendis ipsa? Sed aliquam pariatur quam dicta commodi nam sapiente nulla itaque quo inventore tempore, necessitatibus, veniam tenetur magnam officiis dolore ad doloremque blanditiis, alias maiores dolorem molestias earum quas aperiam! Exercitationem, in. Maxime suscipit illum voluptatem autem ut repellendus quod debitis cum, laudantium obcaecati, quia voluptas quis similique. Molestias.</p>
        </app-card>
      </div>
    </div>
  </div>
</template>

<script>
import { eventBus } from '../../main'

export default {
  name: 'Settings',
  computed: {
    user() {
      return this.$store.state.auth.user
    },

    settings() {
      return this.$store.state.user.settings
    },
  },
  created() {

  },
  mounted() {
    eventBus.$on('showToast/Settings', data => { this.showToast(data) })
  },
  beforeDestroy() {
    eventBus.$off('showToast/Settings')
  },
  methods: {
    showToast(data) {
      this.$toast(data.message, {
        type: data.type
      })
    }
  }
}
</script>
