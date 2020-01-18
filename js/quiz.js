const Questions = [
  {
    id: 1,
    question: 'Which number should come next in the series? 1 - 1 - 2 - 3 - 5 - 8 - 13',
    answers: [13,21,26],
    correct: 1,
    radio_name: 0
  }, 
  {
    id: 2,
    question: 'What color is the sky?',
    answers: ['Blue', 'Green', 'Orange'],
    correct: 0,
    radio_name: 1
  }, 
  {
    id: 3,
    question: 'What color is the moon?',
    answers: ['Red', 'Blue', 'White'],
    correct: 2,
    radio_name: 2
  }, 
  {
    id: 4,
    question: 'Suppose 8 monkeys take 8 minutes to eat 8 bananas. (a) How many minutes would it take 3 monkeys to eat 3 bananas?',
    answers: ['3 minutes', '8 minutes', '6 minutes'],
    correct: 1,
    radio_name: 3
  },
  {
    id: 5,
    question: 'My successor\'s father is my father\'s son. and I don\'t have any brothers or sons. Who is my successor?',
    answers: ['Nephew', 'Daughter', 'Myself'],
    correct: 1,
    radio_name: 4
  }, 
  {
    id: 6,
    question: 'A person has certain number of cows and birds. They have 172 eyes and 344 legs. How many cows and birds does hehave?',
    answers: ['0 bird and 86 cows', '20 birds and 66 cows', '43 birds and 43 cows'],
    correct: 0,
    radio_name: 5
  },
  {
    id: 7,
    question: 'What is the answer of A + A + A = 39; B + B - A = 25; 6 + C + B = 50; A + B + C =?',
    answers: ['77', '57', '67'],
    correct: 1,
    radio_name: 6
  },
  {
    id: 8,
    question: 'Two people were walking in opposite directions. Both of them walked 6 miles forward then took right and walked 8miles. How far is each from starting positions?',
    answers: ['14 miles and 14 miles', '10 miles 10 miles', '6 miles 6 miles'],
    correct: 1,
    radio_name: 7
  },
  {
    id: 9,
    question: 'What is Taeyang real name?',
    answers: ['Yong Bae', 'Taeyang', 'Yong Gi'],
    correct: 0,
    radio_name: 8
  },
  {
    id: 10,
    question: 'When asked in an exam how much time is left, the teacher answered that the amount of time left is 1/5 of the timealready completed. How much time is left?',
    answers: ["1hr. The total time was 5 hour and already 4 hr are over", "50 minutes. The total time was one hour and already 10 minutes are over.", '10 minutes. The total time was one hour and already 50 minutes are over.'],
    correct: 2,
    radio_name: 9
  },
  {
    id: 11,
    question: 'What is the answer of − 96 ÷ −6 ÷ 8 ?',
    answers: ["-2", "12", '2'],
    correct: 2,
    radio_name: 10
  },
  {
    id: 12,
    question: 'What is the answer of −10 + −3 − −4 + 5?',
    answers: ["-4", "-12", 'None of These'],
    correct: 0,
    radio_name: 11
  },
  {
    id: 13,
    question: '0, 1, 2, 4, 6, 9, 12, 16, ? What number should replace the question mark?',
    answers: ["20", "19", '18'],
    correct: 0,
    radio_name: 12    
  },
  {
    id: 14,
    question: 'Who is the strongest?',
    answers: ["Superman", "The Terminator", 'Waluigi, obviously'],
    correct: 2,
    radio_name: 13    
  }
];

var random_quiz, random_questions = [], score = 0, random_num, number_correct = 0, 
questions_length = Questions.length; 
const quizContainer = document.getElementById('quiz');
const result_text = document.getElementById('result_text');
const result_number = document.getElementById('results');
const grade_text = document.getElementById('grade');
const grade_number = document.getElementById('grade_results');
const btn_next = document.querySelector('.btn-next');
const btn_submit = document.querySelector('.btn-submit'); 
const modal_box = document.querySelector('.modal');

