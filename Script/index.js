function showTime() {
	document.getElementById('currentTime').innerHTML = new Date().toUTCString();
}
showTime();
setInterval(function () {
	showTime();
<<<<<<< HEAD
}, 1000);
=======
}, 1000);
>>>>>>> 954f2709a1128bd6eb50632bc4fec81e5886364b
