
const timestamp = Date.now(); 
//get all book data from books api
export  async function getallbooks()
 {  
  const res = await fetch("https://simple-books-api.glitch.me/books");
  if (!res.ok) throw new Error("faied to fetch data");
  return res.json();
}


const getAndPostData = async (abc:number) => {
 // after fetchinng post data to vercel database
    try {   
                const bookData: books[] = await getallbooks();
      const response = await fetch (` http://localhost:3000/api/bookassignment?timestamp=${timestamp}`, 
      {
        method: "POST",
        headers: 
        {
          "Content-Type": "application/json",  
        },
        body: JSON.stringify(bookData[abc])
      });
  
      console.log(response)
  
      if (response.ok) {
  
        const data = await response.json();
        console.log(data)
        console.log("Data posted successfully",data);
    
      } 
      else {
        console.error("Failed to post data");
      }
    } 
    catch (error) {
      console.error("Error:", error);
    }
  };
  export {getAndPostData}


//getdatafromverceldatabase



const getdatafromvercel= async(id:number)=>{
          
 
 try {
  
  console.log("helo")
  const response = await fetch  (` http://localhost:3000/api/bookassignment?timestamp=${timestamp}` ,
  {
    method: "GET",
    headers: 
    {

      "Content-Type": "application/json",  
            "id":`${ isNaN(id) ? null : id}`,
    },
    
    
  }

  );
 

  if (response.ok) 
  {
  
    console.log("Get Data from vercel  successfully");

  } 
  else {
    console.error("Failed to get data");
  }
} 
 catch (error) 
 {
  console.log('Erroe:',error)
 } 
}


export { getdatafromvercel}