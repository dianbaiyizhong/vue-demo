import Mock from 'mockjs'

// 设置响应延时
Mock.setup({
    timeout: '100-1000'//可以是整数，也可以是‘-’字符串
})

Mock.mock('/mock/getList/root', 'get', {
    'msg': '操作成功',
    'code': 0,
    'data': [
        {
            name: "父节点",
            id: 0,
            isParent: true,
            // iconSkin: "pIcon01"
        },
        {
            name: "父节点2",
            id: 100,
            isParent: true,
            // iconSkin: "pIcon01"
        },
    ]
})

Mock.mock('/mock/getList/0', 'get', {
    'msg': '操作成功',
    'code': 0,
    'data': [
        {
            name: "模型分组1",
            id: 1,
            pid: 0,
            iconSkin: "icon_model",
            isParent: false,
            nocheck: true
        },
        {
            name: "模型分组2",
            id: 12,
            pid: 0,
            iconSkin: "icon_model",
            isParent: false,
            nocheck: true
        },
    ]
})







Mock.mock('/mock/login', 'get', {
    'msg': '登录成功',
    'code': 0,
    'data': "1"
})


Mock.mock('/mock/getUserInfo', 'get', {
    'msg': '成功',
    'code': 0,
    'data': {
        userId: "1",
        userName: "nntk"
    }

})
Mock.mock('/mock/getOrder', 'get', {
    'msg': '成功',
    'code': 0,
    'data': [
        {
            orderId: "1",
            goodName: "牙刷"
        }
    ]


})




Mock.mock('/mock/getModel', 'get', {
    'msg': '操作成功',
    'code': 0,
    'data': [
        {
            name: "Hive模型",
            id: 0,
            isParent: false,
            // iconSkin: "pIcon01"
        },
        {
            name: "Spark模型",
            id: 100,
            isParent: false,
            // iconSkin: "pIcon01"
        },
    ]
})


Mock.mock('/mock/getFlowJson', 'get', {
    'msg': '操作成功',
    'code': 0,
    'data': {
        nodes: [
            {
                id: 'n1',
                nodeId: "n1",
                modelName: "Hive模型",
                type: "customNode",
                modelState: 1,
                color: "#1890ff",
            },
            {
                id: 'n2',
                nodeId: "n2",
                modelName: "Spark模型",
                type: "customNode",
                modelState: 2,
                color: "#1890ff",
            },
        ],
        edges: [
            {
                source: 'n1',
                target: 'n2',
            },
        ],


    }
})
export default Mock;
