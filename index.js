const e = require('express');
const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const db = require("./db/db")
const{ Data } = require("./model/data.model")

setInterval(() => {
  fetch("http://134.209.159.245:7000/match-list?token=T1456789plijnyhbfvrdcsdfghj")
          .then((o) => {
            var foundUsers = o.json()
            foundUsers.then(async (o) => {
                if(o.status!=1) throw { error: "some error occured"}
                const filteredRes = o.result.result.filter(o=>o.sportId==="4")
                if(filteredRes.length==0) return;
                const mappedRes = filteredRes.map(o=>{
                 
                  const {  eventId, eventName, marketId } = o;
                  return {
                    eventId, 
                    eventName, 
                    marketId
                  }
                })
                  for (const iterator of mappedRes) {
                    try {
                      fetch(`http://134.209.159.245:7000/match-data/${iterator.marketId}?token=T1456789plijnyhbfvrdcsdfghj`).then((o)=>
                      {
                          if(o.status!=200) console.log("some error occured in match data");
                          console.log(iterator.marketId);
                          var foundData = o.json();
                          foundData.then((o)=>
                          {
                            if(o.result[Object.keys(o.result)[0]].diamond) { let diamondData = JSON.parse(o.result[Object.keys(o.result)[0]].diamond) 
                            console.log("diamondData",diamondData.data.t3[0].nat,diamondData.data.t3[0].sid,diamondData.data.t3[0].mid);
                            
                           }
                           if(o.result[Object.keys(o.result)[0]].skyf) { let skyfData = JSON.parse(o.result[Object.keys(o.result)[0]].skyf) 
                            console.log("skyfData",skyfData.data.t3[0].nat,skyfData.data.t3[0].mid,skyfData.data.t3[0].sid);
                            
                           }
                           if(o.result[Object.keys(o.result)[0]].skyo) { let skyoData = JSON.parse(o.result[Object.keys(o.result)[0]].skyo) 
                            console.log("skyoData",skyoData.data.t3[0].nat, skyoData.data.t3[0].mid, skyoData.data.t3[0].sid);
                            
                           }
                           if(o.result[Object.keys(o.result)[0]].skyb) { let skybData = JSON.parse(o.result[Object.keys(o.result)[0]].skyb) 
                            console.log("skybData",skybData.data.t3[0].nat,skybData.data.t3[0].sid,skybData.data.t3[0].mid);
                            
                           }
                           if(o.result[Object.keys(o.result)[0]].world) { let worldData = JSON.parse(o.result[Object.keys(o.result)[0]].world) 
                            
                           }
                           if(o.result[Object.keys(o.result)[0]].bull) { let bullData = JSON.parse(o.result[Object.keys(o.result)[0]].bull) 
                          console.log("bullData",bullData.data.t3[0].nat, bullData.data.t3[0].mid, bullData.data.t3[0].sid);
                            
                           }

                            // if(o.diamond) console.log("my response",o.diamond);
                            // if(o.skyf) console.log("my response",o.skyf);
                            // if(o.skyo) console.log("my response",o.skyo);
                            // if(o.skyb) console.log("my response",o.skyb);

                          
                            
                          })

                      }).catch((error)=>
                      {
                        console.log(error);
                      })
                      const isEventIdExist = await Data.findOne({eventId:iterator.eventId})
                      if(isEventIdExist) continue;
                      const insertedDoc = await new Data(iterator).save()
                      if(!insertedDoc) console.log("some error occured while creating new data");
                      else console.log("data created");  


                    } catch (error) {
                      console.log(error);
                    }
                    
                  }
                 
               
               
            })
            return;
          }).catch((err)=>
          {
            throw err;
          })
}, 5000);
 

app.get("/",(req,res)=>
{
    res.json({message:"Welcome to Server"})
})

const PORT = process.env.port || 3000 ;
app.listen(PORT,(err)=>
{
if(err) throw err;
else console.log(`Server is running on port ${process.env.port}`);

})