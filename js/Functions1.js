$.fn.center = function () {
  this.css("position","absolute");
  this.css("top", Math.max(0, (
    ($(window).height() - $(this).outerHeight()) / 2) +
     $(window).scrollTop()) + "px"
  );
  this.css("left", Math.max(0, (
    ($(window).width() - $(this).outerWidth()) / 2) +
     $(window).scrollLeft()) + "px"
  );
  return this;
};

$("#overlay").show();
$("#overlay-content").show().center();

$('.enter_link').click(function() {
       $("#overlay").fadeOut(500);
});

// setTimeout(function(){
//   $("#overlay").fadeOut();
// }, 5000);
var maincenter = [40, -75.16];
var mainzoom = 11;
// Leaflet map setup
var map = L.map('map', {
  center: maincenter,
  zoom: mainzoom
});

L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

var medianIncLegend = new cdb.geo.ui.Legend.Choropleth({
  title: "Median Income Quintile Breaks",
  left:  "Bottom 20%",
  right: "Top 20%",
  colors: [ "#ffffcc", "#c2e699", "#78c679", "#31a354", "#006837"]
});
// basemap url
var mapURL = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png';



  //
  // To add your Carto visualization, change cartoUserName and cartoVizId to your username and
  // project ID. These values can be found in the URL of your map on Carto:
  // - https://[cartoUserName].carto.com/[cartoVizId]

  // Unfortunately, only some visualizations styles are available in this method:
  //
  // - None
  // - Animated
  // - Pixel
  //
  // This is a bummer. But don't worry, we'll learn about how to do more powerful visualizations
  // with Carto next week when we learn about SQL

  // To add visualizations created with the Analysis feature, you will need to export the data to a
  // GeoJSON. From there, you can either import the GeoJSON to Carto or use Leaflet's L.geoJson.

  var cartoUserName = 'echoxiaowu1993';
  var cartoVizId = 'ed9c8782-2431-4d1a-abf3-e38e463d73d6';
  var layerUrl = 'https://'+cartoUserName+'.carto.com/api/v2/viz/'+cartoVizId+'/viz.json';

  var sum;
  var rate;
  var neighborhood;

  cartodb.createLayer(
      map,
      layerUrl,
      {
          https: true,
          legends: true,
          cartodb_logo:true,
          layerIndex:1,
      })
  .addTo(map)
  .done(function(layer) { // when successful, do this stuff

      sum = layer.getSubLayer(0);
      rate = layer.getSubLayer(1);
      neighborhood = layer.getSubLayer(2);

      // hide sublayer1
      sum.hide();
      rate.show();
      neighborhood.hide();
      rate.setInteractivity("rate");
      rate.setInteraction(true);
      $('div#sum.cartodb-popup.v2').remove();
      $('#map').append(medianIncLegend.render().el);
      $('.legend-title').replaceWith("Rate of Trash Cans Quintile Breaks");
      $(".colors").replaceWith("<div class='quartile' style='background-color:#d1eeea'></div><div class='quartile' style='background-color:#96d0d1'></div><div class='quartile' style='background-color:#68abb8'></div><div class='quartile' style='background-color:#45829b'></div><div class='quartile' style='background-color:#2a5674'></div>");
      cdb.vis.Vis.addInfowindow(
        map, rate, ["tojson4_sum", "tojson4_ratelabel", "tojson4_score", "tojson4_a"],
        {
           infowindowTemplate: $('#iw_template_rate').html()
        });
    //   $("#EBLL").on('click',function(){
    //     tracts.show();
    //     tracts.setInteractivity("pctebllct");
    //     tracts.setInteraction(true);
    //     cdb.vis.Vis.addInfowindow(
    //       map, tracts, ["pctebllct"],
    //       {
    //          infowindowTemplate: $('#iw_template_tracts').html()
    //       });
    //       // tracts.on('featureClick',function(e,latlng,pos,data){
    //       // $('.cartodb-infowindow #tracts' ).css('visibility', 'hidden');
    //       // return false;
    // // });
    //   });
});
  $("#number").on('click',function(){
    sum.show();
    rate.hide();
    sum.setInteractivity("sum");
    sum.setInteraction(true);
    $('div#rate.cartodb-popup.v2').remove();
    $('#map').append(medianIncLegend.render().el);
    $('.legend-title').replaceWith("Number of Trash Can Quintile Breaks");
    $(".colors").replaceWith("<div class='quartile' style='background-color:#ffc6c4'></div><div class='quartile' style='background-color:#ee919b'></div><div class='quartile' style='background-color:#cc607d'></div><div class='quartile' style='background-color:#9e3963'></div><div class='quartile' style='background-color:#672044'></div>");
    cdb.vis.Vis.addInfowindow(
      map, sum, ["tojson4_sum", "tojson4_ratelabel", "tojson4_score", "tojson4_a"],
      {
         infowindowTemplate: $('#iw_template_sum').html()
      });
//       tracts.on('featureClick',function(e,latlng,pos,data){
//       $('.cartodb-infowindow #tracts' ).css('visibility', 'hidden');
//       return false;
});
$("#rate").on('click',function(){
  sum.hide();
  rate.show();
  rate.setInteractivity("rate");
  rate.setInteraction(true);
  $('div#sum.cartodb-popup.v2').remove();
  $('#map').append(medianIncLegend.render().el);
  $('.legend-title').replaceWith("Rate of Trash Can Quintile Breaks");
  $(".colors").replaceWith("<div class='quartile' style='background-color:#d1eeea'></div><div class='quartile' style='background-color:#96d0d1'></div><div class='quartile' style='background-color:#68abb8'></div><div class='quartile' style='background-color:#45829b'></div><div class='quartile' style='background-color:#2a5674'></div>");
  cdb.vis.Vis.addInfowindow(
    map, rate, ["tojson4_sum", "tojson4_ratelabel", "tojson4_score", "tojson4_a"],
    {
       infowindowTemplate: $('#iw_template_rate').html()
    });
//       tracts.on('featureClick',function(e,latlng,pos,data){
//       $('.cartodb-infowindow #tracts' ).css('visibility', 'hidden');
//       return false;
});

