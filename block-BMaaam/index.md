writeCode

Insert the data present in users.json into local mongodb database using `mongoimport` into a database called sample and collection named as users.

Write aggregation queries to perform following tasks.

1. Find all users who are active.
   db.users.aggregate([{$match:{isActive:true}}]);

2. Find all users whose name includes `blake` case insensitive.
   db.users.aggregate([{$match:{name:'blake'}}]);

3. Find all males.
   db.users.aggregate([{$match:{gender:'male'}}]);
4. Find all active males.
   db.users.aggregate([{$match:{gender:'male',isActive:true}}]);

5. Find all active females whose age is >= 25.
   db.users.aggregate([{$match:{gender:'female',isActive:true,age:{$gt:25}}}]);

6. Find all 40+ males with green eyecolor.
   db.users.aggregate([{$match:{gender:'male',eyeColor:'green',age:{$gt:40}}}]);

7. Find all blue eyed men working in 'USA'.
   db.users.aggregate([{$match:{gender:'male',eyeColor:'blue',company:{location:{country:'Usa'}}}}]);

8. Find all female working in Germany with green eyes and apple as favoriteFruit.
   db.users.aggregate([{$match:{gender:'female',eyeColor:'grenn',favoriteFruit:'apple',company:{location:{country:'Germany'}}}}]);

9. Count total male and females.
   db.users.aggregate([{ $group: {
   _id: "$gender",
   count: { $sum: 1 },
   },
   },
   ]);

10. Count all whose eyeColor is green.
    db.users.aggregate([{$match:{eyeColor:'green'}},{$group:{_id:'eyeColor',count:{$sum:1}}}])
    [ { _id: 'eyeColor', count: 330 } ]

11. Count all 20+ females who have brown eyes.
    db.users.aggregate([{$match:{eyeColor:'eyes',age:{$gt:20},gender:'female'}},{$group:{_id:'gender',count:{$sum:1}}}])
12. Count all occurences of all eyeColors.
    Something like:-

```
blue -> 30
brown -> 67
green -> 123
```

db.users.aggregate([{$group:{_id:'$eyeColor',count:{$sum:1}}}])
[
{ \_id: 'brown', count: 337 },
{ \_id: 'green', count: 330 },
{ \_id: 'blue', count: 333 }

13. Count all females whose tags array include `amet` in it.
    db.users.aggregate([{$match:{gender:'female',tags:{$inc:'amet}}},{$group:{_id:'gender',count:{$sum:1}}}])

14. Find the average age of entire collection
    db.users.aggregate([ { $group: { _id: 'age',avg_age: { $avg: "$age" }}} ]);
    [ { _id: 'age', avg_age: 29.835 } ]

15. Find the average age of males and females i.e. group them by gender.
    db.users.aggregate([
    ... {
    ..... $group: {
    ....... _id: "$gender",
    ....... avg_age: { $avg: "$age" },
    ....... },
    ..... },
    ... ]);
    [
    { \_id: 'female', avg_age: 29.81854043392505 },
    { \_id: 'male', avg_age: 29.851926977687626 }

16. Find the user with maximum age.
    db.users.aggregate([{ $group: { _id: null, max_age: { $max: '$age' } } }]);

db.users.aggregate([{$group:{$max:1}}]) 17. Find the document with minimum age.
db.users.aggregate([{ $group: { _id: null, min_age: { $min: '$age' } } }]); 18. Find the sum of ages of all males and females.
db.users.aggregate([
{
$group: {
_id: "$gender",
avg_age: { $avg: "$age" },
},
},
]);

19. Group all males by their eyeColor.
    db.users.aggregate([{$unwind:'$gender'},{$match:{gender:'male'}}]);
20. group all 30+ females by their age.
    db.users.aggregate([{$unwind:'$age'},{$match:{gender:'female',age:{$gt:30}}}]);
21. Group all 23+ males with blue eyes working in Germany.
    db.users.aggregate([{$unwind:'$age'},{$match:{gender:'male',eyeColor:'blue',age:{$gt:23}}}]);
22. Group all by tag names i.e. use \$unwind since tags are array.
    db.users.aggregate([{$unwind:'$tags'}])
23. Group all males whose favoriteFruit is `banana` who have registered before 2015.
    db.users.aggregate([{$unwind:'$registered'},{$match:{gender:'male',favoritefruit:'banana',registered:{$lt:2015}}}]);
24. Group all females by their favoriteFruit.
    db.users.aggregate([{$unwind:'$favoriteFruit'},{$match:{gender:'female'}}])

25. Scan all the document to retrieve all eyeColors(use db.COLLECTION_NAME.distinct);
    db.users.distinct('eyeColor');
26. Find all apple loving blue eyed female working in 'USA'. Sort them by their registration date in descending order.
    db.users.aggregate([{$match:{gender:'female',eyeColor:'blue',favoriteFruit:'apple',company:{location:{country:'USA'}}}},{$sort:{register:1}}])

27. Find all 18+ inactive men and return only the fields specified below in the below provided format

```js
db.users.aggregate([{$match:{isActive:false,}},{$project:{name:1,email:1,identity:{eye:'$eyeColor',phone:'$company.phone',location:'$company.location.country'}}}])
{
  name: "",
  email: '';
  identity: {
    eye: '$eyeColor',
    phone: '',
    location: ''
  }
}
```
