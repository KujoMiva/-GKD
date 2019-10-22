<template>
	<view class="uni-list-cell" :class="[disabled === true || disabled === 'true' ? 'uni-list-cell--disabled' : '']"
	 :hover-class="!hover || disabled === true || disabled === 'true' || showSwitch === true || showSwitch === 'true' ? '' : 'uni-list-cell--hover'" @click="onClick">
		<view class="uni-list-cell__container">
			<view class="uni-list-cell__icon" v-if="thumb">
				<image class="uni-list-cell__icon-img" :src="thumb"></image>
			</view>
			<view class="uni-list-cell__icon" v-else-if="showExtraIcon === true || showExtraIcon === 'true'">
				<miva-icon :color="extraIcon.color" :size="extraIcon.size" :type="extraIcon.type"/>
			</view>
			<view class="uni-list-cell__content">
				<view class="uni-list-cell__content-title">{{title}}</view>
				<view class="uni-list-cell__content-note" v-if="note">{{note}}</view>
			</view>
			<view class="uni-list-cell__extra" :class="!canWarp&&'uni-list-cell__extra__nowarp'" v-if="showBadge === true || showBadge === 'true' || showArrow === true || showArrow === 'true'||showSwitch === true || showSwitch === 'true' || showSlot === true  || showSlot === 'true'">
				<uni-badge v-if="showBadge === true || showBadge === 'true'" :inverted="badgeInverted" :type="badgeType" :text="badgeText"></uni-badge>
				<switch v-if="showSwitch === true || showSwitch === 'true'" :color="switchColor" :disabled='disabled' :checked="switchChecked" @change="onSwitchChange" />
				<slot v-if="showSlot === true  || showSlot === 'true'" />
				<miva-icon v-if="showArrow === true || showArrow === 'true'" color="#bbb" size="20" type="arrowright" />
			</view>
		</view>
	</view>
</template>

<script>
	import mivaIcon from '../uni-icon/uni-icon.vue'
	import uniBadge from '../uni-badge/uni-badge.vue'
	export default {
		name: 'uni-list-item',
		components: {
			mivaIcon,
			uniBadge
		},
		data() {
			return {

			};
		},
		props: {
			title: String, //列表标题
			note: String, //列表描述	
			canWarp: {
				type:[Boolean],
				default: false
			}, // 右侧是否可换行
			hover: {// 点击反馈
				type: [Boolean, String],
				default: false
			},
			disabled: { //是否禁用
				type: [Boolean, String],
				default: false
			},
			showArrow: { //是否显示箭头
				type: [Boolean, String],
				default: true
			},
			showBadge: { //是否显示数字角标
				type: [Boolean, String],
				default: false
			},
			showSwitch: { //是否显示Switch
				type: [Boolean, String],
				default: false
			},
			showSlot: { //是否显示插槽
				type: [Boolean,String],
				default: true
			},
			switchChecked: { //Switch是否被选中
				type: [Boolean, String],
				default: false
			},
			switchColor: String, // Switch颜色
			badgeText: String, //badge内容
			badgeType: { //badge类型
				type: String,
				default: 'success'
			},
			badgeInverted: {
				type: [Boolean, String],
				default: false
			},
			thumb: String, //缩略图
			showExtraIcon: { //是否显示扩展图标
				type: [Boolean, String],
				default: false
			},
			extraIcon: {
				type: Object,
				default () {
					return {
						type: "contact",
						color: "#000000",
						size: "20"
					};
				}
			}
		},
		methods: {
			onClick() {
				this.$emit('click')
			},
			onSwitchChange(e) {
				this.$emit('switchChange', e.detail)
			}
		}
	}
</script>

<style lang="scss">
	@mixin list-hover {
		background-color: $uni-bg-color-hover;
	}

	@mixin list-disabled {
		opacity: 0.3;
	}

	$list-cell-pd:$uni-spacing-col-lg $uni-spacing-row-lg;

	.uni-list-cell {
		font-size: $uni-font-size-lg;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;

		&--disabled {
			@include list-disabled;
		}

		&--hover {
			@include list-hover;
		}

		&__container {
			padding: $list-cell-pd;
			width: 100%;
			box-sizing: border-box;
			flex: 1;
			position: relative;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;

			&:after {
				position: absolute;
				z-index: 3;
				right: 0;
				bottom: 0;
				left: 30upx;
				height: 1px;
				content: '';
				-webkit-transform: scaleY(.5);
				transform: scaleY(.5);
				background-color: $uni-border-color;
			}
		}

		&__content {
			flex: 1;
			overflow: hidden;
			display: flex;
			flex-direction: column;

			&-title {
				font-size: $uni-font-size-lg;
				text-overflow: ellipsis;
				white-space: nowrap;
				color: inherit;
				line-height: 1.5;
				overflow: hidden;
			}

			&-note {
				color: $uni-text-color-grey;
				font-size: $uni-font-size-base;
				white-space: normal;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
				overflow-x: auto;
			}
		}

		&__extra {
			width: 50%;
			display: flex;
			flex-direction: row;
			justify-content: flex-end;
			align-items: center;
			&__nowarp{
				width: 25%;
				white-space: nowrap;
			}
		}

		&__icon {
			margin-right: 18upx;
			display: flex;
			flex-direction: row;
			justify-content: center;
			align-items: center;

			&-img {
				height: $uni-img-size-base;
				width: $uni-img-size-base;
			}
		}
	}

	.uni-list>.uni-list-cell:last-child .uni-list-cell-container:after {
		height: 0px;
	}
</style>