Create table Products(
Id_product serial PRIMARY KEY,
Name_product text not null,
Count_available int not null,
fkey_category int not null,
Foreign key (fkey_category) References Category_of_product (Id_category)
);
Create table Category_of_product(
  Id_category serial PRIMARY KEY not null,
  Name_category text,
  Unit_of_measurements varchar(4)
);
Create table Purchase(
  Id_purchase serial PRIMARY KEY not null,
  Price_purchase int not null,
  Date_of_supply date not null,
  Count_of_purchase_products int not null,
  fkey_product int,
  FOREIGN KEY (fkey_product) REFERENCES Products (Id_product)
);
Create table Cooking(
  Id_cooking serial PRIMARY KEY not null,
  Count_of_use_products int not null,
  fkey_dish int not null,
  fkey_product int not null,
  FOREIGN KEY (fkey_product) REFERENCES Products (Id_product),
  FOREIGN KEY (fkey_dish) REFERENCES Dish (Id_dish)
);
Create table Dish(
  Id_dish serial PRIMARY KEY not null,
  Name_dish text not null,
  Price_Dish int not null
);


-- CREATE or REPLACE FUNCTION trig_fun_dish() RETURNS TRIGGER as $$
-- DECLARE
-- col int;
-- begin
-- col := (select count_available from Products where Name_product = new.name_product);
--
-- if col != 0 then
-- update Products set Count_available = col-1 where Name_product = new.name_product;
-- end if;
-- RETURN NEW;
-- end;
-- $$ LANGUAGE 'plpgsql';


create or REPLACE function three_insert(name CHARACTER VARYING, name_pr CHARACTER VARYING, amount_pr INT) returns void
LANGUAGE plpgsql
AS $$
DECLARE
    fk_prod int;
    fk_dish int;
    col_pr int;
BEGIN
  fk_dish:= (SELECT id_dish FROM Dish WHERE Name_dish = name);
  fk_prod:= (SELECT Id_product FROM Products WHERE Name_product = name_pr);
  col_pr:= (SELECT Count_available FROM Products WHERE Name_product = name_pr);
  UPDATE Products set Count_available = col_pr - amount_pr WHERE Name_product = name_pr;
  INSERT INTO Cooking(Count_of_use_products, fkey_dish, fkey_product) VALUES (amount_pr, fk_dish, fk_prod);
  END;
$$;



create or REPLACE function purchase_add(name CHARACTER VARYING,col int) returns void
LANGUAGE plpgsql
AS $$
DECLARE
  product_id int;
  count_product int;
  price int;
  date date;
BEGIN
  product_id:=(SELECT Id_product FROM Products WHERE Name_product = name);
  count_product:=(SELECT Count_available FROM Products WHERE Name_product = name);
    UPDATE Products set Count_available = count_product+col WHERE Name_product = name;
  price:= col*10;
  date:= current_date;
  INSERT INTO Purchase(Price_purchase,Date_of_supply,Count_of_purchase_products, fkey_product) VALUES (price,date,col,product_id);
  END;
$$;



SELECT name_product, SUM(count_of_use_products), count(Count_of_use_products) FROM Cooking LEFT JOIN Products ON fkey_product = Id_product GROUP BY Name_product;
















