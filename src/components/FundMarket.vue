<template>
  <div>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%"
      v-loading="loading"
      element-loading-text="数据加载中"
      element-loading-spinner="el-icon-loading"
    >
      <el-table-column
        prop="id"
        label="基金代码"
        width="90"
        :formatter="idFormatter"
      >
      </el-table-column>
      <el-table-column prop="name" label="基金名称" width="180">
      </el-table-column>
      <el-table-column prop="type" label="基金类型" width="120">
      </el-table-column>
      <el-table-column prop="managerName" label="基金经理" width="120">
      </el-table-column>
      <el-table-column
        prop="releaseDate"
        label="发行日期"
        width="120"
        :formatter="dateFormatter"
      >
      </el-table-column>
      <el-table-column prop="currentPrice" label="当前净值" width="120">
      </el-table-column>
      <el-table-column
        prop="currentPrice"
        label="平均年回报率"
        width="120"
        :formatter="returnRateFormatter"
      >
      </el-table-column>
      <el-table-column prop="investmentObjectives" label="投资目标">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="关注"
        width="60"
        align="center"
        header-align="center"
      >
        <template #default="scope">
          <el-button @click="toggleFavorite(scope)" type="text" size="medium"
            ><i
              class="el-icon-star-on"
              style="font-size: 20px; color: orange"
              v-if="scope.row.isFavorite == true"
            ></i
            ><i
              class="el-icon-star-off"
              style="font-size: 20px; color: orange"
              v-if="scope.row.isFavorite != true"
            ></i
          ></el-button>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="80"
        align="center"
        header-align="center"
      >
        <template #default="scope">
          <el-button @click="openDrawer(scope.row)" type="text" size="small"
            >查看详情</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-drawer
      :title="title"
      :visible.sync="drawer"
      :direction="direction"
      :before-close="handleClose"
      size="50%"
    >
      <el-collapse v-model="activeNames">
        <el-collapse-item title="基本信息" name="1">
          <el-tree
            :data="basicData"
            node-key="id"
            :default-expanded-keys="[1, 2, 3, 4, 5, 6, 7, 8]"
          ></el-tree>
        </el-collapse-item>
        <el-collapse-item title="投资目标" name="2">
          <div>
            {{ activeData.investmentObjectives }}
          </div>
        </el-collapse-item>
        <el-collapse-item title="投资范围" name="3">
          <div>
            {{ activeData.investmentScope }}
          </div>
        </el-collapse-item>
        <el-collapse-item title="投资策略" name="4">
          <div>
            {{ activeData.investmentStrategy }}
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-drawer>
  </div>
</template>