function displayQuestion() {
  var output = [];
  for (var i = 0; i < Questions.length; i++) {
    Questions[i].is_correct=false;
    random_questions.push(Questions[i]);
  }
  // random_questions =Questions.map(u => Object.assign({}, u, { approved: true }));
  
  for (var i = 0; i < 2; i++){
    random_num = Math.floor(Math.random() * Questions.length);
    var random_answer = [];
    random_quiz = Questions[random_num]; 

    //push questions array answers into array
    for (letter in random_quiz.answers) {
      random_answer.push(
        `<label>
        <input type="radio" name="question${random_quiz.radio_name}" 
        value="${letter}" id="radio${letter}" 
        onchange="selectRadio (${random_quiz.id},${letter})" />
         ${random_quiz.answers[letter]}
        </label>`);
    }

    output.push(`<div class="question">${random_quiz.question}</div>
    <div id="answers${random_quiz.id}" class="answer">${random_answer.join('')}</div>`);

    Questions.splice(random_num, 1);
  }
  quizContainer.innerHTML = output.join('');
  if (Questions.length == 0) {
    btn_submit.style.display = 'block'; 
    btn_next.style.display = 'none'; 
  }
}
displayQuestion();

//when select radio button
function selectRadio (id,radio_length) {   
  var _tmp = document.getElementById('radio'+radio_length).value;
  var _ques= random_questions.find(el=>el.id==id);
  var _index= random_questions.findIndex(el=>el.id==id);

  if (_ques.correct == _tmp) {
    random_questions[_index].is_correct=true;
  } else {
    random_questions[_index].is_correct=false;
  } 
}

btn_submit.addEventListener('click', function () { 
  result_text.style.display = 'block';
  grade_text.style.display = 'block';
  quizContainer.style.display = 'none';

  for (var i = 0; i < random_questions.length; i++) {
    if (random_questions[i].is_correct) {
      score += 5;
      number_correct++;
    }
  }
  result_number.innerHTML = score + ' ( You got ' + number_correct + ' of ' + questions_length + ' questions correct )';

  if (score >= 80) {
    grade_number.innerHTML = 'A';
    modal_box.style.display = 'block';
    document.querySelector('.alert_text').innerHTML = "Get Certificate!";
    document.querySelector('.btn-retry').style.display = 'none';
  } else if (score >= 60 && score < 80) {
    grade_number.innerHTML = 'B'; 
    modal_box.style.display = 'block';
    document.querySelector('.alert_text').innerHTML = "Get Certificate!";
    document.querySelector('.btn-retry').style.display = 'none';   
  } else if (score >= 40 && score < 60) {
    grade_number.innerHTML = 'C';
    modal_box.style.display = 'block';
    document.querySelector('.alert_text').innerHTML = "Do you want to retry? Click Retry Button!"
    document.querySelector('.btn-retry').innerHTML = "Retry"
  } else {
    grade_number.innerHTML = 'D'; 
    modal_box.style.display = 'block'; 
    document.querySelector('.alert_text').innerHTML = "Do you want to retry? Click Retry Button!"
    document.querySelector('.btn-retry').innerHTML = "Retry"  
  }
});

btn_next.addEventListener('click', function () {
  for (var i = 0; i < random_questions.length; i++) {
    if (random_questions[i].is_correct) {
      number_correct++;
      score += 5;
    }
  }
  random_questions = [];
  displayQuestion();
});

document.querySelector('.btn-retry').addEventListener('click', function () {
  window.location.reload();
});


// function Question (id, question, answer1, answer2, answer3, radio_name, correct) {
//   this.id = id;
//   this.question = question;
//   this.answer1 = answer1;
//   this.answer2 = answer2;
//   this.answer3 = answer3;
//   this.radio_name = radio_name;
//   this.correct = correct;
// }

// var random_quiz, random_answer = [], score = 0;
// const quizContainer = document.getElementById('quiz');
// const answerContainer = document.getElementById('answers');
// const btn_next = document.querySelector('.btn-next');
// // const btn_submit = document.querySelector('.btn-submit');

