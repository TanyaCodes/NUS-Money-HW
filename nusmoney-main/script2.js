// (c) Anuflora Systems 
const balance = document.getElementById('balance');
const money_plus = document.getElementById('deposit');
const money_minus = document.getElementById('loan');
const list = document.getElementById('list');
const form = document.getElementById('form');
const custname = document.getElementById('custname');

const reco = document.getElementById('reco');
const b1 = document.getElementById('b1');
const b2 = document.getElementById('b2'); 

//usually comes from a Bank API, a bank end
//below is not a json object, JSON object is all in strings
const TransactionDataAll = [
   { id: 1, customername: 'Flora', bank: 'DBS', deposit: 3000, loan: 2000 },
   { id: 2, customername: 'Flora', bank: 'OCBC', deposit: 4000, loan: 2000 },
   { id: 3, customername: 'Mikhil', bank: 'DBS', deposit: 3000, loan: 2000 },
   { id: 4, customername: 'Sashil', bank: 'UOB', deposit: 6000, loan: 1000 },
   { id: 5, customername: 'Jack', bank: 'UOB', deposit: 6000, loan: 8000 },
   { id: 6, customername: 'Jill', bank: 'UOB', deposit: 7000, loan: 4000 },

  ];

 var TransactionData = null; //intermediate data to call the same data above

// Add transactions to DOM list
function addTransactionDOM(transaction) {

//HOMEWORK #1 - BALANCES FOR EACH CUSTOMER
  const bal_item = document.createElement('li');

  bal_item.classList.add('bal');
  bal_item.innerHTML = `
  ${transaction.customername}-${transaction.bank} <span> -$ ${Math.abs(
   transaction.deposit - transaction.loan  
  )}</span> 
  `; 
  list.appendChild(bal_item);
}

// Update the balance, deposit and loan
function updateValues() {
  const deposits = TransactionData.map(transaction => transaction.deposit); //returns an array of the deposits
  const loans = TransactionData.map(transaction => transaction.loan); //returns an array of the deposits
  const total_deposit = deposits.reduce((acc, item) => (acc += item), 0).toFixed(2);
  const total_loan = loans.reduce((acc, item) => (acc += item), 0).toFixed(2); //acc is accumulator; every time adds the item, initially zero as indicated in the 0 parameter above
  const bal = total_deposit - total_loan;
  balance.innerText = `$${bal}`;
  money_plus.innerText = `$${total_deposit}`;
  money_minus.innerText = `$${total_loan}`;
  reco.innerText = (bal >= 0)? "You Have Sound Financial Health": "Your Financial Health is Weak";
  var data = [total_deposit, total_loan]; //REPLACE WITH VARIABLES
  
  //creating the SVG container, like a canvas
  var svg = d3.select("article")
    .append('svg')
    .attr("width",500)
    .attr("height",50);
  
  //binding the data and drawing the rectangle
  //i is index; d3 implicitly knows that the first argument is the array element, and the second is the index; optional third parameter is the array (the entire array will be passed into the function)
  svg.selectAll("rect")
    .data(data)
    .enter().append("rect")
    .attr("transform",function(d, i) { return "translate(" + 20 + "," + i*25 + ")"  }) //first data -"transform", translate(20,0)--> translate x axis by 20; second data-> "transform", translate(20,25)
    .attr("fill","blue")
    .attr("height",20)
    .attr("width", function(d) { return d /100 + "px"; }); //"width", 40px, *10 just to make it big enough
  
  //for labels - FIX!!!
  svg.selectAll("text")
  .data(data)
  .enter().append("text")
  .attr("transform",function(d, i) { return "translate(0,"+Number(i*25+15)+")" }) //"translate(0,15)"
  .attr("fill",'red')
  .text(function(d) { return d + "000"  });
  
   //Transition of Graphs
  /*var t = d3.transition()
     .delay(2000).duration(2000);
  d3.selectAll("rect")
     .transition(t)
     .style("fill", "red");
   */ 
  }
  



//initialization
function init() {
  
  list.innerHTML = '';
 // list.innerHTML = '';
  reco.innerHTML = '';
  TransactionData = [...TransactionDataAll]; //copy one array into another array, copying all the transaction data for the initialization
  TransactionData.forEach(addTransactionDOM); //for each row of data, call this function
  updateValues();//to put the sum of all deposits and all loans when the page is initialized
}

//filter for a particular name
function filterTransaction(e) {
  e.preventDefault();  //to prevent form from submitting and refreshing the page or else will go back to original page
  list.innerHTML = '';
  reco.innerHTML = '';
  TransactionData = TransactionDataAll.filter(tran => tran.customername.toUpperCase() == custname.value.toUpperCase());  
  TransactionData.forEach(addTransactionDOM);
  updateValues(); 
}

/* if ((custname = "Jack") && (pwd = "123")) {

  filterTransaction();
} */

init();
//form.addEventListener('submit', filterTransaction);
b1.addEventListener('click',filterTransaction);
b2.addEventListener('click',init);  //no need to call init when no event handler it will reload/referesh the page

