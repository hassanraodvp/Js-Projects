function age(){
    let d1 = document.getElementById('day').value;
    let m1 = document.getElementById('month').value;
    let y1 = document.getElementById('year').value;
    let date = new Date(); //? this new Date() method collect time from your device.
    let d2 = date.getDate();
    let m2 = 1 + date.getMonth();
    let y2 = date.getFullYear();
    let month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (d1 > d2){
        d2 = d2 + month[m2 - 2];
        m2 = m2 - 1;
    }
    if (m1 > m2){
            m2 = m2 + 12;
            y2 = y2 - 1;
        }
        let d = d2 - d1;
        let m = m2 - m1;
        let y = y2 - y1;

        document.getElementById('result').innerHTML = 'Your age is ' +y+ ' years, ' +m+ ' months and ' +d+ ' days.';
}