// var q1 = new Question(1, 'Which number should come next in the series? 1 - 1 - 2 - 3 - 5 - 8 - 13',13,21,26, 0, 1);
// var q2 = new Question(2, 'What color is the sky?', 'Blue', 'Green', 'Orange', 1, 0);
// var q3 = new Question(3, 'What color is the moon?', 'Blue', 'Green', 'White', 2, 2);
// var q4 = new Question(4, 'Who is Song Hye Kyo husband?', 'Song Seung Hoon', 'Song Jong Ki', 'So Ji Sub', 3, 1);
// var q5 = new Question(5, 'Who is Lee Min Ho ex-girlfriend?', 'Park Shin Hye', 'Yoona', 'Bae Suzi', 4, 2);
// var q6 = new Question(6, 'When is Taeyang birthday?', 'May 18, 1988', 'May 18, 1987', 'June 18, 1988', 5, 0);
// var q7 = new Question(7, 'What is Taeyang real name?', 'Lee Yong Bae', 'Song Ji Yong', 'Yong Bae', 6, 2);
// var q8 = new Question(8, 'What is G-dragon real name?', 'Kwon Ji Yong', 'Lee Ji Yong', 'Lee Seung Hoon', 7, 0);
// var q9 = new Question(9, 'When is G-dragon birthday?', 'Sept 18, 1988', 'May 18, 1988', 'Aug 18, 1988', 8, 2);

// var questions = [q1, q2, q3, q4, q5, q6, q7, q8, q9], random_num, random_question = [];

// document.addEventListener("DOMContentLoaded", function(event) { 
//   displayQuestion();
// });

// function displayQuestion () {
//   var output = [], random_answer = [];
//   for (var i = 0; i < questions.length; i++) {
//     random_question.push(questions[i]);
//   }
//   for(var i=0;i<3;i++){    
//     random_num = Math.floor(Math.random() * questions.length);
//     random_quiz = questions[random_num];
//     // random_question.push(random_quiz);
//     questions.splice(random_num,1);
//     random_answer = [random_quiz.answer1, random_quiz.answer2, random_quiz.answer3];
//     output.push(`<div class="question">${random_quiz.question}</div>
//       <div id="answers${random_quiz.id}" class="answer">
//         <label><input type="radio" name="question${random_quiz.radio_name}" value="0" onchange="selectRadio(${random_quiz.id})" id="radio1"/><span  id="answerA">${random_answer[0]}</span></label>
//         <label><input type="radio" name="question${random_quiz.radio_name}" value="1" onchange="selectRadio(${random_quiz.id})" id="radio2"/><span  id="answerB">${random_answer[1]}</span></label>
//         <label><input type="radio" name="question${random_quiz.radio_name}" value="2" onchange="selectRadio(${random_quiz.id})" id="radio3"/><span  id="answerC">${random_answer[2]}</span></label>
//       </div>`);
//   }
//   quizContainer.innerHTML = output.join('');
//   document.getElementById('answerA').value = random_answer[0];
//   document.getElementById('answerB').value = random_answer[1];
//   document.getElementById('answerC').value = random_answer[2]; 
// }

// function addScore(correct) {
//   if (correct) {
//     score += 5;
//     document.getElementById('results').innerHTML = score;
//   }
// }

// function selectRadio (id) {
//   var selector = Array.from(document.querySelectorAll('input[type="radio"]'));
//   selector.forEach(function (v) {
//     if (v.checked) {
//       select_value = v.value;
//     }
//   });
//   for (var i= 0 ; i<random_question.length; i++){
//     if(random_question[i].id == id) {
//       if (select_value == random_question[i].correct) {
//         console.log(select_value, random_question[i].correct)
//         addScore(true);
//         document.getElementById('answers' + id).style.color = 'lightgreen'
//       } else {
//         console.log(select_value, random_question[i].correct)
//         document.getElementById('answers' + id).style.color = 'red'        
//       }
//     }
//   }
// }

// btn_next.addEventListener('click', function () {
//   document.getElementById('radio1').checked = false;
//   document.getElementById('radio2').checked = false;
//   document.getElementById('radio3').checked = false;
//   displayQuestion();
// });

