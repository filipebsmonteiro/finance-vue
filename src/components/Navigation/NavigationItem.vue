<template>
  <a
    v-if="externalLink"
    :href="link"
    target="_blank"
    :class="{
      'nav-item flex shadow-clickable': true,
      [`bg-${color}`]: true,
      [`text-${textColor}`]: true,
      disabled: disabled,
      stacked: stacked,
      rounded: rounded,
    }"
  >
    <img :src="iconPath" :width="iconSize" />
    <span class="text">{{ text }}</span>
    <slot name="icon-right" />
  </a>
  <router-link
    v-else
    :to="link"
    :class="{
      'nav-item flex shadow-clickable': true,
      [`bg-${color}`]: true,
      [`text-${textColor}`]: true,
      disabled: disabled,
      stacked: stacked,
      rounded: rounded,
    }"
  >
    <img :src="iconPath" :width="iconSize" />
    <span class="text">{{ text }}</span>
    <slot name="icon-right" />
  </router-link>
</template>

<script>
export default {
  name: "NavigationItem",
  props: {
    route: {
      type: [Object, String],
    },
    icon: {
      type: String,
    },
    iconSize: {
      type: [String, Number],
      default: 43,
    },
    text: {
      type: String,
    },
    color: {
      type: String,
      default: "white",
    },
    textColor: {
      type: String,
      default: "grey",
    },

    externalLink: {
      type: Boolean,
      default: false,
    },
    stacked: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    link() {
      if (this.disabled) {
        return "#";
      }
      return this.route;
    },
    iconPath() {
      return require("src/assets/icons/" + this.icon);
    },
  },
};
</script>

<style lang="scss" scoped>
.nav-item {
  text-decoration: none;
  align-items: center;
  // flex: 1 1 30%;
  //flex-grow: 1;
  //flex-shrink: 1;
  //flex-basis: 30%;
  margin: 10px 3px; //margin according to shadows
  padding: 10px;

  img {
    margin-right: 10px; // Same size of padding
  }

  .text {
    padding: 10px 0 5px 0;
    font-weight: bold;
    font-size: 1.25rem;
    color: gray;
  }
}

.stacked {
  flex-direction: column;
  justify-content: center;
}
</style>
