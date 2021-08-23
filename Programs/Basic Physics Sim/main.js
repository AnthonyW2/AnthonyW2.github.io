
"use strict";

const objectControlContainer = document.getElementById("active-object-list-container");
const simContainer = document.getElementById("sim-container");

var simBoxX = 0;
var simBoxY = 0;
var simBoxWidth = 0;
var simBoxHeight = 0;


var mouseX = 0;
var mouseY = 0;


var running = true;
var timeStep = 20;

//Settings
var applyGravity = true;
var gravityMagnitude = 9.8;
var applyAirResistance = false;
var wallCollisionAbsorbance = 0;


var frameCount = 0;


const totalMomentumElement = document.getElementById("total-momentum");
const totalEnergyElement = document.getElementById("total-energy");
const collisionInfoContainer = document.getElementById("collision-info-container");



var objects = [];

class PhysicsObject {
  
  constructor(id, type, x, y, size, mass){
    
    this.id = id;
    
    // 0 = square
    // 1 = circle
    this.type = type;
    
    this.x = x;
    this.y = y;
    this.size = size;
    
    this.mass = mass;
    
    this.vel = [0,0];
    
    
    this.dragging = false;
    
    
    this.createObjectElement(id);
    
    this.createController(id);
    this.updateSettingsGUI();
    
  }
  
  createObjectElement(id){
    
    this.element = document.createElement("div");
    this.element.id = "object-" + this.id;
    this.element.classList.add("physics-object");
    this.element.innerHTML = this.id;
    simContainer.appendChild(this.element);
    
    this.element.style.left = this.x+"px";
    this.element.style.top = this.y+"px";
    this.element.style.width = this.size+"px";
    this.element.style.height = this.size+"px";
    
    this.element.addEventListener("mousedown", function(event){
      objects[id].pickup(event);
    });
    this.element.addEventListener("mousemove", function(event){
      objects[id].drag(event);
    });
    this.element.addEventListener("mouseup", function(event){
      objects[id].drop(event);
    });
    
  }
  
  createController(id){
    
    this.controllerElement = document.createElement("div");
    this.controllerElement.id = "controller-" + this.id;
    this.controllerElement.classList.add("object-controller");
    
    
    this.controllerElement.innerHTML = "<u>Object " + this.id + "</u><br><br>Velocity:<br>x:";
    
    var controllerVelocityInputX = document.createElement("input");
    controllerVelocityInputX.type = "number";
    controllerVelocityInputX.id = "object-" + this.id + "-vel-input-x";
    controllerVelocityInputX.classList.add("small-input");
    this.controllerElement.appendChild(controllerVelocityInputX);
    
    this.controllerElement.innerHTML += " y:";
    
    var controllerVelocityInputY = document.createElement("input");
    controllerVelocityInputY.type = "number";
    controllerVelocityInputY.id = "object-" + this.id + "-vel-input-y";
    controllerVelocityInputY.classList.add("small-input");
    this.controllerElement.appendChild(controllerVelocityInputY);
    
    this.controllerElement.innerHTML += "<br><br>Displacement:<br>x:";
    
    var controllerDisplacementInputX = document.createElement("input");
    controllerDisplacementInputX.type = "number";
    controllerDisplacementInputX.id = "object-" + this.id + "-dis-input-x";
    controllerDisplacementInputX.classList.add("small-input");
    this.controllerElement.appendChild(controllerDisplacementInputX);
    
    this.controllerElement.innerHTML += " y:";
    
    var controllerDisplacementInputY = document.createElement("input");
    controllerDisplacementInputY.type = "number";
    controllerDisplacementInputY.id = "object-" + this.id + "-dis-input-y";
    controllerDisplacementInputY.classList.add("small-input");
    this.controllerElement.appendChild(controllerDisplacementInputY);
    
    this.controllerElement.innerHTML += "<br><br>Size:<br>";
    
    var controllerSizeInput = document.createElement("input");
    controllerSizeInput.type = "number";
    controllerSizeInput.id = "object-" + this.id + "-size-input";
    controllerSizeInput.classList.add("small-input");
    this.controllerElement.appendChild(controllerSizeInput);
    
    this.controllerElement.innerHTML += "<br><br>Mass:<br>";
    
    var controllerMassInput = document.createElement("input");
    controllerMassInput.type = "number";
    controllerMassInput.id = "object-" + this.id + "-mass-input";
    controllerMassInput.classList.add("small-input");
    this.controllerElement.appendChild(controllerMassInput);
    
    this.controllerElement.innerHTML += "<br><br>";
    
    var controllerRemoveButton = document.createElement("button");
    controllerRemoveButton.innerHTML = "Remove";
    controllerRemoveButton.id = "object-" + this.id + "-remove-button";
    this.controllerElement.appendChild(controllerRemoveButton);
    
    this.controllerElement.innerHTML += "<br><br>";
    
    
    objectControlContainer.appendChild(this.controllerElement);
    
    
    this.controllerVelocityInputX = document.getElementById(controllerVelocityInputX.id);
    this.controllerVelocityInputY = document.getElementById(controllerVelocityInputY.id);
    this.controllerDisplacementInputX = document.getElementById(controllerDisplacementInputX.id);
    this.controllerDisplacementInputY = document.getElementById(controllerDisplacementInputY.id);
    this.controllerSizeInput = document.getElementById(controllerSizeInput.id);
    this.controllerMassInput = document.getElementById(controllerMassInput.id);
    this.controllerRemoveButton = document.getElementById(controllerRemoveButton.id);
    
    
    var updateObjectSettingsFunction = function(){
      objects[id].updateInternalSettings();
    }
    this.controllerVelocityInputX.addEventListener("change", updateObjectSettingsFunction);
    this.controllerVelocityInputY.addEventListener("change", updateObjectSettingsFunction);
    this.controllerDisplacementInputX.addEventListener("change", updateObjectSettingsFunction);
    this.controllerDisplacementInputY.addEventListener("change", updateObjectSettingsFunction);
    this.controllerSizeInput.addEventListener("change", updateObjectSettingsFunction);
    this.controllerMassInput.addEventListener("change", updateObjectSettingsFunction);
    
    this.controllerRemoveButton.addEventListener("click", function(){
      objects[id].destroy();
    });
    
    
  }
  
