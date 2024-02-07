let currentTime = new Date()
let $selectedLi
render(currentTime)
// 点击事件：上月、下月、今天
g('#preMonth').onclick = ()=>{
    const monthFirstDay = new Date(currentTime.getFullYear(),currentTime.getMonth(),1)
    render(new Date(monthFirstDay - 86400*1000))
}
g('#nextMonth').onclick = ()=>{
    const nextMonthFirstDay = new Date(currentTime.getFullYear(),currentTime.getMonth()+1,1)
    render(nextMonthFirstDay)
}
g('#currentDay').onclick = ()=>{
    render(new Date())
}
// 使用 事件委托 实现选中日期并展示日程
g('.calendar-days').addEventListener('click',(e)=>{
    const t = e.target
    const clickKey = `${currentTime.getFullYear()}-${currentTime.getMonth() + 1}-${t.textContent}` //month从0开始
    const clickEvents = window.date[clickKey]
    if(t.tagName.toLowerCase() === 'li'){
        if($selectedLi){
            $selectedLi.classList.remove('calendar-days-selected')
        }
        t.classList.add('calendar-days-selected')
        $selectedLi = t
        if(clickEvents){
            //由于不支持 append 多个，且基于不要频繁操作DOM的原则，因此使用 fragment ;
            const fragment = document.createDocumentFragment()
            clickEvents.map(event => {
                const div = document.createElement('div')
                div.textContent = event
                fragment.append(div)     //不需要return
            })
            g('#events').innerHTML = ''
            g('#events').append(fragment)
        } else{
            g('#events').innerHTML = "<div>无</div>"
        }
    }
})
// 帮助函数
function g(selector){return document.querySelector(selector)}
// function gs(selector){return document.querySelectorAll(selector)}
function render(time){
    const year = time.getFullYear()
    const month = time.getMonth() + 1
    initTime()
    generateDays()
    currentTime = time    //记住时间

    function initTime(){
        const yearMonth = g('#yearMonth')
        yearMonth.textContent = `${year} 年 ${month} 月`
    }
    function generateDays(){
        const days = g('.calendar-days')
        const monthFirstDay = new Date(year,month-1,1)
        // console.log(月初.toISOString())      //中国是+8时区
        const monthFirstDayWeek = monthFirstDay.getDay()
        //从下月月初倒退一天得到这月月末 ；JS中以毫秒为单位
        const monthLastDay = new Date(new Date(year,month-1+1,1)-86400*1000)
        const monthDayNumber = monthLastDay.getDate()   // 这个月多少天 = 这个月几号
        const monthLastDayWeek = monthLastDay.getDay()
        const now = new Date()
        const fragment  = document.createDocumentFragment()
        let liCount = 0
        days.innerHTML = ''   //清空日期区域
        //根据月初星期几，在前铺垫几天
        for(let i =1 ; i< monthFirstDayWeek ; i++){
            const li = document.createElement('li')
            const preDay = new Date(monthFirstDay - 86400*1000*i)
            li.textContent = preDay.getDate().toString()
            li.classList.add('calendar-days-noThisMonth')
            fragment.prepend(li)
            liCount += 1
        }
        //初始化本月日期
        for(let i =1 ; i<= monthDayNumber ; i++){
            const li = document.createElement('li')
            li.textContent = i.toString()
            if(i === now.getDate() && month === now.getMonth()+1 && year === now.getFullYear()){
                li.classList.add('calendar-days-today')
            }
            const key = `${year}-${month}-${i}`
            const events = window.date[key]
            if(events){
                li.classList.add('calendar-days-hasEvents')   
            }
            fragment.append(li)
            liCount += 1
        }
        //根据月末星期几，在后铺垫几天
        let i = monthLastDayWeek+1
        for(let j = 1 ; j <= 42-liCount ; j++){
            const li = document.createElement('li')
            const afterDay = new Date(monthLastDay - 0 + 86400*1000*(i-monthLastDayWeek))  // -0 转换为数字
            li.textContent = afterDay.getDate().toString()
            li.classList.add('calendar-days-noThisMonth')
            fragment.append(li)
            i++
        }
        days.append(fragment)  //三次for循环后得到的fragment只需一次append到days元素
    }
}