function getMembers(){
    fetch('http://calindima.com/wordpress/wp-json/wp/v2/member?_embed&per_page=100')
    .then(e=>e.json())
    .then(showMembers);
}
function getAlbums(){
    fetch('http://calindima.com/wordpress/wp-json/wp/v2/album?_embed&per_page=100')
    .then(e=>e.json())
    .then(showAlbums);
}

function getEvents(){
    fetch('http://calindima.com/wordpress/wp-json/wp/v2/band_event?_embed&per_page=100')
    .then(e=>e.json())
    .then(showEvents);
}

function getMerch(){
    fetch('http://calindima.com/wordpress/wp-json/wp/v2/merchandise?_embed&per_page=100')
    .then(e=>e.json())
    .then(showMerch);
}

function getMedia(){
    fetch('http://calindima.com/wordpress/wp-json/wp/v2/media?per_page=100&what_media=77')
    .then(e=>e.json())
    .then(showMedia);
}

function showMembers(data){

//console.log(data);
let parent = document.querySelector('#main');
let template = document.querySelector('#memberTemplate').content;
if(screen.width < 480){
parent.innerHTML = "<header><img class=\"mobile-header\" src=\"imgs/logo-mobile.png\" alt=\"\"><img class=\'about-arrow\' src=\"imgs/about-arrow.png\" onClick=\'scrollToAbout()\'></header><h1 class=\"section-header\">ABOUT US</h1><img class=\"about-img\" src=\'imgs/about-photo.jpg\'><p class=\'about-text\'>Before the Moon is a newly formed metal group from Copenhagen having an all international line up. The band was formed in 2017 by members Andrius, Alexandru, Steven, Ewerton and Paul. With a great passion for music and a desire to evolve and develop their skills, they decided to get together and start working for what they believe it will be the next big metal group coming out from Denmark. With such a multicultural background and a desire to prove themselves and the others that they can among the best, the band will start and create its own music and have its own feel and style. Groups like Iron Maiden, Black Sabbath, Pink Floyd, Queen or Pantera have had big impact on the band’s members so their influence might come through their own songs.Their mission is to become a professional metal band who offers good quality music and a solid brand recognizable all over Denmark and, in a few years, all over the world.</p><section id=\'member-section\'></section>";
}
else{
parent.innerHTML = "<header><img class=\"desktop-header\" src=\"imgs/landing-photo.jpg\" alt=\"\"><img class=\'about-arrow\' src=\"imgs/about-arrow.png\" onClick=\'scrollToAbout()\'></header><h1 class=\"section-header\">ABOUT US</h1><img class=\"about-img\" src=\'imgs/about-photo.jpg\'><p class=\'about-text\'>Before the Moon is a newly formed metal group from Copenhagen having an all international line up. The band was formed in 2017 by members Andrius, Alexandru, Steven, Ewerton and Paul. With a great passion for music and a desire to evolve and develop their skills, they decided to get together and start working for what they believe it will be the next big metal group coming out from Denmark. With such a multicultural background and a desire to prove themselves and the others that they can among the best, the band will start and create its own music and have its own feel and style. Groups like Iron Maiden, Black Sabbath, Pink Floyd, Queen or Pantera have had big impact on the band’s members so their influence might come through their own songs.Their mission is to become a professional metal band who offers good quality music and a solid brand recognizable all over Denmark and, in a few years, all over the world.</p><section id=\'member-section\'></section>";   
}

let otherParent = document.querySelector('#member-section');

parent.className = 'about-main';

data.forEach(member=>{

    //    console.log(member);

    let clone = template.cloneNode(true);
    let profileImg = clone.querySelector('.profileImg');
    let name = clone.querySelector('.name span');
    let age = clone.querySelector('.age span');
    let role = clone.querySelector('.role span');
    let nationality = clone.querySelector('.nationality span');

    profileImg.setAttribute('src',member._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url);
    name.textContent = member.title.rendered;
    age.textContent = (new Date()).getFullYear()-member.acf.birth_year;
    role.textContent = member.acf.role;
    nationality.textContent = member.acf.nationality;

otherParent.appendChild(clone);
});
}

function showAlbums(data){
 //console.log(data);
 let parent = document.querySelector('#main');
 let template = document.querySelector('#albumTemplate').content;

 parent.innerHTML = "<h1 class=\"section-header\">ALBUMS</h1>"

parent.className = 'album-main';

 data.forEach(album=>{
  //console.log(album);
    
  let clone = template.cloneNode(true);
    let albumImg = clone.querySelector('.albumImg');
    let albumTitle = clone.querySelector('.album-title');
    let albumDescription = clone.querySelector('.album-description span');
    let releaseDate = clone.querySelector('.release-date span');
    let noOfSongs = clone.querySelector('.no-of-songs span');

      albumImg.setAttribute('src',album._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url);
      albumTitle.textContent = album.title.rendered;
      albumDescription.innerHTML = album.content.rendered;
      releaseDate.textContent = album.acf.release_date.slice(6,8) + '/' 
      + album.acf.release_date.slice(4,6) + '/' + album.acf.release_date.slice(0,4);
      noOfSongs.textContent = album.acf.number_of_songs;

parent.appendChild(clone);      
});
}

