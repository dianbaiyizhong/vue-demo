import G6 from "@antv/g6";
import { uniqueId } from '../utils'
const MIN_ARROW_SIZE = 3

const customEdge = {
  init() {
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

    const lineDash = [4, 2, 1, 2];
    const interval = 9;
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
            stroke: '#b8c3ce',
            lineAppendWidth: 10,
            // endArrow: {
            //   path: 'M 4,0 L -4,-4 L -4,4 Z',
            //   d: 4,
            //   fill: '#F6BD16',
            //   lineDash: [0, 0],
            // }
            endArrow: {
              // path: G6.Arrow.triangle(),
              path: 'M 0,0 L 6,-2 Q 5 0,6 2 Z',
              fill: '#F6BD16',
              lineDash: [0, 0],
            }
          }
        });
        return keyShape
      },
      afterDraw(cfg, group) {
        if (cfg.source.getModel().isDoingStart && cfg.target.getModel().isDoingEnd) {
          const shape = group.get('children')[0];
          const length = shape.getTotalLength(); // G 增加了 totalLength 的接口
          let totalArray = [];
          for (var i = 0; i < length; i += interval) {
            totalArray = totalArray.concat(lineDash);
          }
          let index = 0;
          shape.animate({
            onFrame() {
              const cfg = {
                lineDash: dashArray[index].concat(totalArray)
              };
              index = (index + 1) % interval;
              return cfg;
            },
            repeat: true
          }, 3000);
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
