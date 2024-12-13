function generaLoginForm(loginerror=null){
    let form = `
    <form action="#" method="POST">
        <h2>Login</h2>
        <p></p>
        <ul>
            <li>
                <label for="username">Username:</label><input type="text" id="username" name="username" />
            </li>
            <li>
                <label for="password">Password:</label><input type="password" id="password" name="password" />
            </li>
            <li>
                <input type="submit" name="submit" value="Invia" />
            </li>
        </ul>
    </form>`;

    return form;
}


function generaArticoli(articoli){
    let result = `
    <section>
        <h2>Articoli</h2>
        <a href="gestisci-articoli.php?action=1">Inserisci Articolo</a>
        <table>
            <tr>
                <th>Titolo</th><th>Immagine</th><th>Azione</th>
            </tr> `

    for(let i=0; i < articoli.length; i++){
        result+= `
            <tr>
                <td>${articoli[i]["titoloarticolo"]}</td>
                <td><img src="${articoli[i]["imgarticolo"]}" alt="" /></td>
                <td>
                    <a href="gestisci-articoli.php?action=2&id=${articoli[i]["idarticolo"]}">Modifica</a>
                    <a href="gestisci-articoli.php?action=3&id=${articoli[i]["idarticolo"]}">Cancella</a>
                </td>
            </tr>
        `;
    }
    result += `
        </table>
    </section>`;
    
    
    return result;
}

async function getData(){
    const url = "api-login.php";
    try {
        const response = await fetch(url);
        if(!response.ok){
            throw new Error("Response status: " + response.status);
        }
        const json = await response.json();
        const main = document.querySelector("main");
        if(json["logineseguito"]){
            main.innerHTML = generaArticoli(json["articoliautore"]);
        } else {
            main.innerHTML = generaLoginForm();
            document
                .querySelector('main form li input[type="submit"]')
                .addEventListener("click", async function(e){
                    e.preventDefault();
                    const username = document.querySelector("#username").value;
                    console.log("username: " + username);
                    const password = document.querySelector("#password").value;
                    const formData = new FormData();
                    formData.append('username', username);
                    formData.append('password', password);
                    console.log(formData);
                    const responsePost = await fetch(url, {
                        method: "POST",
                        body: formData
                    });
                    if(!responsePost.ok){
                        throw new Error("Response status: " + responsePost.status);
                    }
                    const json2 = await responsePost.json();
                    if(json2["logineseguito"]){
                        main.innerHTML = generaArticoli(json2["articoliautore"]);
                    } else {
                        document.querySelector("form p").innerHTML = json2["errore-login"];
                    }

            });
        }
    } catch (error) {
        console.error(error);
    }

}


window.onload = getData;
