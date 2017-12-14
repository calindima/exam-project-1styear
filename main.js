function getMembers(){
    fetch('http://calindima.com/wordpress/wp-json/wp/v2/member?_embed&per_page=100').then(e=>e.json()).then(showMembers);
}
function getAlbums(){
    fetch('http://calindima.com/wordpress/wp-json/wp/v2/album?_embed&per_page=100').then(e=>e.json()).then(showAlbums);
}

function getEvents(){
    fetch('http://calindima.com/wordpress/wp-json/wp/v2/band_event?_embed&per_page=100').then(e=>e.json()).then(showEvents);
}

function getMerch(){
    fetch('http://calindima.com/wordpress/wp-json/wp/v2/merchandise?_embed&per_page=100').then(e=>e.json()).then(showMerch);
}

function getMedia(){
    fetch('http://calindima.com/wordpress/wp-json/wp/v2/media?per_page=100&what_media=77').then(e=>e.json()).then(showMedia);
}

function showMembers(data){

//console.log(data);
let parent = document.querySelector('#main');
let template = document.querySelector('#memberTemplate').content;
if(screen.width < 480){
parent.innerHTML = "<header><img class=\"mobile-header\" src=\"imgs/logo-mobile.png\" alt=\"\"><img class=\'about-arrow\' src=\"imgs/about-arrow.png\" onClick=\'scrollToAbout()\'></header><h1 class=\"section-header\">ABOUT US</h1><img class=\"about-img\" src=\'imgs/about-photo.jpg\'><p class=\'about-text\'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacus velit, dictum eu porta eu, ultricies et enim. Proin luctus arcu quis ipsum ullamcorper vestibulum. Fusce vel tortor velit. Donec consectetur tincidunt nisl, finibus congue urna posuere nec. Aenean pellentesque feugiat dignissim. Curabitur quis pretium massa. Suspendisse lorem dui, auctor a posuere non, scelerisque vitae nisl. Praesent laoreet turpis a venenatis viverra. Nunc aliquet gravida turpis vitae finibus. Nam in tortor fringilla, molestie tortor ac, sagittis sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tincidunt nec eros faucibus tincidunt. Pellentesque libero dui, volutpat at porttitor id, auctor in dui.</p><section id=\'member-section\'></section>";
}
else{
parent.innerHTML = "<header><img class=\"desktop-header\" src=\"imgs/landing-photo.jpg\" alt=\"\"><img class=\'about-arrow\' src=\"imgs/about-arrow.png\" onClick=\'scrollToAbout()\'></header><h1 class=\"section-header\">ABOUT US</h1><img class=\"about-img\" src=\'imgs/about-photo.jpg\'><p class=\'about-text\'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean lacus velit, dictum eu porta eu, ultricies et enim. Proin luctus arcu quis ipsum ullamcorper vestibulum. Fusce vel tortor velit. Donec consectetur tincidunt nisl, finibus congue urna posuere nec. Aenean pellentesque feugiat dignissim. Curabitur quis pretium massa. Suspendisse lorem dui, auctor a posuere non, scelerisque vitae nisl. Praesent laoreet turpis a venenatis viverra. Nunc aliquet gravida turpis vitae finibus. Nam in tortor fringilla, molestie tortor ac, sagittis sem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tincidunt nec eros faucibus tincidunt. Pellentesque libero dui, volutpat at porttitor id, auctor in dui.</p><section id=\'member-section\'></section>";   
}

let otherParent = document.querySelector('#member-section');

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
      releaseDate.textContent = album.acf.release_date.slice(6,8) + '/' + album.acf.release_date.slice(4,6) + '/' + album.acf.release_date.slice(0,4);
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
function scrollToAbout(){    document.querySelector('main .about-text').scrollIntoView({ 
    behavior: 'smooth' 
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