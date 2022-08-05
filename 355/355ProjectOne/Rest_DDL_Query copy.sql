USE restaurant

--View

SELECT * FROM unassignedChefs AS `No Recipe Chefs`;

--Function

SELECT costOfRest(CURDATE()) AS `Restaurant Profit/Loss`;

--Procedure

CALL taxEvasion(CURDATE(), @output);
SELECT @output AS `Taxes Done?`;


--Query One Recipes that dont generate money

SELECT Distinct Recipe.Recipe_Name AS `Recipe`, SUM(Recipe.priceSold - ((Ingredients.quantity * Inventory.costPerUnit) + (Recipe.timeUsed * Chef.hourlyRate))) AS `Money Loss`
FROM Recipe
JOIN Ingredients ON Ingredients.RecipeID = Recipe.RecipeID
JOIN Inventory ON Inventory.InventoryID = Ingredients.InventoryID
JOIN Chef ON Chef.ChefID = Recipe.ChefID
GROUP BY Recipe.Recipe_Name
HAVING SUM(Recipe.priceSold - ((Ingredients.quantity * Inventory.costPerUnit) + (Recipe.timeUsed * Chef.hourlyRate))) < 0;

--Query Two Activate Menu

Update Menu
Set activeStatus = 1
Where Menu_name = 'Sunday Brunch' AND activeStatus = 0 AND MenuID = '001';

--Query Three Grabs all Recipes and the corresponding menu

(SELECT Recipe.Recipe_Name AS `Recipe`, Menu.Menu_name AS `Menu`
From Recipe 
RIGHT JOIN Menu 
ON Menu.RecipeID = Recipe.RecipeID) 
UNION
(SELECT Recipe.Recipe_Name, Menu.Menu_name 
From Recipe 
LEFT JOIN Menu 
ON Menu.RecipeID = Recipe.RecipeID);

--Query Four Any Inventory not used in Recipes

SELECT  Inventory.nameIngredient,  Inventory.amount, Inventory.unit
FROM Inventory
WHERE Inventory.InventoryID NOT IN 
(
    SELECT Ingredients.InventoryID
    FROM Ingredients
);


--Query Five Any Recipes Not Used In Menu

SELECT Recipe.Recipe_name, Recipe.RecipeID
FROM Recipe
WHERE NOT EXISTS
(
    SELECT Menu.RecipeID
    FROM Menu
  	WHERE Menu.RecipeID = Recipe.RecipeID
);


