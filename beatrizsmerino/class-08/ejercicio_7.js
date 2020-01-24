// 7 - ¿Que fecha será dentro de un año y 10 horas más?


function since1year10h() {


  // HOY
  ////////////////////////////
  let nowDate = new Date();
  console.info("Hoy: \n" + nowDate.toLocaleString());

  let years = 1;
  let hours = 10;

  let sumHours = nowDate.setHours(nowDate.getHours() + hours);
  let sumYears = nowDate.setFullYear(nowDate.getFullYear() + years);

  console.log("En 1 año y en 10 horas sera: \n" + nowDate.toLocaleString());


}

since1year10h();