  updateInternalSettings(){
    
    this.vel[0] = parseInt(this.controllerVelocityInputX.value);
    this.vel[1] = parseInt(this.controllerVelocityInputY.value);
    
    this.setX(parseInt(this.controllerDisplacementInputX.value));
    this.setY(parseInt(this.controllerDisplacementInputY.value));
    
    this.setSize(parseInt(this.controllerSizeInput.value));
    this.setMass(parseInt(this.controllerMassInput.value));
    
  }
  
  updateSettingsGUI(){
    
    this.controllerVelocityInputX.value = this.vel[0];
    this.controllerVelocityInputY.value = this.vel[1];
    
    this.controllerDisplacementInputX.value = this.x;
    this.controllerDisplacementInputY.value = this.y;
    
    this.controllerSizeInput.value = this.size;
    this.controllerMassInput.value = this.mass;
    
  }
  
  pickup(event){
    
    ///console.log("pickup", this);
    
    this.dragging = true;
    
    mouseX = event.clientX;
    mouseY = event.clientY;
    
  }
  
  drag(event){
    
    if(this.dragging){
      
      ///console.log("dragging", this);
      
      var pmouseX = mouseX;
      var pmouseY = mouseY;
      
      mouseX = event.clientX;
      mouseY = event.clientY;
      
      this.setX(this.x + mouseX - pmouseX);
      this.setY(this.y + mouseY - pmouseY);
      
      this.updateSettingsGUI();
      
    }
    
  }
  
  drop(event){
    
    ///console.log("dropped", this);
    
    this.dragging = false;
    
    this.handleWallCollision();
    
  }
  
  runTimeStep(){
    
    if(this.dragging){
      return;
    }
    
    var accel = [0,0];
    
    //Apply gravity
    if(applyGravity){
      accel[1] = gravityMagnitude;
    }
    
    //Apply acceleration to the velocity of the object
    this.vel[0] += accel[0];
    this.vel[1] += accel[1];
    
    //Apply the velocity to the displacement of the object
    this.setX(this.x + this.vel[0]);
    this.setY(this.y + this.vel[1]);
    
    
    this.handleObjectCollisions();
    
    this.handleWallCollision();
    
    
    this.updateSettingsGUI();
    
  }
  
