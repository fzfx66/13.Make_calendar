//  初始化 年月 标头
const yearMonth = g('#yearMonth')
const now = new Date()
const year = now.getFullYear()
const month = now.getMonth() + 1  //month从0开始
yearMonth.textContent = `${year} 年 ${month} 月`

const days = g('.calendar-days')
const 月初 = new Date(year,month-1,1)   //新手学习时可用中文名称
console.log(月初.toISOString())      //中国是+8时区
const 月初星期几 = 月初.getDay()
//从下月月初倒退一天得到这月月末 ；JS中以毫秒为单位
const 月末 = new Date(new Date(year,month-1+1,1)-86400*1000) 
const 这个月多少天 = 月末.getDate()   // = 这个月几号
const 月末星期几 = 月末.getDay() 

//根据月初星期几，在前铺垫几天
for(let i =1 ; i< 月初星期几 ; i++){
    const li = document.createElement('li')
    const preDay = new Date(月初 - 86400*1000*i)
    li.textContent = preDay.getDate()
    days.prepend(li)
}
//初始化 本月日期
for(let i =1 ; i<= 这个月多少天 ; i++){
    const li = document.createElement('li')
    li.textContent = i
    days.append(li)
}
//根据月末星期几，在后铺垫几天
for(let i = 月末星期几+1 ; i <= 7  ; i++){
    const li = document.createElement('li')
    const afterDay = new Date(月末 - 0 + 86400*1000*(i-月末星期几))  // -0 转换为数字
    li.textContent = afterDay.getDate()
    days.append(li)
}








//  帮助函数
function g(selector){
    return document.querySelector(selector)
}
function gs(selector){   //返回多个元素
    return document.querySelectorAll(selector)
}