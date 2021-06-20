<template>
  <div id="monaco">
  </div>
</template>

<script>
//https://segmentfault.com/a/1190000021935409
//https://blog.csdn.net/gao_grace/article/details/88890895
// import * as monaco from 'monaco-editor/esm/vs/editor/editor.api.js';
import * as monaco from "monaco-editor";
import { codemirror } from 'vue-codemirror'

import "monaco-editor/esm/vs/basic-languages/sql/sql.contribution";
import 'codemirror/addon/hint/anyword-hint.js';

export default {
  data() {
    return {
      monacoInstance: null,
      provider: null,
      hints: [
        "SELECT",
        "INSERT",
        "DELETE",
        "UPDATE",
        "CREATE TABLE",
        "DROP TABLE",
        "ALTER TABLE",
        "CREATE VIEW",
        "DROP VIEW",
        "CREATE INDEX",
        "DROP INDEX",
        "CREATE PROCEDURE",
        "DROP PROCEDURE",
        "CREATE TRIGGER",
        "DROP TRIGGER",
        "CREATE SCHEMA",
        "DROP SCHEMA",
        "CREATE DOMAIN",
        "ALTER DOMAIN",
        "DROP DOMAIN",
        "GRANT",
        "DENY",
        "REVOKE",
        "COMMIT",
        "ROLLBACK",
        "SET TRANSACTION",
        "DECLARE",
        "EXPLAN",
        "OPEN",
        "FETCH",
        "CLOSE",
        "PREPARE",
        "EXECUTE",
        "DESCRIBE",
        "FORM",
        "ORDER BY",
      ],
    };
  },
  mounted() {
    this.monacoInstance = monaco.editor.create(
      document.getElementById("monaco"),
      {
        value: `select * from t where id = 1`,
        language: "sql",
      }
    );
  },
};
</script>

<style>
#monaco {
  height: 500px;
}
</style>