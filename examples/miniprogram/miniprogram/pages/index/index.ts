// index.ts
import Rubbing from 'rubbing';

Page({
    onReady() {
            const rubbing = new Rubbing({
                selector: '#canvas',
                background: '#fff',
                component: this,
                width: 311,
                height: 484,
                radius: 20,
              })
              rubbing.init().then(() => {
                rubbing.loadFromJSON({
                  objects: [
                    {
                        type: 'image',
                        src: 'https://zpkj-mili.oss-cn-shanghai.aliyuncs.com/mp/customer-mamage-poster.png',
                        left: 0,
                        top: 0,
                        width: 311,
                        height: 484,
                        mode: 'scaleToFill',
                      },
     
                      {
                        type: 'text',
                        text: 'nickname',
                        left: 0,
                        top: 189,
                        fontSize: 16,
                        textBackgroundColor: '#2E3A59',
                        width: 311,
                        textAlign: 'center',
                      },
                      {
                        type: 'text',
                        text: '邀您关注「寰球买手」',
                        left: 0,
                        top: 215,
                        fontSize: 14,
                        textBackgroundColor: '#2E3A59',
                        width: 311,
                        textAlign: 'center',
                      },
                    
                      {
                        type: 'rect',
                        left: 91,
                        top: 423,
                        width: 129,
                        height: 20,
                        bgtextBackgroundColor: '#F7F9FC',
                        lineStyle: {},
                      },
                      {
                        type: 'text',
                        text: '扫码加入 查价买车',
                        left: 0,
                        top: 427,
                        fontSize: 12,
                        textBackgroundColor: '#2E3A59',
                        width: 311,
                        textAlign: 'center',
                      },
                  ]
                })
              }).catch(console.error)
    }
})
