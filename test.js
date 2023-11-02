const test =
  '{ "raw": "{\\"text\\":\\"Request Submitted\\",\\"EntreeSelectVal\\":\\"chicken\\",\\"SideVal\\":\\"rice\\",\\"DrinkVal\\":\\"coffee\\",\\"taskType\\":\\"dispatch_job\\",\\"taskCategory\\":\\"room_service\\"}", "pre_engagement_data": {\n' +
  '"friendly_name": "John Tan", "email": "johntan@gmailx.com"}}';

const parsedTest = JSON.parse(test);
console.log(parsedTest);

const parsedTest2 = JSON.parse(parsedTest.raw);
console.log(parsedTest2);

const parsedTest3 = JSON.parse(parsedTest.pre_engagement_data);
console.log(parsedTest3);
