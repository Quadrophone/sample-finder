 var freesound;
    
      $(document).ready(function(){
      
      apiKey = "9184732e701247238ec210d323f800e6";  
      //console.debug("key: " + apiKey);
      
      if(apiKey == "")
      {
        $("#resp").append("<br>please enter an apiKey in settings_local.json");
      }     
      else 
      {       
        /*======= freesound object ========*/
        //creating freesound object 
        freesound = new Freesound(apiKey, true);
        $("#resp").append(
          "<br>freesound object created with api key = " + freesound.getApiKey() +
          "<br>freesound base uri = " + freesound.getBaseUri()
        );
    
      }
      });

      function displaySearchResults(soundCollection) {
        
        $("#freesound").text("");
        
        for (obj in soundCollection.properties['sounds']) {
          var mp3 = soundCollection.properties['sounds'][obj]['preview-lq-mp3']
          var ogg = soundCollection.properties['sounds'][obj]['preview-lq-ogg']
          $("#freesound").append("<li><audio controls><source src=" + mp3 + " 'type='mpeg'><source src=" + ogg + " 'type='ogg'></audio><a class='fsname' href='" + soundCollection.properties['sounds'][obj]['url'] + "'target='_blank'><span>" + soundCollection.properties['sounds'][obj]['original_filename'] +"</span></a><span class='fsdl'><a href='" + soundCollection.properties['sounds'][obj]['serve'] + "?api_key=9184732e701247238ec210d323f800e6'> Download Sample</a></span></li>");
        }
      
        sc = soundCollection;
        $("#freesound").append('<br><br><button class="freesound btn btn-default" onclick="sc.previous(displaySearchResults);">&laquo; Previous</button><button class="freesound btn btn-default" onclick="sc.next(displaySearchResults);">&raquo; Next</button>')
        
      } 

      function errorSearch(status_code, type, explanation){
        $("#freesound").text("");
        $("#freesound").append("<br>Error: " + status_code + " (" + type + ")<br>" + explanation );
      }
              
      function search() {
        var q = document.getElementById('search_string').value;
        var p = 1;
        var f = "duration:[0.1 TO 15.0] type:wav";
        var s = ""; 
        $("#freesound").text("");
        $("#freesound").append("<br>Searching: " + q);
        freesound.getSoundsFromQuery(q,p,f,s,displaySearchResults, errorSearch);
      }
      
        
    