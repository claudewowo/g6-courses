/*
 * 数据结构:
 * { id, label, data }
 * @data: 包含更多信息:
 * @progress 当前学习进度
 * @tooltip 所需要的数据
 * @score 学分
 */

const mockData = {
  id: '0',
  depth: 0,
  label: '前端技能树',
  children: [
    {
      id: '0-0',
      depth: 1,
      label: 'HTML',
      data: {
        progress: 33.33,
      },
      children: [
        {
          id: '0-0-0',
          label: 'HTML5',
          depth: 2,
          data: {
            progress: 33.33,
          },
          children: [
            {
              id: '0-0-0-0',
              label: 'canvas',
              depth: 3,
              data: {
                score: 0,
                QRCode: 'https://',
                testURL: 'https://'
              },
            },
            {
              id: '0-0-0-1',
              label: 'websocket',
              depth: 3,
              data: {
                score: 0,
                QRCode:'',
              },
            },
            {
              id: '0-0-0-2',
              label: 'web worker',
              depth: 3,
              data: {
                score: 10,
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
};
