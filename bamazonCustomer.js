//These first two lines just input the JSON packages "mysql" and "inquirer"
var mysql = require('mysql');
var inquirer = require('inquirer')
//This actually connects this JS to mySQL
var connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'bamazon'
})
//The initial connection, also tells you that you successfully connected, and runs the "showProducts" function on startup
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  showProducts();
});
//The actual function that shows the products available.
function showProducts() {
    var query = 'SELECT item_id, product_name, price FROM products';
    connection.query(query, function(err, res){
        console.log("\nWelcome to Bamazon, Your One Stop Shop for All Your Party Needs!\n=============================================");
        for (var i = 0; i < res.length; i++) {
            
                console.log(`Item #: ${res[i].item_id} | Product Name: ${res[i].product_name} | Price: $${res[i].price}`);
        }
            console.log('----------');
            buyProduct();
            
            
        
    });
}
//This allows the user to actually purchase a product
function buyProduct() {
    inquirer
        .prompt([ //Asks the user to input the id number from  the list of products.
            {
                type: 'input',
                message: "What is the ID number of the product you wish to buy?",
                name: "id",
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            { //Allows the user to input the number of units they would like to purchase
                name: 'quantity',
                type: 'input',
                message: 'How many units would you like to buy?',
                validate: function(value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function(answer) { //This whole function does the math on the product that the person wanted to purchase, and automatically
            //takes that number of units out of the inventory.
            var query = 'SELECT * FROM products WHERE ?';
            connection.query(query, {item_id: answer.id}, function(err, res) {
                if (err) throw err;
                if (answer.quantity <= res[0].stock_quantity) {
                    var newQuantity = res[0].stock_quantity - answer.quantity;
                    var secondQuery = 'Update products SET ? WHERE ?';
                    connection.query(secondQuery, [{stock_quantity: newQuantity}, {item_id: answer.id}], function(err, res){
                        console.log(answer.id);
                        if(err) throw err;
                    })
                    console.log('Total purchase price = $' + (res[0].price * answer.quantity));
                    console.log('============');
                    console.log('Number of units left: ' + newQuantity);
                    console.log('============');
                    buyAgain();
                }
                else { //If the user enters a number that is too much for the current inventory, it lets them know, then runs the 
                    //buyProduct() function again
                    console.log("Sorry, there is not enough stock in the inventory to complete your order. Please try again.");
                    buyProduct();
                }
            });
        });
}




//This asks the question, but it automatically exits, no matter what option is chosen. I can't figure out why.

function buyAgain() {
    inquirer
        .prompt({
            name: 'moreItems',
            type: 'list',
            message: 'Would you like to buy more products?',
            choices: ["Yes, I must fill my insatiable lust for things.", "No, you capitalist dogs have taken enough of my money."]
        })
        .then(function(inqurierResponse){
            if (inqurierResponse.prompt === "Yes, I must fill my insatiable lust for things.") {
                buyProduct();
            } else {
                process.exit();
            }
        })
}
  









