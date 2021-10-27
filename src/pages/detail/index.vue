<template>
  <view class="content">
    <view class="video-container">
      <video id="myVideo" :src="url" controls></video>
    </view>
    <view class="download-btn">
      <van-button @click="download" size="large" type="primary"
        >下载</van-button
      >
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      url: '',
    }
  },
  onLoad(val) {
    if (val.vid.trim().length > 8) {
      // 视频
      this.getVideo(`http://localhost:5000/video/url`, val.vid, 'video')
    } else {
      // mv
      this.getVideo(`http://localhost:5000/mv/url`, val.vid, 'mv')
    }
  },
  methods: {
    getVideo(url, id, type) {
      uni
        .request({
          url,
          method: 'POST',
          data: {
            id,
          },
        })
        .then((res) => {
          console.log(res)
          if (type == 'mv') {
            let { code, data } = res[1].data
            if (code === 200) {
              this.url = data.url
            }
          } else {
            let { code, urls } = res[1].data
            if (code === 200) {
              this.url = urls[0].url
            }
          }
        })
    },
    download() {
      // 下载
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
  padding: 20rpx 10rpx 0 10rpx;
}
.video-container {
  width: 100%;
  margin-bottom: 30rpx;
}
#myVideo {
  width: 100%;
}
.download-btn {
  width: 100%;
}
</style>
