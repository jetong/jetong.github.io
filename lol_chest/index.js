var firebaseRef = firebase.database().ref().child("test");

firebaseRef.on('value', function(val) {
  alert(val);
}
