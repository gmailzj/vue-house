const dom = require("./toast.vue").default;

const Toast = {};
Toast.install = function(Vue, options) {
    if (document.querySelectorAll(".alertBox").length) {
        return;
    }
    let toastTpl = Vue.extend(dom);

    let $vm = new toastTpl();
    let tpl = $vm.$mount().$el;
    document.body.appendChild(tpl);

    Vue.prototype.$toast = {
        show(options) {
            // 如果是一个字符串，则只文字
            // 否则是配置项
            if (typeof options === "string") {
                $vm.text = options;
            } else if (typeof options === "object") {
                Object.assign($vm, options);
            }
            $vm.show = true;

            // 如果传进来的时间为0，则始终显示
            if (options.time === 0) {
                return;
            }
            setTimeout(() => {
                $vm.show = false;
            }, options.time || $vm.time);
        },
        hide() {
            $vm.show = false;
        }
    };
};
export default Toast;
