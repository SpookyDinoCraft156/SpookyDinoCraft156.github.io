//Variables
const room = new WebsimSocket(); //Setting up the database socket
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
  list.forEach(video => {
    const clone = document.getElementById("videoslot").cloneNode(true)
    clone.querySelector("#videothumbnail").src = `${video.thumbnailURL}`
    clone.querySelector("#vpagename").innerHTML = `<h5 class="vpagename" id="vpagename">${video.title} <button type="button" onclick="fetchvideo('${video.videoid}')" id="watchbutton">Watch</button></h5>`;
document.getElementById("vhold").appendChild(clone);
    clone.style.display = "block";
    clone.style.left = x.toString().concat("%");
    clone.style.top = y.toString().concat("px");
    i++;
    x = x + 17;
    if (i == 6) {
      x = 5;
      i = 1;
      y = y + 220;
    }
  });
}
async function fetchvideo(id) {
  document.getElementById("videopage").style.display = "block";
  document.getElementById("videos").style.display = "none";
  document.getElementById("upload").style.display = "none";
  document.getElementById("home").style.display = "none";
  const list = await room.collection("videos")
    .filter({ videoid: id })
    .getList();
  list.forEach(text => {
    document.getElementById("videoname").innerText = `${text.title}`
    document.getElementById("videodesc").innerText = `${text.description}`
    document.getElementById("watchvideo").src = `${text.videoURL}`
    console.log(document.getElementById("watchvideo").src)
    });
}

async function uploadvideo() {
  let title = document.getElementById("titleup").value
  let desc = document.getElementById("descup").value
  let videolocation = document.getElementById("filevideo").value
  const video = document.getElementById("filevideo").files[0];
  let thumblocation = document.getElementById("filevideo").value
  const thumb = document.getElementById("filethumb").files[0];
  if (title.length > 0) {
    if (profanity.some(v => title.includes(v))) {
      alert("Not so fast! Profanity is not allowed on this website.");
    } else {
      if (profanity.some(v => desc.includes(v))) {
      alert("Not so fast! Profanity is not allowed on this website.");
    } else {
      if (videolocation.length < 1) {
        alert("Upload the video to the first Choose File to upload to upload a video.");
      } else {
        document.getElementById("upload").style.display = "none";
        document.getElementById("uploadingvideo").style.display = "block";
        const uploadURL = await websim.upload(video);
        const user = await window.websim.getCurrentUser().username;
        if (thumblocation.length > 0) {
          const thumbURL = await websim.upload(thumb);
          let UUID = uuidv4();
          const videodatabase = await room.collection("videos").create({
            title: title,
            description: desc,
            videoURL: uploadURL,
            thumbnailURL: thumbURL,
            timestamp: date,
            videoid: UUID,
            uploader: user
          })
          document.getElementById("uploadingvideo").style.display = "none";
          document.getElementById("videos").style.display = "block";
        } else {
          let UUID = uuidv4();
          const videodatabase = await room.collection("videos").create({
            title: title,
            description: desc,
            videoURL: uploadURL,
            thumbnailURL: "https://5bm08yvyyfv3mxxfs20r.c.websim.com/default.png",
            timestamp: date,
            videoid: UUID,
            uploader: user
          })
          document.getElementById("uploadingvideo").style.display = "none";
          document.getElementById("videos").style.display = "block";
        }
      }
    }
    }
  } else {
    alert("Add a title before uploading!")
  }
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

loadvideos();

//Dont look below this if you wanna protect your eyes (a ton of profanity is below this. its used to filter, but in source code civilization nobody jumps for the hide text [because it probably aint possible atleast to my knowledge])

const profanity = [ //Filtering Profanity
        'fuck', 'shit', 'bitch', 'ass', 'damn', 'crap', 'piss', 'dick', 'cock', 'pussy',
        'whore', 'slut', 'bastard', 'nigger', 'faggot', 'retard', 'gay', 'homo', 'lesbian',
        'tits', 'boobs', 'vagina', 'penis', 'sex', 'porn', 'nude', 'naked', 'orgasm',
        'cum', 'jizz', 'masturbate', 'dildo', 'vibrator', 'condom', 'viagra', 'horny',
        'anal', 'oral', 'blowjob', 'handjob', 'threesome', 'gangbang', 'bondage', 'bdsm',
        'rape', 'molest', 'abuse', 'violence', 'kill', 'murder', 'suicide', 'death',
        'drug', 'cocaine', 'heroin', 'meth', 'weed', 'marijuana', 'alcohol', 'drunk'
];