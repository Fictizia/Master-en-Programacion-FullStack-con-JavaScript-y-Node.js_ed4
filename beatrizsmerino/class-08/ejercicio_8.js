// 8 - Imprimir por consola la fecha completa (formato texto) en koreano y japones.



function dateLanguage(language) {
  let now = new Date();

  let settingsDate = {
    weekend: "long", // weekend: Friday
    month: "long", // month: October
    year: "numeric", // year: 2019
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "long"
  }

  console.group("Date");
  console.info(now.toLocaleString());
  console.log(now.toLocaleString(language, settingsDate));
  console.groupEnd();
}


dateLanguage('ko-KR');
dateLanguage('ja-JP-u-ca-japanese');