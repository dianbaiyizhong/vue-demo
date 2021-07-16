import Mock from 'mockjs'

// 设置响应延时
Mock.setup({
    timeout: '100-1000'//可以是整数，也可以是‘-’字符串
})

Mock.mock('/mock/getList/0', 'get', {
    'msg': '操作成功',
    'code': 0,
    'data': [
        {
            name: "父节点",
            children: [{ name: "子节点1" }, { name: "子节点2" }],
        },
    ]
})

export default Mock;
