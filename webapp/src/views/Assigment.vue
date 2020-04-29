<template>
  <div class="about">
    <div class="flex">
      <div class="mx-6" style="width: 400px">
        <h1>Find Max of An Array</h1>
        <div class="mb-2">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio laborum nulla tenetur quis pariatur quibusdam eius officiis, exercitationem, iure expedita perspiciatis eligendi ut officia quos velit! Unde aliquam dolorum quod.</div>
        <pre class="overflow-x-scroll p-4 bg-gray-800 text-white">{{ output }}</pre>
      </div>
      <div class="flex: 1 1 0%">
        <button
          :disabled="isExecuting"
          class="execute-button p-2 mb-2 bg-green-500 text-white"
          :class="{ 'execute-button--disabled': isExecuting }"
          @click="handleExecute"
        >
          Execute
        </button>
        <div id="monaco" ref="monacoEntry"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import * as assignmentApi from '@/api/assigment';
import { mapGetters } from 'vuex';

export default {
  data () {
    return {
      isExecuting: false,
      code: '',
      output: '',
    };
  },

  computed: {
    ...mapGetters([
      'session',
    ]),
  },

  mounted () {
    assignmentApi.getTemplate(this.session)
      .then((data) => {
        this.code = data.template;
        this.createMonacoEditor();
      });
  },

  methods: {
    createMonacoEditor () {
      const languangeMap = {
        golang: 'go',
        python: 'python',
        nodejs: 'javascript',
      };
      const language = languangeMap[this.session.runtime];

      this.monacoInstance = monaco.editor.create(
        this.$refs.monacoEntry,
        {
          value: this.code,
          language,
          theme: 'vs-dark'
        }
      );

      const monacoModel = this.monacoInstance.getModel();
      monacoModel.onDidChangeContent(this.handleMonacoContentChange);
    },
    handleMonacoContentChange () {
      const monacoModel = this.monacoInstance.getModel();

      /** @var {Array<string>} html each element is a line of code  */
      const content = monacoModel.getLinesContent().join('\n');
      this.code = content;
    },
    handleExecute () {
      this.execute();
    },
    execute () {
      this.isExecuting = true;
      this.output = 'Please wait, executing the code...';
      return assignmentApi.submit({
        ...this.session,
        solution: this.code,
      })
        .then((data) => {
          this.output = data.result;
        })
        .finally(() => {
          this.isExecuting = false;
        });
    }
  }
}
</script>

<style lang="stylus" scoped>
#monaco {
  width:800px;
  height:600px;
  border:1px solid #ccc;
}

.execute-button--disabled {
  opacity: 0.6;
}
</style>