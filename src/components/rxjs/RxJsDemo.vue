<template>
  <div></div>
</template>

<script>
import { from, forkJoin } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import axios from "axios";

export default {
  mounted() {
    // 先登录，登录成功后，拿到用户id，再同时请求用户信息以及订单信息

    let login$ = axios.get("/mock/login");

    let getUserInfo$ = axios.get("/mock/getUserInfo");

    let getOrder$ = axios.get("/mock/getOrder");

    from(login$)
      .pipe(
        map((resp) => {
          if (resp.data.code == 0) {
            return resp.data.data;
          } else {
            throw new Error("登录失败");
          }
        }),
        switchMap((userId) => {
          return forkJoin([getUserInfo$, getOrder$]);
        }),
        map((respArr) => {
          return [respArr[0].data, respArr[1].data];
        })
      )
      .subscribe({
        next: (respArr) => {
          console.info(respArr);
        },
        error: (error) => {
          console.info(error.message);
        },
        complete: () => {
          console.info("complete!!!");
        },
      });
  },
};
</script>

<style>
</style>