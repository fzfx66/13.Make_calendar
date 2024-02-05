//  初始化 年月 标头
const yearMonth = g('#yearMonth')
const now = new Date()
const year = now.getFullYear()
const month = now.getMonth() + 1  //month从0开始
yearMonth.textContent = `${year} 年 ${month} 月`

// 初始化 日期
const 月初几号 = new Date(year,month-1,1)   //新手学习时可用中文名称
console.log(月初几号.toISOString())      //中国是+8时区
const 月初星期几 = 月初几号.getDay()
//从下月月初倒退一天得到这月月末 ；JS中以毫秒为单位
const 月末 = new Date(new Date(year,month-1+1,1)-86400*1000) 
const 月末几号 = 月末.getDate()
const 这个月多少天 = 月末几号  











//  帮助函数
function g(selector){
    return document.querySelector(selector)
}
function gs(selector){   //返回多个元素
    return document.querySelectorAll(selector)
}