<template>
    <div>

        <button-counter></button-counter>
        <!-- 绑定一个属性 -->
        <div v-bind:title="title"></div>
        <!-- 缩写 -->
        <div :title="title"></div>

        <!-- class 绑定 -->
        <div :class="{ red: isRed }"></div>
        <div :class="[classA, classB]"></div>
        <div :class="[classA, { classB: isB, classC: isC }]"></div>

        <div class="title">{{ message }}</div>

        <span v-bind:title="message">
            鼠标悬停几秒钟查看此处动态绑定的提示信息！
        </span>
        <p v-if="seen">现在你看到我了</p>

        <ol>
            <li v-for="todo in todos">
                {{ todo.text }}
            </li>
        </ol>

        <p>{{ message }}</p>
        <button v-on:click="reverseMessage">逆转消息</button>

        <p>{{ message }}</p>
        <input v-model="message">

        <ol>
            <!--
              现在我们为每个 todo-item 提供 todo 对象
              todo 对象是变量，即其内容可以是动态的。
              我们也需要为每个组件提供一个“key”，稍后再
              作详细解释。
            -->
            <todo-item v-for="item in groceryList" v-bind:todo="item" v-bind:key="item.id">
            </todo-item>
        </ol>

        <!--父组件-->
        <div id="parent">
            <child>
                <!--等待分发的内容-->
                <p slot="one">一些内容</p>
                <p slot="two">另外一些内容</p>
                <p>不带slot属性的标签</p>
            </child>
        </div>
        <!--子组件-->
        <div id="child">
            <slot>
                <h1>默认替换不带slot的元素</h1>
            </slot>
            <slot name="one">会被替换成父组件中slot="one"的元素</slot>
            <slot name="two">会被替换成父组件中slot="two"的元素</slot>
            <p>子组件自己的标签</p>
        </div>
    </div>
</template>
<script>
    import Vue from "vue";

    export default {
        components: {
            'todo-item': Vue.extend({
                props: ['todo'],
                template: '<li>{{ todo.text }}</li>'
            })
        },
        data() {
            return {
                title: "title",
                message: '页面加载于 ' + new Date().toLocaleString(),
                isRed: true,
                classA: 'classA',
                classB: 'classB',
                isB: false,
                isC: false,
                seen: true,
                todos: [
                    { text: '学习 JavaScript' },
                    { text: '学习 Vue' },
                    { text: '整个牛项目' }
                ],
                groceryList: [
                    { id: 0, text: '蔬菜' },
                    { id: 1, text: '奶酪' },
                    { id: 2, text: '随便其它什么人吃的东西' }
                ]

            }
        },
        methods: {
            reverseMessage: function () {
                this.message = this.message.split('').reverse().join('')
            }
        }
    }
</script>
<style>
    body style {
        display: block;
        padding: 0.6em 0.8em;
        border: 1px dashed #ccc;
        background-color: #f5f5f5;
        color: #000;
        font-family: Monaco, monospace;
        font-size: 12px;
        white-space: pre-wrap;
        word-wrap: break-word;
    }
</style>
