class Car {

  setSound(sound) {
    this.sound = sound;
  }
  
  getSound = () => {
    return this.sound;
  }
}

const car = new Car();

car.setSound('부르르릉');
car.getSound(); //부르르릉

const truck = {
  sound: '부와아아ㅏㅏㅏㅏㅏㅏㅏㅏ앙',
  driveee: car.getSound
}

truck.driveee() // '부와아아아ㅏㅏㅏㅏ앙'

const sound = car.getSound;
sound()
undefine