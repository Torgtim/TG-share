const feed = document.getElementById("feed");

const files = [
 {name:"Example image.png"},
 {name:"Example video.mp4"},
 {name:"Example music.mp3"}
];

files.forEach(f=>{
 feed.innerHTML += `
 <div class="card">
   <p>${f.name}</p>
   <button>⬇ Download</button>
   <button>🚩 Report</button>
 </div>
 `;
});