  handleObjectCollisions(){
    
    for(var o = this.id+1;o < objects.length;o ++){
      
      var obj = objects[o];
      
      if(obj != null){
        
        //F = ma
        //p = mv
        
        if(obj.x + obj.size > this.x && obj.x < this.x + this.size && obj.y + obj.size > this.y && obj.y < this.y + this.size){
          
          ///var totalForceX = this.mass*this.vel[0] + obj.mass*obj.vel[0];
          ///var totalForceY = this.mass*this.vel[0] + obj.mass*obj.vel[0];
          
          var horizontalCollision = ( this.x != obj.x && Math.abs((this.y - obj.y)/(this.x - obj.x)) < 1 );
          
          if(horizontalCollision){
            
            var overlap = Math.abs(Math.abs(this.x - obj.x) - this.size/2 - obj.size/2);
            
            if(this.x < obj.x){
              this.setX(this.x - overlap/2);
              obj.setX(obj.x + overlap/2 + 1);
            }else{
              this.setX(this.x + overlap/2);
              obj.setX(obj.x - overlap/2 - 1);
            }
            
            ///console.log("u1",this.vel[0]);
            ///console.log("u2",obj.vel[0]);
            
            if(this.mass == obj.mass){
              var u1 = this.vel[0];
              this.vel[0] = obj.vel[0];
              
              collisionInfoContainer.innerHTML += "Impulse<sub>" + this.id + "</sub> = " + this.mass*(this.vel[0]-u1) + " kg m s<sup>-1</sup><br>";
              collisionInfoContainer.innerHTML += "Impulse<sub>" + obj.id + "</sub> = " + obj.mass*(u1-obj.vel[0]) + " kg m s<sup>-1</sup><br>";
              
              obj.vel[0] = u1;
              
            }else{
              var u1 = this.vel[0];
              var u2 = obj.vel[0];
              var m1 = this.mass;
              var m2 = obj.mass;
              var mt = m1 + m2;
              
              this.vel[0] = u1*(m1 - m2)/mt + u2*2*m2/mt;
              obj.vel[0]  = u1*2*m1/mt + u2*(m2 - m1)/mt;
              
              collisionInfoContainer.innerHTML += "Impulse<sub>" + this.id + "</sub> = " + m1*(this.vel[0]-u1) + " kg m s<sup>-1</sup><br>";
              collisionInfoContainer.innerHTML += "Impulse<sub>" + obj.id + "</sub> = " + m2*(obj.vel[0]-u2) + " kg m s<sup>-1</sup><br>";
              
            }
            
            ///console.log("v1",this.vel[0]);
            ///console.log("v2",obj.vel[0]);
            
          }else{
            
            var overlap = Math.abs(Math.abs(this.y - obj.y) - this.size/2 - obj.size/2);
            
            if(this.y < obj.y){
              this.setY(this.y - overlap/2);
              obj.setY(obj.y + overlap/2 + 1);
            }else{
              this.setY(this.y + overlap/2);
              obj.setY(obj.y - overlap/2 - 1);
            }
            
            ///console.log("u1",this.vel[0]);
            ///console.log("u2",obj.vel[0]);
            
            if(this.mass == obj.mass){
              var u1 = this.vel[1];
              this.vel[1] = obj.vel[1];
              obj.vel[1] = u1;
            }else{
              var u1 = this.vel[1];
              var u2 = obj.vel[1];
              var m1 = this.mass;
              var m2 = obj.mass;
              var mt = m1 + m2;
              
              this.vel[1] = u1*(m1 - m2)/mt + u2*2*m2/mt;
              obj.vel[1]  = u1*2*m1/mt + u2*(m2 - m1)/mt;
            }
            
            ///console.log("v1",this.vel[0]);
            ///console.log("v2",obj.vel[0]);
            
          }
          
        }
        
      }
      
    }
    
  }
  
