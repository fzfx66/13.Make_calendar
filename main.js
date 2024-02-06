let currentTime = new Date()
//新手学习时可用中文名称
let selectedLi 
render(currentTime)

g('#preMonth').onclick = ()=>{
    const 月初 = new Date(currentTime.getFullYear(),currentTime.getMonth(),1)   
    render(new Date(月初 - 86400*1000))
}
g('#nextMonth').onclick = ()=>{
    const 下月初 = new Date(currentTime.getFullYear(),currentTime.getMonth()+1,1)   
    render(下月初)
}
g('#currentDay').onclick = ()=>{
    render(new Date())
}

// 帮助函数
function g(selector){
    return document.querySelector(selector)
}
function gs(selector){   //返回多个元素
    return document.querySelectorAll(selector)
}
function render(time){
    const year = time.getFullYear()
    const month = time.getMonth() + 1  //month从0开始
    initTime()
    generateDays()
    currentTime = time  //记住时间

    function initTime(){
        const yearMonth = g('#yearMonth')
        yearMonth.textContent = `${year} 年 ${month} 月`
    }
    function generateDays(){
        const days = g('.calendar-days')
        const 月初 = new Date(year,month-1,1)   
        // console.log(月初.toISOString())      //中国是+8时区
        const 月初星期几 = 月初.getDay()
        //从下月月初倒退一天得到这月月末 ；JS中以毫秒为单位
        const 月末 = new Date(new Date(year,month-1+1,1)-86400*1000) 
        const 这个月多少天 = 月末.getDate()   // = 这个月几号
        const 月末星期几 = 月末.getDay() 
        const now = new Date()
        
        days.innerHTML = ''   //清空日期区域
        let liCount = 0
        //根据月初星期几，在前铺垫几天
        for(let i =1 ; i< 月初星期几 ; i++){
            const li = document.createElement('li')
            const preDay = new Date(月初 - 86400*1000*i)
            li.textContent = preDay.getDate()
            li.classList.add('calendar-days-noThisMonth')
            days.prepend(li)
            li.onclick = ()=>{
                if(selectedLi){
                    selectedLi.classList.remove('calendar-days-selected')
                }
                li.classList.add('calendar-days-selected')
                selectedLi = li
            }
            liCount += 1
        }
        //初始化 本月日期
        for(let i =1 ; i<= 这个月多少天 ; i++){
            const li = document.createElement('li')
            li.textContent = i
            if(i === now.getDate() && month === now.getMonth()+1 && year === now.getFullYear()){
                li.classList.add('calendar-days-today')
            }
            li.onclick = ()=>{
                if(selectedLi){
                    selectedLi.classList.remove('calendar-days-selected')
                }
                li.classList.add('calendar-days-selected')
                selectedLi = li
            }
            days.append(li)
            liCount += 1
        }
        //根据月末星期几，在后铺垫几天
        let i = 月末星期几+1
        for(let j = 1 ; j <= 42-liCount ; j++){
            const li = document.createElement('li')
            const afterDay = new Date(月末 - 0 + 86400*1000*(i-月末星期几))  // -0 转换为数字
            li.textContent = afterDay.getDate()
            li.classList.add('calendar-days-noThisMonth')
            days.append(li)
            li.onclick = ()=>{
                if(selectedLi){
                    selectedLi.classList.remove('calendar-days-selected')
                }
                li.classList.add('calendar-days-selected')
                selectedLi = li
            }
            i++
        }
        // 未实现：点击日历外区域，取消选中；
        // g('.allPage').onclick = (e)=>{
        //     e.stopPropagation()
        //     if(selectedLi){selectedLi.classList.remove('calendar-days-selected')}
        // }
    }
}