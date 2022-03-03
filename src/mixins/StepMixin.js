export const Twosteps = {
  data() {
    return {
      steps: {
        actual: 1,
        validation: {
          1: false,
          2: false
        }
      }
    }
  }
}

export const ThreeSteps = {
  data() {
    return {
      steps: {
        actual: 1,
        validation: {
          1: false,
          2: false,
          3: false
        }
      }
    }
  },
  methods: {
    validateStepForm(step) {
      this.$refs['StepForm' + step]
        .validate()
        .then(success => {
          if (success) {
            this.steps[step] = true;
            this.steps.actual = step + 1
          }
        })

    }
  }
}

export default {
  data() {
    return {
      steps: {
        actual: 1,
        validation: {
          1: false,
          2: false,
          3: false,
          4: false,
          5: false,
          6: false
        }
      }
    }
  },
  methods: {
    validateStepForm(step) {
      this.$refs['StepForm' + step]
        .validate()
        .then(success => {
          if (success) {
            this.steps.validation[step] = true;
            this.steps.actual = step + 1
          }
        })

    }
  }
}
