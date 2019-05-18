<template>
  <div class="app-container article_page">
    <ul class="search_box">
      <li>
        <span class="search_title">标签:</span>
        <label role="radio">
          <input type="radio" name="tags" v-model="searchJson.tag" value checked>
          <span>全部</span>
        </label>
        <label role="radio" v-for=" item in tags" :key="item._id">
          <input type="radio" name="tags" v-model="searchJson.tag" :value="item._id">
          <span>{{ item.tags_name }}</span>
        </label>
      </li>
      <li>
        <span class="search_title">状态:</span>
        <label role="radio">
          <input type="radio" name="state" value v-model="searchJson.state" checked>
          <span>全部</span>
        </label>
        <label role="radio">
          <input type="radio" name="state" value="1" v-model="searchJson.state">
          <span>发表</span>
        </label>
        <label role="radio">
          <input type="radio" name="state" value="0" v-model="searchJson.state">
          <span>草稿</span>
        </label>
      </li>
      <li>
        <span class="search_title">搜索:</span>
        <input
          class="search_input"
          type="text"
          v-model="searchJson.keyword"
          placeholder="标题 内容 . . . "
        >
        <button class="btn" @click="search">搜索</button>
        <button class="btn">写文章</button>
      </li>
    </ul>
    <div class="article_list">
      <ul class="article_item table_th">
        <li class="article_title">文章标题</li>
        <li class="article_crate">创建日期</li>
        <li class="article_update">修改日期</li>
        <li class="article_tags">标签</li>
        <li class="article_state">状态</li>
        <li class="article_operation">操作</li>
      </ul>
      <ul class="article_item" v-for="item in article_list" :key="item._id">
        <li class="article_title">{{ item.article_title }}</li>
        <li class="article_crate">{{ item.article_create_time | formatDate }}</li>
        <li class="article_update">{{ item.article_update_time | formatDate }}</li>
        <li class="article_tags">
          <a
            href="javascript:void(0);"
            v-for="tag in item.article_tags"
            :key="tag._id"
            :title="tag.tags_desc"
          >
            <span>{{ tag.tags_name }}</span>
          </a>
        </li>
        <li class="article_state">{{ item.article_state | formatState }}</li>
        <div class="article_operation">
          <button class="btn look">
            <a target="_blank">查看</a>
          </button>
          <button class="btn alter" @click="alter(item)">修改</button>
          <button class="btn del" @click="del(item)">删除</button>
        </div>
      </ul>
    </div>
    <Paginator
      :cur_page="Number(pagination.current_page)"
      :page_size="Number(pagination.page_size)"
      :total="Number(pagination.total)"
      @jump="jump"
    ></Paginator>
  </div>
</template>

<script>
import Paginator from "@/components/Paginator";
import { mapGetters } from "vuex";
import { getArticles } from "@/api/article";
import { parseTime } from "@/utils/";
export default {
  components: { Paginator },
  created() {
    this.$nextTick(() => {
      this.$store.dispatch("getTags").then(() => {
        this.get_article();
      });
    });
  },
  computed: {
    ...mapGetters(["tags"])
  },
  data() {
    return {
      article_list: [],
      pagination: {
        current_page: 1,
        page_size: 10,
        total: 100
      },
      searchJson: {
        current_page: 1,
        page_size: 10,
        keyword: "",
        tag: "",
        state: ""
      }
    };
  },
  filters: {
    formatDate(val) {
      return parseTime(parseInt(val));
    },
    formatState(val) {
      return val == 0 ? "草稿" : "发表";
    }
  },
  methods: {
    jump(num) {
      this.searchJson.current_page = Number(num);
      this.get_article();
    },
    get_article() {
      getArticles(this.searchJson).then(res => {
        this.article_list = res.list;
        this.pagination = res.pagination;
      });
    },
    search() {
      this.searchJson.current_page = 1;
      this.get_article();
    },
    alter(item) {
      this.$router.push({
        path: `/admin/addArticle`,
        query: { id: item._id }
      });
    },
    async del(item) {
      let res = await this.$http.api_del_article(item._id);
      let { code, msg } = res.data;
      alert(msg);
      if (code == 200) {
        this.article_list.splice(
          this.article_list.findIndex(i => i._id === item._id),
          1
        );
      }
    }
  }
};
</script>

<style lang="scss">
.article_page {
  box-sizing: border-box;
  ul,
  li {
    list-style: none;
  }
  .search_box {
    input[type="radio"] {
      display: none;
    }
    input[type="radio"]:checked + span {
      background-color: #23292f;
      color: #fff;
    }
    li {
      font-size: 18px;
      border-bottom: 1px dotted #666;
      height: 50px;
      line-height: 50px;
      label {
        margin: 0 5px;
        font-size: 16px;
        span {
          padding: 5px;
          transition: background-color, color 0.6s;
          cursor: pointer;
        }
      }
      .search_input {
        margin: 0 5px;
        padding: 5px;
        width: 350px;
        line-height: 150%;
        outline: none;
        border: none;
        border-bottom: 1px dotted #ccc;
        transition: border-bottom-color 0.6s;
        &::-webkit-input-placeholder {
          color: #23292f;
        }
        &:focus {
          border-bottom-color: #23292f;
        }
      }
    }
  }
  .article_list {
    .table_th {
      font-weight: 700;
      font-size: 18px !important;
    }
    .article_item {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      word-break: break-all;
      border-bottom: 1px solid #ccc;
      padding: 10px 0;
      font-size: 11px;
      .article_title {
        width: 260px;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .article_crate,
      .article_update {
        width: 150px;
      }
      .article_tags {
        width: 200px;
      }
      .article_state {
        width: 80px;
      }
      .article_tags {
        span {
          padding: 5px;
        }
      }
      .article_operation {
        flex: 1;
      }
    }
  }
}
</style>
