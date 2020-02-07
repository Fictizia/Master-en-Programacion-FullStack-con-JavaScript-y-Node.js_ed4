// 6 - ¿Cuantos milisengundos quedan para terminar el master? y... ¿en horas o días?


function untilMaster() {
  // HOY
  ////////////////////////////
  let nowDate = new Date();
  console.info("Hoy: \n" + nowDate.toLocaleString());



  // INICIO DEL MASTER
  ////////////////////////////
  // 2/10/19 - 29/06/20
  // 16:00 - 19:00

  const masterStartDay = {
    "seconds": 00,
    "minutes": 00,
    "hours": 16,
    "day": 2,
    "month": 9, // El mes se representa de 0 a 11
    "year": 2019
  };

  const masterFinishDay = {
    "seconds": 00,
    "minutes": 00,
    "hours": 19,
    "day": 29,
    "month": 5, // El mes se representa de 0 a 11
    "year": 2020
  };

  const masterStart = new Date(masterStartDay.year, masterStartDay.month, masterStartDay.day, masterStartDay.hours, masterStartDay.minutes, masterStartDay.seconds);
  console.info("Inicio del Master: \n" + masterStart);

  const masterFinish = new Date(masterFinishDay.year, masterFinishDay.month, masterFinishDay.day, masterFinishDay.hours, masterFinishDay.minutes, masterFinishDay.seconds);
  console.info("Final del Master: \n" + masterFinish);

  // 1000
  // (60 * 60 * 1000)
  // (60 * 1000)
  // (24 * 60 * 60 * 1000)

  // Milisegundos
  let ms = masterFinish - masterStart;
  console.info("Milisegundos: \n" + ms);

  // Segundos
  let seg = Math.floor(ms / 1000);
  console.info("Segundos: \n" + seg);

  // Minutos
  let mm = Math.floor(seg / 60);
  console.info("Minutos: \n" + mm);

  // Horas
  let h = Math.floor(mm / 60);
  console.info("Horas: \n" + h);

  // Dias
  let d = Math.floor(h / 24);
  console.info("Dias: \n" + d);

  // Meses
  let m = Math.floor(d / 30);
  console.info("Meses: \n" + m);
}

untilMaster();