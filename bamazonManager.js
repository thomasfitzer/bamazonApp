var mysql = require('mysql');
var inquirer = require('inquirer')
var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'bamazon'
})
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
//   console.log(showProducts());
console.log(lowInventory());
// chooseOption();
});
//Was trying to get a prompt that would allow a manager to choose an option, kept getting an
//"unexpected token" error on the line 29 ".then(function(res))"
// function chooseOption(){
//     inquirer
//         .prompt([
//             {
//             name: "option",
//             type: "list",
//             message: "Which function would you like to perform?",
//             choices: ["View Inventory", "View Products Running Low", "Add to Inventory", "Add New Product", "Exit"]
//             }
//         ])
//         .then(function(res) {
//         switch (res.choice) {
//           case ("Exit"):
//             connection.end();
//             return;
//           case ("View Inventory"):
//             showProducts();
//             break;
//           case ("View Products Running Low"):
//             lowInventory();
//             break;
//           case ("Add to Inventory"):
//             addInventory();
//             break;
//           case ("Add New Product"):
//             addProduct();
//             break;
//         }
//       });
// }


//This would show the products to the manager if the "View Inventory" option was selected. This works, and it 
//was easy to just copy and paste this code from the "bamazonCustomer.js".
function showProducts() {
    var query = 'SELECT item_id, product_name, price, stock_quantity FROM products';
    connection.query(query, function(err, res){
        console.log("\nWelcome to Bamazon Manager!\n=============================================");
        for (var i = 0; i < res.length; i++) {
            
                console.log(`Item ID: ${res[i].item_id} | Product Name: ${res[i].product_name} | Price: $${res[i].price} | Quantity in Stock: ${res[i].stock_quantity}`);
        }
            console.log('===================');
            
            
            
        
    });
}

//This one also worked, as it would allow the manager to view any products with a quantity below 5.
function lowInventory() {
    var query = 'SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity < 5';
    connection.query(query, function(err, res){
        console.log("\nHere are the products that are low on quantity.");
        for (var i = 0; i< res.length; i++) {
            console.log(`Item ID: ${res[i].item_id} | Product Name: ${res[i].product_name} | Price: $${res[i].price} | Quantity in Stock: ${res[i].stock_quantity}`) 
        }
        console.log('=====================')
        //PUT OPTION TO ADD INVENTORY SOMEWHERE
    });
}

// //Never really got going on this one, still more work to do.
// function addInventory() {
//     var query = 'SELECT item_id, product_name, price, stock_quantity FROM products';
//     connection.query(query, function(err, res){
//         console.log("\nSelect which products you would like to add stock to.");
        
//         console.log('=====================')
// };


// Challenge #2: Manager View (Next Level)
// Create a new Node application called bamazonManager.js. Running this application will:
// List a set of menu options:
// View Products for Sale
// View Low Inventory
// Add to Inventory
// Add New Product
// If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
// If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
// If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
// If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
// If you finished Challenge #2 and put in all the hours you were willing to spend on this activity, then rest easy! Otherwise continue to the next and final challenge.