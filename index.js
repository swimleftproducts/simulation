//global vars
let robots;

//config
const timeInc = 5; //sec
const simLength = 1 // hr
const unitArea = 10 //cm

//simulation data store
const generalStore ={
  devices : [{uuid:1}],  //uuid for each robot
  physicalSpace : [[0,0,0,0,0,0,0],[0,1,1,1,1,1,0],[0,1,1,1,1,1,0],[0,1,1,1,1,1,0],[0,1,1,1,1,1,0],[0,1,1,1,1,1,0],[0,0,0,0,0,0,0]],
   // 1 is permissible entry, 0 is not permissible. Above array defines a .5m x .5m area bound on all sides by walls
  environment : {
    light:[[0,0,0,0,0,0,0],[0,1,1,1,1,1,0],[0,1,1,1,1,1,0],[0,1,1,1,1,1,0],[0,1,1,1,1,1,0],[0,1,1,1,1,1,0],[0,0,0,0,0,0,0]]
    // environment maps an environment value to the physical space values. In the future, the environment values could be time dependent
  }
};

const deviceStore ={
  1: {
    //all data for the each device is stored here
  }

}

//simulation process
const simulationProcess= ()=>{
  const deviceActions = ioService.receiveDataFromDevices() //returns array
  const returnIO = generalStore.devices.map(device=>{
    //code here to model the device
    console.log(deviceActions)
    
  })
  ioService.sendDataToDevices(returnIO) // this calls the IO service with array of objects
} /// 

//IO service
const ioService = {
  sendDataToDevices(returnIO){
    console.log('sent data')
    returnIO.map(robot=>{
     console.log('sending updated info to robot')
    })
  },
  receiveDataFromDevices(){
    //pulls results from calculation of each robot
    // returns an array [uuid:{},uuid:{}, etc] 
   return generalStore.devices.map(robot=>{
      return robots[robot.uuid].currentOutput
    })
  }
}

// query service
console.log(deviceStore)




//____________________________________________________________________-
// for testing only now
robots = {
 1:{
  controlLogic(){
    
  },
  oldInput:{

  },
  oldOutput:{

  },
  currentInput:{

  },
  currentOutput:{
    speed:1
  }}
}


// control service

//if fixed time use for loop... maybe be open ended in future?
for (let i = 0; i < (simLength*60*60/timeInc);i++) {
  //check for command to stop, pause, add new machine, etc.
  simulationProcess()
}