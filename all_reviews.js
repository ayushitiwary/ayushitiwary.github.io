var urlParams = new URLSearchParams(window.location.search);
var id=urlParams.get('id');
var pageno=Number(urlParams.get('pno'));
var r = new XMLHttpRequest();
r.open("GET", "https://developers.zomato.com/api/v2.1/reviews?res_id="+id+"&start="+5*(pageno-1),true);
r.setRequestHeader('Accept', 'application/json');
r.setRequestHeader('user-key','737bcf78aa7bab36195421345aa9d74e');

var response;
    r.onload = function ()
    {
        if (r.status == 200)
         {
            response=JSON.parse(r.responseText);
            console.log("Success: " + r.responseText);

            var title=document.getElementById('title');
            var text=document.createTextNode("All reviews ");
            title.appendChild(text);

            //view all reviews
            allReviews();
         }
    }

    r.send();

    function allReviews()
    {
        var review=document.getElementById('allreviews');
        for(var i=0; i<5; i++)
        {
          //create table for each review
          var table=document.createElement('table');
          table.setAttribute('class', 'userreview');
          table.setAttribute('cellpadding', '10px');
          var tr1=document.createElement('tr');
          var tr2=document.createElement('tr');
      
          //profile pic of the user
          var td1=document.createElement('td');
          var profilepic=document.createElement('img');
          profilepic.src=response.user_reviews[i].review.user.profile_image;
          profilepic.setAttribute('class', 'profilepic');
          td1.appendChild(profilepic);
          tr1.appendChild(td1);
      
          //name of user
          var td2=document.createElement('td');
          var username=document.createElement('div');
          username.setAttribute('class', 'username');
          var uname=document.createTextNode(response.user_reviews[i].review.user.name);
          username.appendChild(uname);
          td2.appendChild(username);
      
          //rating of user in stars
          var rate=document.createElement('div');
          rate.setAttribute('class', 'username');
          var startext="";
          var x=Number(response.user_reviews[i].review.rating);
          for(var j=0; j<x; j++)
          {
              startext+="\u2605 ";
          }
          for(var k=x; k<5; k++)
          {
            startext+="\u2606 ";
          }
          var stars=document.createTextNode(startext);
          rate.appendChild(stars);
          td2.appendChild(rate);
          tr1.appendChild(td2);
      
          var td3=document.createElement('td');
          tr2.appendChild(td3);
      
          //review of user
          var td4=document.createElement('td');
           var text=document.createElement('span');
           var tt=document.createTextNode(response.user_reviews[i].review.review_text);
           text.appendChild(tt);
           td4.appendChild(text);
           tr2.appendChild(td4);
           
            table.appendChild(tr1);
            table.appendChild(tr2);
           review.appendChild(table);
        }
    }
