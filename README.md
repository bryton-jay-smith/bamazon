# Bamazon CLI Shopping

Run the app by typing 'node app.js':

![Run Script](./images/run_script.PNG)

It returns a list of available stock:

![](.\images\item_list.PNG)

Enter the ID number of the item you wish to purchase, 

![](.\images\before.PNG)

and it asks for a number of items, and asks returns the name of the item to confirm selection before returning how many items are left in stock:

![](.\images\purchase.PNG)

After a purchase is made, the quantity is updated in MySQL, so the next time the program is run the quantity is updated:

![](.\images\after.PNG)
