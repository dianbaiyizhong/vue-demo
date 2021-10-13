import { uniqueId } from '../utils';
import eventBus from "../utils/eventBus";

export default class Editor {
  constructor() {
    this.id = uniqueId();
  }
  getGrpah() {
    return this.graph
  }
  emit(event, params) {
    if (event === 'afterAddPage') {
      this.graph = params.graph
    }
    eventBus.$emit(event, params)
  }
  on(event) {
    switch (event) {
      case 'changeNodeData':
        this.graph.refresh()
        break
    }
  }
  add(type, item) {
    // 可以在这里判断是否符合dag


    this.graph.addItem(type, item)
  }
  addEdge(item) {
    this.graph.add("edge", item, false)
  }
  addNode(item) {
    this.graph.add("node", item)
  }
  update(item, model) {
    this.graph.update(item, model, false)
  }
  remove(item) {
    const node = this.graph.findById(item.id)
    this.graph.remove(node)
  }
}