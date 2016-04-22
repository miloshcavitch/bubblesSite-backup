var projectsRay = [];

var loremOne = 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinction.';
var loremTwo = 'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus';
var loremThree = 'On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue.'
var loremFour = 'Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae'
var Project = function(name, description, href){
  this.name = name;
  this.description = description;
  this.href = href;
}
projectsRay.push(new Project("Stars", loremOne, '#'));
projectsRay.push(new Project("Pixel Smoke", loremTwo, '#'));
projectsRay.push(new Project("Confetti", loremThree, '#'));
projectsRay.push(new Project("Vector Drawing", loremFour, '#'));

var currentIndex = 0;


var sendOut = function(){
  /*
  var titleLoc = $('#itemTitle').offset();
  titleLoc = titleLoc.left;
  var titleDistanceString = "+=" +(window.innerWidth - titleLoc);
  console.log(titleDistanceString);
  $('#itemTitle').animate({"left": titleDistanceString})
  */
  currentIndex++;
  console.log(currentIndex);
  if (currentIndex > projectsRay.length-1){
    currentIndex = 0;
  }

  $('#itemTitle').fadeOut(500);
  $('#itemDescription').fadeOut(500);
}

var sendIn = function(){
  /*
  $('#itemTitle').empty();
  var titleString = "<a href='" + projectsRay[currentIndex].href + "'><h1>"+ projectsRay[currentIndex].name + "</h1></a>";
  $('#itemTitle').append(titleString);
  $('#itemTitle').css("left", "-200px");
  var titleLoc = $('#itemTitle').offset();
  titleLoc = titleLoc.left;
  var titleDistanceString = "+=" + (Math.abs(titleLoc) + window.innerWidth/4);
  $('#itemTitle').animate({"left": titleDistanceString})
  */
  $('#itemTitle').empty();
  var titleString = "<a href='" + projectsRay[currentIndex].href + "'><h1>"+ projectsRay[currentIndex].name + "</h1></a>";
  $('#itemTitle').append(titleString);
  $('#itemDescription').empty();
  var descriptionString = "<p>" + projectsRay[currentIndex].description + "</p>";
  $('#itemDescription').append(descriptionString);
  $('#itemTitle').fadeIn(1000);
  $('#itemDescription').fadeIn(1000);
}

$(document).ready(function(){
	$('#Mpullout').hide();
  $('#Mmenu').click(function(){
    $('#Mmenu').hide(100);
    $('#Mpullout').show(200);
  })
	$('#x').click(function(){
		console.log('clicked x');
		$('#Mmenu').show(200);
		$('#Mpullout').hide(200);
	});
});
