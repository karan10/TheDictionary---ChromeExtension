
  var search;

  chrome.tabs.executeScript({

    code: "window.getSelection().toString();"

    }, function(selection) {

    document.getElementById("word").value = selection[0];
  
  });


$("button").click(function callmeaning(){

    var search = $('#word').val();

    var firstChar = search.charAt(0);

    var lastChar = search.substr(search.length - 1);

	if(firstChar == " ")
	    search = search.slice(1,search.length);

        if(lastChar == " ")
            search = search.slice(0,-1)

	search = search.toLowerCase();
          
        var meaning="";

        $.getJSON("http://api.wordnik.com/v4/word.json/"+search+"/definitions?limit=200&includeRelated=true&useCanonical=false&includeTags=false&api_key=df27b8aec17202819f00f0146ed0ad13993c5e03d3ff8703b", function(data) {
             

	var n=data.length;


           for(var i=0;i<n;i++){


                meaning=meaning+(i+1)+". "

                meaning = meaning+data[i].text;

                meaning=meaning+"<br><br>";

            }

            $("div").attr({

                title: search     

           }).appendTo("#tooltipxyz");

          $("#tooltipxyz").empty().append(meaning);

          $("#tooltipxyz").slideToggle("slow");

       })
           
});