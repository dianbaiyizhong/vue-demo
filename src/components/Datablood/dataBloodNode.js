import G6 from "@antv/g6";
import importTableIcon from "./assets/importTable.svg";

const dataBloodNode = {
    init() {
        G6.registerNode("dataBloodNode", {
            draw(cfg, group) {
                let size = [170, 34]

                const width = parseInt(size[0]);
                const height = parseInt(size[1]);
                const color = cfg.color;
                // 此处必须有偏移 不然drag-node错位
                const offsetX = -width / 2
                const offsetY = -height / 2
                const mainId = cfg.id
                const shape = group.addShape("rect", {
                    attrs: {
                        x: offsetX,
                        y: offsetY,
                        id: mainId,
                        width: width,
                        height: height,
                        stroke: "#69c0ff",
                        fill: '#ffffff',
                        radius: 5,
                        lineWidth: 1,
                        fillOpacity: 1,
                    }
                });

                group.addShape("rect", {
                    attrs: {
                        x: offsetX,
                        y: offsetY,
                        width: 4,
                        height: height,
                        fill: "#40a9ff",
                        parent: mainId,
                        radius: [4, 0, 0, 4]
                    }
                });


                group.addShape("image", {
                    attrs: {
                        x: offsetX + 10,
                        y: offsetY + 9,
                        width: 16,
                        height: 16,
                        img: importTableIcon,
                        opacity: 1
                    },
                    draggable: true,
                });
                group.addShape("text", {
                    attrs: {
                        x: offsetX + 32,
                        y: 2,
                        textAlign: "left",
                        text: "输入表",
                        fontSize: 12,
                        fill: "#595959",
                    },
                    draggable: true,
                });


                group.addShape("text", {
                    attrs: {
                        x: offsetX + 32,
                        y: 12,
                        textAlign: "left",
                        text: "kia_config",
                        fontSize: 8,
                        fill: "#d6d6d6",
                    },
                    draggable: true,
                });



                //group.sort()
                // 添加文本、更多图形
                return shape;
            },
            //设置状态
            setState(name, value, item) {
                const group = item.getContainer();
                const shape = group.get("children")[0]; // 顺序根据 draw 时确定

                const children = group.findAll(g => {
                    return g.attrs.parent === shape.attrs.id
                });

                const selectStyles = () => {
                    shape.attr("fill", "#f3f9ff");
                    shape.attr("stroke", "#6ab7ff");
                    shape.attr("cursor", "move");
                    children.forEach(child => {
                        child.attr("cursor", "move");
                    });

                };
                const unSelectStyles = () => {
                    shape.attr("fill", "#fff");
                    shape.attr("stroke", "#ced4d9");

                };
                switch (name) {
                    case "selected":
                    case "hover":
                        if (value) {
                            selectStyles()
                        } else {
                            unSelectStyles()
                        }
                        break;
                }
            },
            afterDraw(cfg, group) {

            }
        });
    }
}

export default dataBloodNode
