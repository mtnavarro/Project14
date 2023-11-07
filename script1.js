
    var marker;
    var map;

    //User Data
    var client = [
        { id: 1, name: "David", phone: "000-000-0000",lat: 40.758896, lng: -73.985130, "title": "Times Square", status:1},
        { id: 2, name: "Thomas", phone: "111-111-1111",lat: 40.748817, lng: -73.985428, "title": "Empire State Building", status:1 },
        { id: 3, name: "Peter", phone: "222-222-2222",lat: 40.781324, lng: -73.966698, "title": "Central Park", status:1 }
    ];

    //driver Data
    var driver = [
        { id: 1, name: "Charly", phone: "333-333-3333",lat: 40.700244,lng: -74.005942,"title": "Wall Street", status:1 },
        { id: 2, name: "Steve", phone: "444-444-4444",lat: 40.751424,lng: -73.979384,"title": "Grand Central Terminal", status:1 },
        { id: 3, name: "Jhon", phone: "555-555-5555",lat: 40.758899,lng: -73.985839,"title": "MoMA", status:1 }
    ];

    //Tracker Data
    var tracker = [];

    showTracker();
    showClient();
    showDriver();

    // Show Tracker
    function showTracker(){
        const tablaBody3 = document.getElementById("tabla-body3"); 
        tablaBody3.innerHTML = "";
        
        tracker.forEach(dato => {
            const fila = `
                <tr>
                    <td>${dato.id}</td>
                    <td>${dato.name}</td>
                    <td>${dato.driverName}</td>
                    <td> <button onclick="findTracker(${dato.id})">Set</button> </td>
                </tr>
            `;
            
            tablaBody3.innerHTML += fila;
        });

    }

    // Show Client
    function showClient(){

        const tablaBody = document.getElementById("tabla-body");

        client.forEach(dato => {
            const fila = `
                <tr>
                    <td>${dato.id}</td>
                    <td>${dato.name}</td>
                    <td>${dato.phone}</td>
                    <td> <button onclick="findClient(${dato.id})">Set</button> </td>
                </tr>
            `;
            
            tablaBody.innerHTML += fila;
        });

    }

    //Show Driver
    function showDriver(){ 
        
        const tablaBody2 = document.getElementById("tabla-body2");
        const dropdown = document.getElementById("driver");
        
        driver.forEach(dato => {
            const fila = `
                <tr>
                    <td>${dato.id}</td>
                    <td>${dato.name}</td>
                    <td>${dato.phone}</td>                
                </tr>
            `;
            
            tablaBody2.innerHTML += fila;
            const option = document.createElement("option");
            option.value = dato.id;
            option.text = dato.name;
            dropdown.appendChild(option);
        });
    }

    //Find Client
    function findClientById(id) {
        return client.find(client => client.id === id);
    }
    
    //Find Client
    function findClient(id) {
        const client = findClientById(id);
            
            document.getElementById("id").value = client.id;
            document.getElementById("client").value = client.name;
            document.getElementById("phone").value = client.phone;
    }


    //Find Tracker
    function findTracker(id) {
         
        for (var i = 0; i < tracker.length; i++) {
            tracker[i].status = 0;
            if(tracker[i].id === id){
                tracker[i].status = 1;
            }
          
        }
        
       initMap();            
    }


    //Find Driver
    function findDriverById(id) {
        return driver.find(driver => driver.id === id);
    }
    
    //Find Driver
    function findDriver(id) {
        const driver = findDriverById(id);
        
            document.getElementById("id").value = driver.id;
            document.getElementById("client").value = driver.name;
            document.getElementById("phone").value = driver.phone;
        
    }

    //Set Driver
    function saveData() {
        
        var id = parseInt(document.getElementById("id").value);
        var name = document.getElementById("client").value;
        client2 = findClientById(parseInt(document.getElementById("id").value));
        var lat = client2.lat;
        var lng = client2.lng;

        driver2 = findDriverById(parseInt(document.getElementById("driver").value));
        var driverName = driver2.name;
        var lat2 = driver2.lat;
        var lng2 = driver2.lng;
        var status = 0;
    
        var newData = {
            "id": id,
            "name": name,
            "driverName":driverName,
            "lat": lat,
            "lng": lng,
            "lat2": lat2,
            "lng2": lng2,
            "status": status
        };

        
        tracker.push(newData);
        showTracker();
    }
    
    //Init Map
    function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 40.781324, lng: -73.966698 }, // Centro del mapa (Nueva York)
            zoom: 12// Nivel de zoom inicial
        });
        const image = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
                    
        client.forEach(function(marker) {
            var position = { lat: marker.lat, lng: marker.lng };
            var googleMarker = new google.maps.Marker({
                position: position,
                map: map,
                title: marker.title,
                icon: image
            });

            var infowindow = new google.maps.InfoWindow({
                content: marker.name
            });

            googleMarker.addListener('click', function() {
                infowindow.open(map, googleMarker);
            });

            
        });

        driver.forEach(function(marker) {
            var position = { lat: marker.lat, lng: marker.lng };
            var googleMarker = new google.maps.Marker({
                position: position,
                map: map,
                title: marker.title
            });

            var infowindow = new google.maps.InfoWindow({

                content: marker.name
            });

            googleMarker.addListener('click', function() {
                infowindow.open(map, googleMarker);
            });

            
        });

        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);
        
        tracker.forEach(function(tracker) {
            //tracker.find(tracker => tracker.status === 1){
        
        if(tracker.status === 1){
            lat = tracker.lat;
            lng = tracker.lng;
            lat2 = tracker.lat2;
            lng2 = tracker.lng2;
        

            var puntoInicio = new google.maps.LatLng(  tracker.lat,tracker.lng); // Latitud y longitud del punto de inicio
            var puntoFin = new google.maps.LatLng(tracker.lat2,tracker.lng2); // Latitud y longitud del punto de fin
            
            var request = {
            origin: puntoInicio,
            destination: puntoFin,
            travelMode: 'DRIVING' // Puedes cambiar el modo de transporte a 'WALKING', 'BICYCLING', o 'TRANSIT'
            };
        
            directionsService.route(request, function(response, status) {
            if (status == 'OK') {
                directionsDisplay.setDirections(response);
            } else {
                window.alert('Error al mostrar la ruta: ' + status);
            }
            }); 

        }

    });
    }
  



  

