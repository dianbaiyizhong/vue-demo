<template>
  <div>
    <el-dialog title="cron选择器" :visible.sync="cronVisibleValue" width="50%">
      <div class="cron">
        <el-tabs v-model="activeName">
          <el-tab-pane label="秒" name="s">
            <second-and-minute v-model="sVal" lable="秒"></second-and-minute>
          </el-tab-pane>
          <el-tab-pane label="分" name="m">
            <second-and-minute v-model="mVal" lable="分"></second-and-minute>
          </el-tab-pane>
          <el-tab-pane label="时" name="h">
            <hour v-model="hVal" lable="时"></hour>
          </el-tab-pane>
          <el-tab-pane label="日" name="d">
            <day v-model="dVal" lable="日"></day>
          </el-tab-pane>
          <el-tab-pane label="月" name="month">
            <month v-model="monthVal" lable="月"></month>
          </el-tab-pane>
          <el-tab-pane label="周" name="week">
            <week v-model="weekVal" lable="周"></week>
          </el-tab-pane>
          <el-tab-pane label="年" name="year">
            <year v-model="yearVal" lable="年"></year>
          </el-tab-pane>
        </el-tabs>
        <!-- table -->
        <el-table :data="tableData" size="mini" border style="width: 100%">
          <el-table-column prop="sVal" label="秒" width="70"> </el-table-column>
          <el-table-column prop="mVal" label="分" width="70"> </el-table-column>
          <el-table-column prop="hVal" label="时" width="70"> </el-table-column>
          <el-table-column prop="dVal" label="日" width="70"> </el-table-column>
          <el-table-column prop="monthVal" label="月" width="70">
          </el-table-column>
          <el-table-column prop="weekVal" label="周" width="70">
          </el-table-column>
          <el-table-column prop="yearVal" label="年"> </el-table-column>
        </el-table>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogDataVisible = false">取 消</el-button>
        <el-button type="primary" @click="ok">确 定</el-button>
      </span>
    </el-dialog>

    <el-input
      placeholder="请输入cron表达式"
      v-model="inputValue"
      :disabled="cronDisable"
    >
      <i slot="suffix" class="el-input__icon el-icon-date" @click="open"></i>
    </el-input>
  </div>
</template>

<script>
// https://www.cnblogs.com/lhuser/p/11269546.html
// https://www.jb51.net/article/98881.htm vue组件双向绑定
import SecondAndMinute from "./cron/secondAndMinute";
import hour from "./cron/hour";
import day from "./cron/day";
import month from "./cron/month";
import week from "./cron/week";
import year from "./cron/year";
export default {
  props: {
    value: {
      type: String,
    },
    cronDisable: {
      type: Boolean,
      default: false,
    },
    cronVisible: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    value(val) {
      this.inputValue = val;
    },
    inputValue(val) {
      this.$emit("cronChange", val); // 组件内对inputValue变更后向外部发送事件通知
    },
  },
  data() {
    return {
      /**
       *   解决[ Avoid mutating a prop directly since the value will be overwritten whenever the parent component re-renders]
       *   vue组件中value作为props不允许改，因此定义一个局部变量，并用 prop 的值初始化它
       */
      inputValue: this.value,
      cronVisibleValue: this.cronVisible,
      activeName: "s",
      sVal: "",
      mVal: "",
      hVal: "",
      dVal: "",
      monthVal: "",
      weekVal: "",
      yearVal: "",
    };
  },
  computed: {
    tableData() {
      return [
        {
          sVal: this.sVal,
          mVal: this.mVal,
          hVal: this.hVal,
          dVal: this.dVal,
          monthVal: this.monthVal,
          weekVal: this.weekVal,
          yearVal: this.yearVal,
        },
      ];
    },
  },
  methods: {
    open() {
      if (this.cronDisable) {
        return;
      }

      this.cronVisibleValue = true;
      this.updateVal();
    },

    ok() {
      this.cronVisibleValue = false;
      this.inputValue = this.getCronExpress();
    },

    getCronExpress() {
      // if (!this.dVal && !this.weekVal) {
      //   return "";
      // }
      // if (this.dVal === "?" && this.weekVal === "?") {
      //   this.$message.error("日期与星期不可以同时为“不指定”");
      // }
      // if (this.dVal !== "?" && this.weekVal !== "?") {
      //   this.$message.error("日期与星期必须有一个为“不指定”");
      // }
      let v = `${this.sVal} ${this.mVal} ${this.hVal} ${this.dVal} ${this.monthVal} ${this.weekVal} ${this.yearVal}`;
      // if (v !== this.value) {
      //   this.$emit("input", v);
      // }
      return v;
    },
    updateVal() {
      if (!this.inputValue) {
        return;
      }
      let arrays = this.inputValue.split(" ");
      this.sVal = arrays[0];
      this.mVal = arrays[1];
      this.hVal = arrays[2];
      this.dVal = arrays[3];
      this.monthVal = arrays[4];
      this.weekVal = arrays[5];
      this.yearVal = arrays[6];
    },
  },
  created() {
    this.updateVal();
  },
  components: {
    SecondAndMinute,
    hour,
    day,
    month,
    week,
    year,
  },
};
</script>

<style lang="css">
.cron {
  text-align: left;
  padding: 10px;
  background: #fff;
  border: 1px solid #dcdfe6;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.12), 0 0 6px 0 rgba(0, 0, 0, 0.04);
}
</style>