  //Keep the object in-bounds
  handleWallCollision(){
    
    if(this.x < 0){
      this.setX(0);
      this.vel[0] = this.vel[0] * (1-wallCollisionAbsorbance);
      if(this.vel[0] < 0){
        this.vel[0] = -this.vel[0];
      }
    }
    if(this.x + this.size > simBoxWidth){
      this.setX(simBoxWidth - this.size);
      this.vel[0] = this.vel[0] * (1-wallCollisionAbsorbance);
      if(this.vel[0] > 0){
        this.vel[0] = -this.vel[0];
      }
    }
    
    if(this.y < 0){
      this.setY(0);
      this.vel[1] = this.vel[1] * (1-wallCollisionAbsorbance);
      if(this.vel[1] < 0){
        this.vel[1] = -this.vel[1];
      }
    }
    if(this.y + this.size > simBoxHeight){
      this.setY(simBoxHeight - this.size);
      this.vel[1] = this.vel[1] * (1-wallCollisionAbsorbance);
      if(this.vel[1] > 0){
        this.vel[1] = -this.vel[1];
      }
    }
    
  }
  
  getAbsVel(){
    return Math.sqrt(this.vel[0]*this.vel[0] + this.vel[1]*this.vel[1]);
  }
  
  setX(x){
    this.x = x;
    this.element.style.left = x+"px";
  }
  
  setY(y){
    this.y = y;
    this.element.style.top = y+"px";
  }
  
  setSize(size){
    this.size = size;
    this.element.style.width = this.size+"px";
    this.element.style.height = this.size+"px";
  }
  
  setMass(mass){
    this.mass = mass;
  }
  
  destroy(){
    
    objects[this.id] = null;
    
    this.element.remove();
    this.controllerElement.remove();
    
  }
  
}



function newObject(){
  
  objects[objects.length] = new PhysicsObject(
    objects.length,                //id
    0,                             //type
    Math.round(simBoxWidth/2)-50,  //x
    Math.round(simBoxHeight/2)-50, //y
    100,                           //size
    10                             //mass
  );
  
}



function runTimeStep(){
  
  if(running){
    
    ///var totalMomentum = 0;
    var totalEnergy = 0;
    
    //Run the time-step function of each object
    for(var o = 0;o < objects.length;o ++){
      if(objects[o] != null){
        
        objects[o].runTimeStep();
        
        ///totalMomentum += objects[o].mass * objects[o].getAbsVel();
        totalEnergy += objects[o].mass * (objects[o].vel[0]*objects[o].vel[0] + objects[o].vel[1]*objects[o].vel[1]) / 2;
        
      }
    }
    
    frameCount ++;
    
    
    
    ///totalMomentumElement.innerHTML = totalMomentum + " kg m s<sup>-1</sup>";
    totalEnergyElement.innerHTML = totalEnergy + " J";
    
    //Run the next time-step after a delay
    window.setTimeout(runTimeStep, timeStep);
    
  }
  
}

function pause(){
  running = false;
  document.getElementById("pause-button").hidden = true;
  document.getElementById("run-button").hidden = false;
}

function run(){
  running = true;
  runTimeStep();
  document.getElementById("pause-button").hidden = false;
  document.getElementById("run-button").hidden = true;
}



function init(){
  
  //Define the simulation bounds
  var simBoxDimensions = simContainer.getBoundingClientRect();
  simBoxX = simBoxDimensions.x;
  simBoxY = simBoxDimensions.y;
  simBoxWidth = simBoxDimensions.width;
  simBoxHeight = simBoxDimensions.height;
  
  //Make sure the simulation settings match the visible ones
  updateSettings();
  
  //Start the physics loop
  runTimeStep();
  
}



function updateSettings(){
  
  applyGravity = !!document.getElementById("gravity-checkbox").checked;
  
  applyAirResistance = !!document.getElementById("air-resistance-checkbox").checked;
  
  wallCollisionAbsorbance = parseInt(document.getElementById("wall-energy-absorbance-input").value)/100;
  
  timeStep = parseInt(document.getElementById("timestep-length-input").value);
  
  ///console.log(applyGravity);
  ///console.log(applyAirResistance);
  ///console.log(wallCollisionAbsorbance);
  ///console.log(timeStep);
  
}






