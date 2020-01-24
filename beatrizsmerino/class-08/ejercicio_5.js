// 5 - ¿Cuantas horas han pasado desde que empezó este master? y... ¿en días?




function sinceMaster() {
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

  const masterStart = new Date(masterStartDay.year, masterStartDay.month, masterStartDay.day, masterStartDay.hours, masterStartDay.minutes, masterStartDay.seconds);
  console.info("Inicio del Master: \n" + masterStart);

  // 1000
  // (60 * 60 * 1000)
  // (60 * 1000)
  // (24 * 60 * 60 * 1000)

  // Milisegundos
  let ms = nowDate - masterStart;
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
}

sinceMaster();