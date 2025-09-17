//Variables
const date = new Date(); //Getting date for timestamp
var wwidth = window.innerWidth; //Get Window Resolution for scaling
var wheight = window.innerHeight;

//Database Functions
//Comments
async function sendcomment(videoid, comment) {
  const user = await window.websim.getCurrentUser();
  let UUID = uuidv4()
  let post = await room.collection('comments').create({
    username: user.username,
    comment: comment,
    timestamp: [date.getDay(), date.getMonth(), date.getFullYear()],
    video: videoid,
    commentid: UUID
  });
}

//Videos
async function loadvideos() {
  const list = await room.collection("videos").getList();
  if (list.length > 0) {
    document.getElementById("novideo").style.display = "none";
  }
  x = 5;
  y = 250;
  i = 1;
}

//Page Functions
function home() {
  document.getElementById("videos").style.display = "none";
  document.getElementById("upload").style.display = "none";
  document.getElementById("home").style.display = "block";
  document.getElementById("videopage").style.display = "none";
  document.getElementById("watchvideo").pause();
}
function videos() {
  document.getElementById("videos").style.display = "block";
  document.getElementById("upload").style.display = "none";
  document.getElementById("home").style.display = "none";
  document.getElementById("videopage").style.display = "none";
  document.getElementById("watchvideo").pause();
}
function upload() {
  document.getElementById("videos").style.display = "none";
  document.getElementById("upload").style.display = "block";
  document.getElementById("home").style.display = "none";
  document.getElementById("videopage").style.display = "none";
  document.getElementById("watchvideo").pause();
}

//Misc Functions
function uuidv4() { //UUID Generator
  return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
    (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}

//Code
var whpage = wheight - 220 //Height variables for scaling
var whphold = wheight - 310
var whpage2 = wheight - 240
document.getElementById("videos").style.height = whpage.toString().concat("px"); //Scale page holders
document.getElementById("vhold").style.height = whphold.toString().concat("px");
document.getElementById("upload").style.height = whpage.toString().concat("px");
document.getElementById("uhold").style.height = whphold.toString().concat("px");
document.getElementById("home").style.height = whpage.toString().concat("px");
document.getElementById("hhold").style.height = whphold.toString().concat("px");
document.getElementById("uploadingvideo").style.height = whpage.toString().concat("px");
document.getElementById("uploading").style.height = whphold.toString().concat("px");
document.getElementById("videopage").style.height = whpage2.toString().concat("px");
document.getElementById("upload").style.display = "none"; //Hide Pages
document.getElementById("home").style.display = "none";
document.getElementById("uploadingvideo").style.display = "none";
document.getElementById("videopage").style.display = "none";
document.getElementById("videoslot").style.display = "none";