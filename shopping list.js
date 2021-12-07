// let qr_list = [];
// const item_list = document.querySelector(`#items`);
// const cart_list = document.querySelector(`#cart`);
// const total = document.querySelector(`#total`);

// // פונקציה ליצירת ברקוד אקראי שאינו חוזר על עצמו
// function getRandom(min, max) {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// }

// function getRandomCode(size) {
//   let string = [];
//   for (let i = 0; i < size; i++) {
//     string.push(getRandom(0, 9));
//   }
//   return string;
// }

// let qr_cons = () => {
//   let txt = "",
//     lng = qr_list.length;
//   while (qr_list.length != lng + 1) {
//     txt = getRandomCode(6).join("");
//     if (!qr_list.includes(txt)) {
//       qr_list.push(txt);
//       return txt;
//     }
//   }
// };

// let li = ``,
// html1 = ``,
// html2 = ``,
// html3=0;
// //פונקציה לבניית רשימת פריטים

//   // items
// let li_cons_item = (v) => {
// html1 += `<li id= ${v.name} onclick= "add_to_cart(id)">   
// ${v.name} | ${v.price}${`₪`}
//  </li>`;
// };

// // cart
// let li_cons_cart = (v) => {
// html2 += `<li id= ${v.name} ondblclick= "delete_from_cart(id)">
// ${v.name} | ${(v.price*v.counter).toFixed(2)}${`₪`}  ${v.counter}${`:כמות`}

// </li>`
// };

// //פונקציה להוספה לעגלה
// let obj 
// add_to_cart = (id) => {
//   obj=items.find((v) => v.name == id);
//   obj.counter++;
//   console.log(obj);
//    bulid_cart_list();
// };

// //יצירת רשימת עגלה עפ״י מונה
// bulid_cart_list = () =>{
// html2=``
// items.forEach(v=> {
// if(v.counter>0){
// li_cons_cart(v);
// };
// });
// cart_list.innerHTML= html2
// calc_total();
// };

// //מחיקה מהעגלה
// delete_from_cart = (id) => {
// obj=items.find(v => v.name == id);
// obj.counter--
// bulid_cart_list();
// };


// //חישוב סה״כ סכום
// calc_total = (v) =>{
//     html3=0
//     items.forEach(v=> {
//         if(v.counter>0){
//       html3+= (v.counter*v.price);
//         };
//         });
//         total.innerHTML= `${html3.toFixed(2)}${`₪`}`
// };

// //------------------------------------------//

// //Data Base
// let items = [
//   { name: `Milk`, price: `5`, qr: qr_cons(), category: `milky`, counter: 0 },
//   { name: `Bamba`, price: `2.4`, qr: qr_cons(), category: `snack`, counter: 0 },
//   { name: `Cheese`, price: `3`, qr: qr_cons(), category: `milky`, counter: 0 },
//   { name: `Meat`, price: `60`, qr: qr_cons(), category: `fleshy`, counter: 0 },
//   {
//     name: `Chicken`,
//     price: `38.2`,
//     qr: qr_cons(),
//     category: `fleshy`,
//     counter: 0,
//   },
// ];

// //Start code
// items.forEach((v) => li_cons_item(v,`items`));
// console.log(item_list);

// //לסדר את הכפתור + במיקום הנכון
// TODO: 
// item_list.innerHTML = html1 + `<button class="add_btn">&#43;</button>`;

// console.table(items);

let qr_list = [];
let html3 = 0;
const item_list = document.querySelector('#items');
const cart_list = document.querySelector('#cart');
const total = document.querySelector(".total");
// יחידני פונקציות חישוב ברקוד 
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getRandomCode(size) {
  let string = []
  for (let i = 0; i < size; i++) {
    string.push(getRandom(0, 9))
  }
  return string
}

let qr_cons = () => {
  let txt = "", lng = qr_list.length
  while (qr_list.length != lng + 1) {
    txt = (getRandomCode(6)).join("")
    if (!qr_list.includes(txt)) {
      qr_list.push(txt)
      return txt
    }
  }
}
//בניית רשימת פריטים
let li = "", html1 = "", html2 = ""
let li_cons_item = (v) => {//בונה רשימת פריטים
  html1 += `
  <tr id=${v.name} onclick="add_to_cart(id)" >
  <td><li><strong>  ${v.name} |</strong></li></td>
  <td>${v.price}</td>
  <td> ₪ </td>
  </tr>
  `
}

let li_cons_cart = (v) => {//בונה פריט לרשימת עגלה
  html2 += `
    <tr id=${v.name} ondblclick="delete_from_cart(this.id)" >
    <td><strong> ${v.name} </strong></td>
    <td>|   ${(v.price * v.counter).toFixed(2)} ₪ </td> 
    <td>[${v.counter + "]:כמות "} </td> 
    </tr>`;
}


//יצירת ארוע של לחיצה על פריט
let obj
add_to_cart = (id) => {//הוספת פריטים מרשימת הקניות
  obj = items.find(v => v.name == id);
  if (obj.counter == 0) {// הוספת זמן ההוספה הראשונית לעגלה
    obj.updete = new Date().getTime()
  }
  obj.counter++
  build_cart_list()
  storageDb()
};

build_cart_list = () => {///בניית רשימת עגלה מבוסס מונה
  html2 = ""
  items.sort((a, b) => { return a.updete - b.updete })// סידור הרשימה של האובייקטים על פי "updeate" רכישה
  items.forEach(v => {
    if (v.counter > 0) {
      li_cons_cart(v)//עדכון משתנה פנימי של ul לקראת הוספתו 
    }
  })
  cart_list.innerHTML = `<table> ${html2} </table>`
  calc_total()
}

delete_from_cart = (id) => {//מחיקה מהעגלה בשתי לחיצות
  obj = items.find(v => v.name == id)
  obj.counter--
  if (obj.counter == 0) {// " לאיפוס זמן ההוספה לעגלה- המוצר כבר לא "מוכר"
    obj.updete = 0
  }
  storageDb();
  build_cart_list(obj);
}


calc_total = () => {//חישוב הסך הכולל של הקניה
  html3 = 0
  items.forEach(v => {
    if (v.counter > 0) {
      html3 += (v.counter * v.price)
    }
  })
  total.innerHTML = `${html3.toFixed(2)} ₪`
}

//פונקציית איכסון נתונים 
let storageDb = ()=>{
  items.sort((a, b) => { return a.qr - b.qr })
  localStorage.items = JSON.stringify(items)
};

// פונקציית חילוץ נתונים לאיכסון
let updeteItems = ()=>{
items = JSON.parse(localStorage.items)
};



//להוסיף את פונקציות ההסופה והמחיקה למפתחות באובייקט ולשנות בהתאם את הli
//-----------------------------------------------------------//
//var defined
let items = [];

//start
TODO: //לסדר את הפקודות הבאות בפונקציה שתעבוד כל פעם לאחר הוספת מוצר
// עדכון מערך הפריטים תוך לוקאל סטורג׳

updeteItems();
items.forEach(v => li_cons_item(v, "items"));
build_cart_list();
TODO: //לסדר את כפתור הפלוס בעבודה עברית
item_list.innerHTML = ` <table>${html1}</table><button id="add_btn" class='add_btn'>&#43;</button>`
//  storageDb();

document.getElementById("add_btn").addEventListener("click", function(){
  document.querySelector(".bg-modal").style.display= "flex"
})

document.querySelector(".close").addEventListener("click", function(){
  document.querySelector(".bg-modal").style.display= "non"
})

