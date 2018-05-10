
$('#info-sign').on('click',function(e){
  $('#originalBar').fadeToggle();
  $('#firstsidebar').hide();
  $('#secondsidebar').hide();
  $('#thirdsidebar').hide();
  $('#fourthsidebar').hide();
  $('#fifthsidebar').hide();
});

$('#firstButton').on('click',function(e){
  $('#originalBar').hide();
  $('#firstsidebar').fadeToggle();
  $('#secondsidebar').hide();
  $('#thirdsidebar').hide();
  $('#fourthsidebar').hide();
  $('#fifthsidebar').hide();
});

$('#secondButton').on('click',function(e){
  $('#originalBar').hide();
  $('#firstsidebar').hide();
  $('#secondsidebar').fadeToggle();
  $('#thirdsidebar').hide();
  $('#fourthsidebar').hide();
  $('#fifthsidebar').hide();
});

$('#thirdButton').on('click',function(e){
  $('#originalBar').hide();
  $('#firstsidebar').hide();
  $('#secondsidebar').hide();
  $('#thirdsidebar').fadeToggle();
  $('#fourthsidebar').hide();
  $('#fifthsidebar').hide();
});

$('#fourthButton').on('click',function(e){
  $('#originalBar').hide();
  $('#firstsidebar').hide();
  $('#secondsidebar').hide();
  $('#thirdsidebar').hide();
  $('#fourthsidebar').fadeToggle();
  $('#fifthsidebar').hide();
});

$('#fifthButton').on('click',function(e){
  $('#originalBar').hide();
  $('#firstsidebar').hide();
  $('#secondsidebar').hide();
  $('#thirdsidebar').hide();
  $('#fourthsidebar').hide();
  $('#fifthsidebar').fadeToggle();
});
