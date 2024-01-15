//const dimensions = document.getElementById('id_packaging_dimensions')
//const volume = document.getElementById('id_volume')
//dimensions.addEventListener('input', CalcVolume, true)
//function CalcVolume(){
//var dimensionsArray = dimensions.split("x");
//
//      // Convert dimensions to meters
//      var lengthInMeters = parseFloat(dimensionsArray[0]) / 100;
//      var widthInMeters = parseFloat(dimensionsArray[1]) / 100;
//      var heightInMeters = parseFloat(dimensionsArray[2]) / 100;
//
//      if (!isNaN(lengthInMeters) && !isNaN(widthInMeters) && !isNaN(heightInMeters)) {
//        const result = lengthInMeters * widthInMeters * heightInMeters
//        volume.value = result
//      }
//}
document.addEventListener('DOMContentLoaded', function () {
  const dimensions = document.getElementById('id_packaging_dimensions');
  const volume = document.getElementById('id_volume');
  dimensions.addEventListener('input', CalcVolume, true);
function CalcVolume(){
var dimensionsArray = dimensions.value.split("x");


      var lengthInMeters = parseFloat(dimensionsArray[0]) / 100;
      var widthInMeters = parseFloat(dimensionsArray[1]) / 100;
      var heightInMeters = parseFloat(dimensionsArray[2]) / 100;
      console.log(lengthInMeters, widthInMeters, heightInMeters)
      console.log(dimensionsArray[0])
      console.log(lengthInMeters * widthInMeters * heightInMeters)
      if (!isNaN(lengthInMeters) && !isNaN(widthInMeters) && !isNaN(heightInMeters)) {
        const result = lengthInMeters * widthInMeters * heightInMeters
        volume.value = result
      }
}

});
