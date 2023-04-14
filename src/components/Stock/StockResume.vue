<script>
export default {
  props: {
    stock: Object,
  },
};
</script>

<template>
  <q-list dense>
    <q-item-label header>Resumo</q-item-label>

    <q-item>
      <q-item-section>
        <q-item-label lines="1">Quantidade</q-item-label>
        <!-- <q-item-label caption>de Ações até o momento</q-item-label> -->
      </q-item-section>
      <q-item-section side> {{ stock.quantity }} Ações </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label lines="1">Último fechamento</q-item-label>
      </q-item-section>
      <q-item-section side>
        {{ $formaters.money(stock.quotation.close) }}
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label lines="1">Preço Médio</q-item-label>
      </q-item-section>
      <q-item-section side>
        <span
          :class="{
            'text-positive': stock.averagePrice < stock.quotation.close,
            'text-negative': stock.averagePrice > stock.quotation.close,
            'text-grey': stock.averagePrice === stock.quotation.close,
          }"
        >
          {{ $formaters.money(stock.averagePrice) }}
        </span>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label lines="1">Resultado</q-item-label>
      </q-item-section>
      <q-item-section side>
        <span
          :class="{
            'text-positive': stock.result > 0,
            'text-negative': stock.result < 0,
            'text-grey': stock.result === 0,
          }"
        >
          {{ $formaters.money(stock.result) }}
        </span>
      </q-item-section>
    </q-item>
    <q-item />

    <q-item />
  </q-list>
</template>
