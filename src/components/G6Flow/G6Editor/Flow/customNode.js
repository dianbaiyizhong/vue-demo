import G6 from "@antv/g6";
import { uniqueId } from '../utils'
import okSvg from "../assets/icons/ok.svg";
import hiveSvg from "../assets/icons/Hive.svg";
import loadingSvg from "../assets/icons/loading3.svg";
/**
 * format the string
 * @param {string} str The origin string
 * @param {number} maxWidth max width
 * @param {number} fontSize font size
 * @return {string} the processed result
 */
const fittingString2 = (str, maxWidth, fontSize) => {
  const ellipsis = '...';
  const ellipsisLength = G6.Util.getTextSize(ellipsis, fontSize)[0];
  let currentWidth = 0;
  let res = str;
  const pattern = new RegExp('[\u4E00-\u9FA5]+'); // distinguish the Chinese charactors and letters
  str.split('').forEach((letter, i) => {
    if (currentWidth > maxWidth - ellipsisLength) return;
    if (pattern.test(letter)) {
      // Chinese charactors
      currentWidth += fontSize;
    } else {
      // get the width of single letter according to the fontSize
      currentWidth += G6.Util.getLetterWidth(letter, fontSize);
    }
    if (currentWidth > maxWidth - ellipsisLength) {
      res = `${str.substr(0, i)}${ellipsis}`;
    }
  });
  return res;
};



/**
 * format the string
 * @param {string} str The origin string
 * @param {number} maxWidth max width
 * @param {number} fontSize font size
 * @return {string} the processed result
 */
const fittingString = (str, maxWidth, fontSize) => {
  let currentWidth = 0;
  let res = str;
  const pattern = new RegExp('[\u4E00-\u9FA5]+'); // distinguish the Chinese charactors and letters
  str.split('').forEach((letter, i) => {
    if (currentWidth > maxWidth) return;
    if (pattern.test(letter)) {
      // Chinese charactors
      currentWidth += fontSize;
    } else {
      // get the width of single letter according to the fontSize
      currentWidth += G6.Util.getLetterWidth(letter, fontSize);
    }
    if (currentWidth > maxWidth) {
      let second = `${str.substr(i)}`
      res = `${str.substr(0, i)}\n` + fittingString2(second, maxWidth, fontSize);
    }
  });
  return res;
};
const customNode = {
  init() {
    G6.registerNode("customNode", {
      draw(cfg, group) {
        let size = [170, 34]

        // 此处必须是NUMBER 不然bbox不正常
        const width = parseInt(size[0]);
        const height = parseInt(size[1]);
        const color = cfg.color;
        // 此处必须有偏移 不然drag-node错位
        const offsetX = -width / 2
        const offsetY = -height / 2
        const mainId = cfg.nodeId
        const shape = group.addShape("rect", {
          attrs: {
            id: mainId,
            x: offsetX,
            y: offsetY,
            width: width,
            height: height,
            stroke: "#ced4d9",
            fill: '#fff',//此处必须有fill 不然不能触发事件
            radius: 4
          }
        });


        group.addShape("rect", {
          attrs: {
            x: offsetX,
            y: offsetY,
            width: 4,
            height: height,
            fill: color,
            parent: mainId,
            radius: [4, 0, 0, 4]
          }
        });
        group.addShape("image", {
          attrs: {
            x: offsetX + 6,
            y: offsetY + 4,
            width: 28,
            height: 28,
            img: hiveSvg,
            opacity: 1

          },
          draggable: true,

        });



        group.addShape("text", {
          attrs: {
            id: 'modelName_' + uniqueId(),
            x: offsetX + 40,
            y: 1,
            textAlign: "left",
            textBaseline: "middle",
            text: fittingString(cfg.modelName, 110, 12),
            fontSize: 12,
            fill: "#565758",
            fontFamily: "Microsoft Yahei"
          },
          draggable: true,

        });


        let inPoints = [[0, 0.5]]
        for (let i = 0; i < inPoints.length; i++) {
          let x,
            y = 0;
          //0为顶 1为底
          if (inPoints[i][0] === 0) {
            y = 0;
          } else {
            y = height;
          }
          x = width * inPoints[i][1];
          const id = 'circle' + uniqueId()
          group.addShape("circle", {
            attrs: {
              id: 'circle' + uniqueId(),
              parent: id,
              x: x + offsetX,
              y: y + offsetY,
              r: 10,
              isInPointOut: true,
              fill: "#1890ff",
              opacity: 0
            }
          });
          group.addShape("circle", {
            attrs: {
              id: id,
              x: x + offsetX,
              y: y + offsetY,
              r: 3,
              isInPoint: true,
              fill: "#fff",
              stroke: "#1890ff",
              opacity: 0
            }
          });
        }

        let outPoints = [[1, 0.5]]

        for (let i = 0; i < outPoints.length; i++) {
          let x,
            y = 0;
          //0为顶 1为底
          if (outPoints[i][0] === 0) {
            y = 0;
          } else {
            y = height;
          }
          x = width * outPoints[i][1];
          const id = 'circle' + uniqueId()
          group.addShape("circle", {
            attrs: {
              id: 'circle' + uniqueId(),
              parent: id,
              x: x + offsetX,
              y: y + offsetY,
              r: 10,
              isOutPointOut: true,
              fill: "#1890ff",
              opacity: 0//默認0 需要時改成0.3
            }
          });
          group.addShape("circle", {
            attrs: {
              id: id,
              x: x + offsetX,
              y: y + offsetY,
              r: 3,
              isOutPoint: true,
              fill: "#fff",
              stroke: "#1890ff",
              opacity: 0
            }
          });
        }

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


        const circles = group.findAll(circle => {
          return circle.attrs.isInPoint || circle.attrs.isOutPoint;
        });
        const selectStyles = () => {
          shape.attr("fill", "#f3f9ff");
          shape.attr("stroke", "#6ab7ff");
          shape.attr("cursor", "move");
          children.forEach(child => {
            child.attr("cursor", "move");
          });
          circles.forEach(circle => {
            circle.attr('opacity', 1)
          })
        };
        const unSelectStyles = () => {
          shape.attr("fill", "#fff");
          shape.attr("stroke", "#ced4d9");
          circles.forEach(circle => {
            circle.attr('opacity', 0)
          })
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



        const offsetX = 70


        // 为状态图标添加一个父节点
        const stateImage = group.addShape("image", {
          attrs: {
            x: -9 + offsetX,
            y: -9,
            width: 18,
            height: 18,
            img: loadingSvg
          }
        });


        stateImage.animate(
          {
            // 动画重复
            repeat: true,
            // 每一帧的操作，入参 ratio：这一帧的比例值（Number）。返回值：这一帧需要变化的参数集（Object）。
            onFrame(ratio) {
              // 旋转通过矩阵来实现
              // 当前矩阵
              const matrix = G6.Util.mat3.create();
              // 目标矩阵
              // const toMatrix = G6.Util.transform(matrix, [
              //   ['r', ratio * Math.PI * 2],
              // ]);
              const toMatrix = G6.Util.transform(matrix,
                [['t', -offsetX, 0],
                ['r', ratio * Math.PI * 2],
                ['t', +offsetX, 0]]);
              // 返回这一帧需要的参数集，本例中只有目标矩阵
              return {
                matrix: toMatrix,
              };
            },
          },
          1200,
          'easeLinear',
        );
      }
    });
  }
}

export default customNode
