console.log("scripting active!");

class Person {
    name;
    age;
    email;

    constructor(name, age, email) {
        this.name = name;
        this.age = age;
        this.email = email;
    }
}

let per1 = new Person ("sue", 32, "sue@1234.com");

console.log(per1.name + " is " + per1.age + " years old and her email is " 
    + per1.email + ".");
