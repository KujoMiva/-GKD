<template>
  <view class="container-components-item-search" :class="!disabled&&'act'">
    <view class="group-search">
      <!-- 搜索框组件 -->
      <input
        v-model="inputValComponent"
        type="text"
        class="iconfont icon-search"
        placeholder="搜索"
        confirm-type="search"
        :disabled="disabled"
        :focus="!disabled"
        @click="routerLink"
      >
    </view>
    <view v-if="!disabled" class="item-btn-search" @click="searchHandler">搜索</view>
  </view>
</template>

<script>
export default {
  props: {
    disabled: {
      type: [Boolean, String],
      default: true
    },
    inputVal: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      inputValComponent: ''
    }
  },
  watch: {
    inputVal(val) {
      this.inputValComponent = val
      this.searchHandler()
    }
  },
  methods: {
    searchHandler() {
      console.log('在这里进行搜索操作', this.inputValComponent)
    },
    routerLink() {
      if (!this.disabled) return
      this.$navigateTo({
        url: this.$libRouter['搜索'],
        animationType: 'fade-in'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes icon-left {
  100% {
    left: 5%;
  }
}
@keyframes input-width {
  100% {
    width: 75%;
  }
}
@keyframes item-btn {
  100% {
    transform: scale(1);
  }
}
.container-components-item-search {
  display: flex;
  align-items: center;
  .group-search {
    width: 90%;
    margin: auto;
    padding: 5rpx 10% 0 5%;
    position: relative;
    top: 15rpx;
    border-radius: 30px;
    box-sizing: border-box;
    text-align: center;
    font-size: 34rpx;
    background-color: rgba(255, 255, 255, 0.5);
  }
  .item-btn-search {
    position: relative;
    top: 12rpx;
    right: 30rpx;
    transform: scale(0);
    font-size: 32rpx;
  }
  .iconfont::before {
    position: absolute;
    top: 50%;
    left: 35%;
    transform: translateY(-50%);
    color: grey;
  }
  // #ifndef MP
  &.act {
    .item-btn-search {
      animation: item-btn 0.5s 0.5s linear forwards;
    }
    .group-search {
      animation: input-width 0.5s 0s linear forwards;
    }
    .iconfont::before {
      animation: icon-left 0.5s 0.2s linear forwards;
    }
  }
  // #endif
  // #ifdef MP
  &.act {
    .item-btn-search {
      animation: item-btn 0.5s .5s linear forwards;
    }
    .group-search {
      animation: input-width 0.5s .5s linear forwards;
    }
    .iconfont::before {
      animation: icon-left 0.5s .5s linear forwards;
    }
  }
  // #endif
}
</style>
