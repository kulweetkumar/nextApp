require('dotenv').config();

module.exports = {
  checkValidation: async v => {
    var errorsResponse;
    await v.check().then(function (matched) {
      if (!matched) {
        var valdErrors = v.errors;
        var respErrors = [];
        Object.keys(valdErrors).forEach(function (key) {
          if (valdErrors && valdErrors[key] && valdErrors[key].message) {
            respErrors.push(valdErrors[key].message);
          }
        });
        errorsResponse = respErrors.length > 0 ? respErrors[0] : '';
      }
    });
    return errorsResponse;
  },
  error403: function (res, err) {
    let code = typeof err === 'object'
      ? err.statusCode ? err.statusCode : err.code ? err.code : 403
      : 403;
    let message = typeof err === 'object' ? err.message : err;
    res.status(code).json({
      success: false,
      message: message,
      code: code,
      body: {},
    });
  },
  error400: function (res, err) {
    let code = typeof err === 'object'
      ? err.statusCode ? err.statusCode : err.code ? err.code : 400
      : 400;
    let message = typeof err === 'object' ? err.message : err;
    res.status(code).json({
      success: false,
      message: message,
      code: code,
      body: {},
    });
  },
  success: function (res, message, body = {}) {
    return res.status(200).json({
      success: true,
      code: 200,
      message: message,
      body: body,
    });
  },
//   fileUpload: (file, folder) => {
//     if (file) {
//       var extension = path.extname(file.name);
//       var filename = uuid() + extension;
//       file.mv(
//         process.cwd() + `/public/images/${folder}/` + filename,
//         function (err) {
//           if (err) return err;
//         }
//       );
//     }
//     let url = `/images/${folder}/${filename}`;
//     return url;
//   },


//   verifyUser: async (req, res, next) => {
//     try {
//       if (!req.headers.authorization) {
//         return res.status(401).json({
//           success: false,
//           status: 401,
//           message: 'Token Missing',
//         });
//       } else {
//         const accessToken = req.headers.authorization.split(' ')[1];
//         const decoded = jwt.verify(accessToken, 'secret');
//         const data = await user.findOne({
//           where: {
//             id: decoded.id,
//           },
//           raw: true,
//         });
//         if (data.id == decoded.id) {
//           req.auth = data;
//           if (next == 1) {
//             return req.auth;
//           } else {
//             return next();
//           }
//         } else {
//           return res.status(401).json({
//             success: false,
//             status: 401,
//             message: 'Invalid Token',
//           });
//         }
//       }
//     } catch (error) {
//       return res.status(401).json({
//         success: false,
//         status: 401,
//         message: error,
//       });
//     }
//   },
//   verifykey: async (req, res, next) => {
//     try {
//       if (!req.headers.secret_key && !req.headers.publish_key) {
//         return await module.exports.error400(res, 'Key not found!');
//       }
//       if (
//         req.headers.secret_key !== envfile.SECRET_KEY ||
//         req.headers.publish_key !== envfile.PUBLISH_KEY
//       ) {
//         return await module.exports.error403(res, 'Key not matched!');
//       }
//       return next();
//     } catch (error) {
//       return res.status(401).json({
//         success: false,
//         status: 401,
//         message: 'Invalid Token',
//       });
//     }
//   },
//   strieCustomer: async email => {
//     const customer = await stripe.customers.create({
//       email: email,
//     });
//     return customer.id;
//   },
//   stripeToken: async (req, expiry_month, expiry_year) => {
//     const token = await stripe.tokens.create({
//       card: {
//         number: req.body.card_number,
//         exp_month: expiry_month,
//         exp_year: expiry_year,
//       },
//     });
//     const source = await stripe.customers.createSource(req.auth.verify_driver, {
//       source: token.id,
//     });

//     return source ? source.id : 0;
//   },
//   stripePayment: async (order) => {
//     try {
//       const customer = await stripe.customers.retrieve(order.orderUser.stripe_id);
//       if (customer) {
//         var stripe_id = order.orderUser.stripe_id

//       }
//     } catch (error) {
//       const customerData = await module.exports.strieCustomer(order.orderUser.email);
//       var stripe_id = customerData;
//       let update = await user.update(
//         {
//           stripe_id: stripe_id
//         },
//         {
//           where: {
//             email: order.orderUser.email,
//           },
//         }
//       );
//     }
//     const ephemeralKey = await stripe.ephemeralKeys.create(
//       { customer: stripe_id },
//       { apiVersion: '2020-08-27' }
//     );
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: parseInt((order.total * 100).toFixed(0)),
//       currency: 'USD',
//       customer: stripe_id,
//       automatic_payment_methods: {
//         enabled: true,
//       },
//     });
//     let obj = { ephemeralKey: ephemeralKey, paymentIntent: paymentIntent, stripe_id: stripe_id }
//     return obj;
//   },
//   sendPushNotification: async function (dataForSend) {
//     deviceType = dataForSend.role == 2? dataForSend.orderUser.device_type
//       : dataForSend.orderDriver.device_type;
//     deviceToken = dataForSend.role == 2
//       ? dataForSend.orderUser.device_token
//       : dataForSend.orderDriver.device_token;
//     if (dataForSend && deviceType == 1) {
//       const options = {
//         token: {
//           key: __dirname + '/AuthKey_B2V6DNMKH9.p8',
//           keyId: 'B2V6DNMKH9',
//           teamId: 'RH4GVZ4PJ4',
//         },
//         production: true,
//       };
//       const apnProvider = new apn.Provider(options);
//       if (deviceToken) {
//         var myDevice = deviceToken;
//         var note = new apn.Notification();
//         note.sound = 'ping.aiff';
//         note.title = 'Food and Grocery';
//         note.body = dataForSend.message;
//         note.topic = dataForSend.role == 2 ? 'com.live.FoodGroceryUser' : 'com.live.FoodGroceryDriver';
//         note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
//         note.badge = 1;
//         note.sound = 'ping.aiff';
//         note.alert = dataForSend.message;
//         var payload = {
//           aps: {
//             alert: note.alert,
//             title: note.title,
//             sound: 'default',
//           },
//           payload: dataForSend,
//         };
//         note.payload = payload
//         apnProvider
//           .send(note, myDevice)
//           .then(result => {
//             console.log(note, 'fdddddddddddddddddddddddddddddddddddddddddddddddddddddddd');

//             console.error('Push send successfully:', result);
//           })
//           .catch(err => {
//             console.error('error while sending user notification', err);
//             return err;
//           });
//       }
//     } else {
//       // andriod push notification
//       // var message = {
//       //   to: dataForSend.device_token,
//       //   notification: {
//       //     title: 'Food and Grocery',
//       //     body: dataForSend.get_message,
//       //     device_token: dataForSend.device_token,
//       //     device_type: dataForSend.device_type,
//       //     type: dataForSend.type,
//       //   },
//       //   data: {
//       //     title: 'Food and Grocery',
//       //     body: dataForSend,
//       //     device_token: dataForSend.device_token,
//       //     device_type: dataForSend.device_type,
//       //     type: dataForSend.type,
//       //   },
//       // };
//       //   var serverKey =
//       //     'AAAAAjERZZo:APA91bFmP9rI4tDQh290RcTQvh0j0EhG2_ieOjJZeKW45hFh5er09x0ASflsnEwIqjWSpjtdBGDoU_8B3Wi0lN8ntS6tOLdveTA-4Lr-BbkH2nzYz3LPy_BPVNdj4GHzegtX8oAfoRHf';
//       //   var fcm = new FCM (serverKey);
//       //   fcm.send (message, function (err, response) {
//       //     if (err) {
//       //       throw error;
//       //     } else {
//       //       throw message;
//       //     }
//       //   });
//     }
//     return true;
//   },
}
