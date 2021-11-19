
// Daijoubu button
function daijoubuStart() {
    addDaijoubuDiv();    
}

function addDaijoubuDiv() {
    var parent = document.getElementsById("content-tool");
    var child = document.createElement("div");
    child.className = "daijoubu-div";
    parent.appendChild(child);
}




function daijoubuEnd() {
    document.getElementsByClassName("daijoubu-div").remove();
}

