let mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'password',
  database: 'bamazon',
});
var nodeSql = require('nodesql');
var db = nodeSql.createMySqlStrategy(connection);

var inquirer = require("inquirer");

let result;
let selection;
let quantity;


db.query('SELECT * FROM products', function (err, rows) {
  if (!err) {
    result = rows;
    //console.log(rows);
    for (i = 0; i < rows.length; i++) {
      console.log("\n" + "Item ID: " + rows[i].item_id);
      console.log("Name: " + rows[i].product_name);
      console.log("Department: " + rows[i].department_name);
      console.log("Price: " + "$" + rows[i].price);
      console.log("Available: " + rows[i].stock_quantity);
    }

    inquirer.prompt([{
          name: 'item_select',
          message: 'Enter Item ID of Desired Product: ',
        },
        {
          name: 'quantity_select',
          message: "Enter Desired Quantity: "
        }
      ])
      .then(answers => {
        selection = Number(answers.item_select) - 1;
        quantity = Number(answers.quantity_select);

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
                result[selection].stock_quantity -= quantity;
                let remain = result[selection].stock_quantity;
                console.log("Remaining product in stock: " + remain);

                //Update SQL Database
                  db.query("UPDATE products SET stock_quantity = "+remain+" WHERE item_id = "+result[selection].product_name, function (err, result) {
                    if (err) console.log(err);
                  });

              }
              break;

            case 'n':
              console.log("Sorry - we must have gotten something mixed-up. Please try again.")
              break;

            default:
              console.log("We've encountered an error - exiting");



          }
        });
      });




  } else {
    console.log("An Error Occured");
    console.log(err);
  }
  connection.end();
});