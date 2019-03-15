navigator.geolocation.getCurrentPosition(showPosition);
var response, latitude, longitude;
function showPosition(position)
{
    //get current latitude and longitude
           latitude = position.coords.latitude;
          longitude = position.coords.longitude;

         //append latitude and longitude to links of city
         for(var i=0; i<5; i++)
         {
                 var x=document.getElementsByClassName("link")[i];
                x.href+="&lat="+latitude+"&lon="+longitude;
        }

        var r = new XMLHttpRequest();

r.open("GET", "https://developers.zomato.com/api/v2.1/search?lat="+latitude+"&lon="+longitude+"&sort=real_distance&order=asc",true);
r.setRequestHeader('Accept', 'application/json');
r.setRequestHeader('user-key','737bcf78aa7bab36195421345aa9d74e');


r.onload = function ()
{
if (r.status == 200)
{
    response=JSON.parse(r.responseText);
  
    nearbyRestaurants();
}
}
r.send();

//function to display nearby restaurants
function nearbyRestaurants()
{
    var near=document.getElementById('nearbyRest');

    var table=document.createElement('table');
   // table.setAttribute('cellspacing','40px');
    table.setAttribute('cellpadding','25px');
    table.setAttribute('id','nearby');
    var tr1=document.createElement('tr');
    var text = document.createTextNode("Restaurants nearby you");
    var span=document.createElement('span');
    span.appendChild(text);
    span.setAttribute('id', 'neartitle');
    var td=document.createElement('td');
    td.setAttribute('colspan','5');
    td.appendChild(span);
    tr1.appendChild(td);
    table.appendChild(tr1);

    var tr=document.createElement('tr');
    for(var i=0; i<4; i++)
    {
        var restid=response.restaurants[i].restaurant.R.res_id;
        var a = document.createElement('a');
        a.setAttribute("href", "restaurant_details.html?id="+restid);

        var td=document.createElement('td');

        //create table for each restaurant
        var tablechild=document.createElement('table');
        var tr1=document.createElement('tr');
        var tr2=document.createElement('tr');
        
         //get featured image of restaurant
         var td1=document.createElement('td');
        var img = document.createElement('img');
        if(response.restaurants[i].restaurant.featured_image)
       {
               img.src=response.restaurants[i].restaurant.featured_image;
               img.setAttribute('class', 'nearbyimg');
        }
              else
               { img.src=("default.png");
                    img.setAttribute('width','90px');
            }
       
        td1.appendChild(img);
        tr1.appendChild(td1);

        //get name of restaurant
        var td2=document.createElement('td');
        td2.setAttribute('height', '60px');
        var name=document.createElement('span');
        name.setAttribute('id', 'ratereview');
        var nt = document.createTextNode(response.restaurants[i].restaurant.name); 
        name.appendChild(nt);
        name.style.color=("rgb(231, 231, 205)");
        td2.appendChild(name);
        tr2.appendChild(td2);

        tablechild.appendChild(tr1);
        tablechild.appendChild(tr2);
        a.appendChild(tablechild);
       td.appendChild(a);
       tr.appendChild(td);
    }
    //option to view more restaurants
    var td=document.createElement('td');
    td.setAttribute('width', '100px');
    var a=document.createElement('a');
    a.setAttribute('id', 'seemore');
    a.setAttribute('href','restaurants.html?id=0&pno=1&lat='+latitude+'&lon='+longitude);
    var atext=document.createTextNode('view more');
    a.appendChild(atext);
    td.appendChild(a);
    tr.appendChild(td);
    
    table.appendChild(tr);
    near.appendChild(table);
}

}