<script>
export default {
  data() {
    return {
      loading: true,
      title: "",
      direction: "rtl",
      tableData: [],
      drawer: false,
      activeNames: ["2", "3"],
      basicData: {},
      activeData: {},
    };
  },
  methods: {
    toggleFavorite(scope) {
      if (scope.row.isFavorite) {
        this.$http
          .post(
            "/favorite/removeFavorite",
            {
              fid: scope.row.id,
            },
            { withCredentials: true }
          )
          .then((res) => {
            if (res.data.success) {
              let tmp = this.tableData[scope.$index];
              tmp.isFavorite = !tmp.isFavorite;
              this.$set(this.tableData, scope.$index, tmp);
              this.$notify({
                title: "操作成功",
                message: "已移除关注",
                type: "success",
              });
            }
          })
          .catch((error) => {
            this.$message.error("网络异常错误！");
            console.log(error);
          });
      } else {
        this.$http
          .post(
            "/favorite/addFavorite",
            {
              fid: scope.row.id,
            },
            { withCredentials: true }
          )
          .then((res) => {
            if (res.data.success) {
              let tmp = this.tableData[scope.$index];
              tmp.isFavorite = !tmp.isFavorite;
              this.$set(this.tableData, scope.$index, tmp);
              this.$notify({
                title: "操作成功",
                message: "已添加关注",
                type: "success",
              });
            }
          })
          .catch((error) => {
            this.$message.error("网络异常错误！");
            console.log(error);
          });
      }
    },
    openDrawer(row) {
      this.title = row.name;
      this.drawer = true;
      this.activeData = row;
      // formater
      this.basicData = [
        {
          label: "基金代码",
          id: 1,
          children: [
            {
              label: this.idFormatter(null, null, row.id),
            },
          ],
        },
        {
          label: "基金名称",
          id: 2,
          children: [
            {
              label: row.name,
            },
          ],
        },
        {
          label: "基金全名",
          id: 3,
          children: [
            {
              label: row.fullName,
            },
          ],
        },
        {
          label: "基金类型",
          id: 4,
          children: [
            {
              label: row.type,
            },
          ],
        },
        {
          label: "基金经理",
          id: 5,
          children: [
            {
              label: row.managerName,
            },
          ],
        },
        {
          label: "发行日期",
          id: 6,
          children: [
            {
              label: this.dateFormatter(null, null, row.releaseDate),
            },
          ],
        },
        {
          label: "当前净值",
          id: 7,
          children: [
            {
              label: row.currentPrice,
            },
          ],
        },
        {
          label: "平均年回报率",
          id: 8,
          children: [
            {
              label: this.returnRateFormatter(row),
            },
          ],
        },
      ];
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(() => {
          done();
        })
        .catch(() => {});
    },
    idFormatter(row, column, cellValue) {
      let res = cellValue.toString();
      let len = res.length;
      for (let index = 0; index < 6 - len; index++) {
        res = "0" + res;
      }
      return res;
    },
    dateFormatter(row, column, cellValue) {
      return cellValue.toLocaleDateString();
    },
    returnRateFormatter(row) {
      let timebetween = (new Date() - row.releaseDate) / 60 / 60 / 24 / 1000;
      return ((row.currentPrice / timebetween) * 365 * 100).toFixed(3) + " %";
    },
    updateFundData() {
      this.loading = true;
      this.tableData = [];
      this.$http
        .get("/fund/getFundList")
        .then((res) => {
          if (res.data.success) {
            res.data.success.forEach((row) => {
              row.releaseDate = new Date(row.releaseDate);
            });
            // this.tableData = res.data.success;
            switch (this.$route.meta.sorterOrFilter) {
              case "LatestFund":
                res.data.success.sort(function (a, b) {
                  return b.releaseDate - a.releaseDate;
                });
                this.tableData = res.data.success;
                break;
              case "PerformanceRanking":
                res.data.success.sort(function (a, b) {
                  let timebetween = new Date() - a.releaseDate;
                  a = a.currentPrice / timebetween;
                  timebetween = new Date() - b.releaseDate;
                  b = b.currentPrice / timebetween;
                  return b - a;
                });
                this.tableData = res.data.success;
                break;

              case "ValuationRanking":
                res.data.success.sort(function (a, b) {
                  return b.currentPrice - a.currentPrice;
                });
                this.tableData = res.data.success;
                break;
              case "DebateFund":
                this.tableData = res.data.success.filter(
                  (fundItem) => fundItem.type.indexOf("债券") != -1
                );
                break;
              case "non-DebateFund":
                this.tableData = res.data.success.filter(
                  (fundItem) => fundItem.type.indexOf("债券") == -1
                );
                break;
              case "MyFund":
                this.$http
                  .get("/favorite/getSelfFavorite")
                  .then((res2) => {
                    if (res2.data.success) {
                      this.tableData = res.data.success.filter((fundItem) => {
                        for (
                          let index = 0;
                          index < res2.data.success.length;
                          index++
                        ) {
                          const record = res2.data.success[index];
                          if (record.fid == fundItem.id) {
                            return true;
                          }
                        }
                        return false;
                      });
                      for (
                        let index = 0;
                        index < this.tableData.length;
                        index++
                      ) {
                        this.tableData[index].isFavorite = true;
                      }
                      this.loading = false;
                    }
                  })
                  .catch((error) => {
                    this.$message.error("获取数据失败，异常错误！");
                    console.log(error);
                  });
                break;

              default:
                break;
            }
            //处理非MyFund页面（同步）
            if (this.$route.meta.sorterOrFilter != "MyFund") {
              this.$http
                .get("/favorite/getSelfFavorite")
                .then((res) => {
                  if (res.data.success) {
                    for (
                      let index = 0;
                      index < this.tableData.length;
                      index++
                    ) {
                      let flag = false;
                      res.data.success.forEach((element) => {
                        if (this.tableData[index].id == element.fid) {
                          flag = true;
                        }
                      });
                      this.tableData[index].isFavorite = flag;
                      this.$set(this.tableData, 0, this.tableData[0]); //刷新
                    }
                  }
                })
                .catch((error) => {
                  this.$message.error("获取数据失败，异常错误！");
                  console.log(error);
                });
              this.loading = false;
            }
          } else {
            this.$message.error("获取数据失败!");
            console.log(res.data.error);
          }
        })
        .catch((error) => {
          this.$message.error("获取数据失败，异常错误！");
          console.log(error);
        });
    },
  },
  watch: {
    $route() {
      this.updateFundData();
    },
  },
  mounted: function () {
    this.updateFundData();
  },
};
</script>

<style>
.el-drawer__body {
  padding: 0 20px;
}
</style>