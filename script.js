const PROJECT_URL = "https://grmuakqenogqjycfhxjy.supabase.co"
const PUBLIC_KEY = "sb_publishable_Xn2n0aNdbaIyE3_HCyA2Tw_7hdHHwIZ"

const supabase = window.supabase.createClient(PROJECT_URL, PUBLIC_KEY)

const feed = document.getElementById("feed")

async function upload(){

const username = document.getElementById("username").value
const file = document.getElementById("file").files[0]

if(!username || !file){
alert("Velg navn og fil")
return
}

const path = Date.now()+"_"+file.name

await supabase.storage.from("files").upload(path,file)

const { data } = supabase.storage.from("files").getPublicUrl(path)
const url = data.publicUrl

await supabase.from("files").insert([
{
username: username,
filename: file.name,
fileurl: url
}
])

loadFeed()

}

async function loadFeed(){

const { data } = await supabase
.from("files")
.select("*")
.order("created_at",{ascending:false})

feed.innerHTML=""

data.forEach(file=>{

let preview=""

if(file.fileurl.match(/\.(jpg|png|gif|webp)$/i)){
preview=`<img src="${file.fileurl}" style="max-width:100%">`
}
else if(file.fileurl.match(/\.(mp4|webm)$/i)){
preview=`<video controls style="max-width:100%">
<source src="${file.fileurl}">
</video>`
}
else{
preview="📁 File"
}

feed.innerHTML += `
<div class="card">
<h3>${file.username}</h3>
${preview}
<p>${file.filename}</p>
<a href="${file.fileurl}" target="_blank">👀 Watch</a>
<br>
<a href="${file.fileurl}" download>⬇ Download</a>
</div>
`
})

}

loadFeed()