$("#low").on('click', function(){
  neighborhood.show();
  neighborhood.setSQL("SELECT * from forcarto3 where tojson4_q_score != 'Low Litter Score'");
  neighborhood.setCartoCSS('#layer { polygon-fill: #898989; polygon-opacity: 1;} #layer::outline { line-width: 0; line-color: #ffffff; line-opacity: 0; }');
});
$("#med").on('click', function(){
  neighborhood.show();
  neighborhood.setSQL("SELECT * from forcarto3 where tojson4_q_score != 'Medium Litter Score'");
  neighborhood.setCartoCSS('#layer { polygon-fill: #898989; polygon-opacity: 1;} #layer::outline { line-width: 0; line-color: #ffffff; line-opacity: 0; }');
});
$("#high").on('click', function(){
  neighborhood.show();
  neighborhood.setSQL("SELECT * from forcarto3 where tojson4_q_score != 'High Litter Score'");
  neighborhood.setCartoCSS('#layer { polygon-fill: #898989; polygon-opacity: 1;} #layer::outline { line-width: 0; line-color: #ffffff; line-opacity: 0; }');
});
$("#all").on('click', function(){
  neighborhood.hide();
});
// $("#agw").on('click', function() {
//   neighborhood.show();
//   neighborhood.setSQL("SELECT * FROM forcarto2 where fid = 2");
//   neighborhood.setCartoCSS('#layer { polygon-fill: #898989; polygon-opacity: 0;} #layer::outline { line-width: 1; line-color: #ff0000; line-opacity: 1; }');
//   maincenter = [40, -75.17];
//   map.setView(maincenter,14,true);
// });

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
};
//     $("#load_4").on('click', function() {
//     // turn on layer off, turn off layer on
//         sublayer0.show();
//         sublayer1.hide();
//         sublayer2.hide();
//         sublayer3.hide();
//         tracts.hide();
//         tracts1.hide();
//         $('#map').append(medianIncLegend.render().el);
//         $(".legend-title").replaceWith("HS Degree or Above Quintile Breaks");
//         $(".colors").replaceWith("<div class='quartile' style='background-color:#eff3ff'></div><div class='quartile' style='background-color:#bdd7e7'></div><div class='quartile' style='background-color:#6baed6'></div><div class='quartile' style='background-color:#3182bd'></div><div class='quartile' style='background-color:#08519c'></div>");
//         sublayer0.setInteractivity("educati");
//         sublayer1.setInteraction(false);
//         sublayer0.setInteraction(true);
//         $('div#sublayer1.cartodb-popup.v2').remove();
//         $('div#sublayer2.cartodb-popup.v2').remove();
//         $('div#sublayer3.cartodb-popup.v2').remove();
//         $('div#tracts.cartodb-popup.v2').remove();
//         cdb.vis.Vis.addInfowindow(
//           map, sublayer0, ["vacancy","educati", "poverty","medianh"],
//           {
//              infowindowTemplate: $('#iw_template_sublayer0').html()
//           });
//           sublayer1.on('featureClick',function(e,latlng,pos,data){
//           $('.cartodb-infowindow #sublayer1' ).css('visibility', 'hidden');
//           return false;
//     });
//       });
//       $("#load_5").on('click', function() {
//       // turn on layer off, turn off layer on
//           sublayer0.hide();
//           sublayer1.hide();
//           sublayer2.show();
//           sublayer3.hide();
//           tracts.hide();
//           tracts1.hide();
//           $('#map').append(medianIncLegend.render().el);
//           $(".legend-title").replaceWith("Number of Familes In Poverty Quintile Breaks");
//           $(".colors").replaceWith("<div class='quartile' style='background-color:#f7f7f7'></div><div class='quartile' style='background-color:#cccccc'></div><div class='quartile' style='background-color:#969696'></div><div class='quartile' style='background-color:#636363'></div><div class='quartile' style='background-color:#252525'></div>");
//           sublayer0.setInteractivity("poverty");
//           sublayer1.setInteraction(false);
//           sublayer0.setInteraction(false);
//           sublayer2.setInteraction(true);
//           sublayer3.setInteraction(false);
//           $('div#sublayer0.cartodb-popup.v2').remove();
//           $('div#sublayer1.cartodb-popup.v2').remove();
//           $('div#sublayer3.cartodb-popup.v2').remove();
//           $('div#tracts.cartodb-popup.v2').remove();
//           cdb.vis.Vis.addInfowindow(
//             map, sublayer2, ["vacancy","educati", "poverty","medianh"],
//             {
//                infowindowTemplate: $('#iw_template_sublayer2').html()
//             });
//             sublayer0.on('featureClick',function(e,latlng,pos,data){
//             $('.cartodb-infowindow #sublayer0' ).css('visibility', 'hidden');
//             return false;
//       });
//         });
//         $("#load_6").on('click', function() {
//         // turn on layer off, turn off layer on
//           sublayer0.hide();
//           sublayer1.hide();
//           sublayer2.hide();
//           sublayer3.show();
//           tracts.hide();
//           tracts1.hide();
//             $('#map').append(medianIncLegend.render().el);
//             $(".legend-title").replaceWith("Number of Vacant Homes Quintile Breaks");
//             $(".colors").replaceWith("<div class='quartile' style='background-color:#ffc6c4'></div><div class='quartile' style='background-color:#ee919b'></div><div class='quartile' style='background-color:#cc607d'></div><div class='quartile' style='background-color:#9e3963'></div><div class='quartile' style='background-color:#672044'></div>");
//             sublayer0.setInteractivity("vacancy");
//             sublayer1.setInteraction(false);
//             sublayer0.setInteraction(false);
//             sublayer2.setInteraction(false);
//             sublayer3.setInteraction(true);
//             $('div#sublayer1.cartodb-popup.v2').remove();
//             $('div#sublayer2.cartodb-popup.v2').remove();
//             $('div#sublayer3.cartodb-popup.v2').remove();
//             $('div#tracts.cartodb-popup.v2').remove();
//             cdb.vis.Vis.addInfowindow(
//               map, sublayer3, ["vacancy","educati", "poverty","medianh"],
//               {
//                  infowindowTemplate: $('#iw_template_sublayer3').html()
//               });
//               sublayer0.on('featureClick',function(e,latlng,pos,data){
//               $('.cartodb-infowindow #sublayer0' ).css('visibility', 'hidden');
//               return false;
//         });
//           });
//
// })
// .error(function(err) { // when error, do this
//     console.log("error: " + err);
// });
// $("#load_7").on('click', function(){
//   tracts.hide();
//   tracts1.hide();
//   sublayer0.hide();
//   sublayer1.hide();
//   sublayer2.hide();
//   sublayer3.hide();
//   $('div#tracts.cartodb-popup.v2').remove();
//   $('div#sublayer0.cartodb-popup.v2').remove();
//   $('div#sublayer1.cartodb-popup.v2').remove();
//   $('div#sublayer2.cartodb-popup.v2').remove();
//   $('div#sublayer3.cartodb-popup.v2').remove();
//   $('div').removeClass("cartodb-legend choropleth");
//   });
// $("#AllProb").on('click',function(){
//   points.show();
//   points.setSQL('SELECT * from pointsjson2');
//   points.setCartoCSS("#pointsjson2 {   marker-width: 8; marker-fill: ramp([stpws_p], (#d1eeea, #96d0d1, #68abb8, #45829b, #2a5674), quantiles); marker-fill-opacity: 1; marker-allow-overlap: true;marker-line-width: 1;marker-line-color: #ffffff;marker-line-opacity: 0.8; }");
// });
// $("#HighProb").on('click',function(){
//   points.show();
//   points.setSQL('SELECT * from pointsjson2 where stpws_p > .8');
//   points.setCartoCSS("#pointsjson2 {marker-width: 8; marker-fill: 'red'; marker-fill-opacity: 1; marker-allow-overlap: true; marker-line-width: 1; marker-line-color: #ffffff; marker-line-opacity: 1;}");
// });
// $("#MedianProb").on('click',function(){
//   points.show();
//   points.setSQL('SELECT * from pointsjson2 where stpws_p < .8 AND stpws_p > .3');
//   points.setCartoCSS("#pointsjson2 {marker-width: 8; marker-fill: #CCCC00; marker-fill-opacity: 1; marker-allow-overlap: true; marker-line-width: 1; marker-line-color: #ffffff; marker-line-opacity: 1;}");
// });
// $("#LowProb").on('click',function(){
//   points.show();
//   points.setSQL('SELECT * from pointsjson2 where stpws_p < .3');
//   points.setCartoCSS("#pointsjson2 {marker-width: 8; marker-fill: 'blue'; marker-fill-opacity: 1; marker-allow-overlap: true; marker-line-width: 1; marker-line-color: #ffffff; marker-line-opacity: 1;}");
// });
// $("#HidePoints").on('click',function(){
//   points.hide();
//   // points.setSQL('SELECT * from pointsjson2 where stpws_p < .3');
//   // points.setCartoCSS("#pointsjson2 {marker-width: 8; marker-fill: 'blue'; marker-fill-opacity: 1; marker-allow-overlap: true; marker-line-width: 1; marker-line-color: #ffffff; marker-line-opacity: 1;}");
// });
//
// // var layers = {
// //           'High Probabilty': {
// //             sql:'SELECT * FROM pointsjson2 where stpws_p > 0.7',
// //             cartocss: '#layer { marker-fill: red; }'
// //           },
// //           'Medium Probabilty': {
// //             sql: 'SELECT * FROM pointsjson2 where stpws_p < 0.7 and stpws_p > 0.3',
// //             cartocss: '#layer { marker-fill: yellow; }'
// //           },
// //           'Low Probabilty': {
// //             sql: 'SELECT * FROM pointsjson2 where stpws_p < 0.3',
// //             cartocss: '#layer { marker-fill: blue; }'
// //           }
// //         };
// //         cartodb.createLayer(map,layerUrl1,{
// //                    sublayers: []
// //                  })
// //                  .addTo(map)
// //                  .done(function(layer){
// //                    // When the layers inputs change fire this
// //                    $("input[name='layer']").change(function(){
// //
// //                      // Clear the sublayers
// //                      layer.getSubLayers().forEach(function(sublayer){sublayer.remove();});
// //
// //                      // For every check activated, add a sublayer
// //                      $.each($("input[name='layer']:checked"), function(){
// //                          layer.createSubLayer(layers[$(this).attr("id")]);
// //                      });
// //                    });
//
// // $("#HighProb").on('click', function(){
// //   cartodb.createLayer(
// //       map,
// //       layerUrl1,
// //       {
// //           https: true,
// //           legends: true,
// //           cartodb_logo:true,
// //           layerIndex:1
// //       },function(layer){
// //         layer.createSubLayer({
// //           sql:'SELECT * FROM pointsjson2 where stpws_p > 0.8',
// //           cartocss: '#layer { marker-fill: red; }'
// //         });
// //       }).addTo(map);
//
//
// // / 'SELECT * FROM pointsjson2 where stpws_p > 0.8' }]
//   // change points:
//   // points.setSQL('SELECT * FROM pointsjson2')
//   // points.setCartoCSS('')
//
//   // change districts:
//   // districts.setSQL('SELECT * FROM minblocksvars')
//   // points.setCartoCSS('')
//
//   //cartodb.createLayer(map, layerUrl)
//   //  .on('done', function(layer) {
//   //    layer.addTo(map);
//   //  }).on('error', function(err) {
//   //    console.log(err);
// });
