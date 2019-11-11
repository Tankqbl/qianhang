const $siteList = $('.siteList')
const $lastLi = $siteList.find('li.last')
const $img = $siteList.find('li.site.logo.img')
const x = localStorage.getItem('x')
const xObject = JSON.parse(x)
const hashMap = xObject || [
    {
        logo: 'https://www.figma.com/favicon.ico', logoType: 'text', url: 'https://www.figma.com', briefIntroduction: '一款前端所见即所得的设计工具',
    },
    {
        logo: 'https://www.liaoxuefeng.com/favicon.ico', logoType: 'text', url: 'https://www.liaoxuefeng.com', briefIntroduction: '有助于新手学习',
    },
    {
        logo: 'https://blog.codepen.io/favicon.ico', logoType: 'image', url: 'https://blog.codepen.io', briefIntroduction: 'share your world',
    },
    {
        logo: 'https://www.codecademy.cn/favicon.ico', logoType: 'image', url: 'https://www.codecademy.cn', briefIntroduction: '海量在线编辑习题和课程视频',
    },
    {
        logo: 'https://www.icourse163.org/favicon.ico', logoType: 'image', url: 'https://www.icourse163.org', briefIntroduction: '升级你的知识库',
    },
    {
        logo: 'https://huaban.com/favicon.ico', logoType: 'image', url: 'https://huaban.com', briefIntroduction: '发现设计灵感',
    },
]
const simplifyUrl = (url) => {
    return url.replace('https://', '')
        .replace('http://', '')
        .replace('www.', '')
        .replace(/\/.*/, '') // 删除 / 开头的内容
}
const logoUrl = (url) => {
    return url + '/favicon.ico'
}
let noFindLogo = 'https://i.loli.net/2019/11/11/27QtaBEFrhVTbyU.png'
const noFind = () => {
    let img = event.srcElement
    img.src = "https://i.loli.net/2019/11/11/27QtaBEFrhVTbyU.png"
    img.onerror = null
}
function notimgfound(obj) {

    obj.onerror = "";

    obj.src = "images/logoimgerror.png";

    obj.onerror = null; //解绑onerror事件

}
const render = () => {
    $siteList.find('li:not(.last)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
        <div class="site">
        <div class="logo"><img src="${logoUrl(node.url)}" class='img'  οnerrοr="javascript:this.src='https://i.loli.net/2019/11/11/27QtaBEFrhVTbyU.png'";/></div>
          <div class="link">${simplifyUrl(node.url)}</div>
          <div class="briefIntroduction">${node.briefIntroduction}</div>
          <div class="close">
            <svg class="icon">
              <use xlink:href="#icon-shanchu"></use>
            </svg>
          </div>
        </div>
      </li>`).insertBefore($lastLi)
        $li.on('click', () => {
            window.open(node.url)
        })//用来代替A标签
        $li.on('click', '.close', (e) => {
            e.stopPropagation() // 阻止冒泡
            hashMap.splice(index, 1)
            render()
            location.reload()
        })
    })
}



render()
$('.addButton')
    .on('click', () => {
        let url = window.prompt('添加的网站是')
        let briefIntroduction = window.prompt('需要添加简述以方便您日后使用吗？')
        if (url.indexOf('http') !== 0) {
            url = 'https://' + url
        }
        hashMap.push({
            url: url,
            briefIntroduction: briefIntroduction,
        })
        render()
        location.reload()
    })

window.onbeforeunload = () => {
    const string = JSON.stringify(hashMap)
    localStorage.setItem('x', string)
}
$(document).on('keypress', (e) => {
    const key = e.key
    for (i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url)
        }
    }
    location.reload()
})


$("img").on('error', function () {
    $(this).attr('src', 'https://i.loli.net/2019/11/11/JfNTZXMB8hxQHlP.png')
})