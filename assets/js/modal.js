var linkGo = null;

function showMessage(text, link){
    
    $("#modal-msg").text(text);

    if(link){
        linkGo = link;
    }else{
        linkGo = null;
    }

    $("#myModal").modal("show");
}

function hideMessage()
{
    $("#myModal").modal("hide");

    if(linkGo){
        window.location.replace(linkGo);
    }
}