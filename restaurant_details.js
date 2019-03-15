var urlParams = new URLSearchParams(window.location.search);
var id=urlParams.get('id');

//request for restaurant details
var r = new XMLHttpRequest();
r.open("GET", "https://developers.zomato.com/api/v2.1/restaurant?res_id="+id,true);
r.setRequestHeader('Accept', 'application/json');
r.setRequestHeader('user-key','737bcf78aa7bab36195421345aa9d74e');

//request for restaurant reviews
var s=new XMLHttpRequest();
s.open("GET", "https://developers.zomato.com/api/v2.1/reviews?res_id="+id,true);
s.setRequestHeader('Accept', 'application/json');
s.setRequestHeader('user-key','737bcf78aa7bab36195421345aa9d74e');

var response, Sresponse;
r.onload = function ()
{
    if (r.status == 200)
    {
    response=JSON.parse(r.responseText);
        console.log("Success: " + r.responseText);

        
        featuredImage();    //display featured image
      
        nameAndVote();      //display name of restaurant and no. of votes
 
           costAndAddress();    //display cost for 2 people and address of restaurant
 
           cuisines();    //display cuisines

        
      }
    };
    s.onload=function(){
      if (s.status == 200)
     {
        Sresponse=JSON.parse(s.responseText);
        
        //display number of reviews
        var preview=document.getElementById('reviewno');
         var rt = document.createTextNode(Sresponse.reviews_count+" Reviews");
          preview.appendChild(rt);

         reviews();      // get reviews
     }
};
r.onerror = function(err){
  console.log(err);
  };
  

r.send();
s.send();

//function to display featured image
function featuredImage()
{
  var pimg=document.getElementById('main');
        var img=document.createElement('img');
        if(response.featured_image)
        {
           img.src=response.featured_image;
           img.setAttribute('id', 'mainimg');
        }
        else
        { img.src=("default.png");
                    img.setAttribute('width','110px');
            }
        img.style.height=('100px');
        img.style.width=('100%');
        img.style.height=('550px');
        pimg.appendChild(img);
}

//function to display name and votes for restaurant
function nameAndVote()
{
  //display name
  var pname=document.getElementById('name');
  var nt = document.createTextNode(response.name); 
  pname.appendChild(nt);

  //display like button
  var like=document.createElement('button');
  like.setAttribute('id','like');
  like.setAttribute('onclick', 'liked();');
  var heart=document.createTextNode("\u2764");
  like.appendChild(heart);
  if(window.localStorage.getItem(id))
  {
  like.style.color=("rgb(199, 67, 67)");
  var ltext=document.createTextNode("Like");
  ltext.setAttribute('id','liketext');
  like.appendChild(ltext);
  }
  else
  like.style.color=("rgb(241, 190, 182)");
  pname.appendChild(like);

  //display no. of votes
  var pvote=document.getElementById('vote');
  var vt = document.createTextNode("\u2605 "+response.user_rating.aggregate_rating+"("+response.user_rating.votes+" votes)");
  pvote.appendChild(vt);

}

//function to display reviews
function reviews()
{
  var review=document.getElementById('review');
  for(var i=0; i<2; i++)
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
    profilepic.src=Sresponse.user_reviews[i].review.user.profile_image;
    profilepic.setAttribute('class', 'profilepic');
    td1.appendChild(profilepic);
    tr1.appendChild(td1);

    //name of user
    var td2=document.createElement('td');
    var username=document.createElement('div');
    username.setAttribute('class', 'username');
    var uname=document.createTextNode(Sresponse.user_reviews[i].review.user.name);
    username.appendChild(uname);
    td2.appendChild(username);

    //rating of user in stars
    var rate=document.createElement('div');
    rate.setAttribute('class', 'username');
    var startext="";
    var x=Number(Sresponse.user_reviews[i].review.rating);
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
     var tt=document.createTextNode(Sresponse.user_reviews[i].review.review_text);
     text.appendChild(tt);
     td4.appendChild(text);
     tr2.appendChild(td4);
     
      table.appendChild(tr1);
      table.appendChild(tr2);
     review.appendChild(table);
  }
  
//option to see more reviews
  var center=document.createElement('center');
  var seemore=document.createElement('a');
  var st=document.createTextNode("see more");
  seemore.setAttribute('id', 'seemore');
  seemore.appendChild(st);
  seemore.setAttribute('href', 'all_reviews.html?id='+id+"&pno=1");
  center.appendChild(seemore);
  
  review.appendChild(center);
}

//function to display cost and address
function costAndAddress()
{
    //display cost
    var cost=document.getElementById('cost');
        var ct=document.createTextNode("Rs."+response.average_cost_for_two);
        cost.appendChild(ct);

        //display address
        var add=document.getElementById('address');
        var at=document.createTextNode(response.location.address);
        add.appendChild(at);
}

//function to display cuisines
function cuisines()
{
  var cuisine=document.getElementById('cuisines');
  var cuisinelist=document.createTextNode(response.cuisines);
  cuisine.appendChild(cuisinelist);
}


//function after like button is clicked
function liked()
{
  var liked=document.getElementById('like');
  if(window.localStorage.getItem(id))
  {
    liked.style.color=("rgb(241, 190, 182)"); 
    window.localStorage.removeItem(id);
  }
  else
  {
     liked.style.color=("rgb(199, 67, 67)");
     window.localStorage.setItem(id,'liked');
  }
  liked.style.border=("0px");
 
}
