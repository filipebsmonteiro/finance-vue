<template>
  <q-tabs dense v-model="tab" class="bg-grey-3">
    <q-tab name="Tempo" icon="alarm" label="Tempo" />
    <q-tab name="Financeiro" icon="money" label="Financeiro" />
    <q-tab name="Patrimonio" icon="slow_motion_video" label="Patrimônio" />
  </q-tabs>

  <q-tab-panels class="bg-transparent" v-model="tab" animated>
    <q-tab-panel name="Tempo" class="bg-white shadow-1">
      <div class="q-pa-md">
        <p class="q-mb-none flex justify-start">
          Projetar
          <q-badge class="q-mx-sm" rounded> {{ month.simulator }} </q-badge>
          Meses
        </p>
        <q-slider
          v-model="month.simulator"
          :min="0"
          :max="1440"
          :step="1"
          snap
          label
        />
        <p class="q-mb-none text-caption">
          Independência em:
          <b class="q-mx-xs">
            {{ parseInt(month.independency / 12) }}
          </b>
          Anos e
          <b class="q-mx-xs" rounded>
            {{ month.independency % 12 }}
          </b>
          Meses
        </p>
      </div>
    </q-tab-panel>

    <q-tab-panel name="Financeiro" class="bg-white shadow-1">
      <div class="q-pa-md">
        <div class="row">
          <div class="col">
            <q-badge color="secondary">
              {{ $formaters.money(patrimony) }}
            </q-badge>
          </div>
          <b class="q-ma-none col text-center"> Patrimônio </b>
          <div class="col flex justify-end">
            <q-badge
              outline
              rounded
              color="secondary"
              class="cursor-pointer"
              @click="double(`patrimony`)"
            >
              x2
              <q-tooltip>Dobrar Limite patrimônio</q-tooltip>
            </q-badge>
          </div>
        </div>
        <q-slider
          v-model="patrimony"
          :min="0"
          :max="max.patrimony"
          :step="100"
          snap
          label
          :label-value="$formaters.money(patrimony)"
          color="secondary"
        />

        <div class="row">
          <div class="col">
            <q-badge color="red"> {{ $formaters.money(costs) }} </q-badge>
          </div>
          <b class="q-ma-none col text-center"> Gastos </b>
          <div class="col flex justify-end">
            <q-badge
              outline
              rounded
              color="red"
              class="cursor-pointer"
              @click="double(`costs`)"
            >
              x2
              <q-tooltip>Dobrar Limite gastos</q-tooltip>
            </q-badge>
          </div>
        </div>
        <q-slider
          v-model="costs"
          :min="0"
          :max="max.costs"
          :step="100"
          snap
          label
          :label-value="$formaters.money(costs)"
          color="red"
        />

        <div class="row">
          <div class="col">
            <q-badge color="positive">
              {{ $formaters.money(incomes) }}
            </q-badge>
          </div>
          <b class="q-ma-none col text-center"> Ganhos </b>
          <div class="col flex justify-end">
            <q-badge
              outline
              rounded
              color="positive"
              class="cursor-pointer"
              @click="double(`incomes`)"
            >
              x2
              <q-tooltip>Dobrar Limite ganhos</q-tooltip>
            </q-badge>
          </div>
        </div>
        <q-slider
          v-model="incomes"
          :min="0"
          :max="max.incomes"
          :step="100"
          snap
          label
          :label-value="$formaters.money(incomes)"
          color="positive"
        />
      </div>
      <q-btn label="Resetar" @click="reset" />
    </q-tab-panel>

    <q-tab-panel name="Patrimonio" class="bg-white shadow-1">
      <div class="q-pa-md">
        <p>
          Seu saldo Ao fim do mês é:
          <b>{{ $formaters.money(incomes - costs) }}</b>
        </p>
        Com seu patrimonio atual. Para alcançar a independência em
        <q-input type="number" v-model="months" class="inline">
          <template v-slot:prepend>
            <q-btn flat rounded icon="remove" @click="months--" />
          </template>
          <template v-slot:append>
            <q-btn flat rounded icon="add" @click="months++" />
          </template>
        </q-input>
        Meses:
        <ul>
          <li>
            <b>
              Seu <u>patrimônio</u> acumulado deve ser:
              <span class="text-secondary">
                {{ $formaters.money(independency.patrimony) }}
              </span>
            </b>
          </li>
          <li>
            <b>
              Seus <u>Rendimentos</u> serão:
              <span class="text-positive">
                {{ $formaters.money(independency.investmentIncome) }}
              </span>
            </b>
          </li>
          <li>
            <b>
              Seus <u>custos</u> corrigidos pela inflação:
              <span class="text-red">
                {{ $formaters.money(independency.costsOnFuture) }}
              </span>
            </b>
          </li>
        </ul>
      </div>
    </q-tab-panel>
  </q-tab-panels>
</template>

<script>
import { mapWritableState } from "pinia";
import { useProjectionStore } from "src/stores/projection";

export default {
  name: "FreedomSimulator",
  computed: {
    ...mapWritableState(useProjectionStore, [
      "reset",
      "patrimony",
      "incomes",
      "costs",
      "month",
      "investment",
      "inflation",
    ]),
    independency() {
      // TODO: Validar melhor com negativos oque pode impedir a independencia

      const costGrowthPercentage = this.inflation / 100;
      const costsOnFuture = [...Array(parseInt(this.months))].reduce(
        (acc) => parseFloat((acc + acc * costGrowthPercentage).toFixed(2)),
        this.costs
      );

      const investmentGrowthPercentage = this.investment / 100;
      const initialPatrimony = this.patrimony > 0 ? this.patrimony : 1;
      const initialInvestmentIncome = parseFloat(
        (initialPatrimony * investmentGrowthPercentage).toFixed(2)
      );
      let investmentIncome = initialInvestmentIncome;
      let patrimony = initialPatrimony;
      while (investmentIncome < costsOnFuture) {
        investmentIncome = parseFloat(
          (patrimony * investmentGrowthPercentage).toFixed(2)
        );
        patrimony += parseFloat(
          (this.incomes - this.costs + investmentIncome).toFixed(2)
        ); // Adicionar investimentIncome é juros compostos
      }

      return {
        costsOnFuture,
        investmentIncome,
        patrimony,
      };
    },
  },
  data() {
    return {
      tab: "Tempo",
      months: 24,
      max: {
        patrimony: 100000,
        incomes: 100000,
        costs: 100000,
      },
    };
  },
  methods: {
    double(value) {
      this.max[value] *= 2;
    },
  },
};
</script>
