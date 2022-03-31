<template>
  <div>
    <q-file
      filled
      use-chips
      v-model="model"
      :bg-color="bgColor"
      :label="label"
      :multiple="multiple"
      :rules="rules"
      :hint="hint"
      class="q-mb-lg"
      @input="addFile"
    >
      <template v-slot:default>
        <div class="flex column flex-center fit">
          <q-icon name="cloud_upload" size="lg" />
          <h5 class="q-my-sm">Carregar arquivos</h5>
        </div>
      </template>
      <template v-slot:selected />
    </q-file>
    <q-list v-if="files && files.length > 0" separator>
      <q-item
        v-for="file in files"
        :key="file.__key"
        clickable
        class="bg-blue-2 rounded items-center"
      >
        <q-item-section>
          <q-item-label class="full-width ellipsis">
            <b>{{ file.name }}</b>
          </q-item-label>

          <q-item-label caption>
            {{ file.__sizeLabel }}
          </q-item-label>
        </q-item-section>

        <q-item-section top side>
          <q-btn
            flat
            round
            color="negative"
            icon="delete"
            @click="removeFile(file)"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
    },
    hint: {
      type: String,
      default: null,
    },
    rules: {
      type: Array,
      default: () => [],
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    bgColor: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      model: null,
      files: [],
    };
  },
  methods: {
    addFile(evt) {
      Array.from(evt.target.files).forEach((f) => {
        let file = new File([f], f.name, { type: f.type });
        file.__sizeLabel = this.$formaters.bytesToSize(file.size);
        file.__key = f.__key;
        this.files.push(file);
      });
      this.$emit("input", this.files);
    },
    removeFile(file) {
      this.files = this.files.filter((f) => f.__key !== file.__key);
    },
  },
};
</script>

<style lang="scss" scoped>
:deep(.q-field__native.row) {
  display: none;
}

:deep(.q-item) {
  margin-bottom: 5px;

  @media screen and (max-width: 425px) {
    padding: 0px 10px;
  }
}
</style>
