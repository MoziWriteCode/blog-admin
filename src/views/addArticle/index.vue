<template>
  <div class="app-container add_article_page">
    <ul class="article_info_box">
      <li>
        <span class="article_title">标题:</span>
        <input class="article_input" type="text" placeholder="文章标题" v-model="article.article_title">
      </li>
      <li>
        <span class="article_title">标签:</span>
        <label role="checkbox" v-for=" item in tags" :key="item._id">
          <input type="checkbox" name="tags" :value="item._id" v-model="article.article_tags">
          <span :title="item.tags_desc">{{item.tags_name}}</span>
        </label>
      </li>
      <li>
        <span class="article_title">状态:</span>
        <label role="radio">
          <input type="radio" name="state" v-model="article.article_state" value="1" checked>
          <span>发表</span>
        </label>
        <label role="radio">
          <input type="radio" name="state" v-model="article.article_state" value="0">
          <span>草稿</span>
        </label>
      </li>
      <li>
        <span class="article_title">封面:</span>
        <input class="article_input" type="text" placeholder="图片地址" v-model="article.article_cover">
        <img :src="article.article_cover" class="article_cover" alt="封面图片">
      </li>
      <li>
        <span class="article_title">描述:</span>
        <input class="article_input" type="text" placeholder="文章描述" v-model="article.article_desc">
      </li>
    </ul>
    <div class="article_content">
      <y-markdown
        ref="markdown"
        :mdValuesP="article.article_markdown"
        :fullPageStatusP="false"
        :editStatusP="true"
        :previewStatusP="true"
        :navStatusP="true"
        :icoStatusP="true"
        @childevent="childEventHandler"
        @imgAdd="imgAdd"
        @delImage="delIMage"
      ></y-markdown>
    </div>
    <div class="tool">
      <input type="file" @change="getFile" id="uploadMD">
      <label for="uploadMD">上传MD</label>
      <button @click="save">保存&发表</button>
    </div>
  </div>
</template>

<script>
import "../../assets/style/markdown.css";
import { mapGetters } from "vuex";
import { getArticle, editArticle, addArticle } from "@/api/article";
import { addImage, delImage } from "@/api/uploadImage";

export default {
  created() {
    this.$nextTick(() => {
      this.removeLocalStorage();
    });
  },
  data() {
    return {
      article: {
        _id: "",
        article_markdown: "",
        article_html: "",
        article_cover: "",
        article_create_time: "",
        article_desc: "",
        article_state: 0,
        article_tags: [],
        article_title: "",
        article_update_time: "",
        article_ready: 0
      },
      article_info: {
        cover: ""
      },
      article_markdown: "",
      timer: 0
    };
  },
  methods: {
    childEventHandler(res) {
      this.article.article_markdown = res.mdValue;
      this.article.article_html = res.htmlValue;
    },
    imgAdd(file) {
      let formdata = new FormData();
      formdata.append("file", file);
      addImage(formdata)
        .then(res => {
          console.log(res);
          let file_url = res.file_url;
          let image_id = res._id;
          let obj = { name: file.name, url: file_url, id: image_id };
          this.$refs["markdown"].$callbackAddImage(obj);
        })
        .catch(error => {
          console.log("image upload error", error);
        });
    },
    delIMage(image) {
      delImage(image.id)
        .then(res => {
          console.log(res);
        })
        .catch(error => {
          console.log("image upload error", error);
        });
    },
    getFile(e) {
      let obj = e.target || null;
      let fileName = obj.files[0].name;
      if (fileName.slice(fileName.lastIndexOf(".") + 1).toLowerCase() != "md") {
        alert("请上传markdown的文件！");
        return;
      }
      let fileReader = new FileReader();
      fileReader.readAsText(obj.files[0]);

      fileReader.onload = function() {
        let result = this.result;
        try {
          // 缓存
          this.article.article_markdown = result;
        } catch (e) {
          console.log("Storage failed: " + e);
        }
      };
    },
    removeLocalStorage() {
      if (localStorage.getItem("tempData")) {
        localStorage.removeItem("tempData");
        this.article_markdown = "";
        this.article = {
          _id: "",
          article_markdown: "",
          article_html: "",
          article_cover: "",
          article_create_time: "",
          article_desc: "",
          article_state: 0,
          article_tags: [],
          article_title: "",
          article_update_time: "",
          article_ready: 0
        };
      }
      this.init_page();
    },
    save() {
      if (this.article._id !== "") {
        editArticle(this.article)
          .then(() => {
            this.to();
          })
          .catch(err => {
            alert(err);
          });
      } else {
        addArticle(this.article)
          .then(() => {
            this.to();
          })
          .catch(err => {
            alert(err);
          });
      }
    },
    to() {
      localStorage.removeItem("tempData");
      this.$router.push("/admin/article");
    },
    auto_save() {
      this.timer = setInterval(() => {
        let tempData = {
          article_title: this.article.article_title,
          article_tags: this.article.article_tags,
          article_state: this.article.article_state,
          article_cover: this.article.article_cover,
          article_markdown: this.article.article_markdown,
          article_html: this.article.article_html
        };
        localStorage.setItem("tempData", JSON.stringify(tempData));
      }, 10000);
    },
    init_page() {
      this.$store.dispatch("getTags");
      let { id = "" } = this.$route.query;
      if (id != "") {
        getArticle(id)
          .then(res => {
            this.article = res;
            this.article_markdown = res.article_markdown;
            this.article.article_tags = this.article.article_tags.map(item => {
              return item._id;
            });
          })
          .catch(err => {
            alert(err);
          });
      } else {
        localStorage.removeItem("tempData");
        this.article_markdown = "";
        this.article = {
          _id: "",
          article_markdown: "",
          article_html: "",
          article_cover: "",
          article_create_time: "",
          article_desc: "",
          article_state: 0,
          article_tags: [],
          article_title: "",
          article_update_time: "",
          article_ready: 0
        };
        // 添加到自动保存
        this.auto_save();
      }
    }
  },
  computed: {
    ...mapGetters(["tags"]),
    select_tag() {
      return this.article.article_tags.map(item => {
        return item._id;
      });
    }
  },
  destroyed() {
    clearInterval(this.timer);
  },
  watch: {
    $route(val, old) {
      this.removeLocalStorage();
    }
  }
};
</script>

<style lang="scss">
.add_article_page {
  box-sizing: border-box;
  .article_info_box {
    ul,
    li {
      list-style: none;
    }
    input[type="radio"],
    input[type="checkbox"] {
      display: none;
    }
    input[type="radio"]:checked + span,
    input[type="checkbox"]:checked + span {
      background-color: #23292f;
      color: #fff;
    }
    li {
      font-size: 18px;
      border-bottom: 1px dotted #666;
      padding: 5px 0;
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
      .article_input {
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
      .article_cover {
        vertical-align: middle;
        height: 100%;
      }
    }
  }
  .article_content .CodeMirror-scroll {
    max-height: 500px;
    overflow-y: scroll;
  }
  .article_content .CodeMirror-fullscreen .CodeMirror-scroll {
    max-height: 100%;
  }
  .tool {
    text-align: right;
    label {
      display: inline-block;
      text-align: center;
      box-sizing: border-box;
    }
    button,
    label {
      background-color: #23292f;
      font-size: 14px;
      color: #fff;
      width: 80px;
      height: 30px;
      line-height: 30px;
      border: none;
      outline: none;
      margin: 0 10px;
      cursor: pointer;
      &:active {
        opacity: 0.8;
      }
    }
    input {
      opacity: 0;
      position: relative;
      z-index: -1;
    }
  }
}
</style>
