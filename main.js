'use strict';

console.clear();

{
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();

  function getCalendarHead() {
    const dates = [];
    const d = new Date(year, month, 0).getDate();
    const n = new Date(year, month, 1).getDay();

    for (let i = 0; i < n; i++) {
      // 30
      // 29,30
      //28,29,30
      dates.unshift({
        date: d - i,
        isToday: false,
        isDisabled: true,
      });
    }

    return dates;
    // console.log(dates);
  }

  function getCalendarBody() {
    const dates = []; //date:日付、day: 曜日
    const lastDate = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= lastDate; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: false,
      });
    }
    
    //yearがtodayのgetFullYeear()と同じ、かつmonthがtodayのgetMonth()と同じだったら今日の日付を太字
    if(year == today.getFullYear() && month === today.getMonth()){
      dates[today.getDate() - 1].isToday = true;
    }

    return dates;

    // console.log(dates);
  }

  function getCalendarTail(){
    const dates = [];
    const lastDay = new Date(year,month + 1,0).getDay();

    for (let i = 1; i < 7 - lastDay; i++){
      dates.push({
        date: i,
        isToday: false,
        isDisabled: true,
      });
    }

    return dates;
    // console.log(dates);
  }

    function clearCalender(){
      const tbody = document.querySelector('tbody'); //クリックするたびにtbodyの中身をクリアする

      while(tbody.firstChild){
        tbody.removeChild(tbody.firstChild); //tbodyの最初の子要素がある限りtbodyから最初の子要素を削除する
      }
    }

    function renderTitle(){
      const title = `${year}/${String(month + 1).padStart(2,'0')}`;
      document.getElementById('title').textContent = title;
    }

    function renderWeeks(){
      const dates = [ //値を変えない時はconstを使う
        ...getCalendarHead(),
        ...getCalendarBody(),
        ...getCalendarTail(),
      ];
      const weeks = [];
      const weeksCount  = dates.length / 7;

      for(let i = 0; i < weeksCount; i++){
        weeks.push(dates.splice(0,7))
      }

      weeks.forEach(week =>{
        const tr = document.createElement('tr');
        week.forEach(date =>{
          const td = document.createElement('td');

          td.textContent = date.date;
          if(date.isToday){
            td.classList.add('today');
          }
          if(date.isDisabled){
            td.classList.add('disabled');
          }

          tr.appendChild(td);
        });
        document.querySelector('tbody').appendChild(tr);
      });
    }

    function createCalendar() {
      clearCalender();
      renderTitle();
      renderWeeks();
    }

    document.getElementById('prev').addEventListener('click',() => {
      month--;
      if(month < 0){
        year--;
        month = 11;
      }
      createCalendar();
    });

    document.getElementById('next').addEventListener('click',() => {
      month++;
      if(month > 11){
        year++;
        month = 0;
      }

      createCalendar();
    });
    document.getElementById('today').addEventListener('click',() => {
      year = today.getFullYear();
      month = today.getMonth();

      createCalendar();
    });

    createCalendar()

}