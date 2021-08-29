/* eslint-disable no-unused-vars */
/*
 * 数据结构:
 * { id, label, data }
 * @data: 包含更多信息:
 * @progress 当前学习进度
 * @tooltip 所需要的数据
 * @score 学分
 */

const mockData = {
  id:       '1629898606491758927',
  depth:    0,
  label:    '前端技能树',
  children: [
    {
      id:    '1629898616632792605',
      depth: 1,
      label: 'HTML',
      data:  {
        progress: 33.33,
      },
      children: [
        {
          id:    '1629898623385222062',
          label: 'HTML5',
          depth: 2,
          data:  {
            progress: 33.33,
          },
          children: [
            {
              id:    '1629898631654164376',
              label: 'canvas',
              depth: 3,
              data:  {
                score:   0,
                QRCode:  'https://',
                testURL: 'https://',
              },
            },
            {
              id:    '1629898638112788312',
              label: 'websocket',
              depth: 3,
              data:  {
                score:  0,
                QRCode: '',
              },
            },
            {
              id:    '1629898644895766577',
              label: 'web worker',
              depth: 3,
              data:  {
                score: 10,
              },
            },
          ],
        },
      ],
    },
    {
      id:       '162989865547861214',
      depth:    1,
      label:    'css',
      children: [
        {
          id:       '1629898665146692025',
          label:    'css3',
          depth:    2,
          children: [
            {
              id:    '1629898676154470480',
              label: 'flex 伸缩布局',
              depth: 3,
            },
            {
              id:    '1629898683010683813',
              label: 'transform 变形',
              depth: 3,
            },
            {
              id:    '1629898692385303293',
              label: 'transition 过渡',
              depth: 3,
            },
            {
              id:    '1629898699622665057',
              label: 'animation 动画',
              depth: 3,
            },
          ],
        },
      ],
    },
    {
      id:       '1629898709768442526',
      depth:    1,
      label:    'js',
      children: [
        {
          id:       '1629898716053180944',
          label:    'ES6',
          depth:    2,
          children: [
            {
              id:    '1629898724661800167',
              label: 'ES6',
              depth: 3,
            },
            {
              id:    '162989873110423165',
              label: '面向对象',
              depth: 3,
            },
            {
              id:    '1629898737151512966',
              label: 'this',
              depth: 3,
            },
            {
              id:    '1629898744729794244',
              label: '事件循环',
              depth: 3,
            },
          ],
        },
      ],
    },
    {
      id:       '1629898750628293227',
      depth:    1,
      label:    '流行框架',
      children: [
        {
          id:    '16298987571982833',
          label: 'react',
          depth: 2,
        },
        {
          id:    '1629898763739441327',
          label: 'vue',
          depth: 2,
        },
      ],
    },
    {
      id:       '1629898770340560446',
      depth:    1,
      label:    '小程序',
      children: [
        {
          id:    '1629898776949630141',
          label: '微信小程序',
          depth: 2,
        },
        {
          id:    '1629898783224260443',
          label: '支付宝小程序',
          depth: 2,
        },
      ],
    },
  ],
};
