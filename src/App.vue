<template>
  <div id="app">
    <el-container>
      <el-header>
        <!-- header begin -->
        <el-row>
          <el-col :xs="8" :sm="11" :md="14" :lg="17" :xl="19">
            <el-menu
              :default-active="'MyFund'"
              class="el-menu-demo"
              mode="horizontal"
              @select="changeMainComponent"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
            >
              <el-submenu index="1">
                <template slot="title">我的基金</template>
                <el-menu-item index="PosInfo" v-on:click="changeMainComponent">持仓信息</el-menu-item>
                <el-menu-item index="IncomeBreakdown" v-on:click="changeMainComponent">收益明细</el-menu-item>
                <el-menu-item index="TransactionRecord" v-on:click="changeMainComponent">交易记录</el-menu-item>
              </el-submenu>
              <el-submenu index="2">
                <template slot="title">基金市场</template>
                <el-menu-item index="LatestFund" v-on:click="changeMainComponent">新发基金</el-menu-item>
                <el-submenu index="2-2">
                  <template slot="title">基金排行</template>
                  <el-menu-item index="PerformanceRanking" v-on:click="changeMainComponent">业绩排行</el-menu-item>
                  <el-menu-item index="ValuationRanking" v-on:click="changeMainComponent">估值排行</el-menu-item>
                </el-submenu>
                <el-submenu index="2-3">
                  <template slot="title">基金推荐</template>
                  <el-menu-item index="DebateFund" v-on:click="changeMainComponent">稳健债基</el-menu-item>
                  <el-menu-item index="StockFund" v-on:click="changeMainComponent">股票基金</el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-menu-item index="MyFund">自选基金</el-menu-item>
            </el-menu>
          </el-col>

          <el-col :xs="8" :sm="7" :md="6" :lg="4" :xl="3">
            <el-input
              placeholder="请输入想要搜索的基金"
              prefix-icon="el-icon-search"
              clearable
              v-model="inputSearchFund"
            ></el-input>
          </el-col>
          <el-col id="personalInfoPanel" :xs="8" :sm="6" :md="4" :lg="3" :xl="2">
            <el-avatar
              size="large"
              id="mainAvatar"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            ></el-avatar>
            <el-dropdown trigger="click" id="headerUserName">
              <span class="el-dropdown-link">
                <span class="need-to-be-ellipsis" style="color:#409eff">张开楠Kano2333</span>
                <span class="need-to-be-ellipsis">
                  <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-user">个人主页</el-dropdown-item>
                <el-dropdown-item icon="el-icon-s-tools">安全设置</el-dropdown-item>
                <el-dropdown-item icon="el-icon-setting">信息设置</el-dropdown-item>
                <el-dropdown-item icon="el-icon-back">登出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
        <!-- header end -->
      </el-header>
      <el-main>
        <keep-alive>
          <component v-bind:is="MainComponent"></component>
        </keep-alive>
        <router-link to="/login">登录</router-link>
      <router-view/>
      </el-main>
    </el-container>
    
  </div>
  
</template>

<script>
export default {
  name: "App",
  components: {
    PosInfo: () => import("./components/PosInfo.vue"),
    IncomeBreakdown: () => import("./components/IncomeBreakdown.vue"),
    TransactionRecord: () => import("./components/TransactionRecord.vue"),
    LatestFund: () => import("./components/LatestFund.vue"),
    PerformanceRanking: () => import("./components/PerformanceRanking.vue"),
    ValuationRanking: () => import("./components/ValuationRanking.vue"),
    DebateFund: () => import("./components/DebateFund.vue"),
    StockFund: () => import("./components/StockFund.vue"),
    MyFund: () => import("./components/MyFund.vue"),
    Login: () => import("./components/Login.vue")
  },
  data() {
    return {
      inputSearchFund: "",
      MainComponent: "MyFund",
    };
  },
  methods: {
    changeMainComponent: function (index) {
      this.MainComponent = index;
    },
  },
};
</script>
<style>
@import url("//unpkg.com/element-ui@2.15.0/lib/theme-chalk/index.css");
/* 布局容器样式开始 */
#app {
  height: 100vh;
}

.el-header,
.el-footer {
  background-color: #545c64;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.el-container {
  height: 100%;
}
/* 布局容器样式结束 */

#mainAvatar {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
}

#headerUserName {
  color: whitesmoke;
  left: 20px;
}

#personalInfoPanel,
#headerUserName {
  height: 60px;
}

.el-dropdown-link {
  margin-left: 20px;
  font-size: 16px;
}

.need-to-be-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 5em;
  display: inline-block;
  box-sizing: border-box;
}
</style>
