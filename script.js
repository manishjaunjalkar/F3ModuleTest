
const btn = document.getElementById("data-btn");
const lat = document.getElementById("lat");
const long = document.getElementById("long");
const city = document.getElementById("city");
const region = document.getElementById("region");
const organisation = document.getElementById("org");
const hostname= document.getElementById("hostname");

const timezone= document.getElementById("time");
const date = document.getElementById("date");
const pincode= document.getElementById('pincode');
const msg = document.getElementById("msg");

const myContainer = document.getElementById("myContainer");

const postOfficeContainer = document.getElementById("postoffice-container");
let search = document.getElementById("searchforname");
let postArr=[];

const loader =document.getElementById("loader");
var IP;

fetch('https://api.ipify.org?format=json')
.then((response)=> response.json())
.then((data)=>{
    if(data){
        loader.style.display="none";
    }
    console.log(data.ip);
    IP= data.ip;
    document.getElementById("ip").innerText= data.ip;

})
.catch((e)=>{
    console.log("errorr in fetching data", e);
})

function func1(){
console.log("working");
setTimeout(() => {
  
    fetch(`https://ipinfo.io/${IP}/?token=94947f889e7618`)
    .then((response)=> response.json())
    .then((data)=>{
        console.log("data", data);
        if(data){
            
        }
       const arr= data.loc.split(',');
       lat.innerHTML=`<strong>Lat : ${arr[0]} </strong>`;
       long.innerHTML=`<strong>Long : ${arr[1]} </strong>`;
       city.innerHTML=`<strong>City : ${data.city}</strong>`;
       region.innerHTML=`<strong>Region : ${data.region}</strong>`;
       organisation.innerHTML=`<strong>Organisation : ${data.org}</strong>`;
       hostname.innerHTML=`<strong>Hostname : ${data.hostname}</strong>`;


       frame.setAttribute('src',`https://maps.google.com/maps?q=${arr[0]},${arr[1]}&hl=en&z=14&amp&output=embed`);
       let datetime_str = new Date().toLocaleString("en-US", { timeZone: `${data.timezone}` });
       
        timezone.innerHTML=`<strong>Timezone : ${data.timezone}</strong>`;
        date.innerHTML=`<strong>Date And Time : ${datetime_str}</strong>`;
        pincode.innerHTML=`<strong>Pincode : ${data.postal}</strong>`;
        msg.innerHTML=`<strong>Message : </strong>  <span>No of pincode(s) found:  </span>`;
       
        postOffice(data.postal);
    })
    .catch((e)=>{
        console.log("error",e);
    })
    

}, 1000);

btn.style.display="none";
myContainer.style.display="flex";
}


function postOffice(pincode){

    fetch(`https://api.postalpincode.in/pincode/${pincode}`)
    .then((response)=>response.json())
    .then((data)=>{
        console.log("pin-data", data[0]);
            console.log(data[0].PostOffice);
            postArr= data[0].PostOffice;
            msg.innerHTML=`<strong>Message : </strong>  <span>No of pincode(s) found:${data[0].PostOffice.length}  </span>`;
            showPost(postArr); 

        
    })
    .catch((e)=>{
        console.log("error",e);
    })

}

function showPost(Arr){
    postOfficeContainer.innerHTML="";
    let innerHtml = " ";
    Arr.map((element)=>{
        innerHtml += `<div class="post-content">
        <div><strong>Name:</Strong> ${element.Name}</div>
        <div><strong>Branch Type:</Strong> ${element.BranchType}</div>
        <div><strong>Delivery Status:</Strong> ${element.DeliveryStatus}</div>
        <div><strong>District:</Strong> ${element.District}</div>
        <div><strong>Division:</Strong> ${element.Division}</div>
       </div>`
    })
    postOfficeContainer.innerHTML=innerHtml

}

search.addEventListener('input',()=>{
    var filterArr = postArr.filter((every)=>{
        if(every.Name.toLowerCase().includes(search.value.trim().toLowerCase()) || every.BranchType.toLowerCase().includes(search.value.trim().toLowerCase())){
            return every;
        }
    })
    showPost(filterArr);
})