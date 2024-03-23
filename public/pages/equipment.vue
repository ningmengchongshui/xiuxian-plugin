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
        <div
          class="user_top_right_font0 font_control Horizontal_grid"
          style="border-top-right-radius: 0px"
        >
          {{ data.UID }}
        </div>
        <div
          class="user_top_right_font font_control Horizontal_grid"
          style="display: grid; grid-template-columns: repeat(2, 50%)"
        >
          <div class="font">攻击 : {{ data.battle_attack }}</div>
          <div class="font">血量 : {{ data.battle_blood_limit }}</div>
        </div>
        <div
          class="user_top_right_font1 font_control Horizontal_grid"
          style="display: grid; grid-template-columns: repeat(2, 50%)"
        >
          <div class="font">防御 : {{ data.battle_defense }}</div>
          <div class="font">敏捷 : {{ data.battle_speed }}</div>
        </div>
        <div
          class="user_top_right_font font_control Horizontal_grid"
          style="display: grid; grid-template-columns: repeat(2, 50%)"
        >
          <div class="font">暴击 : {{ data.battle_critical_hit }}%</div>
          <div class="font">暴伤 : {{ data.battle_critical_damage }}%</div>
        </div>
        <div
          class="user_top_right_font2 font_control Horizontal_grid"
          style="border-bottom-right-radius: 0px"
        >
          战力 : {{ data.battle_power }}
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
        <div v-for="item of data.fate">
          <div
            class="user_top_right_font0 font_control Horizontal_grid"
            style="background-color: rgb(61 18 12 / 84%)"
          >
            {{ item.name }}[{{ item.grade }}]
          </div>
          <div
            class="user_top_right_font1 font_control lattice"
            style="background-color: rgb(109 75 47 / 56%)"
          >
            <div class="font">攻击 : {{ item.attack }}%</div>
            <div class="font">防御 : {{ item.defense }}%</div>
            <div class="font">血量 : {{ item.blood }}%</div>
          </div>
          <div
            class="user_top_right_font2 font_control lattice"
            style="margin-bottom: 5px; background-color: rgb(191 178 145 / 67%)"
          >
            <div class="font">暴击 : {{ item.critical_hit }}%</div>
            <div class="font">暴伤 : {{ item.critical_damage }}%</div>
            <div class="font">敏捷 : {{ item.speed }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="user_bottom1">
      <div class="use_data">
        <div v-for="item of data.equipment">
          <div class="user_top_right_font0 font_control Horizontal_grid">
            {{ item['good.name'] }}
          </div>
          <div class="user_top_right_font1 font_control lattice">
            <div class="font">攻击 : {{ item['good.attack'] }}%</div>
            <div class="font">防御 : {{ item['good.defense'] }}%</div>
            <div class="font">血量 : {{ item['good.blood'] }}%</div>
          </div>
          <div
            class="user_top_right_font2 font_control lattice"
            style="margin-bottom: 5px"
          >
            <div class="font">暴击 : {{ item['good.critical_hit'] }}%</div>
            <div class="font">暴伤 : {{ item['good.critical_damage'] }}%</div>
            <div class="font">敏捷 : {{ item['good.speed'] }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<head>
  <link rel="stylesheet" href="@/css/equipment.css">
</head>

<style>
  .user {
    background-image: url('@/img/user/equipment/equipment.jpg');
  }
</style>
