 
    
     var npages;
     var total;
    var urlParams = new URLSearchParams(window.location.search);
    var pageno=Number(urlParams.get('pno'));                //get page number.
    var id=urlParams.get('id');                          //get city id.
    var latitude = urlParams.get('lat');                  //get latitude.
    var longitude = urlParams.get('lon');                //get longitude.
  
    const rl = document.getElementById('restaurantList');

    var r = new XMLHttpRequest();
  
    r.open("GET", "https://developers.zomato.com/api/v2.1/search?entity_id="+id+"&entity_type=city&start="+10*(pageno-1)+"&count=10&lat="+latitude+"&lon="+longitude+"&sort=real_distance&order=asc",true);
    r.setRequestHeader('Accept', 'application/json');
    r.setRequestHeader('user-key','5b4414767efef3384939bfff67f52dc1');
    var Sresponse, n;
    r.onload = function ()
    {
        if (r.status == 200)
        {
        response=JSON.parse(r.responseText);

            n=Number(response.restaurants.length);
           
            //display title of the page
            title();

            //display restaurant list
            restaurantList(0);

            //paging the list
            pagination();
        }
    };
    r.onerror = function(err){
    console.log(err);
    };

    r.send();

   
    //display list of restaurants in a page
    function restaurantList(i)
    {
        if(i<n)
            {
                var restid=response.restaurants[i].restaurant.R.res_id;
                var a = document.createElement('a');
                a.setAttribute("href", "restaurant_details.html?id="+restid);
                
                //create a table for each reataurant
                var table=document.createElement('table');
                table.setAttribute('class', 'row');
                table.setAttribute('width', '70%');
                var tr1=document.createElement('tr');
                var tr2=document.createElement('tr');
                var tr3=document.createElement('tr');
                var td1=document.createElement('td');
                td1.setAttribute('width','220');
                td1.rowSpan=3;
                var td2=document.createElement('td');
                td2.setAttribute('align','left');
                var td3=document.createElement('td');
                td3.setAttribute('align','left');
                var td4=document.createElement('td');
                td4.setAttribute('height','30px');
              
                //get featured image of restaurant
               var img = document.createElement('img');
               if(response.restaurants[i].restaurant.featured_image)
               {
                    img.src=response.restaurants[i].restaurant.featured_image;
                    img.setAttribute('class', 'restimg');
               }
               else
               { img.src=("default.png");
                    img.setAttribute('width','120px');
            }
               td1.appendChild(img);

               //get name of restaurant
                var name=document.createElement('span');
                name.setAttribute('id', 'name');
                var nt = document.createTextNode(response.restaurants[i].restaurant.name); 
                name.appendChild(nt);
                name.style.color=("white");
                td2.appendChild(name);

                //get aggregate rating of restaurant
                var rate=document.createElement('span');
                rate.setAttribute('id', 'ratereview');
                var rt = document.createTextNode("\u2605 "+response.restaurants[i].restaurant.user_rating.aggregate_rating);
                rate.appendChild(rt);

                //get total number of votes of restaurant
                var vote=document.createElement('font');
                var vt=document.createTextNode(" ("+response.restaurants[i].restaurant.user_rating.votes+" votes)");
                vote.setAttribute('size', '3px');
                vote.appendChild(vt);

                td3.appendChild(rate);
                td3.appendChild(vote);

                //fetch number of reviews of restaurant
                var s=new XMLHttpRequest();
                s.open("GET", "https://developers.zomato.com/api/v2.1/reviews?res_id="+restid,true);
                 s.setRequestHeader('Accept', 'application/json');
                s.setRequestHeader('user-key','5b4414767efef3384939bfff67f52dc1');
                s.onload=function(){
                   if (s.status == 200)
                     {
                         Sresponse=JSON.parse(s.responseText);
          
                        var review=document.createElement('span');
                        review.setAttribute('id', 'ratereview');
                        var rt = document.createTextNode("  |   "+Sresponse.reviews_count+" Reviews");
                        review.appendChild(rt);
                        td3.appendChild(review);
           
                     }
                    }
                    s.send();
            
                    //combine all the elements to form a table
                tr1.appendChild(td1);
                tr1.appendChild(td2);
                tr2.appendChild(td3);
                tr3.appendChild(td4);
                table.appendChild(tr1);
                table.appendChild(tr2);
                table.appendChild(tr3);
                a.appendChild(table);
                rl.appendChild(a);

                var hr=document.createElement('hr');
                hr.setAttribute('width', '70%');
                hr.setAttribute('size','.1px');
                rl.appendChild(hr);

                restaurantList(i+1);
    }
}




    //paginating of the restaurant list
    function pagination()
    {
        var pages=document.getElementById('pages');
        //if page number is 1, previous page arrow is absent
        if(pageno==1)
        {
            var limit=Number(pageno)+3;

            //make a link of next 3 pages
            for(var p=pageno; p<limit; p++)
            {
            var a = document.createElement('a');
            var atext = document.createTextNode(p);
            a.setAttribute("href", "restaurants.html?id="+id+"&pno="+Number(p)+"&lat="+latitude+"&lon="+longitude);
            if(p==pageno)
            a.setAttribute('id','activelink');
            a.appendChild(atext);
            pages.appendChild(a); 
            }

            //make a next page arrow link
            var next = document.createElement('a');
            var ntext = document.createTextNode(">>");
           next.setAttribute("href", "restaurants.html?id="+id+"&pno="+(pageno+1)+"&lat="+latitude+"&lon="+longitude);
            next.appendChild(ntext);
            pages.appendChild(next);

        }   
        else
        {
            //make a link for previous page
            var prev = document.createElement('a');
            var ptext = document.createTextNode("<<");
            prev.setAttribute("href", "restaurants.html?id="+id+"&pno="+(pageno-1)+"&lat="+latitude+"&lon="+longitude);
            prev.appendChild(ptext);
            pages.appendChild(prev);

            var limit=Number(pageno)+3;

            //make a link of one previous page and 2 next pages
            for(var p=Number(pageno)-1; p<limit; p++)
            {
                var a = document.createElement('a');
                var at = document.createTextNode(p);
                var div= document.createElement('div');
                a.setAttribute("href", "restaurants.html?id="+id+"&pno="+p+"&lat="+latitude+"&lon="+longitude);
                a.appendChild(at);
                if(p==pageno)
                a.style.backgroundColor=("rgb(8, 73, 8)");
          
                pages.appendChild(a);
            }

            //make a link for previous page
            var next = document.createElement('a');
            var ntext = document.createTextNode(">>");
            next.setAttribute("href", "restaurants.html?id="+id+"&pno="+(pageno+1)+"&lat="+latitude+"&lon="+longitude) ;
            next.appendChild(ntext);
            pages.appendChild(next);
        }
    }

    //function to display title of the page
    function title()
    {
        var table=document.createElement('table');
            table.setAttribute('class', 'row');
            table.setAttribute('width', '70%');
            var tr=document.createElement('tr');
            var td=document.createElement('td');
            var cityspan=document.createElement('span');
            cityspan.setAttribute('id', 'cityspan');
            var city=document.createTextNode(response.restaurants[0].restaurant.location.city);
            cityspan.appendChild(city);
            var infospan=document.createElement('span');
            infospan.setAttribute('id', 'ratereview');
            var info=document.createTextNode("Showing restaurants in ");
            infospan.appendChild(info);
            td.appendChild(infospan);
            td.appendChild(cityspan);
            tr.appendChild(td);
            table.appendChild(tr);
            rl.appendChild(table);

            var hr=document.createElement('hr');
            hr.setAttribute('width', '70%');
            hr.setAttribute('size','.1px');
            rl.appendChild(hr);

    }
