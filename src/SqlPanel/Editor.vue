<template>
  <div  class="monaco" ref="monaco">
  </div>
</template>

<script>
//https://segmentfault.com/a/1190000021935409
//https://blog.csdn.net/gao_grace/article/details/88890895
import * as monaco from "monaco-editor";
import "monaco-editor/esm/vs/basic-languages/sql/sql.contribution";

export default {
  name: "editor",
  created() {
    let that = this;
    setTimeout(function () {
      that.monacoInstance = monaco.editor.create(that.$refs.monaco, {
        automaticLayout: true,
        value: `select * from t where id = 1`,
        language: "sql",
      });
    }, 200);
  },
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
};
</script>

<style  scoped>
.monaco {
  height: 500px;
}
</style>