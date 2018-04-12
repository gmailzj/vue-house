<template>
  <div id="loginBarNew">
    <div class="s4a" onMouseOver="this.className='s4a on2014'" onMouseOut="this.className='s4a'" style="background-image:none">
      <div class="s4Box" style="text-overflow: ellipsis; white-space: nowrap;"><a :href="register">{{registerTitle}}</a></div>
    </div>
    <div class="sline21041104"></div>
    <div class="s4" onMouseOver="this.className='s4 on2014'" onMouseOut="this.className='s4'" style="background-image:none">
      <div class="s4Box"><a :href="login" :target="target">{{loginTitle}}</a></div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'loginBarNew',
  data() {
    return {
      passport: 'http://passport.fang.com/',
      login: '',
      loginTitle: '',
      register: '',
      registerTitle: '',
      target: '_self'
    };
  },

  mounted() {
    this.loginInfo();
  },
  methods: {
    loginInfo() {
      let that = this;
      this.$axios.get(that.G.jk + '&a=ajaxGetUser')
        .then(function(response) {
          // console.log(response.data);
          if (response.data && typeof response.data === "object") {
            that.rewrite(response.data.username);
          }
        })
        .catch(function(error) {
          that.rewrite('');
        });
    },
    rewrite(userName) {
      // console.log('rewrite', userName);
      if (userName) {
        this.target = '_blank';
        var href = encodeURIComponent(location.href);
        this.login = 'http://my.fang.com/';
        this.register = this.passport + 'logout.aspx?backurl=' + href;
        this.loginTitle = userName;
        this.registerTitle = '退出';
      } else {
        var href = encodeURIComponent(location.href);
        this.login = this.passport + 'login.aspx?backurl=' + href;
        this.register = this.passport + 'register.aspx?backurl=' + href;
        this.loginTitle = '登录';
        this.registerTitle = '注册';
      }
    }

  }

}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


</style>
