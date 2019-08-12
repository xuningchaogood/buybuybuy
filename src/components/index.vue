<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="#/" class="router-link-active">首页</a> &gt;
        <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper">
        <div class="wrap-box">
          <div class="left-220" style="margin: 0px;">
            <div class="banner-nav">
              <ul>
                <li v-for="item in catelist">
                  <h3>
                    <i class="iconfont icon-arrow-right"></i>
                    <span>{{item.title}}</span>
                    <p>
                      <span v-for="abc in item.subcates">{{abc.title}}&nbsp;</span>
                    </p>
                  </h3>
                  <div class="item-box">
                    <dl>
                      <dt>
                        <a href="/goods/40.html">{{item.title}}</a>
                      </dt>
                      <dd>
                        <a href="/goods/43.html" v-for="abc in item.subcates">{{abc.title}}</a>
                      </dd>
                    </dl>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <!--幻灯片-->
          <div class="left-705">
            <div class="block">
              <el-carousel trigger="click" height="341px" width="750px">
                <el-carousel-item v-for="item in sliderlist">
                  <img :src="item.img_url" alt width="100%" height="100%" />
                </el-carousel-item>
              </el-carousel>
            </div>
          </div>
          <!--/幻灯片-->
          <div class="left-220">
            <ul class="side-img-list">
              <li v-for="item,index in topList" @click="toDeteail(item)">
                <div class="img-box">
                  <label>{{index+1}}</label>
                  <img :src="item.img_url" />
                </div>
                <div class="txt-box">
                  <a href="javascript:">{{item.title}}</a>
                  <span>{{item.add_time | formatTime('YYYY-MM-DD')}}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="section" v-for="list in datalist">
      <div class="main-tit">
        <h2>{{list.catetitle}}</h2>
        <p>
          <a href="/goods/43.html" v-for="a in level2catelist">{{a.subcatetitle}}</a>
          <a href="/goods/40.html">
            更多
            <i>+</i>
          </a>
        </p>
      </div>
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <ul class="img-list">
            <li v-for="small in list.datas" @click.prevent="toDeteail2(small)">
              <a href="#/site/goodsinfo/87" class>
                <div class="img-box">
                  <img :src="small.img_url" />
                </div>
                <div class="info">
                  <h3>{{small.artTitle}}</h3>
                  <p class="price">
                    <b>{{small.sell_price}}</b>元
                  </p>
                  <p>
                    <strong>库存 {{small.stock_quantity}}</strong>
                    <span>
                      市场价：
                      <s>{{small.market_price}}</s>
                    </span>
                  </p>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "index",
  data() {
    return {
      //右边导航栏
      topList: [],
      //中间轮播图
      sliderlist: [],
      //左边导航栏
      catelist: [],
      datalist: [],
      level2catelist: []
    };
  },
  methods: {
    toDeteail(item) {
      this.$router.push("/detail/" + item.id);
    },
    toDeteail2(small) {
      this.$router.push("/detail/" + small.artID);
    }
  },
  created() {
    this.$axios.get(`site/goods/gettopdata/goods`).then(res => {
      // console.log(res);
      this.topList = res.data.message.toplist;
      this.sliderlist = res.data.message.sliderlist;
      this.catelist = res.data.message.catelist;
    });
    this.$axios.get(`site/goods/getgoodsgroup`).then(res => {
      console.log(res);
      
      this.datalist = res.data.message;

      this.level2catelist=res.data.message[0].level2catelist;
    });
  }
};
</script>
<style>
/* .block img{
  width: 100%;
} */
</style>