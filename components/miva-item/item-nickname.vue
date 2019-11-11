<template>
  <view
    class="container-item-nickname"
    :class="shadow&&'shadow'"
    :style="{
      'font-size':`${size}rpx`
    }"
  >
    <view class="item-nickname">{{ userInfo.nickname }}</view>
    <image class="item-icon" :src="`/static/sex-icon-${userInfo.sex || 3}.png`" />
    <view class="item-level">LV{{ userInfo.level || 1 }}</view>
    <view class="item-vip">{{ userInfo.vip || '正式会员' }}</view>
  </view>
</template>

<script>
export default {
  props: {
    size: {
      type: [Number, String],
      default: 28
    },
    shadow: {
      type: [Boolean, String],
      default: false
    },
    userInfo: {
      type: Object,
      default() {
        return {
          nickname: '九条米法',
          level: 5,
          vip: '正式会员'
        }
      }
    }
  }
}
</script>

<style lang="scss">
.container-item-nickname {
  margin: 20rpx 0;
  position: relative;
  display: flex;
  align-items: center;
  *{
    white-space: nowrap;
  }
  .item-nickname {
    font-weight: bold;
  }
  .item-icon {
    width: 30rpx;
    height: 30rpx;
    min-width: 30rpx;
    min-height: 30rpx;
    margin-left:5px;
    vertical-align: sub;
  }
  .item-level {
    padding: 3rpx 10rpx;
    border-radius: 5px;
    border: 1px solid;
    transform: scale(0.6);
    color: darken($miva-color-icon, 20%);
  }
  .item-vip {
    padding: 3rpx 10rpx;
    transform: translateX(-15%) scale(0.6);
    border-radius: 5px;
    border: 1px solid $miva-color-icon;
    background-color: $miva-color-icon;
    color: #fff;
  }
  &.shadow {
    .item-nickname {
      text-shadow: 1px 1px 1px #fff;
    }
    .item-icon {
      padding: 5px;
      border-radius: 50%;
      background-color: rgba($color: #fff, $alpha: 1);
    }
    .item-vip {
      box-shadow: 1px 1px 2px darken($miva-color-icon, 20%);
    }
    .item-level {
      box-shadow: 1px 1px 2px darken($miva-color-icon, 20%);
      border: 1px solid $miva-color-icon;
      background-color: $miva-color-icon;
      color: #fff;
    }
  }
}
</style>
