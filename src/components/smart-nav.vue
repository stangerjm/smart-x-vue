<template>
  <nav class="smart-nav">

    <header class="smart-nav--header">

      <main class="smart-nav--headerMain">
        <a href="/" class="smart-nav--logo"></a>
        <h4 class="smart-nav--title">{{navTitle}}</h4>
      </main>

      <aside class="smart-nav--headerAside" v-if="usr != null">
        <span class="smart-nav--userTime">{{getNavMessage(usr)}}</span>
        <bit-btn btn-style="clear"
                 class="smart-nav--signOut"
                 @click.native="onSignOut">
          <bit-icon icon-type="logout"></bit-icon>&nbsp;Sign Out
        </bit-btn>
      </aside>

    </header>

    <main class="smart-nav--list">
      <block-nav-list
          :list-items="navItems">
      </block-nav-list>
    </main>
  </nav>
</template>

<script>
import BlockNavList from './block-navList.vue';
import BitBtn from './bit-btn.vue';
import BitIcon from './bit-icon.vue';

/**
 * A component that renders a responsive navigation.
 * @author James Stanger, Washington State Patrol
 * @version 1.0
 */
export default {
  name: 'smart-nav',
  components: {
    BlockNavList,
    BitBtn,
    BitIcon,
  },
  props: {
    /**
     * Title to display at the top of the navigation.
     */
    navTitle: {
      type: String,
      required: true,
    },
    /**
     * List of items to render in the navigation.
     */
    navItems: {
      type: Array,
      required: true,
    },
    /**
     * The current user's username.
     */
    usr: {
      type: String,
    },
    /**
     * The path attached to the sign out button
     */
    onSignOut: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      /**
       * Current time and date
       */
      currentDateTime: undefined,
    };
  },
  methods: {
    getNavMessage(usr) {
      return usr ? `Welcome, ${usr}!` : '';
    },
    /**
     * Gets the current date and time in the format: 'MM/DD/YY HH:MM:SS'
     * @param fromDate
     * @returns {string}
     */
    getTime(fromDate) {
      const currentTime = fromDate;
      const year = currentTime
        .getFullYear()
        .toString()
        .slice(-2);
      const day = this.formatTime(currentTime.getDate());
      const month = this.formatTime(currentTime.getMonth() + 1);
      let hours = this.formatTime(currentTime.getHours());
      const minutes = this.formatTime(currentTime.getMinutes());
      const seconds = this.formatTime(currentTime.getSeconds());

      // format hours to reflect 12hr time
      if (hours > 12) {
        hours = this.formatTime(hours - 12);
      } else if (hours === 0) {
        hours = this.formatTime(12);
      }

      return `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
    },
    /**
     * Starts the clock that will update every second.
     */
    startClock() {
      this.currentDateTime = this.getTime(new Date());
      setTimeout(this.startClock, 1000);
    },
    /**
     * Formats the passed in value to have a leading 0 if needed.
     * @param value
     * @returns {string}
     */
    formatTime(value) {
      return (value < 10 ? '0' : '') + value;
    },
  },
  /**
   * Start the clock when mounted.
   */
  mounted() {
    this.startClock();
  },
};
</script>

<style scoped lang='scss'>
@import '../styles/sass/components/smart/nav/smart-nav';
@import '../styles/sass/components/bit/link/bit-link';
</style>
