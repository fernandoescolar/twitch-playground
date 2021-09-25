const request = require('request');

module.exports = {
  // compoletes the sentence using open AI API by davinci's engine
  complete: function(sentence, callback) {
    var options = {
      method: 'POST',
      url: 'https://api.openai.com/v1/engines/davinci/completions',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.OPENAI_TOKEN
      },
      body: JSON.stringify({
        prompt: sentence,
        max_tokens: 20
      })
    };
    request(options, function(error, response, body) {
      if (error) throw new Error(error);
      callback(body);
    });
  }
};
