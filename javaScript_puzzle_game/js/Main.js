  /**
   * Game class that contains methods for the Game object
   * By Roshan Shah, roshanrupeshkumarshah@gmail.com
   */
  //this is the model
  class Game {
/**
 * This is the constructor for the game class .
 * @param {playerName} playerName 
 * @param {playerAge} playerAge 
 */
      constructor(playerName, playerAge) {
          this.playerName = playerName;
          this.playerAge = playerAge;
          this.list = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6];
          this.shuffleValue = Math.floor(Math.random() * 100 + 10);

      }
      /**
       * returns the list
       * @returns this.list
       */
      getList() {
          return this.list;
      }
      /**
       * this method accepts a list parameter and shuffles it .
       * This list is used to assign images to the <td> and is used to
       * ensure that different images are generated at each reload.
       * @param {a} the list that has to be shuffled 
       * @returns a
       */
      shuffle(a) {
          let j, x, i, z = 0;
          while (z < this.shuffleValue) {
              for (i = a.length - 1; i > 0; i--) {
                  j = Math.floor(Math.random() * (i + 1));
                  x = a[i];
                  a[i] = a[j];
                  a[j] = x;
              }
              z++;
          }
          return a;
      }
      /**
       * Takes in the index value of the list and returns the value stored at that index
       * @param {index} is the index of the list 
       * @returns value at an index
       */
      getListIndexValue(index) {
          return this.list[index];
      }

      /**
       * returns the number of attempts
       * @returns the number of attempts
       */
      getAttempts() {
          return this.attempts;
      }
      /**
       * increases the attempts by one
       */
      increaseAttempt() {
          this.attempts++;
      }
      /**
       * sets the attempts to the value provided in parameter
       * @param {attempts} sets the attempts to this value 
       */
      setAttempts(attempts) {
          this.attempts = attempts;
      }
      /**
       * decreases the number of attempts by one
       * 
       */
      decreaseAttempts() {
          this.attempts--;
      }
      /**
       * sets the intiial victory state to false
       * @returns the victory state
       */
      initialVictoryState() {
          this.won = false;
          return this.won;
      }
      /**
       * sets the initial victory state to true
       */
      victoryStateTrue() {
          this.won = true;

      }
      /**
       * returns the victory state
       * @returns victory state
       */
      getVictoryState() {
          return this.won;
      }
      /**
       * Returns the name of the player
       * @returns name of the player
       */
      getPlayerName() {
          return this.playerName;
      }
      /**
       * Returns the age of player
       * @returns playerAge 
       */
      getPlayerAge() {
          return this.playerAge.value;
      }
      toString() {
          return "<br>Age:  " + this.getPlayerAge() + "<br>Attempts :  " + this.attempts ;
      }


  }
  //end of model
  /**
   * User class that contains the user name, age and color .
   * name and age are then used to create the game object
   */
  class User {
      /**
       * constructor for the user class
       * @param {name} name 
       * @param {age} age 
       * @param {color} color 
       */
      constructor(name, age, color) {
          this.name = name;
          this.age = age;
          this.color = color;
      }
      /**
       * Returns the name of the user
       * @returns name
       */
      getName() {
          return this.name;
      }
      /**
       * Returns the age of the user
       * @returns age
       */
      getAge() {
          return this.age;
      }
        /**
       * Returns the color of the user
       * @returns color
       */
      getColor() {
          return this.color;
      }
  }

  //the view starts from this point...
  /**
   * The load event is fired when the whole page is finished loading.
   * This function makes a game object and uses the Game class method
   * to run the puzzle by listening to mouse clicks
   */
  window.addEventListener("load", function () {


     color=document.getElementById("color");
     formFrame=document.getElementById("formFrame");
     formFrame.style.borderColor= color.value;
     document.getElementById("gameTable").style.borderColor=color.value;
     /**
      * Used to change the color of the border for the form and the game
      */
     color.addEventListener("change",function(){
        formFrame.style.borderColor= color.value;
        document.getElementById("gameTable").style.borderColor=color.value;
    })

      document.getElementById("puzzleFrame").hidden = true;
/**
 * This function gets the name,age and color from the form and creates the user and the game 
 * object
 */
      document.getElementById("generatePuzzle").addEventListener("click", function () {

          name = document.getElementById("name").value;
          age = document.getElementById("age");
          color = document.getElementById("color").value;
          user = new User(name, age, color);
          game = new Game(user.getName(), user.getAge());
          game.initialVictoryState();
          console.log(user.getName() + "hi");
          game.shuffle(game.getList());
          game.setAttempts(10);
          if (game.getPlayerName() !== "" && game.getPlayerAge() !== "") {
              document.getElementById("user").innerHTML = "Name: " + game.getPlayerName() + game.toString();
              document.getElementById("user").className = "newChanged";
              document.getElementById("warning").innerHTML = "";
              document.getElementById("myForm").hidden = true;
              document.getElementById("formFrame").innerHTML = "<h1>Animal Puzzle Generator</h1>";
              document.getElementById("puzzleFrame").hidden = false;


              helpButton = document.getElementById("helpButton");
              helpButton.style.display = "inline";


          } else {
              document.getElementById("warning").innerHTML = "<h2>Please fill the Name and Age  to continue</h2>"

          }
      })



      /**
       * this function changes the help button to a paragraph on mouse over event 
       * to display the instructions
       */

      helpButton.addEventListener("mouseover", function () {
          this.className = "helpChanged";
          this.innerHTML = "<p>Select images using mouse. You only have 10 attempts. Refresh the page to restart</p>";

      })
      /**
       * this function changes the help button to a paragraph on mouse out event 
       * to display Help message
       */
      helpButton.addEventListener("mouseout", function () {
          this.className = "help";
          this.style.display = "inline";
          this.innerHTML = "Help";

      })




      //click  is used to track the first and second click and assign the values to the 
      //variables first and second appropriately
      click = 0;
      //count keeps track of the number of successful attempts
      count = 0;
      //first is a variable used to store the value of the DOM element for comparision
      let first = null;
      //second is a variable used to store the value of the DOM element for comparision
      let second = null;



      /**
       * this function checks if click is greater than 1 and then resets it to 0.
       * @param {click} click  is used to track the first and second click and assign the values to the  variables first and second appropriately
       * @returns click
       */
      function ClickCheck(click) {

          if (click > 1) {
              click = 0;
          }
          return click;
      }

      /**
       * This function makes uses of the setTimeout method to delay the checkAttempt method
       */
      function delayCheckAttempt() {
          setTimeout(checkAttempt, 200);
      }



      let p1 = document.getElementById("p1");
      /**
       * This function stores the image path in a variable depending on the click value and also
       * validates that the two images clicked are not the same 
       */
      p1.addEventListener("click", function () {
          value = game.getListIndexValue(0);
          this.src = generateImages(value);
          ClickCheck();
          if (click == 0) {
              first = this;

              console.log("first assigned" + first);
          } else if (click == 1) {
              second = this;
              if (second != first) {

                  delayCheckAttempt()
              } else {
                  click = 0;

              }
          }
          click++;


      })


      let p2 = document.getElementById("p2");
      /**
       * This function stores the image path in a variable depending on the click value and also
       * validates that the two images clicked are not the same 
       */
      p2.addEventListener("click", function () {
          value = game.getListIndexValue(1);
          this.src = generateImages(value);
          ClickCheck();
          if (click === 0) {
              first = this;

          } else if (click === 1) {

              second = this;
              if (second != first) {

                  delayCheckAttempt()
              } else {
                  click = 0;
              }
          }
          click++;


      })



      let p3 = document.getElementById("p3");
      /**
       * This function stores the image path in a variable depending on the click value and also
       * validates that the two images clicked are not the same 
       */
      p3.addEventListener("click", function () {
          value = game.getListIndexValue(2);
          this.src = generateImages(value);
          ClickCheck();
          if (click === 0) {
              first = this;
          } else if (click === 1) {
              second = this;
              if (second != first) {
                  second.disabled = true;
                  delayCheckAttempt()
              } else {
                  click = 0;
              }
          }
          click++;


      })

      let p4 = document.getElementById("p4");
      /**
       * This function stores the image path in a variable depending on the click value and also
       * validates that the two images clicked are not the same 
       */
      p4.addEventListener("click", function () {
          value = game.getListIndexValue(3);
          this.src = generateImages(value);
          ClickCheck();
          if (click === 0) {
              first = this;
          } else if (click === 1) {
              second = this;
              if (second != first) {
                  second.disabled = true;
                  delayCheckAttempt()
              } else {
                  click = 0;
              }
          }
          click++;


      })
      let p5 = document.getElementById("p5");
      /**
       * This function stores the image path in a variable depending on the click value and also
       * validates that the two images clicked are not the same 
       */
      p5.addEventListener("click", function () {
          value = game.getListIndexValue(4);
          this.src = generateImages(value);
          ClickCheck();
          if (click === 0) {
              first = this;
          } else if (click === 1) {
              second = this;
              if (second != first) {
                  second.disabled = true;
                  delayCheckAttempt()
              } else {
                  click = 0;
              }
          }
          click++;


      })

      let p6 = document.getElementById("p6");
      /**
       * This function stores the image path in a variable depending on the click value and also
       * validates that the two images clicked are not the same 
       */
      p6.addEventListener("click", function () {
          value = game.getListIndexValue(5);
          this.src = generateImages(value);
          ClickCheck();
          if (click === 0) {
              first = this;
          } else if (click === 1) {
              second = this;
              if (second != first) {
                  second.disabled = true;
                  delayCheckAttempt()
              } else {
                  click = 0;
              }
          }
          click++;


      })

      let p7 = document.getElementById("p7");
      /**
       * This function stores the image path in a variable depending on the click value and also
       * validates that the two images clicked are not the same 
       */
      p7.addEventListener("click", function () {
          value = game.getListIndexValue(6);
          this.src = generateImages(value);
          ClickCheck();
          if (click === 0) {
              first = this;
          } else if (click === 1) {
              second = this;
              if (second != first) {
                  second.disabled = true;
                  delayCheckAttempt()
              } else {
                  click = 0;
              }
          }
          click++;


      })
      let p8 = document.getElementById("p8");
      /**
       * This function stores the image path in a variable depending on the click value and also
       * validates that the two images clicked are not the same 
       */
      p8.addEventListener("click", function () {
          value = game.getListIndexValue(7);
          this.src = generateImages(value);
          ClickCheck();
          if (click === 0) {
              first = this;
          } else if (click === 1) {
              second = this;
              if (second != first) {
                  second.disabled = true;
                  delayCheckAttempt()
              } else {
                  click = 0;
              }
          }
          click++;


      })


      let p9 = document.getElementById("p9");
      /**
       * This function stores the image path in a variable depending on the click value and also
       * validates that the two images clicked are not the same 
       */
      p9.addEventListener("click", function () {
          value = game.getListIndexValue(8);
          this.src = generateImages(value);
          ClickCheck();
          if (click === 0) {
              first = this;
          } else if (click === 1) {
              second = this;
              if (second != first) {
                  second.disabled = true;
                  delayCheckAttempt()
              } else {
                  click = 0;
              }
          }
          click++;


      })

      let p10 = document.getElementById("p10");
      /**
       * This function stores the image path in a variable depending on the click value and also
       * validates that the two images clicked are not the same 
       */
      p10.addEventListener("click", function () {
          value = game.getListIndexValue(9);
          this.src = generateImages(value);
          ClickCheck();
          if (click === 0) {
              first = this;
          } else if (click === 1) {
              second = this;
              if (second != first) {
                  second.disabled = true;
                  delayCheckAttempt()
              } else {
                  click = 0;
              }
          }
          click++;


      })
      let p11 = document.getElementById("p11");
      /**
       * This function stores the image path in a variable depending on the click value and also
       * validates that the two images clicked are not the same 
       */
      p11.addEventListener("click", function () {
          value = game.getListIndexValue(10);
          this.src = generateImages(value);
          ClickCheck();
          if (click === 0) {
              first = this;
          } else if (click === 1) {
              second = this;
              if (second != first) {
                  second.disabled = true;
                  delayCheckAttempt()
              } else {
                  click = 0;
              }
          }
          click++;


      })

      let p12 = document.getElementById("p12");
      /**
       * This function stores the image path in a variable depending on the click value and also
       * validates that the two images clicked are not the same 
       */
      p12.addEventListener("click", function () {
          value = game.getListIndexValue(11);
          this.src = generateImages(value);
          ClickCheck();
          if (click === 0) {
              first = this;
          } else if (click === 1) {
              second = this;
              if (second != first) {
                  second.disabled = true;
                  delayCheckAttempt()
              } else {
                  click = 0;
              }
          }
          click++;


      })
      /**
       * This function checks if the images are the same for both the images clicked an then 
       * sets up the victory message after successful attempts or sets up fail message in case 
       * of 10 faile attempts
       */
      function checkAttempt() {
          if (first.src === second.src) {
              console.log("match!");
              first.hidden = true;
              second.hidden = true;
              count++;
              console.log("Victory" + winCheck(count))
              if (winCheck(count) === true) {
                  victoryMessage();


              }
              click = 0;

          } else if (first.src !== second.src) {
              game.decreaseAttempts();
              document.getElementById("attempt").innerHTML = "Attempts Left: " + game.getAttempts();

              if (game.getAttempts() === 0) {
                  document.querySelectorAll("td").hidden = true;


                  lost();

              }
              console.log("Try Again!");
              first.src = "images/main.jpg";
              second.src = "images/main.jpg";
              first = null;
              second = null;
              click = 0;
          }
      }
      /**
       * This function returns different images based on different values
       * @returns image path
       */
      function generateImages(value) {
          if (value === 1) {
              return "images/1.jpg";
          } else if (value === 2) {
              return "images/2.png";

          } else if (value === 3) {
              return "images/3.jpg";
          } else if (value === 4) {
              return "images/4.png";
          } else if (value === 5) {
              return "images/5.jpg";
          } else if (value === 6) {
              return "images/6.png";
          }
      }
      /**
       * This method tracks if the player is able to solve the puzzle and then sets up
       * the victory message 
       * @param {count}   keeps track of the number of successful attempts
       * @returns victory state
       */
      function winCheck(count) {
          if (count === 6) {
              game.victoryStateTrue();
              return game.getVictoryState();
          }
          return game.initialVictoryState();
      }
      /**
       * This function sets the victory message 
       */
      function victoryMessage() {
          let message = document.getElementById("gameTable");
          message.innerHTML = "<p>You Got this!</p>";
          message.className = "Message";

      }
      /**
       * This fucntion sets up the fail message in case of 10 unsuccessful attempts
       */
      function lost() {
          let message = document.getElementById("gameTable");
          message.innerHTML = "<p>Lets Give it Another Try</p><p>Reload the page !</p>";
          message.className = "Message";
      }
  });
  //end of view