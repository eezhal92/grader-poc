<template>
  <div class="flex px-6">
    <div class="flex-1 pr-2">
      <div class="pb-2 mb-4 border-b-2 font-bold mr-2 border-gray-300">Question 1 of 1</div>

      <div>
        <p class="mb-2 mr-2">Finish the Greeter component so that it returns a div element with text "Hello {user}" where user is a prop passed to the component.</p>
        <p>For example, if user prop has value "Admin", the method should return "Hello Admin".</p>
      </div>
    </div>
    <div class="flex-1 bg-gray-200">
      <div class="flex justify-between p-4">
        <p>HTML, CSS, React v16</p>
        <button class="px-2 py-1 bg-blue-500 text-white rounded">Copy to IDE</button>
      </div>
      <div class="px-4">
        <div id="monaco" ref="monacoEntry"></div>
      </div>
      <div class="p-4">
        <div>
          <button @click="handleRun" class="px-6 py-2 text-lg rounded text-white bg-blue-500">Run</button>
        </div>
      </div>
      <div class="p-4">
        <div class="inline-block border-t border-l border-r rounded bg-gray-700 text-white py-2 px-4">
          Test: {{ testText }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createMonacoEditor } from '@/utils/code-editor';
import { feTest } from './fe-test';

function createID () {
  return Math.random().toString().slice(2);
}

export default {
  data () {
    return {
      code: '',
      sessionId: createID(),
      testText: '-',
    };
  },

  mounted () {
    this.initMonaco();
  },

  methods: {
    initMonaco () {
      const instance = createMonacoEditor({
        entryEl: this.$refs.monacoEntry,
        language: 'html',
        code: feTest.code,
      });
      const vm = this;
      vm.code = feTest.code;

      const model = instance.getModel();

      /** @var {Array<string>} each element is a line of code  */
      model.onDidChangeContent(() => {
        const content = model.getLinesContent().join('\n');
        vm.code = content;
      });
    },
    handleRun () {
      console.time('run');
      this.testText = 'Running the code...'
      fetch('http://localhost:4000/run', {
        method: 'post',
        body: JSON.stringify({
          sessionId: this.sessionId,
          code: this.code,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then((data) => {
          console.timeEnd('run');
          console.log(data);
          this.testText = '';
          const {
            numPassedTests,
            numFailedTests,
          } = data;

          this.testText = `${numPassedTests} pass / ${numFailedTests} fail`;
        })
        .catch((err) => {
          console.timeEnd('run');
          this.testText = '';
          throw err;
        });
    }
  }
}
</script>

<style lang="stylus" scoped>
#monaco {
  width: 800px;
  height: 360px;
  border: 1px solid #ccc;
}
</style>