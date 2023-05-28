// ================================ START YOUR APP HERE
// ================================
const init = {
    monList: [
        '01',
        '02',
        '03',
        '04',
        '05',
        '06',
        '07',
        '08',
        '09',
        '10',
        '11',
        '12'
    ],
    dayList: [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
    ],
    today: new Date(),
    monForChange: new Date().getMonth(),
    activeDate: new Date(),
    getFirstDay: (yy, mm) => new Date(yy, mm, 1), //달의 첫번째 요일
    getLastDay: (yy, mm) => new Date(yy, mm + 1, 0), //달의 마지막 요일
    nextMonth: function () {
        let d = new Date();
        d.setDate(1);
        d.setMonth(++this.monForChange);
        this.activeDate = d;
        return d;
    }, //다음 딜
    prevMonth: function () {
        let d = new Date();
        d.setDate(1);
        d.setMonth(--this.monForChange);
        this.activeDate = d;
        return d;
    }, //전 달
    addZero: (num) => (num < 10)
        ? '0' + num
        : num,
    activeDTag: null,
    getIndex: function (node) {
        let index = 0;
        while (node = node.previousElementSibling) {
            index++;
        }
        return index;
    }
};

const $calBody = document.querySelector('.cal-body');
const $btnNext = document.querySelector('.right_btn');
const $btnPrev = document.querySelector('.left_btn');

/*
@param {number} date
@param {number} dayIn
*/
function loadDate(date, dayIn) {
    document.querySelector('.day').textContent = addZero(date);
}
// chatgpt
/*
@param {number} num
@return {string} 앞자리가 0으로 채워진 문자열
*/
function addZero(num) {
    return (num < 10) ? '0' + num : String(num);
}

/*
@param {date} fullDate
@return {string} 년도와 월을 표시한 문자열
*/
function getYYMM(fullDate) {
    let yy = fullDate.getFullYear();
    let mm = fullDate.getMonth();
    
    if (yy < 10) {
        yy = '0' + yy;
    }
    
    return yy + '년 ' + addZero(mm + 1) + '월';
}
/*
@param {date} fullDate
*/
//달력을 동적으로 구현하는 코드
function loadYYMM(fullDate) {
    let yy = fullDate.getFullYear();
    let mm = fullDate.getMonth();
    let firstDay = init.getFirstDay(yy, mm);
    let lastDay = init.getLastDay(yy, mm);
    let markToday; // 오늘 날짜 표시를 위한 변수

    if (mm === init.today.getMonth() && yy === init.today.getFullYear()) {
        markToday = init.today.getDate();
    }

    document.querySelector('.month').textContent = init.monList[mm];
    document.querySelector('.year').textContent = yy;

    let trtd = '';
    let startCount;
    let countDay = 0;
    for (let i = 0; i < 6; i++) {
        trtd += '<tr>';
        for (let j = 0; j < 7; j++) {
            if (i === 0 && !startCount && j === firstDay.getDay()) {
                startCount = 1;
            }
            if (!startCount) {
                trtd += '<td>';
            } else {
                let fullDate = yy + '년 ' + addZero(mm + 1) + '월 ' + addZero(countDay + 1) + '일';
                trtd += '<td class="day';
                trtd += (markToday && markToday === countDay + 1) ? ' today" ' : '"';
                trtd += ` data-date="${countDay + 1}" data-fdate="${fullDate}">`;
            }
            trtd += (startCount) ? ++countDay : '';
            if (countDay === lastDay.getDate()) {
                startCount = 0;
            }
            trtd += '</td>';
        }
        trtd += '</tr>';
    }
    $calBody.innerHTML = trtd;
    // let yy = fullDate.getFullYear();
    // let mm = fullDate.getMonth();
    // let firstDay = init.getFirstDay(yy, mm);
    // let lastDay = init.getLastDay(yy, mm);
    // let markToday; // for marking today date

    // if (mm === init.today.getMonth() && yy === init.today.getFullYear()) {
    //     markToday = init
    //         .today
    //         .getDate();
    // }

    // document
    //     .querySelector('.month')
    //     .textContent = init
    //     .monList[mm];
    // document
    //     .querySelector('.year')
    //     .textContent = yy;

    // let trtd = '';
    // let startCount;
    // let countDay = 0;
    // for (let i = 0; i < 6; i++) {
    //     trtd += '<tr>';
    //     for (let j = 0; j < 7; j++) {
    //         if (i === 0 && !startCount && j === firstDay.getDay()) {
    //             startCount = 1;
    //         }
    //         if (!startCount) {
    //             trtd += '<td>'
    //         } else {
    //             let fullDate = yy + '.' + init.addZero(mm + 1) + '.' + init.addZero(
    //                 countDay + 1
    //             );
    //             trtd += '<td class="day';
    //             trtd += (markToday && markToday === countDay + 1)
    //                 ? ' today" '
    //                 : '"';
    //             trtd += ` data-date="${countDay + 1}" data-fdate="${fullDate}">`;
    //         }
    //         trtd += (startCount)
    //             ? ++countDay
    //             : '';
    //         if (countDay === lastDay.getDate()) {
    //             startCount = 0;
    //         }
    //         trtd += '</td>';
    //     }
    //     trtd += '</tr>';
    // }
    // $calBody.innerHTML = trtd;
}

/*
 @param {string} val
 */
function createNewList(val) {
    let id = new Date().getTime() + '';
    let yy = init
        .activeDate
        .getFullYear();
    let mm = init
        .activeDate
        .getMonth() + 1;
    let dd = init
        .activeDate
        .getDate();
    const $target = $calBody.querySelector(`.day[data-date="${dd}"]`);

    let date = yy + '.' + init.addZero(mm) + '.' + init.addZero(dd);

    let eventData = {};
    eventData['date'] = date;
    eventData['memo'] = val;
    eventData['complete'] = false;
    eventData['id'] = id;
    init
        .event
        .push(eventData);
    $todoList.appendChild(createLi(id, val, date));
}

loadYYMM(init.today);
loadDate(init.today.getDate(), init.today.getDay());

$btnNext.addEventListener('click', () => loadYYMM(init.nextMonth()));
$btnPrev.addEventListener('click', () => loadYYMM(init.prevMonth()));

//달력에 일을 화면에 구현해주는 코드
$calBody.addEventListener('click', (e) => {
    if (e.target.classList.contains('day')) {
        if (init.activeDTag) {
            init
                .activeDTag
                .classList
                .remove('day-active');
        }
        let day = Number(e.target.textContent);
        loadDate(day, e.target.cellIndex);
        e
            .target
            .classList
            .add('day-active');
        init.activeDTag = e.target;
        init
            .activeDate
            .setDate(day);
    }
});