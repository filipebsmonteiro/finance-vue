<template>
  <div :class="{ 'flip-card': true }">
    <div
      :class="{
        'flip-card-inner': true,
        'only-portrait': onlyVertical,
        'only-landscape': onlyHorizontal,
        'portrait-and-landscape': !onlyVertical && !onlyHorizontal,
      }"
      v-bind:style="{
        transform: 'rotateY(' + degree + 'deg)',
        '-webkit-transform': 'rotateY(' + degree + 'deg)',
        '-ms-transform': 'rotateY(' + degree + 'deg)',
      }"
    >
      <div
        :class="{
          'flip-card-front flex column items-center': true,
          bordered: !borderless,
        }"
      >
        <div class="btn-flip">
          <q-btn
            v-if="!hideFlipButton"
            rounded
            dense
            color="warning"
            class="q-mr-sm"
            icon="refresh"
            @click="flip"
          />
          <q-btn
            v-if="!hidePrintButton"
            rounded
            dense
            color="warning"
            icon="print"
            @click="print"
          />
        </div>
        <slot name="card-front" />
      </div>
      <div :class="{ 'flip-card-back': true, bordered: !borderless }">
        <div class="btn-flip">
          <q-btn
            v-if="!hideFlipButton"
            rounded
            dense
            color="warning"
            class="q-mr-sm"
            icon="refresh"
            @click="flip"
          />
          <q-btn
            v-if="!hidePrintButton"
            rounded
            dense
            color="warning"
            icon="print"
            @click="print"
          />
        </div>
        <slot name="card-back" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FlipCard",
  props: {
    onlyVertical: {
      type: Boolean,
      default: false,
    },
    onlyHorizontal: {
      type: Boolean,
      default: false,
    },
    hideFlipButton: {
      type: Boolean,
      default: false,
    },
    hidePrintButton: {
      type: Boolean,
      default: false,
    },
    borderless: {
      type: Boolean,
      default: false,
    },
    sideShow: {
      type: String,
      default: "front",
    },
  },
  watch: {
    sideShow(value) {
      if (value === "front") {
        this.degree = 0;
      }
      if (value === "back") {
        this.degree = 180;
      }
    },
  },
  computed: {
    orientation() {
      const orientation =
        (window.screen.orientation || {}).type ||
        window.screen.mozOrientation ||
        window.screen.msOrientation;
      if (
        orientation === "landscape-primary" ||
        orientation === "landscape-secondary"
      )
        return "landscape";

      return "portrait";
    },
  },
  data() {
    return {
      degree: 0,
    };
  },
  methods: {
    flip() {
      this.degree = this.degree === 180 ? 0 : 180;
    },
    print() {
      const el = document.getElementsByTagName("MAIN")[0];
      const style = el.getAttribute("style");
      el.setAttribute("style", "min-height: 100%");
      window.print();
      el.setAttribute("style", style);
    },
  },
  mounted() {
    if (this.sideShow === "back") {
      this.flip();
    }
  },
};
</script>

<style lang="scss" scoped>
.btn-flip {
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 8px;
  margin-right: 8px;
  z-index: 1;
}

.flip-card {
  text-align: center;

  .flip-card-inner {
    width: 355px;
    height: 660px;
    transition: transform 0.8s;
    transform-style: preserve-3d;
    text-align: center;

    .flip-card-front,
    .flip-card-back {
      position: absolute;
      width: 100%;
      height: 100%;
      -webkit-backface-visibility: hidden; /* Safari */
      backface-visibility: hidden;
      overflow: hidden;
      border-radius: 15px;

      &.bordered {
        border: solid 1px #e0e0e0;
      }
    }

    .flip-card-front {
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      color: black;
    }

    .flip-card-back {
      -webkit-transform: rotateY(180deg);
      transform: rotateY(180deg);
    }
  }
}

/* portrait responsive */
@media screen and (orientation: portrait), print {
  .portrait-and-landscape .flip-card-front {
    padding-top: 10px;
    justify-content: center;
    background-image: url(~assets/carteirinha/frente.png);
  }
}

/* landscape responsive */
@media screen and (orientation: landscape), print {
  .portrait-and-landscape {
    width: 660px;
    height: 355px;
  }

  .portrait-and-landscape .flip-card-front {
    display: flex;
    align-items: center;
    justify-content: space-around;
    background-image: url(~assets/carteirinha/frente_flip.png);
  }
}

/* only portrait */
.only-portrait .flip-card-front {
  padding-top: 10px;
  justify-content: center;
  background-image: url(~assets/carteirinha/frente.png);
}

/* only landsdcape */
.flip-card .only-landscape {
  width: 660px;
  height: 355px;
}
.only-landscape .flip-card-front {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-image: url(~assets/carteirinha/frente_flip.png);
}

@media print and (orientation: portrait) {
  .q-page .bg-theme {
    min-height: 100% !important;
  }
  .btn-flip {
    display: none;
  }
  .flip-card {
    top: 0 !important;
  }
  .flip-card-front,
  .flip-card-back {
    position: relative !important;
  }
  .flip-card-back {
    transform: rotateY(0) !important;
  }
  .flip-card {
    -webkit-print-color-adjust: exact;
  }
}
@media print and (orientation: landscape) {
  .q-page .bg-theme {
    min-height: 100% !important;
  }
  .btn-flip {
    display: none;
  }
  .flip-card {
    top: 0 !important;
  }
  .flip-card-front,
  .flip-card-back {
    position: relative !important;
  }
  .flip-card-back {
    transform: rotateY(0) !important;
  }
  .flip-card {
    -webkit-print-color-adjust: exact;
  }
}
</style>
