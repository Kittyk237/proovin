(function() {
    "use strict";
    
    //clock

    document.addEventListener("DOMContentLoaded", function() {
        
        let c = document.getElementById("clock");
       
        //setTimeout(updateClock, 2000);
        setInterval(updateClock, 100);
        
        function updateClock() {
            
            let date = new Date();
            let h = date.getHours();
            var AmOrPm = h >= 12 ? 'PM' : 'AM';
            h = (h % 12) || 12;
            let m = date.getMinutes();
            let s = date.getSeconds();

            if (h < 10) {
                h = "0" + h;
            }

            if (m < 10) {
                m = "0" + m;
            }

            if (s < 10) {
                s = "0" + s;
            }

            c.innerHTML = h + ":" + m + ":" + s+ " " + AmOrPm;;


            
        };
        
    });
    
    // forms
    
   document.getElementById("form").addEventListener("submit", estimateDelivery);

       let e = document.getElementById("delivery");

       var summa = 0;
      // e.innerHTML = "0,00 &euro;";
       function estimateDelivery(event) {
           event.preventDefault();

           let linn = document.getElementById("linn");
           let kingitus = document.getElementById("v1").checked;
           let kontakt = document.getElementById("v2").checked;
           let dada = document.getElementById("customer").checked;



           if (linn.value == "") {

               alert("Valige palun linn olemasolevast nimekirjast");

               linn.focus();
              e.innerHTML = "0,00 &euro;";
               return;
           } else if (linn.value == "tln") {
               summa = 0;
           } else if (linn.value == "trt" || linn.value === "nrv") {
               summa = 2.5;
           } else if (linn.value == "prn") {
               summa = 3;
           }
           if (kingitus == true) {
               summa += 5;
           }
           if (kontakt == true) {
               summa += 1;
           }

           if (dada == true) {
             summa = summa- (summa*0.2); }


           let valuuta = new Intl.NumberFormat('eu-EU', { style: 'currency', currency: 'EUR' }).format(summa);
           e.innerHTML = valuuta;

           console.log("Tarne hind");

                    //kontrollin eesnime
                   let fname = document.getElementById("fname").value;
                   if (fname == "") {
                       alert("Eesnimi on sisestamata");
                       fname.focus();
                       return;
                   }

                    //kontrollin eesnime, et numbreid poleks sisestatud
                    var isNumeric=fname.match(/\d+/);
                    if(isNumeric){alert("Numbrid pole eesnimes lubatud");
                    lname.focus(); }

                    //kontrollin perekonnanime
                    let lname = document.getElementById("lname").value;
                    if (lname == "") {
                        alert("Perekonnanimi on sisestamata");
                        lname.focus();
                        return;
                    }

                    //kontrollin perekonnanime, et numbreid poleks sisestatud
                    var isNumeric=lname.match(/\d+/);
                    if(isNumeric){alert("Numbrid pole perekonnanimes lubatud");
                    lname.focus(); }

                    let klient = document.getElementById("customer");
                    let kulaline = document.getElementById("quest");
                    var radioButtons = document.getElementsByName("client");


                    if (klient.checked == false && kulaline.checked == false ) {
                        alert("Kas ostate püsikliendi või külalisena");
                        return;
                    } else if (klient.checked == true) {
                        alert("Tarne hind püsikliendina on: " + valuuta);
                    } else if (kulaline.checked == true) {
                        alert("Tarne hind külalisena on: " + valuuta);
                    }




    }
    
})();

// map

let mapAPIKey = "AgtE9MxciZZTgZjSsf8y0Kjs-PFhKV8BVf2Q7-ByERIsDk28m4wT8Z4mb03MTFlb";

let map;

function GetMap() {
    
    "use strict";

    let centerPoint = new Microsoft.Maps.Location(
            58.38104, 
            26.71992
        );

    map = new Microsoft.Maps.Map("#map", {
            credentials: mapAPIKey,
            center: new Microsoft.Maps.Location(58.653813, 25.974251),
            zoom: 8,
            mapTypeId: Microsoft.Maps.MapTypeId.aerial,
            disablePanning: true
        });

        let pushpin = new Microsoft.Maps.Pushpin(centerPoint, {
                title: 'Tartu',
                subTitle: 'Ülikoolilinn',
                text: 'TARTU',
                color: 'blue'
            });

            map.entities.push(pushpin);

            let centerPoint2 = new Microsoft.Maps.Location(
                        58.3676529,
                        25.595335
                    );

            let pushpinx = new Microsoft.Maps.Pushpin(centerPoint2, {
                    title: 'Viljandi',
                    subTitle: 'Parim koht',
                    text: 'VILJANDI',
                    color: 'red'
                });

                map.entities.push(pushpinx);

                var map = null, infobox, dataLayer;

                          function GetMap() {
                              // Initialize the map
                              map = new Microsoft.Maps.Map(document.getElementById("myMap"),
                                         { credentials: "Bing Maps Key" });

                              dataLayer = new Microsoft.Maps.EntityCollection();
                              map.entities.push(dataLayer);

                              var infoboxLayer = new Microsoft.Maps.EntityCollection();
                              map.entities.push(infoboxLayer);

                              infobox = new Microsoft.Maps.Infobox(new Microsoft.Maps.Location(0, 0), { visible: false, offset: new Microsoft.Maps.Point(0, 20) });
                              infoboxLayer.push(infobox);

                              AddData();
                          }

                          function AddData() {
                              var pin1 = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(0, 30));
                              pin1.Title = "Trtu";
                              pin1.Description = "Siin saab õppida informaatikar";
                              Microsoft.Maps.Events.addHandler(pin1, 'click', displayInfobox);
                              dataLayer.push(pin1);

                              var pin2 = new Microsoft.Maps.Pushpin(new Microsoft.Maps.Location(0, -30));
                              pin2.Title = "Viljandi";
                              pin2.Description = "Siin saab õppida robootikat";
                              Microsoft.Maps.Events.addHandler(pin2, 'click', displayInfobox);
                              dataLayer.push(pin2);
                          }

                          function displayInfobox(e) {
                              if (e.targetType == 'pushpin') {
                                  infobox.setLocation(e.target.getLocation());
                                  infobox.setOptions({ visible: true, title: e.target.Title, description: e.target.Description });
                              }
                          }



}

// https://dev.virtualearth.net/REST/v1/Locations?q=1000 Vin Scully Ave, Los Angeles,CA&key=YOUR_KEY_HERE

