import request from "request";
require("dotenv").config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

function callSendAPI(response) {
    // Construct the message body
    let request_body = {
      recipient: {
        id: sender_psid,
      },
      message: response,
    };
  
    // Send the HTTP request to the Messenger Platform
    request(
      {
        uri: "https://graph.facebook.com/v17.0/me/messages",
        qs: { access_token: PAGE_ACCESS_TOKEN },
        method: "POST",
        json: request_body,
      },
      (err, res, body) => {
        if (!err) {
          console.log("message sent!");
        } else {
          console.error("Unable to send message:" + err);
        }
      }
    );
  }

let handleGetStarted = () => {
    return Promise.resolve(async(resolve, reject) => {
        try {
            let response = { text: "Chào mừng bạn đến với restaurant with VanHoa." };
            await callSendAPI(response)
        } catch (e) {
         reject(e);   
        }
    });
}

module.exports = {
    handleGetStarted: handleGetStarted
}