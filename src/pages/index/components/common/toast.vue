/**
 * @file toast弹层
 * @author fenglinzeng@fang.com
 * @usage:
 * import Toast from '@/components/common/toast';
 * Vue.use(Toast);
 * --以上已经加在入口处，模块内用法如下--
 * const Toast = require('@/components/common/toast');
 * this.$toast.show('测试弹层');
 */
<template>
    <transition name="fadeIn">
        <div class="alertBox" v-show="show">
            <div class="alert-mask" v-show="mask"></div>
            <div class="box" v-show="show">
                {{text}}
            </div>
        </div>
    </transition>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: {
    // 是否显示此toast
    show: {
      default: false
    },
    // 提醒文字
    text: {
      default: '稍候'
    },
    // 是否显示遮罩层
    mask: {
      default: false
    },
    // 显示时间
    time: {
      default: 2000
    }
  }
}
</script>

<style>
.box {
    position: fixed;
    top: 50%;
    left: 50%;
    max-width: 150px;
    max-height: 100px;
    padding: 10px 20px;
    transform: translate(-50%, -50%);
    background: rgba(0, 0, 0, .5);
    text-align: center;
    border-radius: 4px;
    color: #fff;
    font-size: 16px;
    z-index: 5000;
    color: #fff;
}

.alert-mask {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, .1);
    z-index: 4999;
}

.fadeIn-enter-active,
.fadeIn-leave-active {
    transition: opacity .3s;
}

.fadeIn-enter,
.fadeIn-leave-active {
    opacity: 0;
}
</style>