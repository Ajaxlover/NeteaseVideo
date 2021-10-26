<template>
  <view class="content">
    <view class="search-nav">
      <van-search
        class="search-input"
        v-model="keyword"
        shape="round"
        background="#07c160"
        placeholder="请输入搜索关键词"
      />
      <view class="search-btn">
        <van-button @click="search" icon="search" type="primary"
          >搜索</van-button
        >
      </view>
    </view>
    <view></view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      title: 'home',
      keyword: '',
      videos: [],
    }
  },
  onLoad() {},
  methods: {
    search() {
      uni
        .request({
          url: `http://localhost:5000/search`,
          method: 'POST',
          data: {
            keywords: this.keyword.trim(),
            type: 1014,
          },
        })
        .then((res) => {
          let { code, result } = res[1].data
          if (code === 200) {
            this.videos = result.videos
            console.log(this.videos)
          }
        })
    },
  },
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin: 200rpx auto 50rpx auto;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
.search-nav {
  width: 100%;
  background-color: #07c160;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.search-input {
  flex: 1;
}
.search-btn {
  width: 25%;
  background-color: #07c160;
}
</style>
