function share(){

let username=document.getElementById("username").value
let file=document.getElementById("fileInput").files[0]

if(!username || !file){
alert("Velg navn og fil")
return
}

let url=URL.createObjectURL(file)

let feed=document.getElementById("feed")

feed.innerHTML=
`
<div class="card">
<h3>${username}</h3>
<p>${file.name}</p>
<a href="${url}" target="_blank">👀 Watch</a>
<br>
<a href="${url}" download>⬇ Download</a>
</div>
`
+feed.innerHTML

}
