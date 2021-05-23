const axios = require("axios");
const Table = require("tty-table");
const chalk = require("chalk");
const notifier = require("node-notifier");
const { config, options } = require("./config");
const io = require("socket.io")();


//var inquirer = require("inquirer");

//module.exports = function () {

async function slots(req, res) {
  var date = new Date();
  var todaysDate = `${date.getDate()}-${String(date.getMonth() + 1).padStart(
    2,
    "0"
  )}-${date.getFullYear()}`;
  var answers = { choice : ""};
      axios
        .get(
          `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=770&date=${todaysDate}`,
          config
        )
        .then(function (response) {
          // handle success
          //   console.table(response.data.states);
          let header = [
            {
              value: "center",
              headerColor: "cyan",
              color: "white",
              align: "left",
              alias: "Center Name",
              width: 40,
            },
            {
              value: "address",
              color: "red",
              alias: "Center Address",
              width: 40,
            },
            {
              value: "available",
              color: "red",
              alias: "Available Slot",
              width: 20,
            },
            {
              value: "age",
              color: "red",
              alias: "Age",
              width: 10,
            },
            {
              value: "date",
              color: "red",
              alias: "Date",
              width: 20,
            },
          ];
          //   const out = Table(header,response.data.centers,options).render()
          // console.log(response.data.centers); //prints output
          var finalData = [];
          var latlong = [];
          var districtName;
          response.data.centers.forEach((item) => {
            districtName = item.district_name;
            item.sessions.forEach((session) => {

              if(session.available_capacity > 0) {
                let ourData = {
                  center: item.name,
                  address: item.address,
                  available: session.available_capacity,
                  age: session.min_age_limit,
                  date: session.date,
                  long: item.long,
                  lat : item.lat,
                  pincode : item.pincode 
                };
                finalData.push(ourData);
                latlong.push([ourData.center, ourData.lat, ourData.long, ourData.pincode])

                  

              }
            });
          });

          //res.send(latlong);
           const out = Table(header, finalData, options).render();
          console.log(
            chalk.blue.bgGreen.bold(`Date for which run ->${todaysDate}`)
          );
          console.log(chalk.blue.bgGreen.bold(`District ->${districtName}`));
          console.log(out);

          global.socket.emit('counter', { data: finalData }); // This will emit the event to all connected sockets
          
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        });
};

module.exports.slots = slots; 