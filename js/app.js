var count = 0;
var target = 0;
var last_diff = 100; // Variable store the difference between last guess and target 

$(document).ready(function(){
	
	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);

  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	/*--- Initialize guess count to zero and add 1 when each guess is made---*/
  	 count = 0;

    /*--- Generate a random number form 1 to 100 ---*/
    target = randomGenerator(1, 100);
    alert('target:' +target);

});



/*--- Function to generate a random number between min and max ---*/
function randomGenerator(min, max){
	return Math.floor( Math.random()* (max - min) + min);
}

/*--- Function to get user input and give feedback ---*/

function Game(){

  /*--- Get user guess value ---*/
  var guess = parseInt($('#userGuess').val());

  /*---  Check if the input is between 1 and 100 ---*/
  if(guess < 1 || guess > 100 || isNaN(guess) ){

    alert('Please input a number between 1 and 100');

  }
  else{

    // Increase guess count
    count++;

    /*--- Compare the guess to the target and print feedback ---*/

    var diff = compare2Nums(guess, target);

    var message = '';

    if(diff == 0) {

      message = "You are correct!"

    }
    else{
      if(count == 1){

        message = absolute_msg(diff);
      }
      else if( count > 1){
        alert('diff:'+diff+"last_diff:"+last_diff);

        message = comparison_msg(last_diff, diff);

        alert('msg:'+message);

      }

    }


    last_diff = diff;

    $('#feedback').text(message);

    /*--- Update guess count and list of previous guesses ---*/
    $('#count').text(count.toString());
    $('#guessList').prepend('<p>' + guess +'&nbsp&nbsp' + message + '</p>');
      }

    $('#userGuess').val('');
}


/*--- Function to compare two numbers and give feedback message ---*/

function compare2Nums(guess, target){

  return Math.abs(target - guess);
}

function absolute_msg(diff){

  var msg ='';

  if( diff == 0){
    msg = 'You are correct!';

  }
	else if( diff > 50){
		msg = 'Ice Gold';
	}
	else if( diff > 30 && diff <= 50){
		msg = 'Gold';
	}
	else if ( diff > 20 && diff <= 30){
		msg = 'Warm';
	}
	else if ( diff > 10 && diff <= 20){
		msg = 'Hot';
	}
	else{
		msg = 'Very Hot';
	}

	return msg;
}


function comparison_msg(last_diff, diff){

  var msg = '';

  if(last_diff > diff)
    msg = 'Warmer';
  else if(last_diff <= diff)
    msg = 'Colder';

  return msg;
}




/*--- Function to reset everything when "New Game" is clicked ---*/

function newGame(){
    

      // reset guess count
      count = 0; 

      // Replace the text  
      $('#count').text(count.toString());
      $('#guessList').empty();
      $('#feedback').text('Make your Guess!');

      target = randomGenerator(1, 100);

}
