<script>
  Vue.createApp({
    setup: () => ({
      data: BOT_DATA
    })
  }).mount('#app')
</script>

<template>
  <div id="app" class="user">
    <div v-for="item of data">
      <div style="display: grid">
        <div class="user_top">
          <div class="user_top_left">
            <div
              class="user_top_right_font0 font_control Horizontal_grid"
              style="padding: 5px"
            >
              {{ item.uid }}
            </div>
            <div
              class="user_top_right_font1 font_control Horizontal_grid"
              style="padding: 5px"
            >
              道号:{{ item.name }}
            </div>
            <div
              class="user_top_right_font2 font_control Horizontal_grid"
              style="padding: 5px"
            >
              排名:{{ item.id }}
            </div>
            <div
              class="user_top_right_font1 font_control Horizontal_grid"
              style="padding: 5px"
            >
              战力:{{ item.power }}
            </div>
          </div>
          <div class="user_top_right">
            <div class="user_top_img_bottom">
              <img class="user_top_img" :src="item.avatar" />
            </div>
          </div>
        </div>
      </div>

      <div class="user_bottom1">
        <div class="use_data">
          <div class="user_top_right_font0 font_control Horizontal_grid">
            [修心道宣]
          </div>
          <div class="user_top_right_font2 font_control Horizontal_grid">
            {{ item.autograph }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<head>
  <link rel="stylesheet" href="@/css/sky.css">
</head>

<style>
  .user {
    background-image: url('@/img/user/information/information.jpg');
  }

  .user_top {
    background-image: url('@/img/user/information/left.jpg');
  }

  .user_top_img_bottom {
    background-image: url('@/img/user/information/right.jpg');
  }
</style>
