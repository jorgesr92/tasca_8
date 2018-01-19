function loadJSON(callback) {   
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'google_maps.json', true); 
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            var responseText = xobj.responseText;
            // Parse JSON string into object
            var actual_JSON = JSON.parse(responseText);
            callback(actual_JSON);
        }
    };
    xobj.send(null);  
}

function viewJSON() {
    loadJSON(function(response) {
        var tabla ='<div class="container" align="center"><br><table class="table table-striped" style="width:auto"><thead><tr><th>Nom</th><th>Adreça</th><th>Latitud</th><th>Longitud</th><th>Tipus establiment</th><th>Icona</th></th></tr></thead>';
        for (var i=0; i<response.results.length;i++){
            
            tabla+='<tr><td>'+response.results[i].name+'</td><td>'+response.results[i].vicinity+'</td><td>'+response.results[i].geometry.location.lat+'</td><td>'+response.results[i].geometry.location.lng+'</td><td><ol>';
            tabla=lista(response, tabla, i);
            tabla+='</ol></td><td><img src='+response.results[i].icon+'></td></tr>';
              
        }
        document.getElementById("results").innerHTML =tabla+'</table></div>';
    });
}

function lista(response, tabla, i){
    for (var j in response.results[i].types){
        tabla+='<li>'+response.results[i].types[j]+'</li>';
    }
    return tabla;
}

