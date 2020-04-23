
document.getElementById('search').addEventListener("click", searchUser);

var mensaje = document.getElementById('mensaje');

var content = document.createElement('div');

document.body.appendChild(content);


function searchUser() {
    content.innerText = "";

    var username = document.getElementById('buscador').value;

    var url = 'https://api.github.com/users' + '/' + username;

    var emailUrl = 'https://api.github.com/users/' + username + '/events'


    fetch(url)
        .then(res => res.json())
        .then(gitInfo => {

            if (gitInfo.message !== "Not Found") {


                var login = document.createElement('h2');
                login.innerText = gitInfo.login;

                var avatar = document.createElement('img');
                avatar.setAttribute('src', gitInfo.avatar_url);

                var location = document.createElement('h2');
                location.innerText = gitInfo.location;

                content.appendChild(avatar);
                content.appendChild(login);
                content.appendChild(location);

                console.log(gitInfo);


                if (gitInfo.email === null) {
                    fetch(emailUrl)

                        .then(res => res.json())
                        .then(emailInfo => {
                            var mail = document.createElement('h3');

                            for (let i = 0; i < emailInfo.length; i++) {

                                var posibolMails = emailInfo[i].payload.commits;

                                if (posibolMails.length > 0) {

                                    mail.innerText = posibolMails[0].author.email;

                                    content.appendChild(mail);
                                    break

                                }

                            }

                        })
                }

                else {
                    var goodMail = document.createElement("h5");
                    goodMail.innerText = gitInfo.email;
                    content.appendChild(goodMail);
                }


            }

            else {
                mensaje.innerText = 'Usuario no existente';

            }


        })




}


