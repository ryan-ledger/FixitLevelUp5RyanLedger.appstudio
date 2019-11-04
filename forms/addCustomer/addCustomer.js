addCustomer.onshow=function(){
      drpCustomer2.clear()
    let query = "SELECT name FROM customer"
    req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=rle54222&pass=Plye4544&database=rle54222&query=" + query)
  if (req1.status == 200) {
    results = JSON.parse(req1.responseText)
    if (results.length == 0)
        MSB.MsgBox("Please enter values")
    else {        
        let message = ""
        for (i = 0; i <= results.length - 1; i++){
            message = results[i][0]
            drpCustomer2.addItem(message)
        }
     }
  } else{
      NSB.MsgBox("Error")
}


btnSubmitCustomer.onclick=function(){
  let newCustomer = inptName.value
  let newCity = inpNewCity.value
  let newStreet = inpNewStreet.value
  let newState = inpNewState.value
  let newZipCode = inpNewZip.value
  let queryInsert = "INSERT INTO customer (name,street,city,state,zipcode) VALUES ('"+newCustomer+"', '"+newStreet+"', '"+newCity+"','"+ newState+"'," +newZipCode+")"
    req2 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=rle54222&pass=Plye4544&database=rle54222&query=" + queryInsert)
    if (req2.status == 200) {
        if (req2.responseText == 500) {
            drpCustomer2.clear()
            let message = ""
            let queryNew1="SELECT name FROM customer"
            req3 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=rle54222&pass=Plye4544&database=rle54222&query=" + queryNew1)
                if (req3.status==200){
                  results=JSON.parse(req3.responseText)
                  let message = ""
                  for (i=0; i <= results.length-1; i++){
                      message = results[i][0]
                      drpCustomer2.addItem(message)
                  }
                 let query4 = "SELECT * FROM customer WHERE name=" + '"' + newCustomer + '"'
                      req4 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=rle54222&pass=Plye4544&database=rle54222&query=" + query4)
                         if (req4.status == 200) {
                               results = JSON.parse(req4.responseText)
                               let message2 = ""
                               for (i = 1; i <= 5; i++)
                                   message2 = message2 + results[0][i] + ", "
                               mod1.value = message2
                               mod1.footer= newName2
                      }      
                      mod1.toggle()
               }
        }else{
            NSB.MsgBox("Problem adding to the database.")
        }
    } else {
        NSB.MsgBox("Error: " + req1.status)
    }  
}

hmbNav3.onclick=function(s){
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
