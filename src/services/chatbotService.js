import request from "request";
require("dotenv").config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;

const IMAGE_GET_STARTED = "https://bit.ly/eric-bot1";
const IMAGE_MAIN_MENU_2 = "https://bit.ly/eric-bot-2";
const IMAGE_MAIN_MENU_3 = "https://bit.ly/eric-bot-3";
const IMAGE_MAIN_MENU_4 = "https://bit.ly/eric-bot-4";

const IMAGE_VIEW_APPETIZERS = "https://bit.ly/eric-bot-5";
const IMAGE_VIEW_FISH = "https://bit.ly/eric-bot-6";
const IMAGE_VIEW_MEAT = "https://bit.ly/eric-bot-7";

const IMAGE_BACK_MAIN_MENU = "https://bit.ly/eric-bot-8";

const IMAGE_DETAIL_APPETIZER_1 = "https://bit.ly/eric-bot-9";
const IMAGE_DETAIL_APPETIZER_2 = "https://bit.ly/eric-bot-10";
const IMAGE_DETAIL_APPETIZER_3 = "https://bit.ly/eric-bot-11";

const IMAGE_DETAIL_FISH_1 = "https://bit.ly/eric-bot-12";
const IMAGE_DETAIL_FISH_2 = "https://bit.ly/eric-bot-13-1";
const IMAGE_DETAIL_FISH_3 = "https://bit.ly/eric-bot-14";

const IMAGE_DETAIL_MEAT_1 = "https://bit.ly/eric-bot-15";
const IMAGE_DETAIL_MEAT_2 = "https://bit.ly/eric-bot-16";
const IMAGE_DETAIL_MEAT_3 = "https://bit.ly/eric-bot-17";

const IMAGE_DETAIL_ROOMS = "https://bit.ly/eric-bot-18";

const IMAGE_GIF_WELCOME = "https://bit.ly/eric-bot-1-2";

async function callSendAPI(sender_psid, response) {
  return new Promise(async(resolve, reject) => {
    try {
      // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    message: response,
  };

  await sendMarkReadMessage(sender_psid);
  await sendTypingon(sender_psid);

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
        resolve("message sent!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
    } catch (e) {
      reject(e);
    }
  })
  
}

function sendTypingon(sender_psid, response) {
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    sender_action: "typing_on",
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
        console.log("sendTypingon sent!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
}

function sendMarkReadMessage(sender_psid, response) {
  // Construct the message body
  let request_body = {
    recipient: {
      id: sender_psid,
    },
    sender_action: "mark_seen",
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
        console.log("sendTypingon sent!");
      } else {
        console.error("Unable to send message:" + err);
      }
    }
  );
}

function getUserName(sender_psid, response) {
  return new Promise(function (resolve, reject) {
    // Send the HTTP request to the Messenger Platform
    request(
      {
        uri: `https://graph.facebook.com/${sender_psid}?fields=first_name,last_name,profile_pic&access_token=${PAGE_ACCESS_TOKEN}`,
        qs: { access_token: PAGE_ACCESS_TOKEN },
        method: "GET",
      },
      (err, res, body) => {
        console.log(body);
        if (!err) {
          body = JSON.parse(body);
          let username = `${body.last_name} ${body.first_name}`;
          resolve(username);
        } else {
          console.error("Unable to send message:" + err);
          reject(err);
        }
      }
    );
  });
}

let handleGetStarted = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let username = await getUserName(sender_psid);
      let response1 = {
        text: `Chào mừng ${username} đến với restaurant with VanHoa.`,
      };
      // let response2 = getStartedTemplate(sender_psid);
      let response2 = getImageGetStartedTemplate(sender_psid);
      console.log(response2);
      let response3 = getStartedQuickReplyTemplate(sender_psid);

      // send text message
      await callSendAPI(sender_psid, response1);

      // send an image
      await callSendAPI(sender_psid, response2);

      // send quick reply
      await callSendAPI(sender_psid, response3);

      resolve("done");
    } catch (e) {
      reject(e);
    }
  });
};

