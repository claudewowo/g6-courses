## 技能树

### 获取接口地址

```js
/tree/node/list | GET
```

### 参数

#### query 参数

| 变量名   | 类型 | 说明     |
| :------- | :--- | :------- |
| userId  | Number | 用户ID |

### 返回值

#### 返回结果

| 变量名    | 类型          | 说明     |
| :------- | :----------- | :------- |
| code     | Number       | 0 表示成功 |
| data     | JSON         | 结果结构体 |
| msg      | String       | 错误信息 |

##### data 数据结构:

| 变量名    | 类型          | 说明     |
| :------- | :----------- | :------- |
| id       | Number       | 0 表示成功 |
| label     | JSON         | 节点文本 |
| data      | String       | 结果结构体 |
| data.children   | Array | 子节点数组 |
| data.progress | String   | 当前节点学习进度 |
| data.score   | String    | 当前节点学分 |
| data.testURL   | String    | 考试链接 |
| data.QRCode  | String   | tooltip 里的二维码 |
| data.xx   | String       | tooltip 里的其他字段 |

* 学分与进度的区别: 学分通常是底层子节点, 进度通常表示父级节点(当前技能)的进度, 学分满分100, 进度完成是 100%

示例

```json
{
 "code": 0,
 "data": {
    id: '0',
    depth: 0,
    label: '前端技能树',
    children: [
        {
        id: '0-0',
        depth: 1,
        label: 'HTML',
        data: {
            progress: false,
        },
        children: [
            {
            id: '0-0-0',
            label: 'HTML5',
            depth: 2,
            data: {
                score: '33%',
            },
            children: [
                {
                id: '0-0-0-0',
                label: 'canvas',
                depth: 3,
                data: {
                    progress: false,
                    score: 0,
                },
                },
                {
                id: '0-0-0-1',
                label: 'websocket',
                depth: 3,
                data: {
                    progress: false,
                    score: 0,
                },
                },
                {
                id: '0-0-0-2',
                label: 'web worker',
                depth: 3,
                data: {
                    progress: true,
                    score: 100,
                },
                },
            ],
            },
        ],
        },
        {
        id: '0-1',
        depth: 1,
        label: 'css',
        children: [
            {
            id: '0-1-0',
            label: 'css3',
            depth: 2,
            children: [
                {
                id: '0-1-0-0',
                label: 'flex 伸缩布局',
                depth: 3,
                },
                {
                id: '0-1-0-1',
                label: 'transform 变形',
                depth: 3,
                },
                {
                id: '0-1-0-2',
                label: 'transition 过渡',
                depth: 3,
                },
                {
                id: '0-1-0-3',
                label: 'animation 动画',
                depth: 3,
                },
            ]
            }
        ],
        },
        {
        id: '0-2',
        depth: 1,
        label: 'js',
        children: [
            {
            id: '0-2-0',
            label: 'ES6',
            depth: 2,
            children: [
                {
                id: '0-2-0-0',
                label: 'ES6',
                depth: 3,
                },
                {
                id: '0-2-0-1',
                label: '面向对象',
                depth: 3,
                },
                {
                id: '0-2-0-2',
                label: 'this',
                depth: 3,
                },
                {
                id: '0-2-0-3',
                label: '事件循环',
                depth: 3,
                },
            ],
            },
        ],
        },
        {
        id: '0-3',
        depth: 1,
        label: '流行框架',
        children: [
            {
            id: '0-3-0',
            label: 'react',
            depth: 2,
            },
            {
            id: '0-3-1',
            label: 'vue',
            depth: 2,
            },
        ],
        },
        {
        id: '0-4',
        depth: 1,
        label: '小程序',
        children: [
            {
            id: '0-4-0',
            label: '微信小程序',
            depth: 2,
            },
            {
            id: '0-4-1',
            label: '支付宝小程序',
            depth: 2,
            },
        ],
        },
    ],
    }
}
```

### 新增节点接口地址 (将节点插入到指定父级下面)

```js
/tree/node/add | POST
```

### 参数

#### data 参数

| 变量名   | 类型 | 说明     |
| :------- | :--- | :------- |
| id  | String | 节点id |
| label  | String | 节点文本 |
| parentId  | String | 父级节点id |
| data.progress  | String | 当前节点进度 |
| data.score  | String | 当前节点学分 |
| data.testURL   | String    | 考试链接 |
| data.QRCode  | String   | tooltip 里的二维码 |
| data.xx   | String       | tooltip 里的其他字段 |

### 返回值

#### 返回结果

| 变量名    | 类型          | 说明     |
| :------- | :----------- | :------- |
| code     | Number       | 0 表示成功 |
| data     | JSON         | 结果结构体 |
| msg      | String       | 错误信息 |

示例

```json
{
 "code": 0,
 "data": {},
 "msg": "节点添加成功!",
}
```

### 删除节点接口地址

```js
/tree/node/delete | POST
```

### 参数

#### data 参数

| 变量名   | 类型 | 说明     |
| :------- | :--- | :------- |
| id  | String | 节点id |
| parentId  | String | 父级节点id |

### 返回值

#### 返回结果

| 变量名    | 类型          | 说明     |
| :------- | :----------- | :------- |
| code     | Number       | 0 表示成功 |
| data     | JSON         | 结果结构体 |
| msg      | String       | 错误信息 |

示例

```json
{
 "code": 0,
 "data": {},
 "msg": "节点删除成功!",
}
```

### 更新节点接口地址

```js
/tree/node/update | POST
```

### 参数

#### data 参数

| 变量名   | 类型 | 说明     |
| :------- | :--- | :------- |
| id  | String | 节点id |
| label  | String | 节点文本 |
| data.testURL   | String    | 考试链接 |
| data.QRCode  | String   | tooltip 里的二维码 |
| data.xx   | String       | tooltip 里的其他字段 |

### 返回值

#### 返回结果

| 变量名    | 类型          | 说明     |
| :------- | :----------- | :------- |
| code     | Number       | 0 表示成功 |
| data     | JSON         | 结果结构体 |
| msg      | String       | 错误信息 |

示例

```json
{
 "code": 0,
 "data": {},
 "msg": "节点更成功!",
}
```

### 查询节点详情接口地址

```js
/tree/node/detail | GET
```

### 参数

#### query 参数

| 变量名   | 类型 | 说明     |
| :------- | :--- | :------- |
| id  | String | 节点id |

### 返回值

#### 返回结果

| 变量名    | 类型          | 说明     |
| :------- | :----------- | :------- |
| code     | Number       | 0 表示成功 |
| data     | JSON         | 结果结构体 |
| msg      | String       | 错误信息 |

示例

```json
{
 "code": 0,
 "data": {
    id: '0',
    label: '某个子树',
    data: {
      testURL: '',
      QRCode: '',
      // ...其他字段
    }
 },
}
```
