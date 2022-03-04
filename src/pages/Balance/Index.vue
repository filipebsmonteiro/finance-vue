<template>
  <q-page>
    <Simple :items="balances" emptyText="Nenhum Balanço localizado!">
      <template v-slot:default="{ item, index }">
        <q-item-section>
          <q-item-label>
            {{ item.name }}
          </q-item-label>
          <q-item-label
            caption
            :class="{
              'text-negative': item.type === 'expense',
              'text-positive': item.type === 'income',
            }"
          >
            {{ $formaters.money(item.value) }}
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon
            name="las la-trash"
            size="sm"
            class="text-negative"
            @click="removeBalance(index)"
          />
        </q-item-section>
      </template>
    </Simple>

    <q-tabs v-model="tab" inline-label dense class="q-mt-md">
      <q-tab
        name="expense"
        class="text-negative rounded"
        icon="add"
        label="Adicionar Passivo"
      >
        <q-tooltip>Adicionar Gasto</q-tooltip>
      </q-tab>
      <q-tab
        name="income"
        class="text-positive rounded"
        icon="add"
        label="Adicionar Ativo"
      />
    </q-tabs>

    <q-tab-panels
      id="tab-panels"
      class="q-my-md rounded"
      v-model="tab"
      animated
    >
      <q-tab-panel name="expense">
        <q-icon
          name="close"
          size="sm"
          class="absolute"
          style="right: 5px; top: 5px; z-index: 5"
          @click="tab = null"
        />
        <q-input
          v-model="balance"
          placeholder="Nome do Custo"
          @keyup.enter="insertBalance"
        />
        <q-input
          v-model="valor"
          placeholder="Valor"
          type="number"
          step="0.01"
          @keyup.enter="insertBalance"
        />
      </q-tab-panel>
      <q-tab-panel name="income">
        <q-icon
          name="close"
          size="sm"
          class="absolute"
          style="right: 5px; top: 5px; z-index: 5"
          @click="tab = null"
        />
        <q-input
          v-model="balance"
          placeholder="Nome da Renda"
          @keyup.enter="insertBalance"
        />
        <q-input
          v-model="valor"
          placeholder="Valor"
          type="number"
          step="0.01"
          @keyup.enter="insertBalance"
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
      balance: null,
      valor: 0,
      tab: null,
    };
  },
  methods: {
    persistBalances() {
      this.$q.localStorage.set(
        this.$CONST.localStorage.FINANCE.BALANCES,
        this.balances
      );
    },
    insertBalance() {
      if (!this.balance || !this.valor) {
        this.$q.notify({ type: "negative", message: "Insira nome e valor!" });
        return;
      }

      this.balances = [
        ...this.balances,
        {
          name: this.balance,
          value: this.valor,
          type: this.tab,
          classes:
            "bg-white shadow-shine rounded q-mb-sm flex justify-between items-center",
        },
      ];
      this.balance = null;
      this.valor = 0;
      this.$scrollTo("tab-panels");
      this.persistBalances();
    },
    removeBalance(index) {
      this.balances = this.balances.filter((b, idx) => index !== idx);
      this.persistBalances();
    },
  },
  mounted() {
    this.balances = this.$q.localStorage.getItem(
      this.$CONST.localStorage.FINANCE.BALANCES
    );
    this.balances = this.balances ? this.balances : [];
  },
};
</script>
