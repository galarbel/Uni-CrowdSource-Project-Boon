

-- login


-- signup


#### catalog ####
-- get list of tags:
SELECT id, name FROM tags;
-- get list of categories:
SELECT id, name FROM category;
-- get list of cities:
SELECT id, name FROM city;

-- get filterd results:
-- **dont yet have images here**
SELECT items.id, items.title, items.description, category.name as category_name, city.name as city_name, items.`date`
FROM items, category, city, item_tags
where title like '%' and description like '%' and city_id = 1 and category_id = 1 and delivered=FALSE
and items.id in (Select it.item_id from item_tags it where it.tag_id in (1,2))
and city.id = items.city_id and category.id=items.category_id and items.id=item_tags.item_id;



#### product details page ####
-- item details
SELECT items.id, items.title, items.description, category.name as category_name, city.name as city_name, items.`date`, users.phone
FROM items, category, city, users
where items.id=1
and city.id = items.city_id and category.id=items.category_id and items.user_id=users.id;

-- gettings tags list per item
select tags.*
from tags, item_tags
where item_tags.tag_id=tags.id and item_tags.item_id=1;


#### Game of Tags page ####
-- add tag

-- get a list of unverified tags
-- TODO: need to decide whats considered an unverified tag
select i.id, c.name, i.title, it.numOfAccept, it.numOfDeny
from item_tags it, items i, category c
where it.user_id <> 1 and it.item_id=i.id and i.category_id=c.id;



#### my account page ####
SELECT id, username, password, phone, email, score
FROM users where id=1;

-- items offered
SELECT items.id, items.title, items.description, category.name as category_name, items.`date`
FROM items, category
where user_id=1
and category.id=items.category_id;

-- items requested

-- publish a product



