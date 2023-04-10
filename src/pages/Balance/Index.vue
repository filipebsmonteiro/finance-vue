<template>
  <q-page class="flex column content-center">
    <PatrimonyForm class="q-mt-md" />

    <q-spinner
      v-if="loading"
      color="primary"
      size="3em"
      class="q-mt-md self-center"
    />
    <ListSimple
      v-else
      :items="balances"
      emptyText="Nenhum Balanço localizado!"
      class="q-mt-md"
    >
      <template v-slot:default="{ item, index }">
        <q-item-section>
          <q-item-label v-if="item.isEditing">
            <BalanceForm
              dense
              filled
              borderless
              placeholder="Nome"
              v-model:name="item.name"
              v-model:value="item.value"
              @cancel="setEditing(null)"
              @add="update"
            />
          </q-item-label>
          <q-item-label v-else class="column">
            <span>{{ item.name }}</span>
            <span
              :class="{
                'text-caption': true,
                'text-negative': item.type === $CONST.FINANCE.BALANCE.COST,
                'text-positive': item.type === $CONST.FINANCE.BALANCE.INCOME,
              }"
              >{{ $formaters.money(item.value) }}
            </span>
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-fab
            flat
            padding="8px"
            text-color="black"
            icon="more_vert"
            direction="left"
          >
            <q-fab-action
              icon="las la-trash"
              text-color="negative"
              @click="remove(item.id)"
            />
            <q-fab-action
              text-color="info"
              icon="edit"
              @click="setEditing(index)"
            />
          </q-fab>
        </q-item-section>
      </template>
    </ListSimple>

    <div class="mt-md">
      <Tabs />
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapWritableState } from "pinia";
import { useBalanceStore } from "src/stores/balance/index";
import ListSimple from "src/components/List/ListSimple.vue";
import Tabs from "src/pages/Balance/Tabs.vue";
import BalanceForm from "src/pages/Balance/Form.vue";
import PatrimonyForm from "src/pages/Balance/PatrimonyForm.vue";

export default {
  name: "PageIndex",
  components: { ListSimple, Tabs, BalanceForm, PatrimonyForm },
  computed: {
    ...mapWritableState(useBalanceStore, {
      balances: "list",
      loading: "loading",
    }),
  },
  data() {
    return {
      tab: {
        type: null,
        name: null,
        value: 0,
      },
    };
  },
  methods: {
    ...mapActions(useBalanceStore, ["load", "remove", "persistBalances"]),
    setEditing(index) {
      this.balances = this.balances.map((b, idx) => {
        return {
          ...b,
          isEditing: index === idx,
        };
      });
    },
    update() {
      this.balances = this.balances.map((b) => {
        delete b.isEditing;
        return { ...b };
      });

      this.persistBalances();
    },
  },
  mounted() {
    this.load();
  },
};
</script>

<style lang="scss" scoped>
::v-deep(.q-field--dense) {
  .q-field__control {
    height: inherit;

    .q-field__native {
      padding: 0 !important;
    }
  }
}
</style>
