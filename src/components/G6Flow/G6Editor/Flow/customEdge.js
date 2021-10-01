import G6 from "@antv/g6";
import { uniqueId } from '../utils'
const MIN_ARROW_SIZE = 3

const customEdge = {
  init() {

    G6.registerEdge('customEdge', {
      draw(cfg, group) {
        let sourceNode, targetNode, start, end
        if (typeof (cfg.source) === 'string') {
          cfg.source = cfg.sourceNode
        }
        if (!cfg.start) {
          cfg.start = {
            x: 0,
            y: 17
          }
        }
        if (!cfg.end) {
          cfg.end = {
            x: 0,
            y: -17
          }
        }



        sourceNode = cfg.sourceNode._cfg.model
        start = {
          x: sourceNode.x + cfg.start.x,
          y: sourceNode.y + cfg.start.y,
        }


        // console.info(cfg)
        if (typeof (cfg.target) === 'string') {
          targetNode = cfg.targetNode._cfg.model
        } else if (!cfg.target.x) {
          targetNode = cfg.target._cfg.model
        } else {
          targetNode = cfg.target
        }
        end = {
          x: targetNode.x + cfg.end.x,
          y: targetNode.y + cfg.end.y,
        }


        let path = []
        let hgap = Math.abs(end.x - start.x)
        if (end.x > start.x) {
          path = [
            ['M', start.x, start.y],
            [
              'C',
              start.x,
              start.y + hgap / (hgap / 50),
              end.x,
              end.y - hgap / (hgap / 50),
              end.x,
              end.y - 4
            ],
            [
              'L',
              end.x,
              end.y
            ]
          ]
        } else {
          path = [
            ['M', start.x, start.y],
            [
              'C',
              start.x,
              start.y + hgap / (hgap / 50),
              end.x,
              end.y - hgap / (hgap / 50),
              end.x,
              end.y - 4
            ],
            [
              'L',
              end.x,
              end.y
            ]
          ]
        }


        const keyShape = group.addShape('path', {
          attrs: {
            id: 'edge' + uniqueId(),
            path: path,
            stroke: '#808080',
            // lineAppendWidth: 10,
            lineWidth: 1,
            endArrow: {
              path: G6.Arrow.triangle(8, 8, 0),
              lineDash: [0, 0],
              fill: '#808080',
              d: 0
            }
          }
        });
        return keyShape
      },
      afterDraw(cfg, group) {

        // console.info(cfg)


        if (cfg.targetNode == null) {
          // 拖拽连线但是未找到终点的时候，需要有这个判断
          return
        }



        // 判断并启动连线动画
        if (cfg.source.getModel().modelState == 1 && cfg.targetNode._cfg.model.modelState == 3) {

          const shape = group.get('children')[0];

          // 设置动画流水线图为绿色
          shape.attr("stroke", "#5FD38F");

          let index = 0;
          // 边 path 图形的动画
          shape.animate(
            () => {
              index++;
              if (index > 10) {
                index = 0;
              }
              const res = {
                lineDash,
                lineDashOffset: -index,
              };
              // 返回需要修改的参数集，这里修改了 lineDash,lineDashOffset
              return res;
            },
            {
              repeat: true, // 动画重复
              duration: 2000, // 一次动画的时长为 3000
            },
          );
        }
      },
      setState(name, value, item) {
        const group = item.getContainer();
        const shape = group.get("children")[0];
        const selectStyles = () => {
          shape.attr("stroke", "#6ab7ff");
        };
        const unSelectStyles = () => {
          shape.attr("stroke", "#b8c3ce");
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
      }
    });


    const dashArray = [
      [0, 1],
      [0, 2],
      [1, 2],
      [0, 1, 1, 2],
      [0, 2, 1, 2],
      [1, 2, 1, 2],
      [2, 2, 1, 2],
      [3, 2, 1, 2],
      [4, 2, 1, 2]
    ];
    const lineDash = [10, 2];

    // const lineDash = [4, 2, 1, 2];
    const interval = 5;
    G6.registerEdge('link-edge', {
      draw(cfg, group) {
        let sourceNode, targetNode, start, end

        // console.info(cfg)
        sourceNode = cfg.sourceNode._cfg.model

        start = {
          x: sourceNode.x + cfg.start.x,
          y: sourceNode.y + cfg.start.y,
        }
        end = {
          x: cfg.endPoint.x + cfg.end.x,
          y: cfg.endPoint.y,
        }
        let path = []
        path = [
          ['M', start.x, start.y],
          ['L', end.x, end.y]
        ]
        const keyShape = group.addShape('path', {
          attrs: {
            id: 'edge' + uniqueId(),
            path: path,
            stroke: '#1890FF',
            strokeOpacity: 0.9,
            lineDash: [5, 5]
          }
        });
        return keyShape
      },
    });
  }
}

export default customEdge
