deleteUpdateCustomer.onshow=function(){
   drpCustomer1.clear()
  let query = "SELECT name FROM customer"
  req1 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=rle54222&pass=Plye4544&database=rle54222&query=" + query)
 
  if (req1.status == 200) {
    let results = JSON.parse(req1.responseText)
    if (results.length == 0)
        txtResults1.value("Error")
      else {  
        let output = ""
        for (i = 0; i <= results.length - 1; i++){
            output = output + results[i][0] + "\n"
            drpCustomer1.addItem(results[i][0])
        }
     }
  } 
  
drpCustomer1.onclick=function(s){
  if (typeof(s) == "object"){  
    return                  
  } else {
    drpCustomer1.value = s  
  }
}


btnDeleteCustomer.onclick=function(){
  if (rdoPick.value ==0){
  let updatedNam1e = drpCustomer1.value    
    let found = false
    for (i = 0; i <= results.length - 1; i++) {
        if (newName == results[i][0])
            found = true
    }
    if (found == false)
       NSB.MsgBox("Name not present")
    else if (found == true) {
      let queryDelete = "DELETE FROM customer WHERE name = " + '"' + newName + '"'
      req4 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=rle54222&pass=Plye4544&database=rle54222&query=" + queryDelete)
      if (req4.status == 200) {
        if (req4.responseText == 500){
            let message = ""
            for (i=0; i <= results.length-1; i++){
                let querySelect="SELECT name FROM customer"
                req5 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=rle54222&pass=Plye4544&database=rle54222&query=" + querySelect)
                if (req5.status==200){
                  results=JSON.parse(req5.responseText)
                  let message = ""
                  for (i=0; i <= results.length-1; i++)
                      message = message + results[i][0] + "\n"
                  txtResults1.value = message
                }else{
                  NSB.MsgBox("Error: " + req1.status)
                }
            }
        }else{
            NSB.MsgBox("Error when trying to delete selected name")
        }
      } else {
        NSB.MsgBox("Error: " + req5.status);
      }  
}
  
btnUpdateCustomer.onclick=function(){
  let pastName = drpCustomer1.selection
   let updatedtName1 = iptUpdatedCustomer.value
   let query2 = "UPDATE customer SET name =" + '"' + updatedName1 + '"' + " WHERE name = " + '"' + pastName + '"'
   req2 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=rle54222&pass=Plye4544&database=rle54222&query=" + query2)
   if (req2.status == 200) {
        if (req2.responseText == 500) {
            var results2 = JSON.parse(req2.responseText)
            let query3 = "SELECT name FROM customer"
            req3 = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=rle54222&pass=Plye4544&database=rle54222&query=" + query3)
            if (req3.status == 200) {
               let results3 = JSON.parse(req3.responseText)
               if (results3.length == 0)
                     txtResults1.value("Company doesn't exist")
                else {        
                   console.log("Parsed value for result3 is " + results3)
                   console.log("First array value is " + results3[0][0])
                   let message2 = ""
                   for (i = 1; i <= results3.length-1; i++)
                     message2 = message2 + results3[i] + "\n"
                  txtResults1.value = message2
                 }
           }else
               NSB.MsgBox("Error")
      } else
          NSB.MsgBox("Error updating name.")
    }
  }
}

hmbBtn1.onclick=function(s){
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