// C++ code
//
int distanceThreshold = 0;

int cm = 0;

int inches = 0;

long readUltrasonicDistance(int triggerPin, int echoPin)
{
  pinMode(triggerPin, OUTPUT);  // Clear the trigger
  digitalWrite(triggerPin, LOW);
  delayMicroseconds(2);
  // Sets the trigger pin to HIGH state for 10 microseconds
  digitalWrite(triggerPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(triggerPin, LOW);
  pinMode(echoPin, INPUT);
  // Reads the echo pin, and returns the sound wave travel time in microseconds
  //Serial.println(pulseIn(echoPin, HIGH));
  return pulseIn(echoPin, HIGH);
}

void setup()
{
  Serial.begin(9600);
  pinMode(2, OUTPUT);
  pinMode(4, OUTPUT);
}

void loop()
{
  // set threshold distance to activate LEDs
  distanceThreshold = 350;
  // measure the ping time in cm
  cm = 0.01723 * readUltrasonicDistance(7, 6);
  Serial.println(cm);
  // convert to inches by dividing by 2.54
  inches = (cm / 2.54);
  //Serial.print(cm);
  //Serial.print("cm, ");
  //Serial.print(inches);
  //Serial.println("in");
  if (cm > 250) {
    digitalWrite(2, HIGH);
    digitalWrite(4, LOW);
  }
  if (cm > 75 && cm < 250) {
    digitalWrite(2, LOW);
    digitalWrite(4, LOW);
  }
  if (cm < 75) {
    digitalWrite(2, LOW);
    digitalWrite(4, HIGH);
  }
  
  delay(100); // Wait for 100 millisecond(s)
}