let getStartedTemplate = (senderID) => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Nhà hàng VanHoa kính chào quý khách",
            subtitle: "Dưới đây là các lựa chọn của nhà hàng",
            image_url: IMAGE_GET_STARTED,
            buttons: [
              {
                type: "postback",
                title: "MENU CHÍNH",
                payload: "MAIN_MENU",
              },
              {
                type: "web_url",
                url: `${process.env.URL_WEB_VIEW_ORDER}/${senderID}`,
                title: "ĐẶT BÀN",
                webview_height_ratio: "tall",
                messenger_extensions: true,
              },
              {
                type: "postback",
                title: "HƯỚNG DẪN SỬ DỤNG Bot",
                payload: "GUIDE_TO_USE",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};

let getImageGetStartedTemplate = () => {
  let response = {
    attachment: {
      type: "image",
      payload: {
        url: IMAGE_GIF_WELCOME,
        is_reusable: true,
      },
    },
  };

  return response;
};

let getStartedQuickReplyTemplate = () => {
  let response = {
    text: "Dưới đây là các lựa chọn của nhà hàng:",
    quick_replies: [
      {
        content_type: "text",
        title: "MENU CHÍNH",
        payload: "MAIN_MENU",
      },
      {
        content_type: "text",
        title: "ĐẶT BÀN",
        payload: "<POSTBACK_PAYLOAD>",
      },
      {
        content_type: "text",
        title: "HD SỬ DỤNG BOT",
        payload: "GUIDE_TO_USE",
      },
    ],
  };
  return response;
};

let handleSendMainMenu = (sender_psid) => {
  console.log("check");
  return new Promise(async (resolve, reject) => {
    try {
      let response1 = getMainMenuTemplate(sender_psid);

      // send text message
      await callSendAPI(sender_psid, response1);

      resolve("done");
    } catch (e) {
      reject(e);
    }
  });
};

let getMainMenuTemplate = (senderID) => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Menu của nhà hàng",
            subtitle:
              "Chúng tôi hân hạnh mang đến cho bạn thực đơn phong phú cho bữa trưa hoặc bữa tối",
            image_url: IMAGE_MAIN_MENU_2,
            buttons: [
              {
                type: "postback",
                title: "BỮA TRƯA",
                payload: "LUNCH_MENU",
              },
              {
                type: "postback",
                title: "BỮA TỐI",
                payload: "DINNER_MENU",
              },
            ],
          },
          {
            title: "Giờ mở cửa",
            subtitle: "T2 -T6 10AM - 11PM | T7 5PM - 10PM | CN 5PM - 9PM",
            image_url: IMAGE_MAIN_MENU_3,
            buttons: [
              {
                type: "web_url",
                url: `${process.env.URL_WEB_VIEW_ORDER}/${senderID}`,
                title: "ĐẶT BÀN",
                webview_height_ratio: "tall",
                messenger_extensions: true,
              },
            ],
          },
          {
            title: "Không gian nhà hàng",
            subtitle:
              "Nhà hàng có sức chứa lên đến 300 khách ngồi và phục vụ các bữa tiệc lớn",
            image_url: IMAGE_MAIN_MENU_4,
            buttons: [
              {
                type: "postback",
                title: "CHI TIẾT",
                payload: "SHOW_ROOMS",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};

let handleSendLunchMenu = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response1 = getLunchMenuTemplate();

      // send text message
      await callSendAPI(sender_psid, response1);

      // send generic template message
      await callSendAPI(sender_psid, response2);

      resolve("done");
    } catch (e) {
      reject(e);
    }
  });
};

let getLunchMenuTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Món tráng miệng",
            subtitle: "Nhà hàng có nhiều món tráng miệng hấp dẫn",
            image_url: IMAGE_VIEW_APPETIZERS,
            buttons: [
              {
                type: "postback",
                title: "XEM CHI TIẾT",
                payload: "VIEW_APPETIZERS",
              },
            ],
          },
          {
            title: "Cá bảy màu",
            subtitle: "Cá nước mặn và cá nước ngọt",
            image_url: IMAGE_VIEW_FISH,
            buttons: [
              {
                type: "postback",
                title: "XEM CHI TIẾT",
                payload: "VIEW_FISH",
              },
            ],
          },
          {
            title: "Thịt hun khối",
            subtitle: "Đảm bảo chất lượng hàng đầu",
            image_url: IMAGE_VIEW_MEAT,
            buttons: [
              {
                type: "postback",
                title: "XEM CHI TIẾT",
                payload: "VIEW_MEAT",
              },
            ],
          },
          {
            title: "Quay trở lại",
            subtitle: "Quay trở lại Menu chính",
            image_url: IMAGE_BACK_MAIN_MENU,
            buttons: [
              {
                type: "postback",
                title: "QUAY TRỞ Lại",
                payload: "BACK_TO_MAIN_MENU",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};

let handleSendDinnerMenu = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response1 = getDinnerMenuTemplate();

      // send text message
      await callSendAPI(sender_psid, response1);

      resolve("done");
    } catch (e) {
      reject(e);
    }
  });
};

let getDinnerMenuTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Món tráng miệng",
            subtitle: "Nhà hàng có nhiều món tráng miệng hấp dẫn",
            image_url: IMAGE_VIEW_APPETIZERS,
            buttons: [
              {
                type: "postback",
                title: "XEM CHI TIẾT",
                payload: "VIEW_APPETIZERS",
              },
            ],
          },
          {
            title: "Cá bảy màu",
            subtitle: "Cá nước mặn và cá nước ngọt",
            image_url: IMAGE_VIEW_FISH,
            buttons: [
              {
                type: "postback",
                title: "XEM CHI TIẾT",
                payload: "VIEW_FISH",
              },
            ],
          },
          {
            title: "Thịt hun khối",
            subtitle: "Đảm bảo chất lượng hàng đầu",
            image_url: IMAGE_VIEW_MEAT,
            buttons: [
              {
                type: "postback",
                title: "XEM CHI TIẾT",
                payload: "VIEW_MEAT",
              },
            ],
          },
          {
            title: "Quay trở lại",
            subtitle: "Quay trở lại Menu chính",
            image_url: IMAGE_BACK_MAIN_MENU,
            buttons: [
              {
                type: "postback",
                title: "QUAY TRỞ Lại",
                payload: "BACK_TO_MAIN_MENU",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};

let handleBackToMainMenu = async (sender_psid) => {
  await handleSendMainMenu(sender_psid);
};

let handleDetailViewAppetizers = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response1 = getDetailViewAppetizersTemplate();

      // send text message
      await callSendAPI(sender_psid, response1);

      resolve("done");
    } catch (e) {
      reject(e);
    }
  });
};

let getDetailViewAppetizersTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Dưa hấu Vmart",
            subtitle: "50.000đ/1kg",
            image_url: IMAGE_DETAIL_APPETIZER_1,
          },
          {
            title: "Xoài",
            subtitle: "20.000đ/1kg",
            image_url: IMAGE_DETAIL_APPETIZER_2,
          },
          {
            title: "Ổi",
            subtitle: "30.000đ/1kg",
            image_url: IMAGE_DETAIL_APPETIZER_3,
          },
          {
            title: "Quay trở lại",
            subtitle: "Quay trở lại Menu chính",
            image_url: IMAGE_BACK_MAIN_MENU,
            buttons: [
              {
                type: "postback",
                title: "QUAY TRỞ Lại",
                payload: "BACK_TO_MAIN_MENU",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};

let handleDetailViewFish = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response1 = getDetailViewFishTemplate();

      // send text message
      await callSendAPI(sender_psid, response1);

      resolve("done");
    } catch (e) {
      reject(e);
    }
  });
};

let getDetailViewFishTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Cá hồi châu âu",
            subtitle: "150.000đ/1kg",
            image_url: IMAGE_DETAIL_FISH_1,
          },
          {
            title: "Cá chép ông táo",
            subtitle: "200.000đ/1kg",
            image_url: IMAGE_DETAIL_FISH_2,
          },
          {
            title: "Cá ngừ châu mỹ",
            subtitle: "300.000đ/1kg",
            image_url: IMAGE_DETAIL_FISH_3,
          },
          {
            title: "Quay trở lại",
            subtitle: "Quay trở lại Menu chính",
            image_url: IMAGE_BACK_MAIN_MENU,
            buttons: [
              {
                type: "postback",
                title: "QUAY TRỞ Lại",
                payload: "BACK_TO_MAIN_MENU",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};

let handleDetailViewMeat = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response1 = getDetailViewMeatTemplate();

      // send text message
      await callSendAPI(sender_psid, response1);

      resolve("done");
    } catch (e) {
      reject(e);
    }
  });
};

let getDetailViewMeatTemplate = () => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: [
          {
            title: "Thịt lợn hun khói",
            subtitle: "500.000đ/1kg",
            image_url: IMAGE_DETAIL_MEAT_1,
          },
          {
            title: "Thịt bò châu mỹ",
            subtitle: "200.000đ/1kg",
            image_url: IMAGE_DETAIL_MEAT_2,
          },
          {
            title: "Thịt trâu hải phòng",
            subtitle: "300.000đ/1kg",
            image_url: IMAGE_DETAIL_MEAT_3,
          },
          {
            title: "Quay trở lại",
            subtitle: "Quay trở lại Menu chính",
            image_url: IMAGE_BACK_MAIN_MENU,
            buttons: [
              {
                type: "postback",
                title: "QUAY TRỞ Lại",
                payload: "BACK_TO_MAIN_MENU",
              },
            ],
          },
        ],
      },
    },
  };
  return response;
};

let getImageRoomsTemplate = () => {
  let response = {
    attachment: {
      type: "image",
      payload: {
        url: IMAGE_DETAIL_ROOMS,
        is_reusable: true,
      },
    },
  };

  return response;
};

let getButtonRoomsTemplate = (senderID) => {
  let response = {
    attachment: {
      type: "template",
      payload: {
        template_type: "button",
        text: "Nhà hàng có thể phục vụ tối đa 300 khách",
        buttons: [
          {
            type: "postback",
            title: "Menu chính",
            payload: "MAIN_MENU",
          },
          {
            type: "web_url",
            url: `${process.env.URL_WEB_VIEW_ORDER}/${senderID}`,
            title: "ĐẶT BÀN",
            webview_height_ratio: "tall",
            messenger_extensions: true,
          },
        ],
      },
    },
  };

  return response;
};

let handleShowDetailRooms = (sender_psid) => {
  return new Promise(async (resolve, reject) => {
    try {
      // send an image
      let response1 = getImageRoomsTemplate(sender_psid);

      // send a button template: text, buttons
      let response2 = getButtonRoomsTemplate(sender_psid);

      await callSendAPI(sender_psid, response1);
      await callSendAPI(sender_psid, response2);

      resolve("done");
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleGetStarted: handleGetStarted,
  handleSendMainMenu: handleSendMainMenu,
  handleSendLunchMenu: handleSendLunchMenu,
  handleSendDinnerMenu: handleSendDinnerMenu,
  handleBackToMainMenu: handleBackToMainMenu,
  handleDetailViewAppetizers: handleDetailViewAppetizers,
  handleDetailViewFish: handleDetailViewFish,
  handleDetailViewMeat: handleDetailViewMeat,
  handleShowDetailRooms: handleShowDetailRooms,
  callSendAPI: callSendAPI,
  getUserName: getUserName,
};
