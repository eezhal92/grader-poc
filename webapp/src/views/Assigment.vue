<template>
  <div class="about" style="max-height: calc(100vh - 56px);">
    <div class="flex">
      <div class="mx-6" style="width: 420px; max-height: 100%; overflow-y: scroll;">
        <h1 class="font-bold text-2xl mb-6">{{ problem.title }}</h1>
        <div class="problem mb-8" v-html="problem.description"></div>
        <div v-show="output" class="border rounded p-4">
          <h2 class="mb-4 font-bold">Output</h2>
          <pre style="background: #f3f7f7" class="overflow-x-scroll p-4">{{ output }}</pre>
        </div>
      </div>

      <div class="flex: 1 1 0%">
        <div class="text-right">
          <button
            :disabled="isExecuting"
            class="execute-button rounded mr-2 p-2 bg-white mb-2 border text-gray-700"
            :class="{ 'execute-button--disabled': isExecuting }"
            @click="handleExecute"
          >
            <img class="inline" style="width: 14px; height: 14px" src="https://media.geeksforgeeks.org/img-practice/play-1596780125.svg" alt=""> Compile &amp; Run
          </button>
          <button class="rounded p-2 bg-green-500 text-white">Submit</button>
        </div>
        <div id="monaco" ref="monacoEntry"></div>
      </div>
    </div>
  </div>
</template>

<script>
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";
import * as assignmentApi from '@/api/assigment';
import { mapGetters } from 'vuex';

const testMap = {
  find_max: {
    title: 'Find Maximum Number',
    description: `
    <div class="problem-statement">
      <p></p><p><span style="font-size:18px">Given a number <strong>N</strong>, write a program to find a maximum number of a set of numbers.<br>

      <p>&nbsp;</p>

      <p><span style="font-size:18px"><strong>Your Task:</strong><br>
      You don't need to read input or print anything. Your task is to complete the function <strong>findMax()</strong> which takes a String N as input and returns the answer.</span></p>

      <p>&nbsp;</p>

      <p><span style="font-size:18px"><strong>Expected Time Complexity:</strong> O(|N|)<br>
      <strong>Expected Auxiliary Space:</strong> O(constant)</span></p>

      <p>&nbsp;</p>

      <p><span style="font-size:18px"><strong>Constraints:</strong></span><br>
      <span style="font-size:18px">1 &lt;= |N| &lt;= 10<sup>5</sup></span></p>
      <p></p>          
  </div>
  `
  },
  royalrumble: {
    title: 'Royal Rumble',
    description: '<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod temporibus iste sequi nesciunt laborum, accusantium consequuntur eligendi voluptatibus omnis sunt blanditiis neque beatae? Totam optio veritatis facere quibusdam. Vel, ipsum.</p>'
  }
}

export default {
  data () {
    return {
      isExecuting: false,
      code: '',
      output: '',
      showOutput: false,
    };
  },

  computed: {
    ...mapGetters([
      'session',
    ]),
    problem () {
      return testMap[this.session.testId];
    },
  },

  mounted () {
    assignmentApi.getTemplate(this.session)
      .then((data) => {
        this.code = data.template;
        this.createMonacoEditor();
      })
      .catch((err) => {
        alert(err.message + `. payload: ${JSON.stringify(this.session)}`);

        throw err;
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
          theme: 'vs-light',
          minimap: { enabled: false },
          fontSize: 16,
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
      this.showOutput = true;
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
  width: 800px;
  height: 520px;
  border: 1px solid #ccc;
}

.execute-button--disabled {
  opacity: 0.6;
}

.problem pre {
  background: #ececec;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 4px;
}
</style>