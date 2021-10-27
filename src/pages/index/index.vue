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
    <view class="list-container">
      <view
        class="list-item"
        @click="goDetail(item)"
        :key="item.vid"
        v-for="item in videos"
      >
        <view class="image-content">
          <image class="img" :src="item.coverUrl"></image>
        </view>
        <text>{{ item.title }}</text>
      </view>
    </view>
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
    goDetail(item) {
      uni.navigateTo({
        url: `/pages/detail/index?vid=${item.vid}`,
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

.list-container {
  padding-left: 10rpx;
  padding-top: 10rpx;
}
.list-item {
  display: flex;
  align-items: center;
  margin-bottom: 10rpx;
}
.image-content {
  height: 100%;
  margin-right: 20rpx;
}

.img {
  vertical-align: bottom;
  width: 320rpx;
  height: 240rpx;
  border-radius: 30rpx;
  overflow: hidden;
}
</style>
