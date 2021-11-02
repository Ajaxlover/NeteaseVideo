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
    <view v-if="videos.length > 0" class="list-container">
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
    <view v-if="videos.length > 0" class="pagination">
      <van-pagination
        v-model="currentPage"
        :items-per-page="30"
        :total-items="total"
        :show-page-size="5"
        @change="pageChange"
      >
        <template #prev-text>
          <van-icon name="arrow-left" />
        </template>
        <template #next-text>
          <van-icon name="arrow" />
        </template>
        <template #page="{ text }">{{ text }}</template>
      </van-pagination>
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
      currentPage: 1,
      total: 0,
    }
  },
  onLoad() {},
  methods: {
    search() {
      // uni
      //   .request({
      //     url: `http://192.168.1.61:5000/search`,
      //     method: 'POST',
      //     data: {
      //       keywords: this.keyword.trim(),
      //       type: 1014,
      //     },
      //   })
      //   .then((res) => {
      //     let { code, result } = res[1].data
      //     if (code === 200) {
      //       this.videos = result.videos
      //       this.total = result.videoCount
      //     }
      //   })
      this.getData(this.currentPage)
    },
    getData(offset) {
      uni
        .request({
          url: `http://192.168.1.61:5000/search`,
          method: 'POST',
          data: {
            keywords: this.keyword.trim(),
            type: 1014,
            offset: (offset - 1) * 30,
          },
        })
        .then((res) => {
          let { code, result } = res[1].data
          if (code === 200) {
            this.videos = result.videos
            this.total = result.videoCount
          }
        })
    },
    pageChange(val) {
      this.currentPage = Number(val)
      this.getData(this.currentPage)
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
  position: sticky;
  width: 100%;
  background-color: #07c160;
  display: flex;
  top: 75rpx;
  align-items: center;
  justify-content: space-between;
  z-index: 999;
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
.pagination {
  position: fixed;
  bottom: 0;
}
</style>
