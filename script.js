let int = null;

function setTimer() {
  let element_hours = document.getElementsByClassName("hour-tick")[0];
  let element_minutes = document.getElementsByClassName("minute-tick")[0];
  let element_seconds = document.getElementsByClassName("second-tick")[0];

  let hours = document.getElementById("hours").value;
  let minutes = document.getElementById("minutes").value;
  let seconds = document.getElementById("seconds").value;

  if (parseInt(seconds) >= 60 || parseInt(minutes) >= 60){
    if (parseInt(seconds) >= 60 && parseInt(minutes) >= 60){
      alert('Invalid seconds & minutes, it should be less than or equal to 59');
    }

    else if (parseInt(seconds) >= 60){
      alert('Invalid seconds, it should be less than or equal to 59');
    }

    else if (parseInt(minutes) >= 60){
      alert('Invalid minutes, it should be less than or equal to 59');
    }
    document.getElementById("minutes").value = 0;
    document.getElementById("seconds").value = 0;

    return;
  }

  element_hours.innerHTML = hours;
  element_minutes.innerHTML = minutes; 
  element_seconds.innerHTML = seconds;

  // time: 00:m:s
  if (Number(element_hours.innerHTML) === 0 && Number(element_minutes.innerHTML) != 0){
    if (Number(element_seconds.innerHTML) == 0) {
      element_seconds.innerHTML = 59;
    }
  }

  //time: h:m:s
  else if (Number(element_hours.innerHTML) != 0){
    if (Number(element_seconds.innerHTML) == 0) {
      element_seconds.innerHTML = 59;
    }

    if (Number(element_minutes.innerHTML) == 0){
      element_minutes.innerHTML = 59;
    }
  }
}

function startTimer() {
  let element_hours = document.getElementsByClassName("hour-tick")[0];
  let element_minutes = document.getElementsByClassName("minute-tick")[0];
  let element_seconds = document.getElementsByClassName("second-tick")[0];
  let totalSeconds = Number(element_hours.innerHTML)*3600+Number(element_minutes.innerHTML)*60+Number(element_seconds.innerHTML);
  console.log(totalSeconds);
  let delay = totalSeconds*1000;
  let delay2 = delay+5000;
  let audio = new Audio('clock1.mp3');
  setTimeout(() => {
    audio.play();
    alert('Times up! \nGet back to work!');

  },delay);

  // setTimeout(() => {
  //   audio.pause();
  //   // audio.currentTime = 0;
  // },delay2);

  if (Number(element_minutes.innerHTML) === 0 
  && Number(element_hours.innerHTML) === 0 && Number(element_seconds.innerHTML) != 0){
    int = setInterval(function () {
      if (Number(element_seconds.innerHTML) != 0){
        element_seconds.innerHTML = Number(element_seconds.innerHTML) - 1;
      }
      else{
        clearInterval(int);
      }
    }, 1000);
  }

  //time: 00:m:s
  else if (Number(element_hours.innerHTML) === 0 && Number(element_minutes.innerHTML) != 0){
    totalSeconds = Number(element_minutes.innerHTML)*60+Number(element_seconds.innerHTML);
    int = setInterval(() => {
      totalSeconds--;
      let totalMinutes = Math.floor(totalSeconds / 60);
      let seconds = totalSeconds % 60;
      let hours = Math.floor(totalMinutes / 60);
      let minutes = totalMinutes % 60;

      element_minutes.innerHTML = minutes;
      element_seconds.innerHTML = seconds;

      if (totalSeconds === 0){
        clearInterval(int);
      }
      
    },1000);
  }

  //time: h:m:s
  else if (Number(element_hours.innerHTML) != 0){
    totalSeconds = Number(element_hours.innerHTML)*3600+Number(element_minutes.innerHTML)*60+Number(element_seconds.innerHTML);
    int = setInterval(() => {
      totalSeconds--;
      let totalMinutes = Math.floor(totalSeconds / 60);
      let seconds = totalSeconds % 60;
      let hours = Math.floor(totalMinutes / 60);
      let minutes = totalMinutes % 60;

      element_hours.innerHTML = hours;
      element_minutes.innerHTML = minutes;
      element_seconds.innerHTML = seconds;

      if (totalSeconds === 0){
        clearInterval(int);
      }
      
    },1000);
    console.log('success');
  }
}

function resetTimer(){
  let element_hours = document.getElementsByClassName("hour-tick")[0];
  let element_minutes = document.getElementsByClassName("minute-tick")[0];
  let element_seconds = document.getElementsByClassName("second-tick")[0];

  clearInterval(int);

  element_hours.innerHTML = '00';
  element_minutes.innerHTML = '00';
  element_seconds.innerHTML = '00';
}

let element = document.getElementsByClassName("set")[0];
element.addEventListener("click", setTimer);

element = document.getElementsByClassName("start")[0];
element.addEventListener("click", startTimer);

element = document.getElementsByClassName("reset")[0];
element.addEventListener("click",resetTimer);