// let formType = document.querySelector('#formType');
// document.addEventListener('DOMContentLoaded', function(){
//   formType.
// })

let form01
function myFunction(type) {
 if (type === "GST Registration") {
  form01 = type;
 }
 else {
  form01 = null;
 }
}


function privateFunction(val) {

 // if (document.querySelector('#head').innerHTML == "GST Registration") {
 if (document.querySelector('#formType').value === "GST") {
  if (val === "private-limited") {
   document.querySelector('#private').style.display = "block";
   document.querySelector('#others').style.display = "none";
  }
  else {
   document.querySelector('#private').style.display = "none";
   document.querySelector('#others').style.display = "block";
  }
 }
}
//}

