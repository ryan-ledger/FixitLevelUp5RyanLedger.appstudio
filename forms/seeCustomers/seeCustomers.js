
seeCustomers.onshow=function(s){
      drpCustomer.clear(s)
  let query = "SELECT * FROM customer"
  req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=rle54222&pass=Plye4544&database=rle54222&query=" + query)
 
  if (req1.status == 200) {
    let results = JSON.parse(req1.responseText)
    if (results.length == 0)
        txtResults.value("Error")
      else {  
        let output = ""
        for (i = 0; i <= results.length - 1; i++){
            output = output + results[i][0] + "\n"
            drpCustomer.addItem(results[i][0])

}


drpCustomer.onclick=function(s){
  if (typeof(s) == "object"){
    return                  
    }else {
      drpCustomer.value = s
      let query2 = "SELECT * FROM customer WHERE name=" + '"' + drpCustomer.selection + '"'
      req2 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=rle54222&pass=Plye4544&database=rle54222&query=" + query2)
      if (req2.status == 200) {
          let results1 = JSON.parse(req2.responseText)
                  if (results1.length == 0){
              txtResults.value("Error")
          }else {        
              console.log("Parsed value is " + results1)
              console.log("First value in array is " + results1[0])
              console.log("Paul needs the output of results[0][1]: " + results1[0][2])
              let message1 = ""
              for (i = 1; i <= 2; i++)
                  message1 = message1 + results1[0][i] + "\n"
              for (i =3; i <=5; i++)
                  message1 = message1 + results1[0][i] + ", "
              txtResults.value = message1
          }
      }else{
        NSB.MsgBox("Error")
      }
   }
}


hmbBtn.onclick=function(s){
  if (typeof(s) == "object") {
       return
    }
    switch(s) {
      case "See Customer":
          ChangeForm(seeCustomer)
          break
       case "Edit Customer":
          ChangeForm(deleteUpdateCustomer)
          break
       case "Delete Customer":
          ChangeForm(deleteUpdateCustomer)
          break
      case "Add Customer":
          ChangeForm(addCustomer)
          break
     }
  }
}