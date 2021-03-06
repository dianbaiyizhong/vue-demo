import Editor from './Editor'
import Vue from 'vue'

let editorCache = {}

class Editor_ {
  constructor () {
    this.instance = new Vue({
      name: 'EditorInstance',
      data () {
        return {
          value: '',
          language: '',
          readOnly: false,
          minimap: false,
          suggestions: []
        }
      },
      watch: {
        value (value) {
          this.$emit('value-change', value)
        }
      },
      render (h) {
        return h(Editor, {
          props: {
            value: this.value,
            language: this.language,
            readOnly: this.readOnly,
            minimap: this.minimap,
            suggestions: this.suggestions
          },
          on: {
            'update': (value) => {
              this.value = value
            }
          }
        })
      }
    })
    this.instance.$mount()
  }

  /**
   * 初始化渲染editor
   */
  init ($container, props) {
    Object.assign(this.instance.$data, props)
    $container.appendChild(this.instance.$el)
  }
  /**
   * 设置data
   */
  setData (key, value) {
    this.instance[key] = value
  }
  /**
   * 获取data
   */
  getData (key) {
    return this.instance[key]
  }
  /**
   * 删除实例
   */
  destroy () {
    this.instance && this.instance.$destroy()
  }
}
/**
 * 注册
 */
Editor.register = function (name) {
  if (editorCache[name] === undefined) {
    editorCache[name] = new Editor_()
  }
  return editorCache[name]
}

export default Editor
