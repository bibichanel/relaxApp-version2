document.getElementById("daijoubu-btn").addEventListener('click', function() {    
    prepare();    
    processing();
    announcement();
});

function prepare() {
    document.getElementById("left-bar").style.setProperty("display", "none");
    document.getElementById("content-tool").style.setProperty("display", "none");

    document.getElementById("content-tool").style.setProperty("-webkit-filter", "blur(5px)");
    document.getElementById("content-tool").style.setProperty("-moz-filter", "blur(5px)");
    document.getElementById("content-tool").style.setProperty("-ms-filter", "blur(5px)");
    document.getElementById("content-tool").style.setProperty("-o-filter", "blur(5px)");
    document.getElementById("content-tool").style.setProperty("filter", "blur(5px)");
}

function processing() {
    document.getElementById("process-bar").style.setProperty("display", "block");

    document.getElementById("circle-anim").beginElement();

    let percent = document.getElementById("percent");
    let counter = 0;
    setInterval(() => {
        if (counter == 100) {
            clearInterval();
        }
        else {
            counter += 1;
            percent.innerHTML = counter + "%";
        }
    }, 2000);

    setTimeout(function() {
        document.getElementById("process-bar").style.setProperty("display", "none");
    }, 3000);
}

function announcement() {
    setTimeout(function() {
        display_announcement();
    }, 3000);
}

function display_announcement() {
    document.getElementById("daijoubu-announcement").style.setProperty("display", "flex");
    document.getElementById("daijoubu-announcement").style.setProperty("z-index", "1000");
}

document.getElementById("daijoubu-announcement-close-btn").addEventListener('click', function() {    
    document.getElementById("daijoubu-announcement").style.setProperty("display", "none");

    document.getElementById("content-tool").style.setProperty("-webkit-filter", "none");
    document.getElementById("content-tool").style.setProperty("-moz-filter", "none");
    document.getElementById("content-tool").style.setProperty("-ms-filter", "none");
    document.getElementById("content-tool").style.setProperty("-o-filter", "none");
    document.getElementById("content-tool").style.setProperty("filter", "none");

    document.getElementById("left-bar").style.setProperty("display", "block");
    document.getElementById("content-tool").style.setProperty("display", "block");
});

