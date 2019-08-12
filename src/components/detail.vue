<template>
  <div>
    <div class="section">
      <div class="location">
        <span>当前位置：</span>
        <a href="/index.html">首页</a> &gt;
        <a href="/goods.html">购物商城</a> &gt;
        <a href="/goods/42/1.html">商品详情</a>
      </div>
    </div>
    <div class="section">
      <div class="wrapper clearfix">
        <div class="wrap-box">
          <div class="left-925">
            <div class="goods-box clearfix">
              <div class="pic-box"></div>
              <div class="goods-spec">
                <h1>{{goodsinfo.title}}</h1>
                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                <div class="spec-box">
                  <dl>
                    <dt>货号</dt>
                    <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                  </dl>
                  <dl>
                    <dt>市场价</dt>
                    <dd>
                      <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                    </dd>
                  </dl>
                  <dl>
                    <dt>销售价</dt>
                    <dd>
                      <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                    </dd>
                  </dl>
                </div>
                <div class="spec-box">
                  <dl>
                    <dt>购买数量</dt>
                    <dd>
                      <div class="stock-box">
                        <div class="el-input-number el-input-number--small">
                          <el-input-number v-model="num" :min="1" :max="goodsinfo.stock_quantity"></el-input-number>
                        </div>
                      </div>
                      <span class="stock-txt">
                        库存
                        <em id="commodityStockNum">{{goodsinfo.stock_quantity}}</em>件
                      </span>
                    </dd>
                  </dl>
                  <dl>
                    <dd>
                      <div id="buyButton" class="btn-buy">
                        <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                        <button onclick="cartAdd(this,'/',0,'/cart.html');" class="add">加入购物车</button>
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
            <el-tabs v-model="activeName" type="card">
              <el-tab-pane label="商品介绍" name="first">
                <div class="my-detail" v-html="goodsinfo.content"></div>
              </el-tab-pane>
              <el-tab-pane label="商品评论" name="second">
                <div class="tab-content" style="display: block;">
                  <div class="comment-box">
                    <div id="commentForm" name="commentForm" class="form-box">
                      <div class="avatar-box">
                        <i class="iconfont icon-user-full"></i>
                      </div>
                      <div class="conn-box">
                        <div class="editor">
                          <textarea
                            v-model="useComment"
                            id="txtContent"
                            name="txtContent"
                            sucmsg=" "
                            data-type="*10-1000"
                            nullmsg="请填写评论内容！"
                          ></textarea>
                          <span class="Validform_checktip"></span>
                        </div>
                        <div class="subcon">
                          <input
                            @click="addComment"
                            id="btnSubmit"
                            name="submit"
                            type="submit"
                            value="提交评论"
                            class="submit"
                          />
                          <span class="Validform_checktip"></span>
                        </div>
                      </div>
                    </div>
                    <ul id="commentList" class="list-box">
                      <p
                        v-if="commentsList.length==0"
                        style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);"
                      >暂无评论，快来抢沙发吧！</p>
                      <li v-for="comment in commentsList">
                        <div class="avatar-box">
                          <i class="iconfont icon-user-full"></i>
                        </div>
                        <div class="inner-box">
                          <div class="info">
                            <span>{{comment.user_name}}</span>
                            <span>{{comment.add_time}}</span>
                          </div>
                          <p>{{comment.content}}</p>
                        </div>
                      </li>
                    </ul>
                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                      <div id="pagination" class="digg">
                        <el-pagination
                          @size-change="handleSizeChange"
                          @current-change="handleCurrentChange"
                          :current-page="pageIndex"
                          :page-sizes="[10, 15, 20, 25, 30]"
                          :page-size="pageSize"
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="total"
                        ></el-pagination>
                      </div>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
          <div class="left-220">
            <div class="bg-wrap nobg">
              <div class="sidebar-box">
                <h4>推荐商品</h4>
                <ul class="side-img-list">
                  <li v-for="item in hotgoodslist" @click.prevent="toDetail(item)">
                    <div class="img-box">
                      <a href="#/site/goodsinfo/90" class>
                        <img :src="item.img_url" />
                      </a>
                    </div>
                    <div class="txt-box">
                      <a href="#/site/goodsinfo/90" class>{{item.title}}</a>
                      <span>{{item.add_time | formatTime('YYYY-MM-DD')}}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //热门推荐
      hotgoodslist: [],
      //详情
      goodsinfo: [],
      //图片
      imglist: [],
      //
      num: 1,
      activeName: "first",
      //评论列表
      commentsList: [],
      //当前页
      total: 0,
      //最大显示
      pageSize: 10,
      pageIndex: 1,
      //用户输入的评论
      useComment: ""
    };
  },
  methods: {
    toDetail(item) {
      this.$router.push('/detail/'+item.id)
    },
    addComment() {
      const id = this.$route.params.id;
      this.$axios
        .post(`site/validate/comment/post/goods/${id}`, {
          commenttxt: this.useComment
        })
        .then(res => {
          if (res.data.status == 0) {
            this.$message.success("提交成功!");
            this.useComment = "";
            //刷新页面
            this.pageIndex = 1;
            //发请求获取评论
            this.getComments();
          } else {
            this.$message.error(res.data.message);
          }
        });
    },
    //页码改变事件
    handleCurrentChange(page) {
      //获取被点击的页码
      //修改一下当前页码 记录为被点击的页码
      this.pageIndex = page;
      //发送请求获取评论数据
      this.getComments();
    },
    //页容量改变事件
    handleSizeChange() {
      //页容量改变记录一下
      this.pageSize = pageSize;
      //页码重新为一
      this.pageIndex = 1;
      //发请求获取评论
      this.getComments();
    },
    //获取评论的方法
    getComments() {
      const id = this.$route.params.id;

      this.$axios
        .get(
          `site/comment/getbypage/goods/${id}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`
        )
        .then(res => {
          this.commentsList = res.data.message;
          this.total = res.data.totalcount;
        });
    },
    
    getDetail() {
      //获取路由传过来的数据
      const id = this.$route.params.id;
      //获取商品详情
      this.$axios.get(`site/goods/getgoodsinfo/${id}`).then(res => {
        //   console.log(res);
        this.hotgoodslist = res.data.message.hotgoodslist;
        this.goodsinfo = res.data.message.goodsinfo;
        this.imglist = res.data.message.imglist;
      });
    }
  },
  watch: {
    '$route.params.id'() {
      this.getDetail();
      this.getComments();
    }
  },
  created() {
    this.getDetail();
    //获取评论
    this.getComments();
  }
};
</script>
<style>
.my-detail img {
  float: left;
}
</style>