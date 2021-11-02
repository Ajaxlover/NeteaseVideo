<template>
  <view class="content">
    <view class="video-container">
      <video id="myVideo" :src="url" controls></video>
    </view>
    <view class="download-btn">
      <van-button
        :disabled="isClickAble"
        @click="download"
        size="large"
        type="primary"
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
      isClickAble: false,
    }
  },
  onLoad(val) {
    if (val.vid.trim().length > 8) {
      // 视频
      this.getVideo(`http://192.168.1.61:5000/video/url`, val.vid, 'video')
    } else {
      // mv
      this.getVideo(`http://192.168.1.61:5000/mv/url`, val.vid, 'mv')
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
      let now = new Date().getTime()
      this.isClickAble = true
      fetch(this.url)
        .then((res) => res.blob())
        .then((blob) => {
          const a = document.createElement('a')
          document.body.appendChild(a)
          a.style.display = 'none'
          const url = window.URL.createObjectURL(blob)
          a.href = url
          a.download = `${now}.mp4`
          a.click()
          document.body.removeChild(a)
          window.URL.revokeObjectURL(url)
          this.isClickAble = false
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
