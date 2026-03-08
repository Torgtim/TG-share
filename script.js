const supabase = window.supabase.createClient(
"https://grmuakqenogqjycfhxjy.supabase.co",
"sb_publishable_Xn2n0aNdbaIyE3_HCyA2Tw_7hdHHwIZ"
)

async function upload(){

let username=document.getElementById("username").value
let file=document.getElementById("file").files[0]

if(!username || !file){
alert("Missing username or file")
return
}

let path=Date.now()+"_"+file.name

await supabase.storage.from("files").upload(path,file)

let {data}=supabase.storage.from("files").getPublicUrl(path)

let url=data.publicUrl

await supabase.from("files").insert([
{
username:username,
filename:file.name,
fileurl:url
}
])

loadFeed()

}

async function loadFeed(){

let {data}=await supabase
.from("files")
.select("*")
.order("created_at",{ascending:false})

let feed=document.getElementById("feed")
feed.innerHTML=""

data.forEach(file=>{

feed.innerHTML+=`
<div class="card">
<p>👤 ${file.username}</p>
<p>📁 ${file.filename}</p>
<a href="${file.fileurl}" target="_blank">Watch</a>
<br>
<a href="${file.fileurl}" download>Download</a>
</div>
`

})

}

loadFeed()
