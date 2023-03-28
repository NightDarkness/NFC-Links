function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function reload_content() {

        const url_values = window.location.search,
            url_params = new URLSearchParams(url_values),
            style = document.querySelector("#style"),
            title = document.querySelector("title"),
            body = document.querySelector("body"),
            video = document.querySelector("video"),
            vSource = document.querySelector("source"),
            profile = document.querySelector("#profile > img"),
            name = document.querySelector("#name span"),
            profession = document.querySelector("#profession span"),
            img1 = document.querySelector("#first img"),
            img2 = document.querySelector("#second img"),
            img3 = document.querySelector("#third img"),
            link1 = document.querySelector("#first a"),
            link2 = document.querySelector("#second a"),
            link3 = document.querySelector("#third a"),
            footer = document.querySelector("#text span")
        
    
        let id = url_params.get("id");
        const response = await fetch("/assets/id/" + id + "/metainfo.json");
        let data = await response.json();

        console.log(data);

        if(data[id]['video'] !== "none"){
            video.removeAttribute("class");
            video.pause();
            vSource.setAttribute("src", "assets/media/" + data[id]['video']);
            video.load();
            video.play();
        }else if(data[id]['background'] !== "none"){
            body.style.backgroundImage = "url(" + data[id]['background'] + ")";
        }
        
        style.setAttribute("href", "assets/css/" + data[id]['style']);
        title.innerText = data[id]['name'] + " " + data[id]['last_name'];

        profile.setAttribute("src", "assets/id/" + id + "/profile.png");
        profile.setAttribute("alt", data[id]['name'] + " " + data[id]['last_name']);
        profile.setAttribute("title", data[id]['name'] + " " + data[id]['last_name']);
        
        name.innerHTML = data[id]['name'] + " " + data[id]['last_name'];
        profession.innerText = data[id]['profession'];
        
        img1.setAttribute("src", "assets/img/" + data[id]['bubbles']['bubble_1']['img']);
        img2.setAttribute("src", "assets/img/" + data[id]['bubbles']['bubble_2']['img']);
        img3.setAttribute("src", "assets/img/" + data[id]['bubbles']['bubble_3']['img']);
        
        img1.setAttribute("alt", data[id]['bubbles']['bubble_1']['alt']);
        img2.setAttribute("alt", data[id]['bubbles']['bubble_2']['alt']);
        img3.setAttribute("alt", data[id]['bubbles']['bubble_3']['alt']);
        
        img1.setAttribute("title", data[id]['bubbles']['bubble_1']['title']);
        img2.setAttribute("title", data[id]['bubbles']['bubble_2']['title']);
        img3.setAttribute("title", data[id]['bubbles']['bubble_3']['title']);

        link1.setAttribute("href", data[id]['bubbles']['bubble_1']['data']);
        link2.setAttribute("href", data[id]['bubbles']['bubble_2']['data']);
        link3.setAttribute("href", data[id]['bubbles']['bubble_3']['data']);

        footer.innerText = data[id]['alias'];

}

reload_content();
