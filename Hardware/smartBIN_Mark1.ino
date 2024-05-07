#include <HCSR04.h>
#include <Servo.h>

#define bin_depth 13


UltraSonicDistanceSensor WasteLevel(5, 6);

void setup() {
  // put your setup code here, to run once:
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  Serial.println("Current Wastelevel :");
  Serial.println(-(WasteLevel.measureDistanceCm()-bin_depth));

  delay(500);
}







