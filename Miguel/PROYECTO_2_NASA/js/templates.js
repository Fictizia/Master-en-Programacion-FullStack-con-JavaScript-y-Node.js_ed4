/**
 * @file archivo que contiene el objeto que contiene las diferentes plantillas para las vistas
 */
const templates = [
  {
    idTemp: "home",
    template: `
    <div class="homeInfo__wrapper">
      <h2>-A NASA project for Master-fullstack Fictizia-</h2>
      <p class="homeInfo">In this app you will be able to consult data available from some NASA APIs, such as the astronomical image of the day, information about near-Earth asteroids and information from NASA's technology transfer program, these last two sources of information provide links to articles and more detailed data from different official NASA websites. You can also create an account to save information you are interested in or the images that you like the most.
      <br>
      <br>
      NASA's APIs portal provides many more sources of data for developers, in addition to those contained in this application, if you are interested and want to know more about data provided, you can consult their APIs catalog on their 
      <a href="https://api.nasa.gov/" target="_blank" class="nasaLink">official website.</a>
      <br>
      <br>
      👽 Greetings 👽 
      </p>
    </div>
    `
  },
  {
    idTemp: "account",
    template: `
      <h2>Account view</h2>
      <div class="logInWrapper">
        <h3>- Firebase authentication -</h3>      
        <input id="textBox" type="text" placeholder="Email">
        <input id="passBox" type="password" placeholder="Password">
        <button class="btnStandar" id="btnSignUp">Sign Up</button>
        <button class="btnStandar" id="btnLogIn">Log In</button>
        <button class="btnStandar" id="btnGitHub">GitHub Log In</button>
        <button class="btnStandar" id="btnLogOut">Log Out</button>
        <button class="btnStandar" id="btnRemove">Delete</button>
        <div class="actionInfo__wrapper">
          <p id="actionInfo">ℹ</p>
        </div>
      </div>
      <div class="sessionWrapper">
        <div class="sessionWrapper__userList">
          <h3>- User list -</h3>
          <div id="userList"></div>
        </div>
        <div class="sessionWrapper__userData">
          <button class="btnStandar" id="btnMyData">My data</button>
          <ul id="myData"></ul>
        </div>
      </div>
    `
  },
  {
    idTemp: "data",
    template: `
      <h2>Data view</h2>
      <div class="dataButtons">
        <a href="./data/nearObjects" class="dataButtons__a" id="nearObjects">Near Objects</a>
        <a href="./data/pictureOfTheDay" class="dataButtons__a" id="pictureOfTheDay"> Astronomy Picture of the Day</a>
        <a href="./data/techTransfer" class="dataButtons__a" id="techTransfer">Tech Transfer</a>
      </div>
    `
  },
  {
    idTemp: "pictureOfTheDay",
    template: `
      <h2>Picture of the day view</h2>
      <div class="pictureOfTheDay__wrapper">
        <div class="imgDayButtons">
          <input class="dateSelect" id="dateSelect" type="date">
          <button class="btnStandar" id="btnSearch">Search</button>
          <button class="btnStandar" id="saveImg">Save in Firebase</button>
        </div>
        <figure id="picture"></figure>
      </div>
    `
  },
  {
    idTemp: "nearObjects",
    template: `
      <h2>Near Objects view</h2>
      <select  class="nearObjectsSelect" id="nearObjectSelect"></select>
      <div class="wrapperChart" id="nearObjectChart">
        <canvas id="myChart"></canvas>
      </div>
      <div class="wrapperTable">
        <table id="nearObjectTable">
          <tr>
            <th>ID</th><th>Distance(Km)</th><th>Speed(Km/s)</th><th>Diameter(Km)</th><th>Potentially hazardous</th><th>Link</th><th>Firebase</th>
          </tr>
        </table>
      </div>
    `
  },
  {
    idTemp: "techTransfer",
    template: `
      <h2>Tech transfer view</h2>
      <div class="wrapperTable">
        <table id="techTransferTable">
          <tr>
            <th>ID</th><th>Description</th><th>Type</th><th>Image</th><th>Link</th><th>Firebase</th>
          </tr>
        </table>
      </div>
    `
  }
];