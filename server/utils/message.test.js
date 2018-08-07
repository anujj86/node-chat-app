var expect = require('expect');
var {generateMessage, generateLocationMessage}  = require('./message');

describe('generateMessage', () => {
   it('should generate correct message object', () => {

       var from = 'Jen';
       var text = 'Some message';
       var message = generateMessage(from, text);

       expect(typeof message.createdAt).toBe('number');
       expect(message).toMatchObject({from, text});
   });

});

describe('generateLocationMessage', () => {
  it('should generate correct Location object', () => {
    var from = 'Admin';
    var lat = 15;
    var lng = 19;
    var url = `https://www.google.com/maps?q=${lat},${lng}`;
    var message = generateLocationMessage(from, lat, lng);

    expect(typeof message.createdAt).toBe('number');
    expect(message).toMatchObject({from, url});
  })
});
