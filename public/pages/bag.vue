<script>
  Vue.createApp({
    setup: () => {
      return {
        nameMap: {
          boolere_covery: '回血',
          exp_gaspractice: '修为',
          exp_bodypractice: '气血',
          exp_soul: '魂念'
        },
        data: BOT_DATA
      }
    }
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
        <div class="user_top_right_font1 font_control Horizontal_grid">
          道号: {{ data.name }}
        </div>
        <div class="user_top_right_font font_control Horizontal_grid">
          等级: {{ data.bag_grade }}
        </div>
        <div
          class="user_top_right_font2 font_control Horizontal_grid"
          style="border-bottom-right-radius: 0px"
        >
          格子: {{ data.length }}/{{ data.bag_grade * 10 }}
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
        <div v-for="item of data.bag">
          <div class="user_top_right_font0 font_control Horizontal_grid">
            {{ item['good.name'] }}
          </div>
          <div class="user_top_right_font1 font_control lattice">
            <div>攻击: {{ item['good.attack'] }}%</div>
            <div>防御: {{ item['good.defense'] }}%</div>
            <div>血量: {{ item['good.blood'] }}%</div>
          </div>
          <div class="user_top_right_font font_control lattice">
            <div>天赋: {{ item['good.size'] }}%</div>
            <div>暴击: {{ item['good.critical_hit'] }}%</div>
            <div>暴伤: {{ item['good.critical_damage'] }}%</div>
          </div>
          <div class="user_top_right_font1 font_control lattice">
            <div>敏捷: {{ item['good.speed'] }}</div>
            <div>
              {{ nameMap[item['good.addition']] }}:
              {{ item[`good.${item['good.addition']}`] }}
              <span v-if="item['good.addition'] == 'boolere_covery'"> % </span>
            </div>
            <div>五行: ???</div>
          </div>
          <div
            class="user_top_right_font2 font_control lattice"
            style="margin-bottom: 5px"
          >
            <div>等级: {{ item['good.grade'] }}</div>
            <div>数量: {{ item['acount'] }}</div>
            <div>价格: {{ item['good.price'] }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<head>
  <link rel="stylesheet" href="@/css/bag.css">
</head>

<style>
  .user {
    background-image: url('@/img/user/bag/bag.jpg');
  }
</style>
