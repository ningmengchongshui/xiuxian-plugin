<script>
  Vue.createApp({
    setup: () => ({
      data: BOT_DATA
    })
  }).mount('#app')
</script>

<template>
  <div id="app" class="user">
    <div style="height: 30px"></div>
    <div class="user_top">
      <div class="user_top_left">
        <div class="user_top_right_font0 font_control Horizontal_grid">
          {{ data.UID }}
        </div>
        <div class="user_top_right_font font_control Horizontal_grid">
          道号: {{ data.name }}
        </div>
        <div class="user_top_right_font1 font_control Horizontal_grid">
          灵根: {{ data.linggenName }}
        </div>
        <div class="user_top_right_font2 font_control Horizontal_grid">
          天赋: {{ data.talentsize }}
        </div>
      </div>
      <div class="user_top_right">
        <div class="user_top_img_bottom">
          <img class="user_top_img" :src="data.avatar" />
        </div>
      </div>
    </div>
    <div class="user_bottom1">
      <div class="use_data">
        <div v-for="item of data.skills">
          <div class="user_top_right_font0 font_control Horizontal_grid">
            {{ item['good.name'] }}
          </div>
          <div
            class="user_top_right_font2 font_control lattice"
            style="margin-bottom: 5px"
          >
            <div>天赋: {{ item['good.size'] }}%</div>
            <div>修为: +{{ item['good.exp_gaspractice'] }}</div>
            <div>价格: {{ item['good.price'] }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<head>
  <link rel="stylesheet" href="@/css/skills.css">
</head>

<style>
  .user {
    background-image: url('@/img/user/equipment/equipment.jpg');
  }
</style>
