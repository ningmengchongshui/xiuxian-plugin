<script>
Vue.createApp({
  setup: () => ({
    data: BOT_DATA
  })
}).mount('#app')
</script>

<template>
  <div id="app" class="help">
    <div style="height: 350px"></div>
    <div v-for="val of data" :key="val.group" class="cont-box">
      <div class="help-group">{{ val.group }}</div>
      <div class="help-table">
        <div class="tr">
          <div v-for="item in val.list" :key="item.title" class="td">
            <span :class="'help-icon help-icon-' + item.icon"></span>
            <strong class="help-title">{{ item.title }}</strong>
            <span class="help-desc">{{ item.desc }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="copyright">
      <span>Xiuxian-Plugin @2.2.0 | 柠檬冲水</span>
    </div>
    <div class="copyright">
      <span>基于</span>
      <span class="version">[https://alemonjs.com/]</span>
      <span>开发</span>
    </div>
    <div class="copyright">
      <span>反馈</span>
      <span class="version">806943302 </span>
    </div>
  </div>
</template>

<head>
  <link rel="stylesheet" href="@/css/help.css">
</head>

<style>
.help {
  background: url('@/img/help/help.jpg');
}

.help-icon {
  background: url('@/img/help/icon.jpg') 0 0 no-repeat;
}
</style>
