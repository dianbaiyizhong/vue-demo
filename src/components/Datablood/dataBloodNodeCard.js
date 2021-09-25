import G6 from "@antv/g6";
import importTableIcon from "./assets/importTable.svg";
import modelIcon from "./assets/model.svg";

const dataBloodNode = {
    init() {
        G6.registerNode('card-node', {
            draw: function drawShape(cfg, group) {
                const r = 2;
                let color = '#5B8FF9';
                const w = 160;
                let columnHeight = 16;
                const headerHeight = 22
                let h = headerHeight

                let columnArr = cfg.column

                // 通过列值设置高度
                if (columnArr) {
                    h = headerHeight + columnHeight * (cfg.column.length)
                }


                if (cfg.nodeType == 2) {
                    color = "#91c051"
                }


                const shape = group.addShape('rect', {
                    attrs: {
                        x: -w / 2,
                        y: -h / 2,
                        width: w,
                        height: h,
                        stroke: color,
                        radius: r,
                        fill: '#fff',
                    },
                    name: 'main-box',
                    draggable: true,
                });

                group.addShape('rect', {
                    attrs: {
                        x: -w / 2,
                        y: -h / 2,
                        width: w,
                        height: headerHeight,
                        fill: color,
                        radius: [r, r, 0, 0],
                    },
                    name: 'title-box',
                    draggable: true,
                });

                group.addShape("image", {
                    attrs: {
                        x: -w / 2 + 4,
                        y: -h / 2 + 3,
                        width: 16,
                        height: 16,
                        img: modelIcon,
                        opacity: 1
                    },
                    draggable: true,
                });

                // title text
                group.addShape('text', {
                    attrs: {
                        textBaseline: 'bottom',
                        x: -w / 2 + 24,
                        y: -h / 2 + 18,
                        lineHeight: 24,
                        text: cfg.label,
                        fill: '#fff',
                        fontSize: 12
                    },
                    name: 'title',
                });


                if (columnArr) {
                    columnArr.forEach(function (value, index) {
                        group.addShape('text', {
                            attrs: {
                                textBaseline: 'top',
                                x: -w / 2 + 8,
                                y: -h / 2 + headerHeight / 2 - 2 + columnHeight * (index + 1),
                                text: value,
                                fontSize: 12,
                                fill: 'rgba(0,0,0, 1)',
                            },
                            name: `description`,
                        });
                    });
                }






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
