<template>
  <q-page>
    <Simple :items="balances" emptyText="Nenhum Balanço localizado!">
      <template v-slot:default="{ item, index }">
        <q-item-section>
          <q-item-label>
            <q-input
              v-if="item.isEditing"
              dense
              borderless
              filled
              class="editable"
              v-model="edit.name"
              @keyup.enter="update(index)"
            />
            <span v-else>{{ item.name }}</span>
          </q-item-label>
          <q-item-label caption>
            <q-input
              v-if="item.isEditing"
              dense
              filled
              borderless
              type="number"
              step="0.01"
              class="editable"
              v-model="edit.value"
              @keyup.enter="update(index)"
            />
            <span
              v-else
              :class="{
                'text-negative': item.type === $CONST.FINANCE.BALANCE.COST,
                'text-positive': item.type === $CONST.FINANCE.BALANCE.INCOME,
              }"
            >
              {{ $formaters.money(item.value) }}
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
              @click="removeBalance(index)"
            />
            <q-fab-action
              text-color="info"
              icon="edit"
              @click="setEditing(index)"
            />
          </q-fab>
        </q-item-section>
      </template>
    </Simple>

    <q-tabs v-model="tab.type" inline-label dense class="q-mt-md">
      <q-tab
        :name="$CONST.FINANCE.BALANCE.COST"
        class="text-negative rounded"
        icon="add"
        label="Adicionar Passivo"
      >
        <q-tooltip>Adicionar Gasto</q-tooltip>
      </q-tab>
      <q-tab
        :name="$CONST.FINANCE.BALANCE.INCOME"
        class="text-positive rounded"
        icon="add"
        label="Adicionar Ativo"
      />
    </q-tabs>

    <q-tab-panels
      id="tab-panels"
      class="q-my-md rounded"
      v-model="tab.type"
      animated
    >
      <q-tab-panel :name="$CONST.FINANCE.BALANCE.COST">
        <q-icon
          name="close"
          size="sm"
          class="absolute"
          style="right: 5px; top: 5px; z-index: 5"
          @click="tab.type = null"
        />
        <q-input
          v-model="tab.name"
          placeholder="Nome do Custo"
          @keyup.enter="addBalanceFromTab"
        />
        <q-input
          v-model="tab.value"
          placeholder="Valor"
          type="number"
          step="0.01"
          @keyup.enter="addBalanceFromTab"
        />
      </q-tab-panel>
      <q-tab-panel :name="$CONST.FINANCE.BALANCE.INCOME">
        <q-icon
          name="close"
          size="sm"
          class="absolute"
          style="right: 5px; top: 5px; z-index: 5"
          @click="tab.type = null"
        />
        <q-input
          v-model="tab.name"
          placeholder="Nome da Renda"
          @keyup.enter="addBalanceFromTab"
        />
        <q-input
          v-model="tab.value"
          placeholder="Valor"
          type="number"
          step="0.01"
          @keyup.enter="addBalanceFromTab"
        />
      </q-tab-panel>
    </q-tab-panels>
  </q-page>
</template>

<script>
import Simple from "src/components/List/Simple.vue";

export default {
  components: { Simple },
  data() {
    return {
      balances: [],
      tab: {
        type: null,
        name: null,
        value: 0,
      },
      edit: {
        name: null,
        value: 0,
      },
    };
  },
  methods: {
    persistBalances() {
      this.$q.localStorage.set(
        this.$CONST.localStorage.FINANCE.BALANCES,
        this.balances.reduce((acc, cur) => {
          const { name, type, value } = cur;
          return [...acc, { name, type, value }];
        }, [])
      );
    },
    addBalanceFromTab() {
      if (!this.tab.name || !this.tab.value) {
        this.$q.notify({ type: "negative", message: "Insira nome e valor!" });
        return;
      }

      this.addBalance(this.tab);
      this.persistBalances();

      this.balance = null;
      this.valor = 0;
      this.$scrollTo("tab-panels");
    },
    addBalance(object) {
      const copy = { ...object };

      this.balances = [
        ...this.balances,
        {
          ...copy,
          isEditing: false,
          classes:
            "bg-white shadow-shine rounded q-mb-sm flex justify-between items-center",
        },
      ];
    },
    removeBalance(index) {
      this.balances = this.balances.filter((b, idx) => index !== idx);
      this.persistBalances();
    },
    setEditing(index) {
      this.balances = this.balances.map((b, idx) => {
        return {
          ...b,
          isEditing: index === idx,
        };
      });

      this.edit.name = this.balances.find((b, idx) => index === idx).name;
      this.edit.value = this.balances.find((b, idx) => index === idx).value;
    },
    update(index) {
      this.balances = this.balances.map((b, idx) => {
        return index === idx
          ? { ...b, isEditing: false, ...this.edit }
          : { ...b };
      });

      this.persistBalances();
      this.edit.name = null;
      this.edit.value = 0;
    },
  },
  mounted() {
    const balances = this.$q.localStorage.getItem(
      this.$CONST.localStorage.FINANCE.BALANCES
    );
    if (balances) {
      balances.map((b) => this.addBalance(b));
    }
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
