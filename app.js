let mysql = require('mysql');
let nodeSql = require('nodesql');
let inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'bamazon',
});

var db = nodeSql.createMySqlStrategy(connection);

let result;

db.query('SELECT * FROM products', function (err, rows) {
    if (!err) {
        result = rows;
        listAll();
        question1();
    }
});

function listAll () {
    for (i = 0; i < result.length; i++) {
        console.log("\n" + "Item ID: " + result[i].item_id);
        console.log("Name: " + result[i].product_name);
        console.log("Department: " + result[i].department_name);
        console.log("Price: " + "$" + result[i].price);
        console.log("Available: " + result[i].stock_quantity);
    }
}

function question1() {
    inquirer.prompt([{
        name: 'item_select',
        message: 'Enter Item ID of Desired Product: ',
    },
    {
        name: 'quantity_select',
        message: "Enter Desired Quantity: "
    }
    ]).then(answers => {
    selection = Number(answers.item_select) - 1;
    quantity = Number(answers.quantity_select);
    confirm();
    });
}

function confirm() {
    inquirer.prompt([{
        name: 'confirm',
        message: "You would like to buy " + quantity + " " + result[selection].product_name + "(s)? [Y/N]",
        validate: function (value) {
          let regex = /[Y,y,N,n]/g;
          var pass = value.match(regex);
          if (pass) {
            return true;
          } else {
            return "Please enter 'Y' for 'Yes' or 'N' for 'No'";
          }
        }
      }]).then(answers => {
        let raw_response = answers.confirm;
        let response = raw_response.toLowerCase();
        switch (response) {
          case 'y':
            if (quantity > result[selection].stock_quantity) {
              console.log("Error - innsuficent product in stock");
            } else {
              let newQuant = result[selection].stock_quantity - quantity;
              console.log("Remaining product in stock: " + newQuant);
              selection++;
              //db.update('bamazon', { stock_quantity: newQuant }, { item_id: selection }, function (err) {});
              db.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?', [newQuant, selection], function (err) {if(err){console.log(err)}});

            }
            break;

          case 'n':
            console.log("Sorry - we must have gotten something mixed-up. Please try again.")
            break;

          default:
            console.log("We've encountered an error - exiting");
        }
      });
}