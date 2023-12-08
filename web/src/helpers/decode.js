export default function decodeUserData(encodedData) {
  var decodedData = decodeURIComponent(encodedData);

  var userStartIndex = decodedData.indexOf("user=") + 5;
  var userEndIndex = decodedData.indexOf("&auth_date");

  var userInfoString = decodedData.substring(userStartIndex, userEndIndex);

  var userJson = JSON.parse(userInfoString);

  return userJson;
}