function showEvents(data){
    //console.log(data);
 let parent = document.querySelector('#main');
 let template = document.querySelector('#eventTemplate').content;
 
 parent.innerHTML = "<h1 class=\"section-header\">EVENTS</h1>"
 
parent.className = 'event-main';

 data.forEach(event=>{
     let clone = template.cloneNode(true);
     let eventImg = clone.querySelector('.eventImg');
     let eventTitle = clone.querySelector('.event-title');
     //let eventDescription = clone.querySelector('.event-description');
     let eventDate = clone.querySelector('.date span');
     let eventLocation = clone.querySelector('.location span');

     eventImg.setAttribute('src',event._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url);
     eventTitle.textContent = event.title.rendered;
    // eventDescription.innerHTML = event.content.rendered;
     eventDate.textContent =event.acf.date.slice(6,8) + '/' + event.acf.date.slice(4,6) + '/' + event.acf.date.slice(0,4);
     eventLocation.textContent = event.acf.location;

parent.appendChild(clone);
 });
}

function showMerch(data){
    //console.log(data);
let parent = document.querySelector('#main');
let template = document.querySelector('#merchandiseTemplate').content;

parent.innerHTML = "<h1 class=\"section-header\">MERCHANDISE</h1>"

parent.className = 'merch-main';

data.forEach(merch=>{
let clone = template.cloneNode(true);
let merchImg = clone.querySelector('.merchImg');
let merchName = clone.querySelector('.merch-name');
let merchPrice = clone.querySelector('.merch-price span');

merchImg.setAttribute('src',merch._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url);
merchName.textContent = merch.title.rendered;
merchPrice.textContent = merch.acf.price;

parent.appendChild(clone);
});
}

function showMedia(data){
    //console.log(data);
    let parent = document.querySelector('#main');
    let photoTemplate = document.querySelector('#photoTemplate').content;
    let videoTemplate = document.querySelector('#videoTemplate').content;

    parent.innerHTML = "<h1 class=\"section-header\">MEDIA</h1>"
    
parent.className = 'media-main';

    data.forEach(media=>{
let clone = photoTemplate.cloneNode(true);
let clone2 = videoTemplate.cloneNode(true);
if(media.media_type == 'image'){
let mediaImg = clone.querySelector('.mediaImg');

mediaImg.setAttribute('src',media.media_details.sizes.medium.source_url);
parent.appendChild(clone);
}
else {
    let mediaVideo = clone2.querySelector('.mediaVideo source');

    mediaVideo.setAttribute('src',media.source_url);
    parent.appendChild(clone2);
}
});
}
//getMembers();    
//getAlbums();
//getEvents();
//getMerch();
function router(){
    switch (window.location.hash){
        case '':
        getMembers();
        break;
        case '#albums':
        getAlbums();
        break;
        case '#events':
        getEvents();
        break;
        case '#media':
        getMedia();
        break;
        case '#merchandise':
        getMerch();
        break;
    }
}
router();
window.addEventListener("hashchange", hashChanged, false);
function hashChanged(e){
    //console.log(e);
    if(window.location.hash!='#contact'){
    document.querySelector('#main').innerHTML = '';
    router();
}
}

//SVG

fetch('my.svg').then(e=>e.text()).then(showSVG);

function showSVG(data){
    document.querySelector('.logo').innerHTML=data;
}
//Changing logo location for mobile
if(screen.width < 480){
document.querySelector('body').appendChild(document.querySelector('.logo'));
}

//Arrow scroll
function scrollToAbout(){   
     document.querySelector('main .section-header')
        .scrollIntoView({ 
    behavior: 'smooth',
    block: "start"
  });
}

//Contact scroll
function scrollToContact(){   
    document.querySelector('#contact')
       .scrollIntoView({ 
   behavior: 'smooth',
   block: 'end'
 });
}
//Up up and away! scroll
function scrollToMenu(){   
    document.querySelector('.sidenav')
       .scrollIntoView({ 
   behavior: 'smooth',
   block: 'start'
 });
}
//Burger menu
if(screen.width < 480){
    document.querySelector('.burger-menu').addEventListener('click',openNav);
    
    document.querySelector('.sidenav').addEventListener('click',closeNav);
    
    function openNav() {
        document.querySelector('.sidenav').style.width = "100%";
    }
    
    function closeNav() {
        document.querySelector('.sidenav').style.width = "0";
    }
}

//Go up Arrow
document.querySelector('img.go-up').addEventListener('click',scrollToMenu);

window.onscroll = function(){
    if(document.body.scrollTop > (screen.height-100) || document.documentElement.scrollTop > (screen.height-100)){
        document.querySelector('img.go-up')
        .style.display = 'block';
    }
    else{ 
        document.querySelector('img.go-up')
        .style.display = 'none';
    }
}