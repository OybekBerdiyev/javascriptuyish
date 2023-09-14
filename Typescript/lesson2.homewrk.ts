// class Rectangle {
//     name:number;
//     age:number;
//     constructor(name:number,age:number) {
//         this.name = name
//         this.age = age
//     }

//     yuza ():number {
//         const result:number = this.name * this.age
//         return result
//     }
// }

// const rectangle = new Rectangle (2,4);

// console.log(rectangle.yuza());

// class Person {
//     name:string;
//     gender:string;
//     age:number;
//     constructor(name:string,age:number, gender:string) {
//         this.name = name
//         this.gender = gender
//         this.age = age
//     }

//     about():string {
//         const data:string = `Name: ${this.name}\nAge: ${this.age}\nGender: ${this.gender}` 
//         return data
//     }
// }

// class Person {
//     name:string;
//     gender:string;
//     age:number;
//     constructor(name:string,age:number, gender:string) {
//         this.name = name
//         this.gender = gender
//         this.age = age
//     }

//     about():string {
//         const data:string = `Name: ${this.name}\nAge: ${this.age}\nGender: ${this.gender}` 
//         return data
//     }
// }

// const person = new Person ('Alex',15,'male');

// console.log(person.about());


// class Person {
//     name:string;
//     gender:string;
//     age:number;
//     constructor(name:string,age:number, gender:string) {
//         this.name = name
//         this.gender = gender
//         this.age = age
//     }

// }

// class Student extends Person {
//     ball: number 
//     constructor(ball:number,name:string,age:number, gender:string) {
//         super(name,age, gender);
//         this.ball = ball
//     }
//     about():string {
//         const data:string = `Name: ${this.name}\nAge: ${this.age}\nGender: ${this.gender}\nBall: ${this.ball}` 
//         return data
//     }
// }

// const student = new Student (5,'Alex',15,'male');

// console.log(student.about());


// class Book {
//     author: string;
//     title: string;
//     publicyear: string;

//     constructor(author: string, title: string, publicyear: string) {
//         this.author = author;
//         this.title = title;
//         this.publicyear = publicyear;
//     }

//     year() {
//         const now: Date = new Date();
//         const publishedYear: Date = new Date(this.publicyear);
//         const yearsAgo: number = now.getFullYear() - publishedYear.getFullYear();
//         const result = `Author: ${this.author}\nPublished ${yearsAgo} years ago`;
//         return result;
//     }
// }

// const book = new Book("Oybek", "Yulduzli tunlar", '2021-09-13T12:20:54.472Z');

// console.log(book.year());

function countCaseLetters(str: string): { uppercaseCount: number, lowercaseCount: number } {
    let uppercaseCount: number = 0;
    let lowercaseCount: number = 0;

    for (let i = 0; i < str.length; i++) {
        if (str[i] >= 'A' && str[i] <= 'Z') {
            uppercaseCount++;
        } else if (str[i] >= 'a' && str[i] <= 'z') {
            lowercaseCount++;
        }
    }

    return { uppercaseCount, lowercaseCount };
}

function printSquareNumbers(a: number, b: number): void {
    for (let i = a; i <= b; i++) {
        const square = Math.sqrt(i);
        if (square % 1 === 0) {
            console.log(i);
        }
    }
}

function calculateAverages(numbers: number[]): number[] {
    const positiveNumbers = numbers.filter(num => num > 0);
    const average = positiveNumbers.reduce((sum, num) => sum + num, 0) / positiveNumbers.length;
    const result = positiveNumbers.map(num => average / num);

    return result;
}

const numbers = [1, 2, 3, -1, -2, 0];
const averages = calculateAverages(numbers);
console.log(averages);