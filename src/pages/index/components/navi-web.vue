<template>
  <div class="s2" onMouseOver="this.className='s2 on2014'" onMouseOut="this.className='s2'" id="dsy_H01_01">
    <div class="s4Box"><a :href="naviLink">{{cityName}}<img src="//jsimg.fang.com/navigation/images/navicon.gif" ></a></div>
    <div class="city20141104">
      <!--city_list_start-->
      <!--tab_header_start-->
      <div class="city20141104hd">
        <div class="city1">热门城市</div>
        <div class="city2">ABCDFGH</div>
        <div class="city2">JKLMNQST</div>
        <div class="city2">WXYZ</div>
        <!--more_tab-->
      </div>
      <!--tab_header_end-->
      <div class="city20141104nr" id="cityi010">
        <a href='?city=bj#/fangdai' name="北京">北京</a><a href='?city=sh#/fangdai' name="上海">上海</a><a href='?city=gz#/fangdai' name="广州">广州</a><a href='?city=sz#/fangdai' name="深圳">深圳</a><a href='?city=cd#/fangdai' name="成都">成都</a><a href='?city=cq#/fangdai' name="重庆">重庆</a><a href='?city=tj#/fangdai' name="天津">天津</a><a href='?city=wuhan#/fangdai' name="武汉">武汉</a><a href='?city=hz#/fangdai' name="杭州">杭州</a><a href='?city=nanjing#/fangdai' name="南京">南京</a><a href='?city=suzhou#/fangdai' name="苏州">苏州</a><a href="http://www.hkproperty.com/" target="_blank">香港</a><a href="http://world.fang.com/" target="_blank">海外</a><a href="http://fang.com/SoufunFamily.htm" target="_blank">更多城市</a>
      </div>
      <div class="city20141104nr" id="cityi011" style="display:none">
        <a href='?city=anshan#/fangdai' name="鞍山">鞍山</a><a href='http://newhouse.fang.com/house/s/list/' name="北京">北京</a><a href='?city=bd#/fangdai' name="保定">保定</a><a href='?city=bt#/fangdai' name="包头">包头</a><a href='?city=bengbu#/fangdai' name="蚌埠">蚌埠</a><a href='?city=bh#/fangdai' name="北海">北海</a><a href='?city=changchun#/fangdai' name="长春">长春</a><a href='?city=cd#/fangdai' name="成都">成都</a><a href='?city=cq#/fangdai' name="重庆">重庆</a><a href='?city=cs#/fangdai' name="长沙">长沙</a><a href='?city=cz#/fangdai' name="常州">常州</a><a href='?city=dl#/fangdai' name="大连">大连</a><a href='?city=dg#/fangdai' name="东莞">东莞</a><a href='?city=daqing#/fangdai' name="大庆">大庆</a><a href='?city=fs#/fangdai' name="佛山">佛山</a><a href='?city=fz#/fangdai' name="福州">福州</a><a href='?city=gz#/fangdai' name="广州">广州</a><a href='?city=ganzhou#/fangdai' name="赣州">赣州</a><a href='?city=gy#/fangdai' name="贵阳">贵阳</a><a href='?city=guilin#/fangdai' name="桂林">桂林</a><a href='?city=hz#/fangdai' name="杭州">杭州</a><a href='?city=hs#/fangdai' name="衡水">衡水</a><a href='?city=nm#/fangdai' name="呼和浩特">呼和浩特</a><a href='?city=hrb#/fangdai' name="哈尔滨">哈尔滨</a><a href='?city=hd#/fangdai' name="邯郸">邯郸</a><a href='?city=huaian#/fangdai' name="淮安">淮安</a><a href='?city=huzhou#/fangdai' name="湖州">湖州</a><a href='?city=hf#/fangdai' name="合肥">合肥</a><a href='?city=huizhou#/fangdai' name="惠州">惠州</a><a href='?city=hengyang#/fangdai' name="衡阳">衡阳</a><a href='?city=hn#/fangdai' name="海南">海南</a>
      </div>
      <div class="city20141104nr" id="cityi012" style="display:none">
        <a href='?city=jn#/fangdai' name="济南">济南</a><a href='?city=jining#/fangdai' name="济宁">济宁</a><a href='?city=jl#/fangdai' name="吉林">吉林</a><a href='?city=jy#/fangdai' name="江阴">江阴</a><a href='?city=jx#/fangdai' name="嘉兴">嘉兴</a><a href='?city=jm#/fangdai' name="江门">江门</a><a href='?city=jiujiang#/fangdai' name="九江">九江</a><a href='?city=ks#/fangdai' name="昆山">昆山</a><a href='?city=km#/fangdai' name="昆明">昆明</a><a href='?city=lc#/fangdai' name="聊城">聊城</a><a href='?city=lf#/fangdai' name="廊坊">廊坊</a><a href='?city=linyi#/fangdai' name="临沂">临沂</a><a href='?city=ly#/fangdai' name="洛阳">洛阳</a><a href='?city=lyg#/fangdai' name="连云港">连云港</a><a href='?city=lz#/fangdai' name="兰州">兰州</a><a href='?city=liuzhou#/fangdai' name="柳州">柳州</a><a href='?city=leshan#/fangdai' name="乐山">乐山</a><a href='?city=mas#/fangdai' name="马鞍山">马鞍山</a><a href='?city=nanjing#/fangdai' name="南京">南京</a><a href='?city=nb#/fangdai' name="宁波">宁波</a><a href='?city=nt#/fangdai' name="南通">南通</a><a href='?city=nc#/fangdai' name="南昌">南昌</a><a href='?city=nn#/fangdai' name="南宁">南宁</a><a href='?city=qd#/fangdai' name="青岛">青岛</a><a href='?city=qhd#/fangdai' name="秦皇岛">秦皇岛</a><a href='?city=qz#/fangdai' name="泉州">泉州</a><a href='?city=sy#/fangdai' name="沈阳">沈阳</a><a href='?city=sjz#/fangdai' name="石家庄">石家庄</a><a href='?city=sh#/fangdai' name="上海">上海</a><a href='?city=sz#/fangdai' name="深圳">深圳</a><a href='?city=suzhou#/fangdai' name="苏州">苏州</a><a href='?city=sx#/fangdai' name="绍兴">绍兴</a><a href='?city=st#/fangdai' name="汕头">汕头</a><a href='?city=sanya#/fangdai' name="三亚">三亚</a><a href='?city=sq#/fangdai' name="宿迁">宿迁</a><a href='?city=tj#/fangdai' name="天津">天津</a><a href='?city=ts#/fangdai' name="唐山">唐山</a><a href='?city=taiyuan#/fangdai' name="太原">太原</a><a href='?city=taizhou#/fangdai' name="泰州">泰州</a>
      </div>
      <div class="city20141104nr" id="cityi013" style="display:none">
        <a href='?city=wuhan#/fangdai' name="武汉">武汉</a><a href='?city=wuxi#/fangdai' name="无锡">无锡</a><a href='?city=wf#/fangdai' name="潍坊">潍坊</a><a href='?city=weihai#/fangdai' name="威海">威海</a><a href='?city=wuhu#/fangdai' name="芜湖">芜湖</a><a href='?city=xj#/fangdai' name="乌鲁木齐">乌鲁木齐</a><a href='?city=xian#/fangdai' name="西安">西安</a><a href='?city=xz#/fangdai' name="徐州">徐州</a><a href='?city=xm#/fangdai' name="厦门">厦门</a><a href='?city=xiangyang#/fangdai' name="襄阳">襄阳</a><a href='?city=xn#/fangdai' name="西宁">西宁</a><a href='?city=xt#/fangdai' name="湘潭">湘潭</a><a href='?city=yt#/fangdai' name="烟台">烟台</a><a href='?city=yz#/fangdai' name="扬州">扬州</a><a href='?city=yancheng#/fangdai' name="盐城">盐城</a><a href='?city=yc#/fangdai' name="宜昌">宜昌</a><a href='?city=yinchuan#/fangdai' name="银川">银川</a><a href='?city=yueyang#/fangdai' name="岳阳">岳阳</a><a href='?city=zz#/fangdai' name="郑州">郑州</a><a href='?city=zb#/fangdai' name="淄博">淄博</a><a href='?city=zhenjiang#/fangdai' name="镇江">镇江</a><a href='?city=zhoushan#/fangdai' name="舟山">舟山</a><a href='?city=zhangzhou#/fangdai' name="漳州">漳州</a><a href='?city=zh#/fangdai' name="珠海">珠海</a><a href='?city=zs#/fangdai' name="中山">中山</a><a href='?city=zhuzhou#/fangdai' name="株洲">株洲</a>
      </div>
      <!--more_tab_content-->
      <!--city_list_end-->
    </div>
  </div>
</template>
<script>
export default {
  name: 'naviWeb',
  data() {
    return {
      naviLink: '',
      cityName: '北京'
    };
  },
  watch: {
    $route: 'setCity'
  },
  methods: {
    setCity() {
      console.log('setCity', this.$route);
    }
  }
}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>


</style>
