<template>
  <div class="app-container tags_page">
    <div class="tool">
      <button class="btn" @click="addTags">添加标签</button>
    </div>
    <div class="tags_list">
      <ul class="tags_item tags_item_th">
        <li class="tags_name">名称</li>
        <li class="tags_desc">描述</li>
        <li class="tags_art_num">文章数</li>
        <li class="tags_operator">操作</li>
      </ul>
      <ul class="tags_item" v-for="item in tags" :key="item._id">
        <li class="tags_name">{{item.tags_name}}</li>
        <li class="tags_desc">{{item.tags_desc}}</li>
        <li class="tags_art_num">{{item.tags_article_num}}</li>
        <li class="tags_operator">
          <button class="btn del" @click="del(item)">删除</button>
          <button class="btn alter" @click="alterTage(item)">修改</button>
        </li>
      </ul>
    </div>
    <LayerTags
      :layser_data="layser_data"
      :layser_title="layser_title"
      v-show="layer_mark"
      @close_layer="close_layer"
      @save="save"
    ></LayerTags>
  </div>
</template>
 
 <script>
import LayerTags from "@/components/Layer_tags";
import { addTags, editTags, delTags } from "@/api/tags";
import { mapGetters } from "vuex";
export default {
  created() {
    this.$nextTick(() => {
      this.getTags();
    });
  },
  data() {
    return {
      layer_mark: false,
      layser_data: {},
      layser_title: "添加标签"
    };
  },
  computed: {
    ...mapGetters(["tags"])
  },
  methods: {
    getTags() {
      this.$store.dispatch("getTags");
    },
    close_layer(bool) {
      this.layer_mark = bool;
    },
    addTags() {
      this.layser_data = {
        _id: "",
        tags_name: "",
        tags_desc: ""
      };
      this.layser_title = "添加标签";
      this.layer_mark = true;
    },
    alterTage(item) {
      this.layser_data = JSON.parse(JSON.stringify(item));
      this.layser_title = "修改标签";
      this.layer_mark = true;
    },
    save(data) {
      this.layer_mark = false;
      let res = {};
      if (data._id == "") {
        addTags({ tags_name: data.tags_name, tags_desc: data.tags_desc })
          .then(res => {
            this.getTags();
          })
          .catch(err => {
            alert(err);
          });
      } else {
        editTags({
          _id: data._id,
          tags_name: data.tags_name,
          tags_desc: data.tags_desc
        })
          .then(res => {
            this.getTags();
          })
          .catch(err => {
            alert(err);
          });
      }
    },
    del(item) {
      if (confirm(`是否确认删除标签名为: ${item.tags_name} 这个标签？`)) {
        delTags(item._id)
          .then(() => {
            this.tags.forEach((item2, i, arr) => {
              if (item2._id == item._id) {
                arr.splice(i, 1);
              }
            });
          })
          .catch(err => {
            alert(err);
          });
        this.layer_mark = false;
      }
    }
  },
  components: { LayerTags }
};
</script>
 

<style lang="scss">
.tags_page {
  .tags_item_th {
    color: #23292f;
    font-weight: bold;
  }
  .tags_item {
    display: flex;
    align-items: center;
    justify-content: center;
    word-break: break-all;
    border-bottom: 1px solid #ccc;
    padding: 10px 0;
    li {
      list-style: none;
    }
    .tags_name,
    .tags_operator {
      width: 200px;
    }
    .tags_desc {
      flex: 1;
    }
    .tags_operator {
      text-align: center;
    }
    .tags_art_num {
      width: 100px;
      text-align: center;
    }
  }
}
</style>