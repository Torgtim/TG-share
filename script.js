function shareFile(){

let name = document.getElementById("username").value;
let file = document.getElementById("fileInput").files[0];

if(!name || !file){
alert("Skriv navn og velg fil");
return;
}

let feed = document.getElementById("feed");

let url = URL.createObjectURL(file);

feed.innerHTML =
`
<div class="card">
<p>👤 ${name}</p>
<p>📁 ${file.name}</p>
<a href="${url}" target="_blank">🔗 Åpne / Last ned</a>
</div>
` + feed.innerHTML;

}
